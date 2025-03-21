
import React, { useEffect, useState } from "react";
import AnalyticsCard from "./AnalyticsCard";
import RecentActivityCard from "./RecentActivityCard";
import QuickActionsCard from "./QuickActionsCard";
import UsageStatsCard from "./UsageStatsCard";
import PlanInfoCard from "./PlanInfoCard";

const MainDashboardContent = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Activity and Charts Section */}
      <div className="lg:col-span-2 space-y-6">
        <AnalyticsCard />
        <RecentActivityCard />
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
