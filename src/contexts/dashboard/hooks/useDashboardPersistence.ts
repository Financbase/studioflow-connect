
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { WidgetId, ViewMode } from '../types';
import { toast } from '@/hooks/use-toast';

export const useDashboardPersistence = () => {
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
      
      // Instead of using 'widgets_list', let's use column names that actually exist
      // Based on the error, we'll use 'settings' instead as a JSON field
      const { error } = await supabase
        .from('dashboard_settings')
        .upsert({
          user_id: (await user).data.user?.id,
          settings: {
            widgets,
            viewMode,
            customLayout
          },
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' });
        
      if (error) {
        throw error;
      }
      
      console.info('Minimal dashboard settings saved successfully');
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
        .select('settings')
        .eq('user_id', (await user).data.user?.id)
        .single();
        
      if (error) {
        throw error;
      }
      
      if (!data || !data.settings) {
        return null;
      }
      
      return {
        widgets: data.settings.widgets as WidgetId[],
        viewMode: data.settings.viewMode as ViewMode,
        customLayout: data.settings.customLayout as WidgetId[]
      };
    } catch (error: any) {
      console.warn('Error loading dashboard settings:', error);
      return null;
    }
  };
  
  return {
    saveDashboardSettings,
    loadDashboardSettings,
    isUpdating
  };
};
