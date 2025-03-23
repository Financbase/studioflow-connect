
import React, { useEffect, useState } from "react";
import AnalyticsCard from "./AnalyticsCard";
import RecentActivityCard from "./RecentActivityCard";
import QuickActionsCard from "./QuickActionsCard";
import UsageStatsCard from "./UsageStatsCard";
import PlanInfoCard from "./PlanInfoCard";
import { useDashboard } from "@/contexts/dashboard";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { WidgetId } from "@/contexts/dashboard/types";

const MainDashboardContent = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const { hasFeatureAccess } = useDashboard();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

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

  const handleViewAnalytics = () => {
    navigate('/analytics');
  };

  const handleViewActivity = () => {
    navigate('/activity');
  };

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Activity and Charts Section */}
      <div className="lg:col-span-2 space-y-6">
        <AnalyticsCard onViewMore={handleViewAnalytics} />
        <RecentActivityCard onViewActivity={handleViewActivity} />
        
        {/* Knowledge Base Section */}
        <div className="bg-card border rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-medium">Knowledge Base</h3>
              <p className="text-sm text-muted-foreground">Access music production resources and tutorials</p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleNavigate('/support', 'ai')}
              className="gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              Explore Knowledge
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center p-3 rounded-md border bg-muted/50 hover:bg-muted cursor-pointer transition-colors" onClick={() => handleNavigate('/support')}>
              <div className="flex-1">
                <h4 className="font-medium">Studio Techniques</h4>
                <p className="text-xs text-muted-foreground">Recording, mixing, and mastering tutorials</p>
              </div>
            </div>
            <div className="flex items-center p-3 rounded-md border bg-muted/50 hover:bg-muted cursor-pointer transition-colors" onClick={() => handleNavigate('/support')}>
              <div className="flex-1">
                <h4 className="font-medium">Audio Troubleshooting</h4>
                <p className="text-xs text-muted-foreground">Common issues and solutions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Actions and Recommendations */}
      <div className="space-y-6">
        <QuickActionsCard />
        <UsageStatsCard />
        <PlanInfoCard />
      </div>
    </div>
  );
};

export default MainDashboardContent;
