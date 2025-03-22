
import { useCallback, useState, useEffect } from 'react';
import { WidgetId } from '../types';
import { useDashboard } from '../useDashboard';
import { toast } from '@/hooks/use-toast';

/**
 * Hook for managing custom layout functionality with enhanced error handling,
 * user feedback, and performance optimizations.
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
  const [isLayoutChanged, setIsLayoutChanged] = useState(false);
  
  // Track last saved layout for comparison
  useEffect(() => {
    if (customLayout && !isUpdating) {
      setLastSavedLayout([...customLayout]);
      setIsLayoutChanged(false);
    }
  }, [customLayout, isUpdating]);
  
  // Function to check if the layout has been modified
  const hasLayoutChanged = useCallback((newLayout: WidgetId[]): boolean => {
    if (!lastSavedLayout || lastSavedLayout.length !== newLayout.length) {
      return true;
    }
    
    return JSON.stringify(lastSavedLayout) !== JSON.stringify(newLayout);
  }, [lastSavedLayout]);
  
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
    
    // Update the layout changed status
    const layoutChanged = hasLayoutChanged(newLayout);
    setIsLayoutChanged(layoutChanged);
    
    if (updateLayout) {
      updateLayout(newLayout);
    
      // If we're in custom view mode, update the visible widgets too
      if (viewMode === 'custom') {
        // Save the dashboard with new settings
        saveDashboard(newLayout, viewMode, newLayout)
          .then(success => {
            if (success) {
              // Only show toast on successful save and if the layout actually changed
              if (layoutChanged) {
                toast({
                  title: "Layout Updated",
                  description: "Your custom dashboard layout has been saved",
                });
              }
            }
          })
          .catch(error => {
            toast({
              title: "Save Failed",
              description: "There was an error saving your layout. Please try again.",
              variant: "destructive"
            });
            console.error("Error saving dashboard:", error);
          });
      }
    }
  }, [updateLayout, viewMode, saveDashboard, lastSavedLayout, hasLayoutChanged]);
  
  return {
    customLayout,
    updateCustomLayout,
    isUpdating,
    isLayoutChanged,
    hasLayoutChanged
  };
};
