
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import { PricingTier } from "@/contexts/DashboardContext";

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: 'workflow' | 'plugins' | 'sounds' | 'features' | 'learning' | 'ai' | 'marketplace';
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  requiredTier: PricingTier;
  icon: LucideIcon;
  actionLabel: string;
  actionUrl?: string;
  onClick?: () => void;
  imageUrl?: string;
  isAvailable?: boolean;
}
