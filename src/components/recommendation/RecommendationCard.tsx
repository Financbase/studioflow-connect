
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PricingTier } from "@/contexts/DashboardContext";

export interface Recommendation {
  title: string;
  description: string;
  requiredTier: PricingTier;
}

interface RecommendationCardProps {
  recommendation: Recommendation;
  isLocked: boolean;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  isLocked
}) => {
  if (isLocked) {
    return (
      <Card className="border border-border/50 bg-muted/30">
        <CardContent className="p-4 opacity-60">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm mb-1">{recommendation.title}</h4>
            <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
              {recommendation.requiredTier} plan
            </span>
          </div>
          <p className="text-xs text-muted-foreground">{recommendation.description}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border border-border/50 hover:border-primary/50 transition-colors">
      <CardContent className="p-4">
        <h4 className="font-medium text-sm mb-1">{recommendation.title}</h4>
        <p className="text-xs text-muted-foreground">{recommendation.description}</p>
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;
