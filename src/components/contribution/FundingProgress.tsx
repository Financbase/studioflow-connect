
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FundingProgressCard from "./funding/FundingProgressCard";
import FundingTiersTab from "./funding/FundingTiersTab";
import RecentBackersTab from "./funding/RecentBackersTab";
import ImpactTab from "./funding/ImpactTab";
import { useFundingData } from "@/hooks/useFundingData";

const FundingProgress: React.FC = () => {
  // Use our custom hook to get the funding data
  const { 
    fundingProgress, 
    tiers, 
    recentBackers, 
    fundAllocation 
  } = useFundingData();
  
  return (
    <div className="space-y-6">
      <FundingProgressCard 
        currentFunding={fundingProgress.currentFunding} 
        goal={fundingProgress.goal} 
        percentComplete={fundingProgress.percentComplete} 
        daysRemaining={fundingProgress.daysRemaining} 
        backers={fundingProgress.backers} 
      />
      
      <Tabs defaultValue="tiers">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="tiers">Funding Tiers</TabsTrigger>
          <TabsTrigger value="backers">Recent Backers</TabsTrigger>
          <TabsTrigger value="impact">Your Impact</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tiers" className="space-y-4">
          <FundingTiersTab tiers={tiers} />
        </TabsContent>
        
        <TabsContent value="backers">
          <RecentBackersTab recentBackers={recentBackers} />
        </TabsContent>
        
        <TabsContent value="impact">
          <ImpactTab fundAllocation={fundAllocation} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FundingProgress;
