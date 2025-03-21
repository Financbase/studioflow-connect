
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';
import { WidgetId } from '../types';

export const useWidgets = (user: User | null, isMobile: boolean) => {
  // Collapsed widgets state
  const [collapsedWidgets, setCollapsedWidgets] = useState<WidgetId[]>([]);
  
  // Custom layout state
  const [customLayout, setCustomLayout] = useState<WidgetId[]>([
    'connect', 'system', 'audio', 'ai', 'vm', 'daw', 'marketplace'
  ]);

  // Load widget settings from Supabase
  useEffect(() => {
    const loadWidgetSettings = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('dashboard_settings')
            .select('*')
            .eq('user_id', user.id)
            .single();
            
          if (error && error.code !== 'PGRST116') {
            console.error('Error loading dashboard settings:', error);
            return;
          }
          
          if (data) {
            // Set custom layout from database
            if (data.custom_layout && Array.isArray(data.custom_layout)) {
              setCustomLayout(data.custom_layout as WidgetId[]);
            }
            
            // Set collapsed widgets from database
            if (data.collapsed_widgets && Array.isArray(data.collapsed_widgets)) {
              setCollapsedWidgets(data.collapsed_widgets as WidgetId[]);
            }
          }
        } catch (err) {
          console.error('Error in loading widget settings:', err);
        }
      }
    };
    
    loadWidgetSettings();
  }, [user]);

  // Toggle widget collapse state
  const toggleWidget = (widgetId: WidgetId) => {
    setCollapsedWidgets(prev => {
      if (prev.includes(widgetId)) {
        return prev.filter(id => id !== widgetId);
      } else {
        return [...prev, widgetId];
      }
    });
  };
  
  // Check if widget is collapsed
  const isWidgetCollapsed = (widgetId: WidgetId) => {
    return collapsedWidgets.includes(widgetId);
  };
  
  // Update custom layout
  const updateCustomLayout = (widgets: WidgetId[]) => {
    setCustomLayout(widgets);
  };

  return {
    collapsedWidgets,
    customLayout,
    toggleWidget,
    isWidgetCollapsed,
    updateCustomLayout
  };
};
