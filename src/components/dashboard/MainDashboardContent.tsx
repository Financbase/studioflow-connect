
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Settings, Activity, Users, RefreshCw, Calculator, Lightbulb, FileCog } from "lucide-react";
import { useLanguage } from "@/contexts/language";
import QuickOverview from "./QuickOverview";
import RecentActivityCard from "./RecentActivityCard";
import UsageStatsCard from "./UsageStatsCard";
import PlanInfoCard from "./PlanInfoCard";
import QuickActionsCard from "./QuickActionsCard";
import AnalyticsCard from "./AnalyticsCard";
import DashboardActions from "./DashboardActions";
import DashboardHeader from "./DashboardHeader";

const MainDashboardContent: React.FC = () => {
  const { t, isInitialized } = useLanguage();
  
  if (!isInitialized) {
    return <div className="p-4">Loading translations...</div>;
  }
  
  return (
    <div className="space-y-8">
      <DashboardHeader />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <QuickOverview />
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>{t("dashboard.exploreKnowledge")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-md">
                      <Book className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{t("dashboard.studioTechniques")}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {t("dashboard.studioTechniquesDescription")}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="mt-2 w-full justify-start">
                    Browse techniques
                  </Button>
                </div>
                
                <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-md">
                      <FileCog className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{t("dashboard.audioTroubleshooting")}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {t("dashboard.audioTroubleshootingDescription")}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="mt-2 w-full justify-start">
                    View guides
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RecentActivityCard />
            <UsageStatsCard />
          </div>
        </div>
        
        <div className="space-y-6">
          <PlanInfoCard />
          <QuickActionsCard />
          <AnalyticsCard />
        </div>
      </div>
      
      <DashboardActions />
    </div>
  );
};

export default MainDashboardContent;
