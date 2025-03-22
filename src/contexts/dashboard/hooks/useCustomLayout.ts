
import { useCallback } from 'react';
import { WidgetId } from '../types';
import { useDashboard } from '../useDashboard';

/**
 * Hook for managing custom layout functionality
 */
export const useCustomLayout = () => {
  const { 
    customLayout, 
    updateCustomLayout: updateLayout,
    viewMode,
    saveDashboard
  } = useDashboard();
  
  // Function used in CustomLayoutEditor.tsx to update the custom layout
  const updateCustomLayout = useCallback((newLayout: WidgetId[]): void => {
    if (updateLayout) {
      updateLayout(newLayout);
    
      // If we're in custom view mode, update the visible widgets too
      if (viewMode === 'custom') {
        // Save the dashboard with new settings
        saveDashboard(newLayout, viewMode, newLayout);
      }
    }
  }, [updateLayout, viewMode, saveDashboard]);
  
  return {
    customLayout,
    updateCustomLayout
  };
};
