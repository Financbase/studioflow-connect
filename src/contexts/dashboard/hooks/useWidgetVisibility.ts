import { useCallback, useMemo } from 'react';
import { WidgetId } from '../types';
import { useDashboard } from '../useDashboard';

/**
 * Hook for managing widget visibility and collapse state with performance optimizations
 * and additional useful metrics for dashboard analysis
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
  
  // Get all currently visible and accessible widgets
  const getAllVisibleWidgets = useMemo(() => {
    return visibleWidgets.filter(widgetId => hasFeatureAccess(widgetId));
  }, [visibleWidgets, hasFeatureAccess]);
  
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
  
  // Calculate dashboard analytics
  const dashboardMetrics = useMemo(() => ({
    totalWidgets: widgets.length,
    visibleCount: getAllVisibleWidgets.length,
    collapsedCount: collapsedWidgets.length,
    collapsedPercentage: widgets.length > 0 
      ? Math.round((collapsedWidgets.length / widgets.length) * 100) 
      : 0,
    customizationActive: viewMode === 'custom',
    widgetStatuses: widgets.reduce((acc, widgetId) => {
      acc[widgetId] = {
        visible: isWidgetVisible(widgetId),
        collapsed: isWidgetCollapsed(widgetId),
        accessible: hasFeatureAccess(widgetId)
      };
      return acc;
    }, {} as Record<string, {visible: boolean, collapsed: boolean, accessible: boolean}>)
  }), [widgets, getAllVisibleWidgets, collapsedWidgets, viewMode, isWidgetVisible, isWidgetCollapsed, hasFeatureAccess]);
  
  return {
    isWidgetVisible,
    isWidgetCollapsed,
    toggleWidgetCollapse,
    visibleWidgets: getAllVisibleWidgets,
    collapsedCount: collapsedWidgets.length,
    metrics: dashboardMetrics
  };
};
