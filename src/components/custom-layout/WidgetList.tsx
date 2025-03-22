
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { WidgetId } from "@/contexts/dashboard/types";
import { getWidgetIcon, getWidgetLabel, getWidgetDescription } from "./utils";

interface WidgetListProps {
  widgets: WidgetId[];
  selectedWidgets: WidgetId[];
  featureAccess: Record<WidgetId, boolean>;
  pricingTier: string;
  onToggleWidget: (widgetId: WidgetId) => void;
}

const WidgetList = ({ 
  widgets, 
  selectedWidgets, 
  featureAccess, 
  pricingTier,
  onToggleWidget 
}: WidgetListProps) => {
  return (
    <div className="space-y-4">
      {widgets.map((widgetId) => {
        const hasAccess = featureAccess[widgetId];
        
        return (
          <div key={widgetId} className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor={`widget-${widgetId}`} className="flex items-center gap-2 text-foreground font-medium">
                  {getWidgetIcon(widgetId)}
                  {getWidgetLabel(widgetId)}
                  {!hasAccess && (
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">
                      {pricingTier === 'free' ? 'Premium' : 'Pro'}
                    </span>
                  )}
                </Label>
                <p className="text-xs text-muted-foreground pl-6">{getWidgetDescription(widgetId)}</p>
              </div>
              <Switch
                id={`widget-${widgetId}`}
                checked={selectedWidgets.includes(widgetId)}
                onCheckedChange={() => onToggleWidget(widgetId)}
                disabled={!hasAccess}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WidgetList;
