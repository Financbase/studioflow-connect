
import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Star, Award, Gift } from "lucide-react";
import FundingProgressCard from "./dashboard/FundingProgressCard";
import ContributorTiers from "./dashboard/ContributorTiers";
import ImpactAllocationTab from "./dashboard/ImpactAllocationTab";
import TopContributorsTab from "./dashboard/TopContributorsTab";
import RoadmapTab from "./dashboard/RoadmapTab";
import { 
  FundingStats, 
  ContributorProps, 
  ContributorTierProps, 
  ImpactAllocationProps 
} from "./dashboard/types";

const ContributorDashboard = () => {
  // Sample data - in a real app, this would come from an API
  const fundingStats: FundingStats = {
    currentAmount: 28750,
    targetAmount: 50000,
    backerCount: 348,
    daysRemaining: 21,
    percentComplete: 57.5,
  };

  const contributorTiers: ContributorTierProps[] = [
    { name: "Gold", price: "$20+", color: "text-yellow-400", icon: <Star className="h-4 w-4" /> },
    { name: "Platinum", price: "$50+", color: "text-zinc-300", icon: <Award className="h-4 w-4" /> },
    { name: "Diamond", price: "$100+", color: "text-blue-300", icon: <Gift className="h-4 w-4" /> },
  ];

  const topContributors: ContributorProps[] = [
    { name: "Alex Producer", tier: "Diamond", joinDate: "2023-04-12" },
    { name: "Sound Engineer", tier: "Platinum", joinDate: "2023-05-08" },
    { name: "Mix Master", tier: "Diamond", joinDate: "2023-03-29" },
    { name: "Beatmaker Pro", tier: "Gold", joinDate: "2023-06-15" },
    { name: "Studio Flow", tier: "Platinum", joinDate: "2023-05-02" },
  ];

  const impactAllocation: ImpactAllocationProps[] = [
    { category: "Creator Grants", percentage: 30, color: "bg-purple-500" },
    { category: "Free Education", percentage: 20, color: "bg-blue-500" },
    { category: "Core Development", percentage: 25, color: "bg-cyan-500" },
    { category: "AR Research", percentage: 15, color: "bg-green-500" },
    { category: "Operations", percentage: 10, color: "bg-yellow-500" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">StudioFlow Contributor Hub</h2>
          <p className="text-muted-foreground">Support the open-source foundation for audio production</p>
        </div>
        <Button className="bg-accent hover:bg-accent/90">
          <Heart className="mr-2 h-4 w-4" /> Contribute Now
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FundingProgressCard fundingStats={fundingStats} />
        <ContributorTiers tiers={contributorTiers} />
      </div>

      <Tabs defaultValue="impact">
        <TabsList className="mb-4">
          <TabsTrigger value="impact">Impact Transparency</TabsTrigger>
          <TabsTrigger value="contributors">Top Contributors</TabsTrigger>
          <TabsTrigger value="roadmap">Feature Roadmap</TabsTrigger>
        </TabsList>
        
        <TabsContent value="impact" className="mt-0">
          <ImpactAllocationTab impactAllocation={impactAllocation} />
        </TabsContent>
        
        <TabsContent value="contributors" className="mt-0">
          <TopContributorsTab contributors={topContributors} />
        </TabsContent>
        
        <TabsContent value="roadmap" className="mt-0">
          <RoadmapTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContributorDashboard;
