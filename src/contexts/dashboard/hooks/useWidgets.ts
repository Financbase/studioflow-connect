
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { WidgetId, ViewMode } from '../types';

export const useWidgets = (viewMode: ViewMode, hasFeatureAccess: (widget: WidgetId) => boolean) => {
  // Widget state
  const [widgets, setWidgets] = useState<WidgetId[]>([
    'connect', 'system', 'audio', 'ai', 'vm', 'daw', 'marketplace'
  ]);
  
  // Collapsed widgets state
  const [collapsedWidgets, setCollapsedWidgets] = useState<WidgetId[]>([]);
  
  // Custom layout state
  const [customLayout, setCustomLayout] = useState<WidgetId[]>([
    'connect', 'system', 'audio', 'ai', 'vm', 'daw', 'marketplace'
  ]);

  // Add a widget to the dashboard
  const addWidget = useCallback((widget: WidgetId) => {
    setWidgets(prev => {
      if (prev.includes(widget)) {
        return prev;
      }
      return [...prev, widget];
    });
  }, []);

  // Remove a widget from the dashboard
  const removeWidget = useCallback((widget: WidgetId) => {
    setWidgets(prev => prev.filter(w => w !== widget));
  }, []);

  // Move a widget in the dashboard
  const moveWidget = useCallback((fromIndex: number, toIndex: number) => {
    setWidgets(prev => {
      const result = [...prev];
      const [removed] = result.splice(fromIndex, 1);
      result.splice(toIndex, 0, removed);
      return result;
    });
  }, []);

  // Reset widgets to default
  const resetWidgets = useCallback(() => {
    setWidgets(['connect', 'system', 'audio', 'ai', 'vm', 'daw', 'marketplace']);
    setCollapsedWidgets([]);
    setCustomLayout(['connect', 'system', 'audio', 'ai', 'vm', 'daw', 'marketplace']);
  }, []);

  // Toggle widget collapse state
  const toggleWidget = useCallback((widgetId: WidgetId) => {
    setCollapsedWidgets(prev => {
      if (prev.includes(widgetId)) {
        return prev.filter(id => id !== widgetId);
      } else {
        return [...prev, widgetId];
      }
    });
  }, []);
  
  // Check if widget is collapsed
  const isWidgetCollapsed = useCallback((widgetId: WidgetId) => {
    return collapsedWidgets.includes(widgetId);
  }, [collapsedWidgets]);

  return {
    widgets,
    addWidget,
    removeWidget,
    moveWidget,
    customLayout,
    setCustomLayout,
    resetWidgets,
    collapsedWidgets,
    toggleWidget,
    isWidgetCollapsed
  };
};
