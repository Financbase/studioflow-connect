
import React, { createContext, useContext, useState } from 'react';

export type WidgetId = 'system' | 'audio' | 'ai' | 'vm' | 'daw' | 'marketplace' | 'connect';

interface DashboardContextType {
  collapsedWidgets: WidgetId[];
  toggleWidget: (widgetId: WidgetId) => void;
  isWidgetCollapsed: (widgetId: WidgetId) => boolean;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsedWidgets, setCollapsedWidgets] = useState<WidgetId[]>([]);

  const toggleWidget = (widgetId: WidgetId) => {
    setCollapsedWidgets(prev => {
      if (prev.includes(widgetId)) {
        return prev.filter(id => id !== widgetId);
      } else {
        return [...prev, widgetId];
      }
    });
  };

  const isWidgetCollapsed = (widgetId: WidgetId) => {
    return collapsedWidgets.includes(widgetId);
  };

  return (
    <DashboardContext.Provider value={{ collapsedWidgets, toggleWidget, isWidgetCollapsed }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
