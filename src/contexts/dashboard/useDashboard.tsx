
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
    featureAccess
  } = context;
  
  // Add missing functions that are used in WidgetSection.tsx
  const isWidgetVisible = (widgetId: WidgetId): boolean => {
    return widgets.includes(widgetId);
  };
  
  // Maintain a list of collapsed widgets (empty by default)
  const collapsedWidgets: WidgetId[] = [];
  
  const isWidgetCollapsed = (widgetId: WidgetId): boolean => {
    return collapsedWidgets.includes(widgetId);
  };
  
  const toggleWidgetCollapse = (widgetId: WidgetId): void => {
    // This is a stub function to satisfy the type requirements
    console.log(`Toggle collapse for widget: ${widgetId}`);
  };
  
  // Function used in CustomLayoutEditor.tsx
  const updateCustomLayout = (newLayout: WidgetId[]): void => {
    setCustomLayout(newLayout);
  };
  
  return {
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
    // Add the new functions to the returned object
    isWidgetVisible,
    isWidgetCollapsed,
    toggleWidgetCollapse,
    updateCustomLayout
  };
};

export default useDashboard;
