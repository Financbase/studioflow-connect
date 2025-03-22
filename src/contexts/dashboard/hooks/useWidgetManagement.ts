
import { useCallback } from 'react';
import { WidgetId } from '../types';
import { useDashboard } from '../useDashboard';

/**
 * Hook for managing widget operations (add, remove, move)
 */
export const useWidgetManagement = () => {
  const { 
    widgets,
    addWidget,
    removeWidget,
    moveWidget
  } = useDashboard();
  
  return {
    widgets,
    addWidget,
    removeWidget,
    moveWidget
  };
};
