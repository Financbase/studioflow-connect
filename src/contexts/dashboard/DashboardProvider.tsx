
import React, { createContext, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useWidgets } from './hooks/useWidgets';
import { useViewMode } from './hooks/useViewMode';
import { useDashboardPersistence } from './hooks/useDashboardPersistence';
import { usePricingTier } from './hooks/usePricingTier';
import { WidgetId, ViewMode } from './types';

interface DashboardContextType {
  widgets: WidgetId[];
  addWidget: (widget: WidgetId) => void;
  removeWidget: (widget: WidgetId) => void;
  moveWidget: (fromIndex: number, toIndex: number) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  customLayout: WidgetId[];
  setCustomLayout: (layout: WidgetId[]) => void;
  saveDashboard: () => Promise<void>;
  resetDashboard: () => void;
  pricingTier: ReturnType<typeof usePricingTier>["pricingTier"];
  setPricingTier: ReturnType<typeof usePricingTier>["setPricingTier"];
  isUpdating: boolean;
  hasFeatureAccess: (widget: WidgetId) => boolean;
  featureAccess: ReturnType<typeof usePricingTier>["featureAccess"];
}

export const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, profile } = useAuth();
  const { pricingTier, setPricingTier, hasFeatureAccess, featureAccess, isUpdating } = usePricingTier(user, profile);
  const { viewMode, setViewMode } = useViewMode();
  const { widgets, addWidget, removeWidget, moveWidget, customLayout, setCustomLayout, resetWidgets } = useWidgets(viewMode, hasFeatureAccess);
  const { saveDashboard, resetDashboard } = useDashboardPersistence(user, viewMode, widgets, customLayout);
  
  // Console log to debug auth status
  useEffect(() => {
    if (user) {
      console.log('DashboardProvider: User is logged in', user.id);
    } else {
      console.log('DashboardProvider: No user is logged in');
    }
  }, [user]);
  
  // Listen for pricingTier changes
  useEffect(() => {
    console.log('PricingTier changed:', pricingTier);
  }, [pricingTier]);

  return (
    <DashboardContext.Provider
      value={{
        widgets,
        addWidget,
        removeWidget,
        moveWidget,
        viewMode, 
        setViewMode,
        customLayout,
        setCustomLayout,
        saveDashboard,
        resetDashboard: () => {
          resetWidgets();
          resetDashboard();
        },
        pricingTier,
        setPricingTier,
        isUpdating,
        hasFeatureAccess,
        featureAccess
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
