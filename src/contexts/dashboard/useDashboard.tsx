import { useContext } from 'react';
import { DashboardContext } from './DashboardProvider';
import { WidgetId } from './types';

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  
  const { 
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
    collapsedWidgets
  } = context;
  
  // Determine if a widget is visible based on dashboard settings
  const isWidgetVisible = (widgetId: WidgetId): boolean => {
    // If we're in custom view mode, check if the widget is in custom layout
    if (viewMode === 'custom') {
      return customLayout.includes(widgetId);
    }
    
    // Otherwise, check if it's in the main widgets array
    return widgets.includes(widgetId);
  };
  
  // Check if a widget is collapsed
  const isWidgetCollapsed = (widgetId: WidgetId): boolean => {
    return collapsedWidgets.includes(widgetId);
  };
  
  // Toggle widget collapse state
  const toggleWidgetCollapse = (widgetId: WidgetId): void => {
    if (collapsedWidgets.includes(widgetId)) {
      // If already collapsed, expand it
      context.toggleWidget(widgetId);
    } else {
      // If expanded, collapse it
      context.toggleWidget(widgetId);
    }
  };
  
  // Function used in CustomLayoutEditor.tsx to update the custom layout
  const updateCustomLayout = (newLayout: WidgetId[]): void => {
    setCustomLayout(newLayout);
    
    // If we're in custom view mode, update the visible widgets too
    if (viewMode === 'custom') {
      // Save the dashboard with new settings
      saveDashboard(newLayout, viewMode, newLayout);
    }
  };
  
  return {
    // Original context properties
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
    collapsedWidgets,
    toggleWidget: context.toggleWidget,
    
    // Enhanced functionality
    isWidgetVisible,
    isWidgetCollapsed,
    toggleWidgetCollapse,
    updateCustomLayout
  };
};

export default useDashboard;
