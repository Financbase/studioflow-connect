
import { useContext } from 'react';
import { DashboardContext } from './DashboardProvider';

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  
  const { 
    widgets, 
    addWidget, 
    removeWidget, 
    moveWidget,
    viewMode,
    setViewMode,
    customLayout,
    setCustomLayout,
    saveDashboard,
    resetDashboard,
    pricingTier,
    setPricingTier,
    isUpdating,
    hasFeatureAccess,
    featureAccess
  } = context;
  
  return {
    widgets,
    addWidget,
    removeWidget,
    moveWidget,
    viewMode,
    setViewMode,
    customLayout,
    setCustomLayout,
    saveDashboard,
    resetDashboard,
    pricingTier,
    setPricingTier,
    isUpdating,
    hasFeatureAccess,
    featureAccess
  };
};

export default useDashboard;
