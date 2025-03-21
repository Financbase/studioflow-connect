
import { PricingTier } from "@/contexts/dashboard/types";

export interface ProfileStats {
  projectsCreated: number;
  tracksUploaded: number;
  storageUsed: string;
  totalStorage: string;
  lastLogin: string;
  accountCreated: string;
  connectionsCount: number;
  recentProjects: {
    id: string;
    name: string;
    lastModified: string;
  }[];
  audioAssets: {
    id: string;
    name: string;
    size: string;
    duration: string;
  }[];
  workflows: {
    id: string;
    name: string;
    devices?: string[];
    plugins?: string[];
  }[];
}

export interface ProfileFormData {
  fullName: string;
  username: string;
  bio: string;
}

// Helper function to get plan badge UI based on pricing tier
export const getPlanBadge = (pricingTier: PricingTier) => {
  switch(pricingTier) {
    case "free":
      return "outline";
    case "standard":
      return "secondary";
    case "pro":
      return "bg-gradient-to-r from-blue-500 to-purple-500";
    case "enterprise":
      return "bg-gradient-to-r from-purple-500 to-red-500";
  }
};

// Helper function to calculate storage progress percentage
export const getStorageProgress = (used: string, total: string) => {
  const usedValue = parseFloat(used);
  const totalValue = parseFloat(total);
  return (usedValue / totalValue) * 100;
};
