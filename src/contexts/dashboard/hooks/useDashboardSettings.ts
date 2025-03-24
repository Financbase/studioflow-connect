
import { useCallback } from 'react';
import { PricingTier, ViewMode, WidgetId } from '../types';
import { useDashboard } from '../useDashboard';

/**
 * Hook for managing dashboard settings and preferences
 */
export const useDashboardSettings = () => {
  const dashboard = useDashboard();
  
  // Extract only the settings-related properties
  const { 
    viewMode,
    setViewMode,
    pricingTier,
    hasFeatureAccess,
    featureAccess,
    resetDashboard,
  } = dashboard;
  
  return {
    viewMode,
    setViewMode,
    pricingTier,
    setPricingTier: dashboard.setPricingTier,
    hasFeatureAccess,
    featureAccess,
    resetDashboard,
    isUpdating: dashboard.isUpdating
  };
};
