
import React from "react";
import { Panel } from "@/components/ui/panel";
import { useTheme } from "@/contexts/ThemeContext";
import WidgetSection from "@/components/WidgetSection";
import { WidgetId } from "@/contexts/dashboard";

interface DashboardWidgetProps {
  id: WidgetId;
  title: string;
  isPremiumFeature?: boolean;
  children: React.ReactNode;
}

/**
 * A consistent wrapper for dashboard widgets that handles the proper styling
 * and presentation of each widget section.
 */
const DashboardWidget = ({ id, title, isPremiumFeature = false, children }: DashboardWidgetProps) => {
  const { themeVariant } = useTheme();
  
  const isElevated = themeVariant === "classic" || themeVariant === "windows";
  
  return (
    <WidgetSection id={id} title={title} isPremiumFeature={isPremiumFeature}>
      <Panel 
        variant={isElevated ? "elevated" : "default"}
        className="dashboard-widget-panel bg-card/80 backdrop-blur-sm overflow-hidden"
      >
        <div className="p-4 md:p-6">
          {children}
        </div>
      </Panel>
    </WidgetSection>
  );
};

export default DashboardWidget;
