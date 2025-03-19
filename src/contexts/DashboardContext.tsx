
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export type ViewMode = "simple" | "advanced" | "custom";
export type PricingTier = "free" | "standard" | "pro";
export type WidgetId = "system" | "vm" | "daw" | "audio" | "ai" | "marketplace";

interface UserPreferences {
  viewMode: ViewMode;
  customLayout: WidgetId[];
  theme: "dark" | "light";
  collapsedWidgets: WidgetId[];
}

interface DashboardContextType {
  viewMode: ViewMode;
  pricingTier: PricingTier;
  customLayout: WidgetId[];
  visibleWidgets: WidgetId[];
  collapsedWidgets: WidgetId[];
  featureAccess: Record<WidgetId, boolean>;
  setViewMode: (mode: ViewMode) => void;
  setPricingTier: (tier: PricingTier) => void;
  updateCustomLayout: (widgets: WidgetId[]) => void;
  isWidgetVisible: (widgetId: WidgetId) => boolean;
  hasFeatureAccess: (widgetId: WidgetId) => boolean;
  toggleWidgetCollapse: (widgetId: WidgetId) => void;
  isWidgetCollapsed: (widgetId: WidgetId) => boolean;
}

const defaultPreferences: UserPreferences = {
  viewMode: "simple",
  customLayout: ["system", "audio", "ai"],
  theme: "dark",
  collapsedWidgets: []
};

// Define which widgets are visible in each view mode
const viewModeWidgets: Record<ViewMode, WidgetId[]> = {
  simple: ["system", "audio", "ai"],
  advanced: ["system", "vm", "daw", "audio", "ai", "marketplace"],
  custom: [] // This will be populated from user preferences
};

// Define which features are available in each pricing tier
const tierFeatureAccess: Record<PricingTier, WidgetId[]> = {
  free: ["system", "audio"],
  standard: ["system", "audio", "ai", "daw"],
  pro: ["system", "vm", "daw", "audio", "ai", "marketplace"]
};

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [pricingTier, setPricingTier] = useState<PricingTier>("free");
  
  // In a real app, this would be fetched from user account/authentication
  useEffect(() => {
    // Simulate loading user preferences
    const loadUserPreferences = () => {
      const storedPreferences = localStorage.getItem("dashboard_preferences");
      if (storedPreferences) {
        setPreferences(JSON.parse(storedPreferences));
      }
      
      // Simulate getting user's pricing tier
      // In a real app, this would come from an API call or auth state
      const storedTier = localStorage.getItem("pricing_tier") as PricingTier;
      if (storedTier) {
        setPricingTier(storedTier);
      }
    };
    
    loadUserPreferences();
  }, []);
  
  // Save preferences when they change
  useEffect(() => {
    localStorage.setItem("dashboard_preferences", JSON.stringify(preferences));
  }, [preferences]);
  
  // Determine which widgets should be visible based on view mode and custom layout
  const visibleWidgets = preferences.viewMode === "custom" 
    ? preferences.customLayout 
    : viewModeWidgets[preferences.viewMode];
    
  // Create a map of feature access based on pricing tier
  const featureAccess = Object.fromEntries(
    ["system", "vm", "daw", "audio", "ai", "marketplace"].map(widget => [
      widget, 
      tierFeatureAccess[pricingTier].includes(widget as WidgetId)
    ])
  ) as Record<WidgetId, boolean>;
  
  const setViewMode = (mode: ViewMode) => {
    setPreferences(prev => ({ ...prev, viewMode: mode }));
  };
  
  const updateCustomLayout = (widgets: WidgetId[]) => {
    setPreferences(prev => ({ ...prev, customLayout: widgets }));
  };
  
  const isWidgetVisible = (widgetId: WidgetId): boolean => {
    return visibleWidgets.includes(widgetId);
  };
  
  const hasFeatureAccess = (widgetId: WidgetId): boolean => {
    return featureAccess[widgetId];
  };
  
  const handleSetPricingTier = (tier: PricingTier) => {
    setPricingTier(tier);
    localStorage.setItem("pricing_tier", tier);
  };
  
  const toggleWidgetCollapse = (widgetId: WidgetId) => {
    setPreferences(prev => {
      const isCurrentlyCollapsed = prev.collapsedWidgets.includes(widgetId);
      const updatedCollapsedWidgets = isCurrentlyCollapsed
        ? prev.collapsedWidgets.filter(id => id !== widgetId)
        : [...prev.collapsedWidgets, widgetId];
      
      return {
        ...prev,
        collapsedWidgets: updatedCollapsedWidgets
      };
    });
  };
  
  const isWidgetCollapsed = (widgetId: WidgetId): boolean => {
    return preferences.collapsedWidgets.includes(widgetId);
  };
  
  return (
    <DashboardContext.Provider value={{
      viewMode: preferences.viewMode,
      pricingTier,
      customLayout: preferences.customLayout,
      visibleWidgets,
      collapsedWidgets: preferences.collapsedWidgets,
      featureAccess,
      setViewMode,
      setPricingTier: handleSetPricingTier,
      updateCustomLayout,
      isWidgetVisible,
      hasFeatureAccess,
      toggleWidgetCollapse,
      isWidgetCollapsed
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};
