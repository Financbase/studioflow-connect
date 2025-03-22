import { useCallback } from 'react';
import { WidgetId } from '../types';
import { useDashboard } from '../useDashboard';

/**
 * Hook for managing widget visibility and collapse state
 */
export const useWidgetVisibility = () => {
  const { 
    widgets, 
    viewMode, 
    customLayout, 
    collapsedWidgets,
    toggleWidget: toggleWidgetBase
  } = useDashboard();
  
  // Determine if a widget is visible based on dashboard settings
  const isWidgetVisible = useCallback((widgetId: WidgetId): boolean => {
    // If we're in custom view mode, check if the widget is in custom layout
    if (viewMode === 'custom') {
      return customLayout.includes(widgetId);
    }
    
    // Otherwise, check if it's in the main widgets array
    return widgets.includes(widgetId);
  }, [viewMode, customLayout, widgets]);
  
  // Check if a widget is collapsed
  const isWidgetCollapsed = useCallback((widgetId: WidgetId): boolean => {
    return collapsedWidgets.includes(widgetId);
  }, [collapsedWidgets]);
  
  // Toggle widget collapse state
  const toggleWidgetCollapse = useCallback((widgetId: WidgetId): void => {
    toggleWidgetBase(widgetId);
  }, [toggleWidgetBase]);
  
  return {
    isWidgetVisible,
    isWidgetCollapsed,
    toggleWidgetCollapse
  };
};
