
import { ReactNode } from "react";

export interface FundingTierProps {
  name: string;
  amount: string;
  benefits: string[];
  backers: number;
  icon: ReactNode;
}

export interface BackerProps {
  name: string;
  location: string;
  tier: string;
  timeAgo: string;
}

export interface FundAllocationProps {
  category: string;
  percentage: number;
}

export interface FundingProgressProps {
  currentFunding: number;
  goal: number;
  percentComplete: number;
  daysRemaining: number;
  backers: number;
}
