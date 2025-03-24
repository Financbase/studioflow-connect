
import React, { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";
import { useDashboard } from "@/contexts/dashboard";
import { WidgetId } from "@/contexts/dashboard/types";
import { toast } from "@/hooks/use-toast";
import { useTheme } from "@/contexts/ThemeContext";
import { useIsMobile } from "@/hooks/use-mobile";

import CustomLayoutTabs from "./CustomLayoutTabs";
import DialogActions from "./DialogActions";
import { SavedLayout } from "./types";

const CustomLayoutEditor = () => {
  const { customLayout, updateCustomLayout, featureAccess, pricingTier } = useDashboard();
  const { themeVariant } = useTheme();
  const isMobile = useIsMobile();
  
  const [selectedWidgets, setSelectedWidgets] = useState<WidgetId[]>(customLayout);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("widgets");
  const [layoutName, setLayoutName] = useState("My Custom Layout");
  
  const [savedLayouts, setSavedLayouts] = useState<SavedLayout[]>([
    {
      id: "default",
      name: "Default Layout",
      widgets: ["connect", "audio", "system"],
      isDefault: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "minimal",
      name: "Minimal Studio",
      widgets: ["connect", "audio"],
      createdAt: new Date().toISOString()
    }
  ]);
  
  const handleToggleWidget = (widgetId: WidgetId) => {
    setSelectedWidgets(prev => {
      if (prev.includes(widgetId)) {
        return prev.filter(id => id !== widgetId);
      } else {
        return [...prev, widgetId];
      }
    });
  };
  
  const handleSaveLayout = () => {
    if (selectedWidgets.length === 0) {
      toast.error({
        title: "Invalid Layout",
        description: "Please select at least one widget for your layout",
      });
      return;
    }
    
    updateCustomLayout(selectedWidgets);
    
    if (pricingTier === 'pro' || pricingTier === 'enterprise') {
      const layoutExists = savedLayouts.some(layout => layout.name === layoutName);
      
      if (layoutExists) {
        setSavedLayouts(savedLayouts.map(layout => 
          layout.name === layoutName 
            ? { ...layout, widgets: selectedWidgets } 
            : layout
        ));
        
        toast.default({
          title: "Layout Updated",
          description: `The layout "${layoutName}" has been updated`
        });
      } else {
        const newLayout: SavedLayout = {
          id: `layout-${Date.now()}`,
          name: layoutName,
          widgets: selectedWidgets,
          createdAt: new Date().toISOString()
        };
        
        setSavedLayouts([...savedLayouts, newLayout]);
        
        toast.default({
          title: "Layout Saved",
          description: `New layout "${layoutName}" has been saved`
        });
      }
    } else {
      toast.default({
        title: "Layout Updated",
        description: "Your dashboard layout has been updated"
      });
    }
    
    setIsOpen(false);
  };
  
  const handleSelectSavedLayout = (layout: SavedLayout) => {
    setSelectedWidgets(layout.widgets);
    setLayoutName(layout.name);
    setActiveTab("widgets");
  };
  
  const handleDeleteLayout = (layoutId: string) => {
    setSavedLayouts(savedLayouts.filter(layout => layout.id !== layoutId));
    
    toast.default({
      title: "Layout Deleted",
      description: "The layout has been removed from your saved layouts"
    });
  };
  
  const canSaveMultipleLayouts = pricingTier === 'pro' || pricingTier === 'enterprise';
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size={isMobile ? "icon" : "sm"} className={isMobile ? "w-9 h-9 p-0" : "gap-2"}>
          <Settings2 className="h-4 w-4" />
          {!isMobile && "Customize"}
        </Button>
      </DialogTrigger>
      <DialogContent className={`${isMobile ? "w-[95vw] max-w-[95vw]" : "sm:max-w-[625px]"} ${themeVariant === "windows" ? "rounded-none" : ""}`}>
        <DialogHeader>
          <DialogTitle>Customize Dashboard</DialogTitle>
          <DialogDescription>
            Configure your studio dashboard to suit your workflow
          </DialogDescription>
        </DialogHeader>
        
        <CustomLayoutTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          layoutName={layoutName}
          onLayoutNameChange={setLayoutName}
          canSaveMultipleLayouts={canSaveMultipleLayouts}
          pricingTier={pricingTier}
          widgets={Object.keys(featureAccess) as WidgetId[]}
          selectedWidgets={selectedWidgets}
          featureAccess={featureAccess}
          onToggleWidget={handleToggleWidget}
          savedLayouts={savedLayouts}
          onSelectSavedLayout={handleSelectSavedLayout}
          onDeleteLayout={handleDeleteLayout}
        />
        
        <DialogActions
          onCancel={() => setIsOpen(false)}
          onSave={handleSaveLayout}
          activeTab={activeTab}
          canSaveMultipleLayouts={canSaveMultipleLayouts}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CustomLayoutEditor;
