
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';
import { WidgetId, ViewMode } from '../types';

export const useDashboardPersistence = (
  user: User | null,
  viewMode: ViewMode,
  customLayout: WidgetId[],
  collapsedWidgets: WidgetId[]
) => {
  // Save dashboard settings to Supabase when they change
  useEffect(() => {
    const saveDashboardSettings = async () => {
      if (user) {
        try {
          const { error } = await supabase
            .from('dashboard_settings')
            .upsert({
              user_id: user.id,
              view_mode: viewMode,
              custom_layout: customLayout,
              collapsed_widgets: collapsedWidgets,
              updated_at: new Date().toISOString()
            }, {
              onConflict: 'user_id'
            });
            
          if (error) {
            console.error('Error saving dashboard settings:', error);
          }
        } catch (err) {
          console.error('Error in saving dashboard settings:', err);
        }
      }
    };
    
    if (user) {
      saveDashboardSettings();
    }
  }, [viewMode, customLayout, collapsedWidgets, user]);
};
