
import React from "react";
import { 
  LayoutDashboard, 
  LayoutPanelTop, 
  Settings2,
  Lock
} from "lucide-react";
import { 
  ToggleGroup, 
  ToggleGroupItem 
} from "@/components/ui/toggle-group";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { useDashboard, ViewMode } from "@/contexts/DashboardContext";
import { toast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const ViewSelector = () => {
  const { viewMode, setViewMode, pricingTier } = useDashboard();
  const { t } = useLanguage();
  
  const handleViewChange = (value: string) => {
    if (value) {
      if (value === "custom" && pricingTier !== "pro") {
        toast({
          title: "Feature not available",
          description: "Custom layout is only available with the Pro plan",
          variant: "destructive"
        });
        return;
      }
      
      setViewMode(value as ViewMode);
      toast({
        title: "View Changed",
        description: `Dashboard view set to ${value}`,
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground mr-2">{t("label.dashboardview")}:</span>
      <ToggleGroup type="single" value={viewMode} onValueChange={handleViewChange}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem value="simple" aria-label="Simple View">
                <LayoutDashboard className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">{t("view.simple")}</span>
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t("tooltips.simpleview")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem value="advanced" aria-label="Advanced View">
                <LayoutPanelTop className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">{t("view.advanced")}</span>
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t("tooltips.advancedview")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem 
                value="custom" 
                aria-label="Custom View"
                disabled={pricingTier !== "pro"}
                className="relative"
              >
                <Settings2 className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">{t("view.custom")}</span>
                {pricingTier !== "pro" && (
                  <Lock className="h-3 w-3 absolute -top-1 -right-1" />
                )}
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent>
              <p>{pricingTier === "pro" 
                  ? t("tooltips.customview") 
                  : t("tooltips.proonly")}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </ToggleGroup>
    </div>
  );
};

export default ViewSelector;
