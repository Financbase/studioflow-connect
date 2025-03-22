
import { useContext } from 'react';
import { DashboardContext } from './DashboardProvider';
import { WidgetId, ViewMode, DashboardContextType } from './types';
import { toast } from '@/hooks/use-toast';

/**
 * Custom hook for accessing and managing dashboard context.
 * This hook provides access to all dashboard functionalities including widget management,
 * view modes, and subscription features, with enhanced error handling.
 * 
 * @returns {DashboardContextType} The dashboard context value
 * @throws Error if used outside of a DashboardProvider
 */
export const useDashboard = (): DashboardContextType => {
  const context = useContext(DashboardContext);
  
  if (!context) {
    const errorMessage = 'useDashboard must be used within a DashboardProvider';
    toast({
      title: "Dashboard Error",
      description: errorMessage,
      variant: "destructive"
    });
    throw new Error(errorMessage);
  }
  
  return context;
};

export default useDashboard;
