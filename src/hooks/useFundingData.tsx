
import { useState } from "react";
import { Heart, Award, Users } from "lucide-react";
import { 
  FundingTierProps, 
  BackerProps, 
  FundAllocationProps,
  FundingProgressProps
} from "@/components/contribution/funding/types";

/**
 * Hook that provides centralized funding data for use across components
 */
export const useFundingData = () => {
  // Funding progress data
  const [fundingProgress, setFundingProgress] = useState<FundingProgressProps>({
    currentFunding: 24850,
    goal: 50000,
    percentComplete: Math.min(100, Math.round((24850 / 50000) * 100)),
    daysRemaining: 18,
    backers: 347
  });
  
  // Funding tiers
  const [tiers, setTiers] = useState<FundingTierProps[]>([
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
  ]);
  
  // Recent backers
  const [recentBackers, setRecentBackers] = useState<BackerProps[]>([
    { name: "Alex", location: "Berlin", tier: "Producer", timeAgo: "2 minutes ago" },
    { name: "Sarah", location: "Toronto", tier: "Studio Pro", timeAgo: "15 minutes ago" },
    { name: "Michael", location: "Austin", tier: "Supporter", timeAgo: "1 hour ago" },
    { name: "Jaime", location: "Tokyo", tier: "Producer", timeAgo: "3 hours ago" }
  ]);
  
  // Fund allocation data
  const [fundAllocation, setFundAllocation] = useState<FundAllocationProps[]>([
    { category: "Core Development", percentage: 25 },
    { category: "Creator Grants", percentage: 30 },
    { category: "Free Education", percentage: 20 },
    { category: "AR Research", percentage: 15 },
    { category: "Operations", percentage: 10 }
  ]);

  // Function to contribute to a project (placeholder for future implementation)
  const contributeToProject = (amount: number) => {
    if (amount <= 0) return;
    
    // Update funding progress with new contribution
    setFundingProgress(prev => {
      const newFunding = prev.currentFunding + amount;
      const newPercentComplete = Math.min(100, Math.round((newFunding / prev.goal) * 100));
      
      return {
        ...prev,
        currentFunding: newFunding,
        percentComplete: newPercentComplete,
        backers: prev.backers + 1
      };
    });
  };

  return {
    fundingProgress,
    tiers,
    recentBackers,
    fundAllocation,
    contributeToProject,
  };
};
