
import { useCallback } from 'react';
import { PricingTier, ViewMode, WidgetId } from '../types';
import { useDashboard } from '../useDashboard';

/**
 * Hook for managing dashboard settings and preferences
 */
export const useDashboardSettings = () => {
  const { 
    viewMode,
    setViewMode,
    pricingTier,
    setPricingTier,
    hasFeatureAccess,
    featureAccess,
    resetDashboard,
    isUpdating
  } = useDashboard();
  
  return {
    viewMode,
    setViewMode,
    pricingTier,
    setPricingTier,
    hasFeatureAccess,
    featureAccess,
    resetDashboard,
    isUpdating
  };
};
