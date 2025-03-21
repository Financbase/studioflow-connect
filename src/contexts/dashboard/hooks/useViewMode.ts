
import { useState, useEffect } from 'react';
import { ViewMode, WidgetId, defaultVisibleWidgets } from '../types';

export const useViewMode = (isMobile: boolean, pricingTier: string) => {
  // View mode state - default to mobile if on mobile device
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    return isMobile ? 'mobile' : 'advanced'; // Default to advanced when not on mobile
  });
  
  // Update view mode when mobile status changes
  useEffect(() => {
    if (isMobile && viewMode !== 'mobile') {
      setViewMode('mobile');
    } else if (!isMobile && viewMode === 'mobile') {
      setViewMode('advanced');
    }
  }, [isMobile, viewMode]);

  // Determines if a widget should be visible based on current view mode
  const isWidgetVisible = (widgetId: WidgetId, customLayout: WidgetId[]): boolean => {
    // Always show all widgets for Pro users regardless of view mode
    if (pricingTier === 'pro') {
      return true;
    }
    
    if (viewMode === 'custom') {
      return customLayout.includes(widgetId);
    }
    return defaultVisibleWidgets[viewMode].includes(widgetId);
  };

  return {
    viewMode,
    setViewMode,
    isWidgetVisible
  };
};
