
import { useState, useEffect, useCallback } from 'react';
import { ViewMode, WidgetId, defaultVisibleWidgets, PricingTier } from '../types';
import { useIsMobile } from '@/hooks/use-mobile';

export const useViewMode = () => {
  const isMobile = useIsMobile();
  
  // View mode state - default to mobile if on mobile device
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    try {
      // Try to load from localStorage first
      const savedViewMode = localStorage.getItem('studioflow_view_mode');
      if (savedViewMode) {
        const parsedMode = JSON.parse(savedViewMode) as ViewMode;
        // Validate the saved mode is a valid ViewMode
        if (['simple', 'advanced', 'custom', 'mobile'].includes(parsedMode)) {
          // If we're on mobile, force mobile view regardless of saved preference
          return isMobile ? 'mobile' : parsedMode;
        }
      }
    } catch (err) {
      console.error('Error loading view mode from storage:', err);
    }
    
    // Default fallback
    return isMobile ? 'mobile' : 'advanced';
  });
  
  // Update view mode when mobile status changes
  useEffect(() => {
    if (isMobile && viewMode !== 'mobile') {
      setViewMode('mobile');
    }
  }, [isMobile, viewMode]);

  // Save view mode to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem('studioflow_view_mode', JSON.stringify(viewMode));
    } catch (err) {
      console.warn('Could not save view mode to localStorage:', err);
    }
  }, [viewMode]);

  // Determines if a widget should be visible based on current view mode
  const isWidgetVisible = useCallback((
    widgetId: WidgetId, 
    pricingTier: PricingTier, 
    customLayout: WidgetId[]
  ): boolean => {
    // Always show all widgets for Pro and Enterprise users regardless of view mode
    if (pricingTier === 'pro' || pricingTier === 'enterprise') {
      return true;
    }
    
    if (viewMode === 'custom') {
      return customLayout.includes(widgetId);
    }
    
    // Use the default widgets for the current view mode
    const visibleWidgets = defaultVisibleWidgets[viewMode] || defaultVisibleWidgets.simple;
    return visibleWidgets.includes(widgetId);
  }, [viewMode]);

  return {
    viewMode,
    setViewMode,
    isWidgetVisible
  };
};
