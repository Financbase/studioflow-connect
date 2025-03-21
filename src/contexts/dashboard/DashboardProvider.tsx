
import React, { createContext } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/hooks/use-auth';
import { DashboardContextType } from './types';
import { useWidgets } from './hooks/useWidgets';
import { useViewMode } from './hooks/useViewMode';
import { usePricingTier } from './hooks/usePricingTier';
import { useDashboardPersistence } from './hooks/useDashboardPersistence';

// Create context with undefined initial value
const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Authentication and device detection
  const isMobile = useIsMobile();
  const { user, profile } = useAuth();
  
  // Use our custom hooks
  const { pricingTier, setPricingTier, hasFeatureAccess, featureAccess } = usePricingTier(user, profile);
  const { viewMode, setViewMode, isWidgetVisible: baseIsWidgetVisible } = useViewMode(isMobile, pricingTier);
  const { collapsedWidgets, customLayout, toggleWidget, isWidgetCollapsed, updateCustomLayout } = useWidgets(user, isMobile);
  
  // Save settings when they change
  useDashboardPersistence(user, viewMode, customLayout, collapsedWidgets);
  
  // Wrapper for isWidgetVisible to include customLayout
  const isWidgetVisible = (widgetId: any) => baseIsWidgetVisible(widgetId, customLayout);
  
  // Alias for toggleWidget for clearer API
  const toggleWidgetCollapse = toggleWidget;
  
  return (
    <DashboardContext.Provider 
      value={{ 
        collapsedWidgets, 
        toggleWidget, 
        isWidgetCollapsed,
        isWidgetVisible,
        hasFeatureAccess,
        toggleWidgetCollapse,
        viewMode,
        setViewMode,
        pricingTier,
        setPricingTier,
        customLayout,
        updateCustomLayout,
        featureAccess,
        isMobileView: isMobile
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export { DashboardContext };
