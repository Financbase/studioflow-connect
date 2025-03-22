
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { WidgetId, ViewMode } from '../types';
import { toast } from '@/hooks/use-toast';

// Default widget configurations
const DEFAULT_WIDGETS: WidgetId[] = ['connect', 'system', 'audio', 'ai', 'vm', 'daw', 'marketplace'];
const DEFAULT_CUSTOM_LAYOUT: WidgetId[] = ['connect', 'system', 'audio', 'ai'];

export const useWidgets = (viewMode: ViewMode, hasFeatureAccess: (widget: WidgetId) => boolean) => {
  // Widget state
  const [widgets, setWidgets] = useState<WidgetId[]>(DEFAULT_WIDGETS);
  
  // Collapsed widgets state
  const [collapsedWidgets, setCollapsedWidgets] = useState<WidgetId[]>([]);
  
  // Custom layout state
  const [customLayout, setCustomLayout] = useState<WidgetId[]>(DEFAULT_CUSTOM_LAYOUT);

  // Initialize widgets from localStorage if available
  useEffect(() => {
    try {
      const savedWidgets = localStorage.getItem('studioflow_widgets');
      const savedCollapsed = localStorage.getItem('studioflow_collapsed_widgets');
      const savedCustomLayout = localStorage.getItem('studioflow_custom_layout');
      
      if (savedWidgets) {
        setWidgets(JSON.parse(savedWidgets));
      }
      
      if (savedCollapsed) {
        setCollapsedWidgets(JSON.parse(savedCollapsed));
      }
      
      if (savedCustomLayout) {
        setCustomLayout(JSON.parse(savedCustomLayout));
      }
    } catch (err) {
      console.warn('Error loading widget settings from localStorage:', err);
    }
  }, []);
  
  // Save widget states to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('studioflow_widgets', JSON.stringify(widgets));
      localStorage.setItem('studioflow_collapsed_widgets', JSON.stringify(collapsedWidgets));
      localStorage.setItem('studioflow_custom_layout', JSON.stringify(customLayout));
    } catch (err) {
      console.warn('Error saving widget settings to localStorage:', err);
    }
  }, [widgets, collapsedWidgets, customLayout]);

  // Add a widget to the dashboard
  const addWidget = useCallback((widget: WidgetId) => {
    if (!hasFeatureAccess(widget)) {
      toast({
        title: "Feature Access Required",
        description: "Please upgrade your plan to access this widget",
        variant: "destructive"
      });
      return;
    }
    
    setWidgets(prev => {
      if (prev.includes(widget)) {
        return prev;
      }
      return [...prev, widget];
    });
    
    // Also add to custom layout if using custom view
    if (viewMode === 'custom') {
      setCustomLayout(prev => {
        if (prev.includes(widget)) {
          return prev;
        }
        return [...prev, widget];
      });
    }
    
    toast({
      title: "Widget Added",
      description: `The widget has been added to your dashboard`,
    });
  }, [hasFeatureAccess, viewMode]);

  // Remove a widget from the dashboard
  const removeWidget = useCallback((widget: WidgetId) => {
    setWidgets(prev => prev.filter(w => w !== widget));
    
    // Also remove from custom layout
    setCustomLayout(prev => prev.filter(w => w !== widget));
    
    // Remove from collapsed state if it exists
    setCollapsedWidgets(prev => prev.filter(w => w !== widget));
    
    toast({
      title: "Widget Removed",
      description: `The widget has been removed from your dashboard`,
    });
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
    setWidgets(DEFAULT_WIDGETS);
    setCollapsedWidgets([]);
    setCustomLayout(DEFAULT_CUSTOM_LAYOUT);
    
    toast({
      title: "Dashboard Reset",
      description: "Your widget settings have been reset to default",
    });
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
