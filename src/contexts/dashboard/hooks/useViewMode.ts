
import { useState, useEffect, useCallback } from 'react';
import { ViewMode, WidgetId, defaultVisibleWidgets } from '../types';
import { useIsMobile } from '@/hooks/use-mobile';

export const useViewMode = () => {
  const isMobile = useIsMobile();
  
  // View mode state - default to mobile if on mobile device
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    return isMobile ? 'mobile' : 'advanced'; // Default to advanced when not on mobile
  });
  
  // Update view mode when mobile status changes
  useEffect(() => {
    if (isMobile && viewMode !== 'mobile') {
      setViewMode('mobile');
    }
  }, [isMobile, viewMode]);

  // Determines if a widget should be visible based on current view mode
  const isWidgetVisible = useCallback((widgetId: WidgetId, pricingTier: string, customLayout: WidgetId[]): boolean => {
    // Always show all widgets for Pro users regardless of view mode
    if (pricingTier === 'pro') {
      return true;
    }
    
    if (viewMode === 'custom') {
      return customLayout.includes(widgetId);
    }
    return defaultVisibleWidgets[viewMode].includes(widgetId);
  }, [viewMode]);

  return {
    viewMode,
    setViewMode,
    isWidgetVisible
  };
};
