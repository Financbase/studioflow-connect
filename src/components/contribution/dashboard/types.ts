
import { ReactNode } from "react";

export interface FundingStats {
  currentAmount: number;
  targetAmount: number;
  backerCount: number;
  daysRemaining: number;
  percentComplete: number;
}

export interface ContributorProps {
  name: string;
  tier: "Gold" | "Platinum" | "Diamond";
  joinDate: string;
  avatarUrl?: string;
}

export interface ContributorTierProps {
  name: string;
  price: string;
  color: string;
  icon: ReactNode;
}

export interface ImpactAllocationProps {
  category: string;
  percentage: number;
  color: string;
}
