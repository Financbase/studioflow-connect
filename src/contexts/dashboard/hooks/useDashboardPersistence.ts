
import { useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { WidgetId, ViewMode } from '../types';

export const useDashboardPersistence = (
  userId: string,
  viewMode: ViewMode,
  widgets: WidgetId[],
  customLayout: WidgetId[]
) => {
  // Save dashboard settings to Supabase
  const saveDashboard = useCallback(async () => {
    if (!userId) {
      console.warn('Cannot save dashboard: No user ID provided');
      return;
    }

    try {
      const { error } = await supabase
        .from('dashboard_settings')
        .upsert({
          user_id: userId,
          view_mode: viewMode,
          widgets: widgets,
          custom_layout: customLayout,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });
        
      if (error) {
        console.error('Error saving dashboard settings:', error);
      } else {
        console.log('Dashboard settings saved successfully');
      }
    } catch (err) {
      console.error('Error in saving dashboard settings:', err);
    }
  }, [userId, viewMode, widgets, customLayout]);

  const resetDashboard = useCallback(() => {
    console.log('Resetting dashboard settings');
    // This function will be implemented to reset dashboard settings
  }, []);

  // Auto-save when settings change
  useEffect(() => {
    if (userId) {
      // Only auto-save if there's a valid user ID
      const saveTimeout = setTimeout(() => {
        saveDashboard();
      }, 1000); // Debounce for 1 second
      
      return () => clearTimeout(saveTimeout);
    }
  }, [viewMode, widgets, customLayout, userId, saveDashboard]);

  return {
    saveDashboard,
    resetDashboard
  };
};
