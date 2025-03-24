
import { useState, useCallback, useEffect } from 'react';
import { WidgetId } from '../types';
import { useDashboard } from '../useDashboard';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { SavedLayout } from '@/components/custom-layout/types';

/**
 * Hook for managing saved dashboard layouts
 */
export const useSavedLayouts = () => {
  const { user } = useAuth();
  const { setWidgetLayout } = useDashboard();
  const [layouts, setLayouts] = useState<SavedLayout[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeLayoutId, setActiveLayoutId] = useState<string | null>(null);

  // Load saved layouts from Supabase
  const loadSavedLayouts = useCallback(async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('saved_layouts')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      // Transform and set layouts
      const savedLayouts = data.map(layout => ({
        id: layout.id,
        name: layout.name,
        widgets: layout.widgets as WidgetId[],
        isDefault: layout.is_default,
        createdAt: layout.created_at
      }));
      
      setLayouts(savedLayouts);
      
      // Find and activate default layout if any
      const defaultLayout = savedLayouts.find(layout => layout.isDefault);
      if (defaultLayout) {
        setActiveLayoutId(defaultLayout.id);
      }
    } catch (error: any) {
      console.error('Error loading layouts:', error.message);
      toast.error({
        title: "Failed to load layouts",
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  }, [user]);
  
  // Load layouts on user change
  useEffect(() => {
    loadSavedLayouts();
  }, [loadSavedLayouts]);

  // Save a new layout to Supabase
  const saveLayout = useCallback(async (name: string, widgets: WidgetId[], isDefault: boolean = false) => {
    if (!user) {
      toast.error({
        title: "Authentication required",
        description: "You need to be logged in to save layouts"
      });
      return null;
    }
    
    setIsLoading(true);
    try {
      // If this is a default layout, first remove default status from other layouts
      if (isDefault) {
        await supabase
          .from('saved_layouts')
          .update({ is_default: false })
          .eq('user_id', user.id)
          .eq('is_default', true);
      }
      
      // Insert new layout
      const { data, error } = await supabase
        .from('saved_layouts')
        .insert({
          user_id: user.id,
          name,
          widgets: widgets,
          is_default: isDefault
        })
        .select()
        .single();
        
      if (error) throw error;
      
      // Create layout object and add to state
      const newLayout: SavedLayout = {
        id: data.id,
        name: data.name,
        widgets: data.widgets as WidgetId[],
        isDefault: data.is_default,
        createdAt: data.created_at
      };
      
      setLayouts(prev => [newLayout, ...prev]);
      
      // Set as active if it's default
      if (isDefault) {
        setActiveLayoutId(newLayout.id);
      }
      
      toast.default({
        title: "Layout saved",
        description: `Layout "${name}" has been saved successfully`
      });
      
      return newLayout;
    } catch (error: any) {
      console.error('Error saving layout:', error.message);
      toast.error({
        title: "Failed to save layout",
        description: error.message
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Update an existing layout
  const updateLayout = useCallback(async (layoutId: string, updates: Partial<SavedLayout>) => {
    if (!user) return false;
    
    setIsLoading(true);
    try {
      // Prepare update data
      const updateData: any = {};
      if (updates.name) updateData.name = updates.name;
      if (updates.widgets) updateData.widgets = updates.widgets;
      if (updates.isDefault !== undefined) updateData.is_default = updates.isDefault;
      
      // If setting as default, first remove default status from other layouts
      if (updates.isDefault) {
        await supabase
          .from('saved_layouts')
          .update({ is_default: false })
          .eq('user_id', user.id)
          .eq('is_default', true)
          .neq('id', layoutId);
      }
      
      // Update the layout
      const { error } = await supabase
        .from('saved_layouts')
        .update(updateData)
        .eq('id', layoutId);
        
      if (error) throw error;
      
      // Update local state
      setLayouts(prev => prev.map(layout => {
        if (layout.id === layoutId) {
          return { ...layout, ...updates };
        }
        return layout;
      }));
      
      // Update active layout if needed
      if (updates.isDefault) {
        setActiveLayoutId(layoutId);
      }
      
      toast.default({
        title: "Layout updated",
        description: "The layout has been updated successfully"
      });
      
      return true;
    } catch (error: any) {
      console.error('Error updating layout:', error.message);
      toast.error({
        title: "Failed to update layout",
        description: error.message
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Delete a layout
  const deleteLayout = useCallback(async (layoutId: string) => {
    if (!user) return false;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('saved_layouts')
        .delete()
        .eq('id', layoutId);
        
      if (error) throw error;
      
      // Update local state
      setLayouts(prev => prev.filter(layout => layout.id !== layoutId));
      
      // Reset active layout if needed
      if (activeLayoutId === layoutId) {
        setActiveLayoutId(null);
      }
      
      toast.default({
        title: "Layout deleted",
        description: "The layout has been deleted successfully"
      });
      
      return true;
    } catch (error: any) {
      console.error('Error deleting layout:', error.message);
      toast.error({
        title: "Failed to delete layout",
        description: error.message
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [user, activeLayoutId]);

  // Apply a saved layout
  const applyLayout = useCallback((layoutId: string) => {
    const layout = layouts.find(layout => layout.id === layoutId);
    if (!layout) {
      toast.error({
        title: "Layout not found",
        description: "The selected layout could not be found"
      });
      return false;
    }
    
    // Apply the layout widgets to the dashboard
    setWidgetLayout(layout.widgets);
    setActiveLayoutId(layoutId);
    
    toast.default({
      title: "Layout applied",
      description: `Layout "${layout.name}" has been applied`
    });
    
    return true;
  }, [layouts, setWidgetLayout]);

  // Create a default layout if none exists
  const createDefaultLayout = useCallback(async (widgets: WidgetId[]) => {
    if (!user || layouts.some(layout => layout.isDefault)) return;
    
    await saveLayout("Default Layout", widgets, true);
  }, [user, layouts, saveLayout]);

  return {
    layouts,
    isLoading,
    activeLayoutId,
    saveLayout,
    updateLayout,
    deleteLayout,
    applyLayout,
    createDefaultLayout,
    loadSavedLayouts
  };
};
