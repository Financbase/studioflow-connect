
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
      
      // Using 'dashboard_config' as JSON field instead of 'settings' which doesn't exist
      const { error } = await supabase
        .from('dashboard_settings')
        .upsert({
          user_id: (await user).data.user?.id,
          dashboard_config: { // Use the correct column name here
            widgets,
            viewMode,
            customLayout
          },
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
        .select('dashboard_config') // Use the correct column name here
        .eq('user_id', (await user).data.user?.id)
        .single();
        
      if (error) {
        throw error;
      }
      
      if (!data || !data.dashboard_config) {
        return null;
      }
      
      return {
        widgets: data.dashboard_config.widgets as WidgetId[],
        viewMode: data.dashboard_config.viewMode as ViewMode,
        customLayout: data.dashboard_config.customLayout as WidgetId[]
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
