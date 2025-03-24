
import { useCallback } from 'react';
import { WidgetId } from '../types';
import { useDashboard } from '../useDashboard';

/**
 * Hook for managing widget operations (add, remove, move)
 */
export const useWidgetManagement = () => {
  const dashboard = useDashboard();
  
  return {
    widgets: dashboard.widgets,
    addWidget: dashboard.addWidget,
    removeWidget: dashboard.removeWidget,
    moveWidget: dashboard.moveWidget
  };
};
