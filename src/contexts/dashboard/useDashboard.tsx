
import { useContext } from 'react';
import { DashboardContext } from './DashboardProvider';
import { WidgetId } from './types';

/**
 * Custom hook for accessing and managing dashboard context.
 * This hook provides access to all dashboard functionalities including widget management,
 * view modes, and subscription features.
 */
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  
  return context;
};

export default useDashboard;
