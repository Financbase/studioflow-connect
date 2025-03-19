
import React, { createContext, useContext, useState, useEffect } from 'react';

// Type definitions
export type WidgetId = 'system' | 'audio' | 'ai' | 'vm' | 'daw' | 'marketplace' | 'connect';
export type PricingTier = 'free' | 'standard' | 'pro';
export type ViewMode = 'simple' | 'advanced' | 'custom';

// Feature access mapping based on pricing tier
const featureAccessMap: Record<PricingTier, Record<WidgetId, boolean>> = {
  free: {
    system: false,
    audio: true,
    ai: false,
    vm: false,
    daw: false,
    marketplace: false,
    connect: true // StudioFlow Connect is the open-source MVP
  },
  standard: {
    system: true,
    audio: true,
    ai: true,
    vm: false,
    daw: true,
    marketplace: true,
    connect: true
  },
  pro: {
    system: true,
    audio: true,
    ai: true,
    vm: true,
    daw: true,
    marketplace: true,
    connect: true
  }
};

// Default visible widgets based on view mode
const defaultVisibleWidgets: Record<ViewMode, WidgetId[]> = {
  simple: ['connect', 'audio'], // MVP core features
  advanced: ['connect', 'system', 'audio', 'ai', 'daw', 'marketplace'],
  custom: [] // Will be set by user preference
};

interface DashboardContextType {
  // Widget visibility management
  collapsedWidgets: WidgetId[];
  toggleWidget: (widgetId: WidgetId) => void;
  isWidgetCollapsed: (widgetId: WidgetId) => boolean;
  
  // Added properties based on errors
  isWidgetVisible: (widgetId: WidgetId) => boolean;
  hasFeatureAccess: (widgetId: WidgetId) => boolean;
  toggleWidgetCollapse: (widgetId: WidgetId) => void;
  
  // View mode management
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  
  // Pricing tier management
  pricingTier: PricingTier;
  setPricingTier: (tier: PricingTier) => void;
  
  // Custom layout management
  customLayout: WidgetId[];
  updateCustomLayout: (widgets: WidgetId[]) => void;
  
  // Feature access
  featureAccess: Record<WidgetId, boolean>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Collapsed widgets state
  const [collapsedWidgets, setCollapsedWidgets] = useState<WidgetId[]>([]);
  
  // View mode state
  const [viewMode, setViewMode] = useState<ViewMode>('simple');
  
  // Pricing tier state - load from localStorage if available
  const [pricingTier, setPricingTier] = useState<PricingTier>(() => {
    const savedTier = localStorage.getItem('pricing_tier');
    return (savedTier as PricingTier) || 'free';
  });
  
  // Custom layout state - default based on viewMode
  const [customLayout, setCustomLayout] = useState<WidgetId[]>([]);
  
  // Feature access based on current pricing tier
  const featureAccess = featureAccessMap[pricingTier];
  
  // Initialize custom layout when view mode or pricing tier changes
  useEffect(() => {
    // If custom layout is empty, set default based on viewMode
    if (customLayout.length === 0 && viewMode === 'custom') {
      const accessibleWidgets = Object.entries(featureAccess)
        .filter(([_, hasAccess]) => hasAccess)
        .map(([widgetId]) => widgetId as WidgetId);
      
      setCustomLayout(accessibleWidgets);
    }
    
    // Save current pricing tier to localStorage
    localStorage.setItem('pricing_tier', pricingTier);
  }, [viewMode, pricingTier, customLayout.length, featureAccess]);
  
  // Determines if a widget should be visible based on current view mode
  const isWidgetVisible = (widgetId: WidgetId): boolean => {
    if (viewMode === 'custom') {
      return customLayout.includes(widgetId);
    }
    return defaultVisibleWidgets[viewMode].includes(widgetId);
  };
  
  // Check if user has access to the feature based on pricing tier
  const hasFeatureAccess = (widgetId: WidgetId): boolean => {
    return featureAccess[widgetId];
  };
  
  // Toggle widget collapse state
  const toggleWidget = (widgetId: WidgetId) => {
    setCollapsedWidgets(prev => {
      if (prev.includes(widgetId)) {
        return prev.filter(id => id !== widgetId);
      } else {
        return [...prev, widgetId];
      }
    });
  };
  
  // Alias for toggleWidget for clearer API
  const toggleWidgetCollapse = toggleWidget;
  
  // Check if widget is collapsed
  const isWidgetCollapsed = (widgetId: WidgetId) => {
    return collapsedWidgets.includes(widgetId);
  };
  
  // Update custom layout
  const updateCustomLayout = (widgets: WidgetId[]) => {
    setCustomLayout(widgets);
    localStorage.setItem('custom_layout', JSON.stringify(widgets));
  };
  
  return (
    <DashboardContext.Provider 
      value={{ 
        collapsedWidgets, 
        toggleWidget, 
        isWidgetCollapsed,
        isWidgetVisible,
        hasFeatureAccess,
        toggleWidgetCollapse,
        viewMode,
        setViewMode,
        pricingTier,
        setPricingTier,
        customLayout,
        updateCustomLayout,
        featureAccess
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
