
import { useCallback, useMemo } from 'react';
import { WidgetId } from '../types';
import { useDashboard } from '../useDashboard';

/**
 * Hook for managing widget visibility and collapse state with performance optimizations
 */
export const useWidgetVisibility = () => {
  const { 
    widgets, 
    viewMode, 
    customLayout, 
    collapsedWidgets,
    toggleWidget: toggleWidgetBase,
    hasFeatureAccess
  } = useDashboard();
  
  // Memoize visible widgets to prevent unnecessary re-renders
  const visibleWidgets = useMemo(() => {
    if (viewMode === 'custom') {
      return customLayout;
    }
    return widgets;
  }, [viewMode, customLayout, widgets]);
  
  // Determine if a widget is visible based on dashboard settings
  const isWidgetVisible = useCallback((widgetId: WidgetId): boolean => {
    // First check if user has access to this widget based on their plan
    if (!hasFeatureAccess(widgetId)) {
      return false;
    }
    
    // If we're in custom view mode, check if the widget is in custom layout
    if (viewMode === 'custom') {
      return customLayout.includes(widgetId);
    }
    
    // Otherwise, check if it's in the main widgets array
    return widgets.includes(widgetId);
  }, [viewMode, customLayout, widgets, hasFeatureAccess]);
  
  // Check if a widget is collapsed
  const isWidgetCollapsed = useCallback((widgetId: WidgetId): boolean => {
    return collapsedWidgets.includes(widgetId);
  }, [collapsedWidgets]);
  
  // Toggle widget collapse state
  const toggleWidgetCollapse = useCallback((widgetId: WidgetId): void => {
    toggleWidgetBase(widgetId);
  }, [toggleWidgetBase]);
  
  // Get all currently visible and accessible widgets
  const getAllVisibleWidgets = useMemo(() => {
    return visibleWidgets.filter(widgetId => hasFeatureAccess(widgetId));
  }, [visibleWidgets, hasFeatureAccess]);
  
  return {
    isWidgetVisible,
    isWidgetCollapsed,
    toggleWidgetCollapse,
    visibleWidgets: getAllVisibleWidgets,
    collapsedCount: collapsedWidgets.length
  };
};
