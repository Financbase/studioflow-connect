
import { useState, useCallback } from 'react';
import { WidgetId } from '../types';
import { useLocalStorage } from '@/hooks/use-local-storage';

/**
 * Hook for managing custom dashboard layouts
 */
export const useCustomLayout = () => {
  const [customLayout, setCustomLayout] = useLocalStorage<WidgetId[]>('dashboard-custom-layout', []);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isLayoutChanged, setIsLayoutChanged] = useState<boolean>(false);
  
  /**
   * Update the custom layout
   */
  const updateCustomLayout = useCallback((newLayout: WidgetId[]) => {
    setIsUpdating(true);
    
    try {
      setCustomLayout(newLayout);
      setIsLayoutChanged(false);
    } finally {
      setIsUpdating(false);
    }
  }, [setCustomLayout]);
  
  /**
   * Check if the layout has been changed from the saved version
   */
  const hasLayoutChanged = useCallback((newLayout: WidgetId[]) => {
    if (!customLayout || !newLayout) return false;
    
    if (customLayout.length !== newLayout.length) {
      return true;
    }
    
    return !customLayout.every(widget => newLayout.includes(widget));
  }, [customLayout]);
  
  return {
    customLayout,
    updateCustomLayout,
    isUpdating,
    isLayoutChanged,
    hasLayoutChanged
  };
};
