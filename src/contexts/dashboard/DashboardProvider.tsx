
import React, { createContext, useEffect, useCallback, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useWidgets } from './hooks/useWidgets';
import { useViewMode } from './hooks/useViewMode';
import { useDashboardPersistence } from './hooks/useDashboardPersistence';
import { usePricingTier } from './hooks/usePricingTier';
import { WidgetId, ViewMode, DashboardContextType } from './types';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSavedLayouts } from './hooks/useSavedLayouts';

// Creating the Dashboard Context
export const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

/**
 * Provider component for the Dashboard context
 * Manages the state and functionality of the dashboard
 */
export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, profile } = useAuth();
  const isMobile = useIsMobile();
  const { currentTier: pricingTier, changePricingTier, isChangingTier } = usePricingTier();
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
    isWidgetCollapsed,
    setWidgets 
  } = useWidgets(viewMode, (widget: WidgetId) => hasFeatureAccess(widget));
  
  // Initialize saved layouts hook
  const {
    layouts: savedLayouts,
    saveLayout,
    updateLayout,
    deleteLayout,
    applyLayout,
    isLoading: isLayoutsLoading,
    createDefaultLayout
  } = useSavedLayouts();
  
  // Initialize persistence hooks
  const { 
    saveDashboardSettings, 
    isUpdating: persistenceUpdating
  } = useDashboardPersistence(user?.id, viewMode, widgets, customLayout);
  
  // Combined loading state
  const isUpdating = isChangingTier || persistenceUpdating || isLayoutsLoading;

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

  // Feature access check
  const hasFeatureAccess = useCallback((widgetId: WidgetId): boolean => {
    // Implement logic to check if user has access to this widget
    if (!pricingTier) return false;
    
    // Example implementation - can be enhanced with actual feature rules
    if (pricingTier === 'enterprise') return true;
    if (pricingTier === 'pro') return true;
    
    // Standard users have access to basic widgets
    if (pricingTier === 'standard') {
      return ['analytics', 'calendar', 'projects', 'quick_actions', 'recent_files'].includes(widgetId);
    }
    
    // Free users have access to minimal widgets
    return ['analytics', 'quick_actions', 'recent_files'].includes(widgetId);
  }, [pricingTier]);

  // Generate feature access map
  const featureAccess = useMemo(() => {
    const result: Record<WidgetId, boolean> = {} as Record<WidgetId, boolean>;
    Object.values(WidgetId).forEach(widgetId => {
      result[widgetId] = hasFeatureAccess(widgetId);
    });
    return result;
  }, [hasFeatureAccess]);

  // Check if a widget is visible based on the current view mode
  const isWidgetVisible = useCallback((widgetId: WidgetId): boolean => {
    return widgets.includes(widgetId);
  }, [widgets]);

  // Set widget layout
  const setWidgetLayout = useCallback((newWidgets: WidgetId[]): void => {
    // Implementation here
    setWidgets(newWidgets);
    console.log('Setting widget layout:', newWidgets);
  }, [setWidgets]);

  // Toggle widget visibility
  const toggleWidgetVisibility = useCallback((widgetId: WidgetId): void => {
    // Implementation here
    if (widgets.includes(widgetId)) {
      removeWidget(widgetId);
    } else {
      addWidget(widgetId);
    }
    console.log('Toggling widget visibility:', widgetId);
  }, [widgets, removeWidget, addWidget]);

  // Reorder widgets
  const reorderWidgets = useCallback((startIndex: number, endIndex: number): void => {
    moveWidget(startIndex, endIndex);
  }, [moveWidget]);

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

  // Define visible widgets based on current view mode and user access
  const visibleWidgets = useMemo(() => {
    return widgets.filter(widgetId => hasFeatureAccess(widgetId));
  }, [widgets, hasFeatureAccess]);
  
  // Create default layout if user is logged in and no default layout exists
  useEffect(() => {
    if (user && widgets.length > 0 && savedLayouts.length === 0) {
      createDefaultLayout(widgets);
    }
  }, [user, widgets, savedLayouts, createDefaultLayout]);

  return (
    <DashboardContext.Provider
      value={{
        widgets,
        visibleWidgets,
        viewMode, 
        setViewMode,
        pricingTier: pricingTier || 'free',
        isLoading: isUpdating,
        hasFeatureAccess,
        featureAccess,
        setWidgetLayout,
        toggleWidgetVisibility,
        reorderWidgets,
        isWidgetVisible,
        isWidgetCollapsed,
        toggleWidgetCollapse,
        resetDashboard,
        isPricingTierChanging: isChangingTier,
        setPricingTier: changePricingTier,
        isUpdating,
        addWidget,
        removeWidget,
        moveWidget,
        customLayout,
        collapsedWidgets,
        toggleWidget,
        // Add saved layouts functionality
        savedLayouts,
        saveLayout,
        updateLayout,
        deleteLayout,
        applyLayout
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

// Add missing import for useMemo
import { useMemo } from 'react';
