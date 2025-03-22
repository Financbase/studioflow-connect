
import React from "react";
import { Button } from "@/components/ui/button";
import { CustomLayoutEditor } from "@/components/custom-layout";
import { PlusCircle, RefreshCw, SlidersHorizontal, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDashboard } from "@/contexts/dashboard";
import { toast } from "@/hooks/use-toast";
import { WidgetId } from "@/contexts/dashboard/types";
import { useTheme } from "@/contexts/ThemeContext";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardActionsProps {
  onZenModeActivate?: () => void;
}

const DashboardActions: React.FC<DashboardActionsProps> = ({ onZenModeActivate }) => {
  const navigate = useNavigate();
  const { hasFeatureAccess, resetDashboard } = useDashboard();
  const { themeVariant } = useTheme();
  const isMobile = useIsMobile();
  
  const handleNavigate = (path: string, featureId?: WidgetId) => {
    if (featureId && !hasFeatureAccess(featureId)) {
      toast({
        title: "Premium Feature",
        description: "Upgrade your plan to access this feature",
        variant: "destructive",
      });
      return;
    }
    navigate(path);
  };
  
  const handleResetDashboard = () => {
    resetDashboard();
    toast({
      title: "Dashboard Reset",
      description: "Your dashboard has been reset to default settings"
    });
  };
  
  return (
    <div className="flex items-center space-x-2">
      {!isMobile && (
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2"
          onClick={() => handleNavigate('/ai-tools', 'ai')}
        >
          <Zap className="h-4 w-4" />
          AI Assistant
        </Button>
      )}
      
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={() => handleNavigate('/projects')}
      >
        <PlusCircle className="h-4 w-4" />
        {isMobile ? "" : "New Project"}
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleResetDashboard}
        title="Reset Dashboard"
        className={isMobile ? "w-9 h-9 p-0" : ""}
      >
        <RefreshCw className="h-4 w-4" />
        {isMobile ? "" : "Reset"}
      </Button>
      
      {onZenModeActivate && (
        <Button 
          variant="default" 
          size={isMobile ? "icon" : "sm"} 
          onClick={onZenModeActivate}
          className={`${isMobile ? "w-9 h-9 p-0" : "gap-2"} ${themeVariant === "retro" ? "bg-accent text-accent-foreground hover:bg-accent/80" : ""}`}
        >
          <SlidersHorizontal className="h-4 w-4" />
          {!isMobile && "Zen Mode"}
        </Button>
      )}
      
      <CustomLayoutEditor />
    </div>
  );
};

export default DashboardActions;
