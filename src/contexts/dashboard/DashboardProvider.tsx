
import React, { createContext, useEffect, useCallback, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useWidgets } from './hooks/useWidgets';
import { useViewMode } from './hooks/useViewMode';
import { useDashboardPersistence } from './hooks/useDashboardPersistence';
import { usePricingTier } from './hooks/usePricingTier';
import { WidgetId, ViewMode, DashboardContextType } from './types';
import { useIsMobile } from '@/hooks/use-mobile';

// Creating the Dashboard Context
export const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

/**
 * Provider component for the Dashboard context
 * Manages the state and functionality of the dashboard
 */
export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, profile } = useAuth();
  const isMobile = useIsMobile();
  const { pricingTier, setPricingTier, hasFeatureAccess, featureAccess, isUpdating: pricingUpdating } = usePricingTier(user, profile);
  const { viewMode, setViewMode } = useViewMode();
  
  // Initialize widget management hooks
  const { 
    widgets, 
    addWidget, 
    removeWidget, 
    moveWidget, 
    customLayout, 
    setCustomLayout, 
    resetWidgets, 
    collapsedWidgets, 
    toggleWidget, 
    isWidgetCollapsed 
  } = useWidgets(viewMode, hasFeatureAccess);
  
  // Initialize persistence hooks
  const { 
    saveDashboardSettings, 
    isUpdating: persistenceUpdating
  } = useDashboardPersistence(user?.id, viewMode, widgets, customLayout);
  
  // Combined loading state
  const isUpdating = pricingUpdating || persistenceUpdating;

  // Console log to debug auth status
  useEffect(() => {
    if (user) {
      console.log('DashboardProvider: User is logged in', user.id);
    } else {
      console.log('DashboardProvider: No user is logged in');
    }
  }, [user]);
  
  // Listen for pricingTier changes
  useEffect(() => {
    console.log('PricingTier changed:', pricingTier);
  }, [pricingTier]);

  // Check if a widget is visible based on the current view mode
  const isWidgetVisible = useCallback((widgetId: WidgetId): boolean => {
    return widgets.includes(widgetId);
  }, [widgets]);

  // Update custom layout
  const updateCustomLayout = useCallback((newLayout: WidgetId[]): void => {
    setCustomLayout(newLayout);
  }, [setCustomLayout]);

  // Handler for toggling widget collapse
  const toggleWidgetCollapse = useCallback((widgetId: WidgetId): void => {
    toggleWidget(widgetId);
  }, [toggleWidget]);

  // Save dashboard settings
  const saveDashboard = useCallback((widgets: WidgetId[], viewMode: ViewMode, customLayout: WidgetId[]): Promise<boolean> => {
    return saveDashboardSettings(widgets, viewMode, customLayout);
  }, [saveDashboardSettings]);

  // Reset dashboard to defaults
  const resetDashboard = useCallback(() => {
    resetWidgets();
    // No need to call saveDashboardSettings here since resetWidgets already updates the state
    // which triggers the useEffect to save to localStorage
  }, [resetWidgets]);

  return (
    <DashboardContext.Provider
      value={{
        widgets,
        addWidget,
        removeWidget,
        moveWidget,
        viewMode, 
        setViewMode,
        customLayout,
        setCustomLayout,
        saveDashboard,
        resetDashboard,
        pricingTier,
        setPricingTier,
        isUpdating,
        hasFeatureAccess,
        featureAccess,
        isWidgetVisible,
        isWidgetCollapsed,
        toggleWidgetCollapse,
        updateCustomLayout,
        collapsedWidgets,
        toggleWidget,
        isMobileView: isMobile
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
