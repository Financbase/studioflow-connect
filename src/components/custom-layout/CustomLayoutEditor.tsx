
import React, { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Settings2, Save } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useDashboard } from "@/contexts/dashboard";
import { WidgetId } from "@/contexts/dashboard/types";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useIsMobile } from "@/hooks/use-mobile";

// Import our newly created components
import WidgetList from "./WidgetList";
import SavedLayouts from "./SavedLayouts";
import LayoutNameInput from "./LayoutNameInput";
import ProFeatures from "./ProFeatures";
import { SavedLayout } from "./types";

const CustomLayoutEditor = () => {
  const { customLayout, updateCustomLayout, featureAccess, pricingTier } = useDashboard();
  const { t } = useLanguage();
  const { themeVariant } = useTheme();
  const { isMobile } = useIsMobile();
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
      toast.destructive({
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
        
        <Tabs defaultValue="widgets" value={activeTab} onValueChange={setActiveTab}>
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
              onLayoutNameChange={setLayoutName}
              canSaveMultipleLayouts={canSaveMultipleLayouts}
              pricingTier={pricingTier}
            />
            
            <Separator />
            
            <WidgetList 
              widgets={Object.keys(featureAccess) as WidgetId[]}
              selectedWidgets={selectedWidgets}
              featureAccess={featureAccess}
              pricingTier={pricingTier}
              onToggleWidget={handleToggleWidget}
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
                onSelectSavedLayout={handleSelectSavedLayout}
                onDeleteLayout={handleDeleteLayout}
              />
              
              <Separator />
              
              <ProFeatures />
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className={isMobile ? "flex-col space-y-2" : ""}>
          <Button variant="outline" onClick={() => setIsOpen(false)} className={isMobile ? "w-full" : ""}>
            Cancel
          </Button>
          <Button onClick={handleSaveLayout} className={`${isMobile ? "w-full" : ""} gap-2`}>
            <Save className="h-4 w-4" />
            {activeTab === "layouts" && canSaveMultipleLayouts ? "Save New Layout" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomLayoutEditor;
