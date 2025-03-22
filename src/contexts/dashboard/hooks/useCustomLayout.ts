
import { useCallback, useState, useEffect } from 'react';
import { WidgetId } from '../types';
import { useDashboard } from '../useDashboard';
import { toast } from '@/hooks/use-toast';

/**
 * Hook for managing custom layout functionality with enhanced error handling and user feedback
 */
export const useCustomLayout = () => {
  const { 
    customLayout, 
    updateCustomLayout: updateLayout,
    viewMode,
    saveDashboard,
    isUpdating
  } = useDashboard();
  
  const [lastSavedLayout, setLastSavedLayout] = useState<WidgetId[]>([]);
  
  // Track last saved layout for comparison
  useEffect(() => {
    if (customLayout && !isUpdating) {
      setLastSavedLayout([...customLayout]);
    }
  }, [customLayout, isUpdating]);
  
  // Function used in CustomLayoutEditor.tsx to update the custom layout
  const updateCustomLayout = useCallback((newLayout: WidgetId[]): void => {
    if (!newLayout || newLayout.length === 0) {
      toast({
        title: "Invalid Layout",
        description: "Layout must contain at least one widget",
        variant: "destructive"
      });
      return;
    }
    
    if (updateLayout) {
      updateLayout(newLayout);
    
      // If we're in custom view mode, update the visible widgets too
      if (viewMode === 'custom') {
        // Save the dashboard with new settings
        saveDashboard(newLayout, viewMode, newLayout)
          .then(success => {
            if (success) {
              // Only show toast on successful save and if the layout actually changed
              if (JSON.stringify(lastSavedLayout) !== JSON.stringify(newLayout)) {
                toast({
                  title: "Layout Updated",
                  description: "Your custom dashboard layout has been saved",
                });
              }
            }
          });
      }
    }
  }, [updateLayout, viewMode, saveDashboard, lastSavedLayout]);
  
  return {
    customLayout,
    updateCustomLayout,
    isUpdating
  };
};
