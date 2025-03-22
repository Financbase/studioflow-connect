
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import LayoutNameInput from "./LayoutNameInput";
import WidgetList from "./WidgetList";
import SavedLayouts from "./SavedLayouts";
import ProFeatures from "./ProFeatures";
import { WidgetId } from "@/contexts/dashboard/types";
import { SavedLayout } from "./types";

interface CustomLayoutTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  layoutName: string;
  onLayoutNameChange: (name: string) => void;
  canSaveMultipleLayouts: boolean;
  pricingTier: string;
  widgets: WidgetId[];
  selectedWidgets: WidgetId[];
  featureAccess: Record<WidgetId, boolean>;
  onToggleWidget: (widgetId: WidgetId) => void;
  savedLayouts: SavedLayout[];
  onSelectSavedLayout: (layout: SavedLayout) => void;
  onDeleteLayout: (layoutId: string) => void;
}

const CustomLayoutTabs = ({
  activeTab,
  onTabChange,
  layoutName,
  onLayoutNameChange,
  canSaveMultipleLayouts,
  pricingTier,
  widgets,
  selectedWidgets,
  featureAccess,
  onToggleWidget,
  savedLayouts,
  onSelectSavedLayout,
  onDeleteLayout
}: CustomLayoutTabsProps) => {
  return (
    <Tabs defaultValue="widgets" value={activeTab} onValueChange={onTabChange}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="widgets">Widget Selection</TabsTrigger>
        <TabsTrigger 
          value="layouts" 
          disabled={!canSaveMultipleLayouts}
          className="relative"
        >
          Saved Layouts
          {!canSaveMultipleLayouts && (
            <Badge variant="outline" className="absolute -top-1 -right-1 text-[10px] px-1 py-0">
              Pro
            </Badge>
          )}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="widgets" className="space-y-4 py-4">
        <LayoutNameInput 
          layoutName={layoutName}
          onLayoutNameChange={onLayoutNameChange}
          canSaveMultipleLayouts={canSaveMultipleLayouts}
          pricingTier={pricingTier}
        />
        
        <Separator />
        
        <WidgetList 
          widgets={widgets}
          selectedWidgets={selectedWidgets}
          featureAccess={featureAccess}
          pricingTier={pricingTier}
          onToggleWidget={onToggleWidget}
        />
      </TabsContent>
      
      <TabsContent value="layouts" className="space-y-4 py-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium">Your Saved Layouts</h3>
            <Badge variant="secondary">Pro Feature</Badge>
          </div>
          
          <SavedLayouts 
            savedLayouts={savedLayouts}
            onSelectSavedLayout={onSelectSavedLayout}
            onDeleteLayout={onDeleteLayout}
          />
          
          <Separator />
          
          <ProFeatures />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default CustomLayoutTabs;
