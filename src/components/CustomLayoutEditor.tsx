
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
import { useLanguage } from "@/contexts/LanguageContext";

const CustomLayoutEditor = () => {
  const { customLayout, updateCustomLayout, featureAccess } = useDashboard();
  const { t } = useLanguage();
  const [selectedWidgets, setSelectedWidgets] = useState<WidgetId[]>(customLayout);
  const [isOpen, setIsOpen] = useState(false);
  
  const getWidgetLabel = (widgetId: WidgetId): string => {
    const widgetLabelMap: Record<WidgetId, string> = {
      'system': 'widget.systemmonitor',
      'vm': 'widget.vmcontroller',
      'daw': 'widget.dawworkflow',
      'audio': 'widget.audioanalyzer',
      'ai': 'widget.aitools',
      'marketplace': 'widget.marketplace'
    };
    
    return t(widgetLabelMap[widgetId]);
  };
  
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
        title: t("toast.invalidlayout"),
        description: t("toast.selectatleastone"),
        variant: "destructive"
      });
      return;
    }
    
    updateCustomLayout(selectedWidgets);
    setIsOpen(false);
    toast({
      title: t("toast.layoutupdated"),
      description: t("toast.layoutsaved")
    });
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings2 className="h-4 w-4" />
          {t("button.customize")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("dialog.customdashboard")}</DialogTitle>
          <DialogDescription>
            {t("dialog.selectwidgets")}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {(Object.keys(featureAccess) as WidgetId[]).map((widgetId) => {
            const hasAccess = featureAccess[widgetId];
            
            return (
              <div key={widgetId} className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <Label htmlFor={`widget-${widgetId}`} className="flex items-center gap-2">
                    {getWidgetLabel(widgetId)}
                    {!hasAccess && (
                      <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">
                        {t("label.profeature")}
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
            {t("dialog.cancel")}
          </Button>
          <Button onClick={handleSave}>
            {t("dialog.save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomLayoutEditor;
