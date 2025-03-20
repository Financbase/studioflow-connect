
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import { DashboardSettings } from '@/types/supabase';
import { useToast, toast } from '@/hooks/use-toast';

// Type definitions
export type WidgetId = 'system' | 'audio' | 'ai' | 'vm' | 'daw' | 'marketplace' | 'connect';
export type PricingTier = 'free' | 'standard' | 'pro';
export type ViewMode = 'simple' | 'advanced' | 'custom' | 'mobile';

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
  advanced: ['connect', 'system', 'audio', 'ai', 'daw', 'marketplace', 'vm'],
  custom: [], // Will be set by user preference
  mobile: ['connect'] // Mobile view focuses on the core MVP
};

interface DashboardContextType {
  // Widget visibility management
  collapsedWidgets: WidgetId[];
  toggleWidget: (widgetId: WidgetId) => void;
  isWidgetCollapsed: (widgetId: WidgetId) => boolean;
  
  // Properties for widget management
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
  
  // Mobile specific
  isMobileView: boolean;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Mobile detection
  const isMobile = useIsMobile();
  const { user, profile } = useAuth();
  const { addToast } = useToast();
  
  // Collapsed widgets state
  const [collapsedWidgets, setCollapsedWidgets] = useState<WidgetId[]>([]);
  
  // View mode state - default to mobile if on mobile device
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    return isMobile ? 'mobile' : 'advanced'; // Changed default to advanced to show all features
  });
  
  // Update view mode when mobile status changes
  useEffect(() => {
    if (isMobile && viewMode !== 'mobile') {
      setViewMode('mobile');
    } else if (!isMobile && viewMode === 'mobile') {
      setViewMode('advanced'); // Changed default to advanced
    }
  }, [isMobile, viewMode]);
  
  // Pricing tier state - load from profile if available
  const [pricingTier, setPricingTier] = useState<PricingTier>('pro'); // Default to pro for testing
  
  // Custom layout state - include all widgets by default
  const [customLayout, setCustomLayout] = useState<WidgetId[]>(['connect', 'system', 'audio', 'ai', 'vm', 'daw', 'marketplace']);
  
  // Load dashboard settings from Supabase when user is authenticated
  useEffect(() => {
    const loadDashboardSettings = async () => {
      if (user) {
        try {
          // Get settings from database
          const { data, error } = await supabase
            .from('dashboard_settings')
            .select('*')
            .eq('user_id', user.id)
            .single();
            
          if (error && error.code !== 'PGRST116') {
            console.error('Error loading dashboard settings:', error);
            return;
          }
          
          if (data) {
            // Set view mode from database
            if (data.view_mode && !isMobile) {
              setViewMode(data.view_mode as ViewMode);
            }
            
            // Set custom layout from database
            if (data.custom_layout && Array.isArray(data.custom_layout)) {
              setCustomLayout(data.custom_layout as WidgetId[]);
            }
            
            // Set collapsed widgets from database
            if (data.collapsed_widgets && Array.isArray(data.collapsed_widgets)) {
              setCollapsedWidgets(data.collapsed_widgets as WidgetId[]);
            }
          }
          
          // Set pricing tier from profile
          if (profile && profile.plan) {
            // Ensure plan is one of the allowed values
            const planValue = profile.plan as PricingTier;
            if (planValue === 'free' || planValue === 'standard' || planValue === 'pro') {
              setPricingTier(planValue);
              console.log("Setting pricing tier from profile:", planValue);
            }
          }
        } catch (err) {
          console.error('Error in loading dashboard settings:', err);
        }
      }
    };
    
    loadDashboardSettings();
  }, [user, profile, isMobile]);
  
  // Save dashboard settings to Supabase when they change
  useEffect(() => {
    const saveDashboardSettings = async () => {
      if (user) {
        try {
          const { error } = await supabase
            .from('dashboard_settings')
            .upsert({
              user_id: user.id,
              view_mode: viewMode,
              custom_layout: customLayout,
              collapsed_widgets: collapsedWidgets,
              updated_at: new Date().toISOString()
            }, {
              onConflict: 'user_id'
            });
            
          if (error) {
            console.error('Error saving dashboard settings:', error);
          }
        } catch (err) {
          console.error('Error in saving dashboard settings:', err);
        }
      }
    };
    
    if (user) {
      saveDashboardSettings();
    }
  }, [viewMode, customLayout, collapsedWidgets, user]);
  
  // Update user profile when pricing tier changes
  useEffect(() => {
    const updatePricingTier = async () => {
      if (user && profile && profile.plan !== pricingTier) {
        try {
          const { error } = await supabase
            .from('profiles')
            .update({
              plan: pricingTier,
              updated_at: new Date().toISOString()
            })
            .eq('id', user.id);
            
          if (error) {
            console.error('Error updating pricing tier:', error);
            toast.destructive({
              title: 'Error',
              description: 'Could not update subscription plan'
            });
          } else {
            toast.default({
              title: 'Plan Updated',
              description: `Your plan has been updated to ${pricingTier}`
            });
          }
        } catch (err) {
          console.error('Error in updating pricing tier:', err);
        }
      }
    };
    
    if (user && profile) {
      updatePricingTier();
    }
  }, [pricingTier, user, profile, addToast]);
  
  // Feature access based on current pricing tier
  const featureAccess = featureAccessMap[pricingTier];
  
  // Determines if a widget should be visible based on current view mode
  const isWidgetVisible = (widgetId: WidgetId): boolean => {
    // Always show all widgets for Pro users regardless of view mode
    if (pricingTier === 'pro') {
      return true;
    }
    
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
        featureAccess,
        isMobileView: isMobile
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
