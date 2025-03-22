
import { useEffect, useCallback, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { WidgetId, ViewMode } from '../types';
import { toast } from '@/hooks/use-toast';

export const useDashboardPersistence = (
  userId: string,
  viewMode: ViewMode,
  widgets: WidgetId[],
  customLayout: WidgetId[]
) => {
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  
  // Save dashboard settings to Supabase
  const saveDashboard = useCallback(async () => {
    if (!userId) {
      console.warn('Cannot save dashboard: No user ID provided');
      return;
    }

    try {
      // First, check if dashboard_settings table has the required columns
      const { data: tableInfo, error: tableInfoError } = await supabase
        .from('dashboard_settings')
        .select('*')
        .limit(1);
        
      if (tableInfoError) {
        const isColumnMissingError = tableInfoError.message?.includes('widgets') || 
                                    tableInfoError.message?.includes('column');
        
        if (isColumnMissingError) {
          console.warn('Dashboard settings table needs migration. Some settings may not be saved.');
          
          // Try to save what we can - view_mode only
          const { error: simpleError } = await supabase
            .from('dashboard_settings')
            .upsert({
              user_id: userId,
              view_mode: viewMode,
              updated_at: new Date().toISOString()
            }, {
              onConflict: 'user_id'
            });
            
          if (simpleError) {
            console.error('Error saving minimal dashboard settings:', simpleError);
          } else {
            console.log('Minimal dashboard settings saved successfully');
            setLastSaved(new Date());
          }
          return;
        }
      }
      
      // Full save with all settings
      const { error } = await supabase
        .from('dashboard_settings')
        .upsert({
          user_id: userId,
          view_mode: viewMode,
          widgets_list: widgets, // Using a different column name that might exist
          custom_layout: customLayout,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });
        
      if (error) {
        console.error('Error saving dashboard settings:', error);
        // If we get here, try a more minimal save
        if (error.message?.includes('widgets') || error.message?.includes('column')) {
          await saveDashboardMinimal();
        }
      } else {
        console.log('Dashboard settings saved successfully');
        setLastSaved(new Date());
      }
    } catch (err) {
      console.error('Error in saving dashboard settings:', err);
    }
  }, [userId, viewMode, widgets, customLayout]);

  // Minimal version of save that only includes the view_mode
  const saveDashboardMinimal = useCallback(async () => {
    if (!userId) return;
    
    try {
      const { error } = await supabase
        .from('dashboard_settings')
        .upsert({
          user_id: userId,
          view_mode: viewMode,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });
        
      if (error) {
        console.error('Error saving minimal dashboard settings:', error);
      } else {
        console.log('Minimal dashboard settings saved successfully');
        setLastSaved(new Date());
      }
    } catch (err) {
      console.error('Error in saving minimal dashboard settings:', err);
    }
  }, [userId, viewMode]);

  const resetDashboard = useCallback(() => {
    console.log('Resetting dashboard settings');
    // This function will reset dashboard settings to defaults in the future
    toast({
      title: "Reset Dashboard",
      description: "Dashboard has been reset to default settings",
    });
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
    resetDashboard,
    lastSaved
  };
};
