
import { useState, useCallback, useEffect } from 'react';
import { SavedLayout, WidgetId } from '../types';
import { useAuth } from '@/hooks/use-auth';
import { toast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';

export const useSavedLayouts = () => {
  const { user } = useAuth();
  const [layouts, setLayouts] = useState<SavedLayout[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Load layouts from localStorage initially
  useEffect(() => {
    if (user) {
      try {
        const savedLayoutsString = localStorage.getItem(`dashboard_layouts_${user.id}`);
        if (savedLayoutsString) {
          const savedLayouts = JSON.parse(savedLayoutsString) as SavedLayout[];
          setLayouts(savedLayouts);
        }
      } catch (error) {
        console.error('Error loading saved layouts:', error);
      }
    }
  }, [user]);
  
  // Save layouts to localStorage
  const persistLayouts = useCallback((updatedLayouts: SavedLayout[]) => {
    if (user) {
      try {
        localStorage.setItem(`dashboard_layouts_${user.id}`, JSON.stringify(updatedLayouts));
      } catch (error) {
        console.error('Error saving layouts to localStorage:', error);
      }
    }
  }, [user]);
  
  // Create a new layout
  const saveLayout = useCallback(async (name: string, widgets: WidgetId[], isDefault: boolean = false): Promise<SavedLayout | null> => {
    if (!user) {
      toast.error({
        title: "Authentication Required",
        description: "Please log in to save layouts",
      });
      return null;
    }
    
    setIsLoading(true);
    
    try {
      // Create new layout
      const newLayout: SavedLayout = {
        id: uuidv4(),
        name,
        widgets,
        isDefault,
        createdAt: new Date().toISOString()
      };
      
      // If this is default, remove default flag from other layouts
      let updatedLayouts: SavedLayout[];
      
      if (isDefault) {
        updatedLayouts = layouts.map(layout => ({
          ...layout,
          isDefault: false
        }));
      } else {
        updatedLayouts = [...layouts];
      }
      
      // Add new layout
      updatedLayouts.push(newLayout);
      setLayouts(updatedLayouts);
      persistLayouts(updatedLayouts);
      
      toast({
        title: "Layout Saved",
        description: `'${name}' has been saved successfully`,
      });
      
      return newLayout;
    } catch (error) {
      console.error('Error saving layout:', error);
      toast.error({
        title: "Save Failed",
        description: "There was an error saving your layout",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [layouts, user, persistLayouts]);
  
  // Update an existing layout
  const updateLayout = useCallback(async (layoutId: string, updates: Partial<SavedLayout>): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const layoutIndex = layouts.findIndex(layout => layout.id === layoutId);
      
      if (layoutIndex === -1) {
        toast.error({
          title: "Layout Not Found",
          description: "The layout you're trying to update doesn't exist",
        });
        return false;
      }
      
      // Make a copy of layouts
      const updatedLayouts = [...layouts];
      
      // If setting this as default, unset others
      if (updates.isDefault) {
        updatedLayouts.forEach(layout => {
          layout.isDefault = false;
        });
      }
      
      // Update the layout
      updatedLayouts[layoutIndex] = {
        ...updatedLayouts[layoutIndex],
        ...updates
      };
      
      setLayouts(updatedLayouts);
      persistLayouts(updatedLayouts);
      
      toast({
        title: "Layout Updated",
        description: `'${updatedLayouts[layoutIndex].name}' has been updated`,
      });
      
      return true;
    } catch (error) {
      console.error('Error updating layout:', error);
      toast.error({
        title: "Update Failed",
        description: "There was an error updating your layout",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [layouts, persistLayouts]);
  
  // Delete a layout
  const deleteLayout = useCallback(async (layoutId: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const layoutToDelete = layouts.find(layout => layout.id === layoutId);
      
      if (!layoutToDelete) {
        toast.error({
          title: "Layout Not Found",
          description: "The layout you're trying to delete doesn't exist",
        });
        return false;
      }
      
      const updatedLayouts = layouts.filter(layout => layout.id !== layoutId);
      setLayouts(updatedLayouts);
      persistLayouts(updatedLayouts);
      
      toast({
        title: "Layout Deleted",
        description: `'${layoutToDelete.name}' has been deleted`,
      });
      
      return true;
    } catch (error) {
      console.error('Error deleting layout:', error);
      toast.error({
        title: "Delete Failed",
        description: "There was an error deleting your layout",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [layouts, persistLayouts]);
  
  // Apply a layout
  const applyLayout = useCallback((layoutId: string): boolean => {
    try {
      const layoutToApply = layouts.find(layout => layout.id === layoutId);
      
      if (!layoutToApply) {
        toast.error({
          title: "Layout Not Found",
          description: "The layout you're trying to apply doesn't exist",
        });
        return false;
      }
      
      // Logic to apply the layout will be handled by the parent component
      // This function just validates the layout exists and returns true/false
      
      toast({
        title: "Layout Applied",
        description: `'${layoutToApply.name}' has been applied to your dashboard`,
      });
      
      return true;
    } catch (error) {
      console.error('Error applying layout:', error);
      toast.error({
        title: "Apply Failed",
        description: "There was an error applying the layout",
      });
      return false;
    }
  }, [layouts]);
  
  // Create a default layout
  const createDefaultLayout = useCallback((widgets: WidgetId[]) => {
    if (layouts.length === 0 && user) {
      saveLayout("Default Layout", widgets, true);
    }
  }, [layouts, user, saveLayout]);
  
  return {
    layouts,
    saveLayout,
    updateLayout,
    deleteLayout,
    applyLayout,
    isLoading,
    createDefaultLayout
  };
};
