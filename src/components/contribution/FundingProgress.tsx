
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Award, Users } from "lucide-react";
import FundingProgressCard from "./funding/FundingProgressCard";
import FundingTiersTab from "./funding/FundingTiersTab";
import RecentBackersTab from "./funding/RecentBackersTab";
import ImpactTab from "./funding/ImpactTab";
import { 
  FundingTierProps, 
  BackerProps, 
  FundAllocationProps 
} from "./funding/types";

const FundingProgress: React.FC = () => {
  // Funding data - would come from API in production
  const currentFunding = 24850;
  const goal = 50000;
  const percentComplete = Math.min(100, Math.round((currentFunding / goal) * 100));
  const daysRemaining = 18;
  const backers = 347;
  
  // Funding tiers
  const tiers: FundingTierProps[] = [
    { 
      name: "Supporter", 
      amount: "$20+", 
      benefits: ["Early access to new features", "Supporter badge", "Discord access"], 
      backers: 214,
      icon: <Heart className="h-5 w-5 text-rose-500" />
    },
    { 
      name: "Producer", 
      amount: "$50+", 
      benefits: ["All Supporter benefits", "Feature voting rights", "Monthly Q&A sessions", "Producer badge"], 
      backers: 98,
      icon: <Award className="h-5 w-5 text-amber-500" />
    },
    { 
      name: "Studio Pro", 
      amount: "$100+", 
      benefits: ["All Producer benefits", "Co-design session", "Name in credits", "Pro badge", "1-year Pro subscription"], 
      backers: 35,
      icon: <Users className="h-5 w-5 text-accent-primary" />
    }
  ];
  
  // Recent backers - would come from API in production
  const recentBackers: BackerProps[] = [
    { name: "Alex", location: "Berlin", tier: "Producer", timeAgo: "2 minutes ago" },
    { name: "Sarah", location: "Toronto", tier: "Studio Pro", timeAgo: "15 minutes ago" },
    { name: "Michael", location: "Austin", tier: "Supporter", timeAgo: "1 hour ago" },
    { name: "Jaime", location: "Tokyo", tier: "Producer", timeAgo: "3 hours ago" }
  ];
  
  // Fund allocation data
  const fundAllocation: FundAllocationProps[] = [
    { category: "Core Development", percentage: 25 },
    { category: "Creator Grants", percentage: 30 },
    { category: "Free Education", percentage: 20 },
    { category: "AR Research", percentage: 15 },
    { category: "Operations", percentage: 10 }
  ];
  
  return (
    <div className="space-y-6">
      <FundingProgressCard 
        currentFunding={currentFunding} 
        goal={goal} 
        percentComplete={percentComplete} 
        daysRemaining={daysRemaining} 
        backers={backers} 
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
