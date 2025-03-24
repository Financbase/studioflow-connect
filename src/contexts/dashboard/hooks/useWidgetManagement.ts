
import { useState, useEffect, useCallback, useMemo } from 'react';
import { WidgetId, ViewMode, defaultVisibleWidgets } from '../types';
import { useLocalStorage } from '@/hooks/use-local-storage';

/**
 * Hook for managing widget operations (add, remove, move) and widget states
 */
export const useWidgetManagement = (viewMode: ViewMode, hasFeatureAccess: (widget: WidgetId) => boolean) => {
  // Store the list of widgets for each view mode
  const [widgets, setWidgets] = useState<WidgetId[]>([]);
  
  // Store custom layout widgets
  const [customLayout, setCustomLayout] = useLocalStorage<WidgetId[]>('dashboard-custom-layout', []);
  
  // Store collapsed widgets
  const [collapsedWidgets, setCollapsedWidgets] = useLocalStorage<WidgetId[]>('dashboard-collapsed-widgets', []);
  
  // Initialize widgets based on view mode
  useEffect(() => {
    if (viewMode === 'custom' && customLayout && customLayout.length > 0) {
      // For custom view mode, use the saved custom layout
      setWidgets(customLayout.filter(widget => hasFeatureAccess(widget)));
    } else {
      // For other view modes, use the default widgets for that mode
      const defaultWidgets = defaultVisibleWidgets[viewMode] || [];
      setWidgets(defaultWidgets.filter(widget => hasFeatureAccess(widget)));
    }
  }, [viewMode, customLayout, hasFeatureAccess]);
  
  // Add a widget to the current layout
  const addWidget = useCallback((widgetId: WidgetId) => {
    if (!widgets.includes(widgetId)) {
      const updatedWidgets = [...widgets, widgetId];
      setWidgets(updatedWidgets);
      
      // If in custom mode, also update the custom layout
      if (viewMode === 'custom') {
        setCustomLayout(updatedWidgets);
      }
    }
  }, [widgets, viewMode, setCustomLayout]);
  
  // Remove a widget from the current layout
  const removeWidget = useCallback((widgetId: WidgetId) => {
    const updatedWidgets = widgets.filter(id => id !== widgetId);
    setWidgets(updatedWidgets);
    
    // If in custom mode, also update the custom layout
    if (viewMode === 'custom') {
      setCustomLayout(updatedWidgets);
    }
  }, [widgets, viewMode, setCustomLayout]);
  
  // Move a widget to a different position in the layout
  const moveWidget = useCallback((startIndex: number, endIndex: number) => {
    const result = Array.from(widgets);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    
    setWidgets(result);
    
    // If in custom mode, also update the custom layout
    if (viewMode === 'custom') {
      setCustomLayout(result);
    }
  }, [widgets, viewMode, setCustomLayout]);
  
  // Toggle a widget's collapsed state
  const toggleWidget = useCallback((widgetId: WidgetId) => {
    setCollapsedWidgets(prev => {
      if (prev.includes(widgetId)) {
        return prev.filter(id => id !== widgetId);
      } else {
        return [...prev, widgetId];
      }
    });
  }, [setCollapsedWidgets]);
  
  // Check if a widget is collapsed
  const isWidgetCollapsed = useCallback((widgetId: WidgetId) => {
    return collapsedWidgets.includes(widgetId);
  }, [collapsedWidgets]);
  
  // Reset to default layout for the current view mode
  const resetWidgets = useCallback(() => {
    const defaultWidgets = defaultVisibleWidgets[viewMode] || [];
    setWidgets(defaultWidgets.filter(widget => hasFeatureAccess(widget)));
    
    if (viewMode === 'custom') {
      // Reset custom layout to empty
      setCustomLayout([]);
    }
    
    // Clear collapsed widgets
    setCollapsedWidgets([]);
  }, [viewMode, hasFeatureAccess, setCustomLayout, setCollapsedWidgets]);
  
  // Filter widgets by feature access
  const visibleWidgets = useMemo(() => {
    return widgets.filter(widget => hasFeatureAccess(widget));
  }, [widgets, hasFeatureAccess]);
  
  return {
    widgets,
    visibleWidgets,
    setWidgets,
    addWidget,
    removeWidget,
    moveWidget,
    customLayout,
    setCustomLayout,
    resetWidgets,
    collapsedWidgets,
    toggleWidget,
    isWidgetCollapsed
  };
};
