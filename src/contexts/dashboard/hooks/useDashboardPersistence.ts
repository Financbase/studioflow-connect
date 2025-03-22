
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { WidgetId, ViewMode } from '../types';
import { toast } from '@/hooks/use-toast';

export const useDashboardPersistence = (userId?: string, viewMode?: ViewMode, widgets?: WidgetId[], customLayout?: WidgetId[]) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const saveDashboardSettings = async (
    widgets: WidgetId[],
    viewMode: ViewMode,
    customLayout: WidgetId[]
  ) => {
    setIsUpdating(true);
    
    try {
      const user = supabase.auth.getUser();
      if (!user) {
        throw new Error('No user logged in');
      }
      
      // Using the actual column names that exist in the database
      const { error } = await supabase
        .from('dashboard_settings')
        .upsert({
          user_id: (await user).data.user?.id,
          view_mode: viewMode,
          custom_layout: customLayout,
          collapsed_widgets: [], // Default value for collapsed widgets
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' });
        
      if (error) {
        throw error;
      }
      
      console.info('Dashboard settings saved successfully');
      return true;
    } catch (error: any) {
      console.error('Error saving dashboard settings:', error);
      
      // Don't show error toast for non-critical functionality
      // Instead, just save to localStorage as fallback
      try {
        localStorage.setItem('studioflow_widgets', JSON.stringify(widgets));
        localStorage.setItem('studioflow_view_mode', JSON.stringify(viewMode));
        localStorage.setItem('studioflow_custom_layout', JSON.stringify(customLayout));
      } catch (storageError) {
        console.warn('Could not save to localStorage:', storageError);
      }
      
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  const loadDashboardSettings = async () => {
    try {
      const user = supabase.auth.getUser();
      if (!user) {
        return null;
      }
      
      const { data, error } = await supabase
        .from('dashboard_settings')
        .select('view_mode, custom_layout, collapsed_widgets') // Use correct column names
        .eq('user_id', (await user).data.user?.id)
        .single();
        
      if (error) {
        throw error;
      }
      
      if (!data) {
        return null;
      }
      
      return {
        widgets: data.custom_layout as WidgetId[], // Use the custom_layout as widgets
        viewMode: data.view_mode as ViewMode,
        customLayout: data.custom_layout as WidgetId[],
        collapsedWidgets: data.collapsed_widgets as WidgetId[]
      };
    } catch (error: any) {
      console.warn('Error loading dashboard settings:', error);
      return null;
    }
  };
  
  // Add helper methods to simplify usage from DashboardProvider
  const saveDashboard = useCallback((widgets: WidgetId[], viewMode: ViewMode, customLayout: WidgetId[]) => {
    return saveDashboardSettings(widgets, viewMode, customLayout);
  }, []);
  
  const resetDashboard = useCallback(() => {
    // This is a stub - the actual reset is handled in the DashboardProvider
    console.log('Dashboard reset requested');
  }, []);
  
  return {
    saveDashboardSettings,
    loadDashboardSettings,
    saveDashboard,
    resetDashboard,
    isUpdating
  };
};
