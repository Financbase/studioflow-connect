
import { useCallback } from 'react';
import { WidgetId } from '../types';
import { useDashboard } from '../useDashboard';

/**
 * Custom hook for managing widget visibility and collapse states
 */
export const useWidgetVisibility = () => {
  const dashboard = useDashboard();
  
  return {
    isWidgetVisible: dashboard.isWidgetVisible,
    isWidgetCollapsed: dashboard.isWidgetCollapsed,
    toggleWidgetCollapse: dashboard.toggleWidgetCollapse,
    customLayout: dashboard.customLayout,
    collapsedWidgets: dashboard.collapsedWidgets,
    toggleWidget: dashboard.toggleWidget
  };
};
