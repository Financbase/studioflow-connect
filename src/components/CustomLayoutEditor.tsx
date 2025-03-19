
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
import { Settings2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useDashboard, WidgetId } from "@/contexts/DashboardContext";
import { toast } from "@/components/ui/use-toast";

const widgetLabels: Record<WidgetId, string> = {
  system: "System Monitor",
  vm: "VM Controller",
  daw: "DAW Workflow",
  audio: "Audio Analyzer",
  ai: "AI Tools",
  marketplace: "Marketplace"
};

const CustomLayoutEditor = () => {
  const { customLayout, updateCustomLayout, featureAccess } = useDashboard();
  const [selectedWidgets, setSelectedWidgets] = useState<WidgetId[]>(customLayout);
  const [isOpen, setIsOpen] = useState(false);
  
  const handleToggleWidget = (widgetId: WidgetId) => {
    setSelectedWidgets(prev => {
      if (prev.includes(widgetId)) {
        return prev.filter(id => id !== widgetId);
      } else {
        return [...prev, widgetId];
      }
    });
  };
  
  const handleSave = () => {
    if (selectedWidgets.length === 0) {
      toast({
        title: "Invalid Layout",
        description: "You must select at least one widget",
        variant: "destructive"
      });
      return;
    }
    
    updateCustomLayout(selectedWidgets);
    setIsOpen(false);
    toast({
      title: "Layout Updated",
      description: "Your custom dashboard layout has been saved"
    });
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings2 className="h-4 w-4" />
          Customize Layout
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Customize Dashboard</DialogTitle>
          <DialogDescription>
            Select which widgets to display in your custom dashboard view.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {(Object.keys(widgetLabels) as WidgetId[]).map((widgetId) => {
            const hasAccess = featureAccess[widgetId];
            
            return (
              <div key={widgetId} className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <Label htmlFor={`widget-${widgetId}`} className="flex items-center gap-2">
                    {widgetLabels[widgetId]}
                    {!hasAccess && (
                      <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">
                        Pro Feature
                      </span>
                    )}
                  </Label>
                </div>
                <Switch
                  id={`widget-${widgetId}`}
                  checked={selectedWidgets.includes(widgetId)}
                  onCheckedChange={() => handleToggleWidget(widgetId)}
                  disabled={!hasAccess}
                />
              </div>
            );
          })}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomLayoutEditor;
