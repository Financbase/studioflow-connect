
import { useState, useEffect, useCallback } from 'react';
import { ViewMode, WidgetId, defaultVisibleWidgets, PricingTier } from '../types';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/hooks/use-toast';

interface ViewModeOptions {
  persistToStorage?: boolean;
  showToastOnChange?: boolean;
}

/**
 * Hook for managing view modes with enhanced browser/device detection
 * and improved persistence
 */
export const useViewMode = (options: ViewModeOptions = {}) => {
  const { 
    persistToStorage = true,
    showToastOnChange = true 
  } = options;
  
  const isMobile = useIsMobile();
  const storageKey = 'studioflow_view_mode';
  
  // View mode state - default to mobile if on mobile device
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    if (isMobile) return 'mobile';
    
    if (persistToStorage) {
      try {
        // Try to load from localStorage first
        const savedViewMode = localStorage.getItem(storageKey);
        if (savedViewMode) {
          const parsedMode = JSON.parse(savedViewMode) as ViewMode;
          // Validate the saved mode is a valid ViewMode
          if (['simple', 'advanced', 'custom', 'mobile'].includes(parsedMode)) {
            return parsedMode;
          }
        }
      } catch (err) {
        console.error('Error loading view mode from storage:', err);
      }
    }
    
    // Default fallback
    return 'advanced';
  });
  
  // Update view mode when mobile status changes
  useEffect(() => {
    if (isMobile && viewMode !== 'mobile') {
      setViewMode('mobile');
    }
  }, [isMobile, viewMode]);

  // Save view mode to localStorage when it changes
  useEffect(() => {
    if (persistToStorage) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(viewMode));
      } catch (err) {
        console.warn('Could not save view mode to localStorage:', err);
      }
    }
  }, [viewMode, persistToStorage]);

  // Update view mode with notification
  const updateViewMode = useCallback((newMode: ViewMode) => {
    if (newMode === viewMode) return;
    
    setViewMode(newMode);
    
    if (showToastOnChange) {
      toast({
        title: "View Changed",
        description: `Dashboard view set to ${newMode}`,
      });
    }
  }, [viewMode, showToastOnChange]);

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
    setViewMode: updateViewMode,
    isWidgetVisible,
    isMobileView: viewMode === 'mobile'
  };
};
