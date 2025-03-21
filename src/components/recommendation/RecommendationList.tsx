
import React from "react";
import { Recommendation } from "@/types/recommendation";
import { RecommendationCard } from "./RecommendationCard";

interface RecommendationListProps {
  recommendations: Recommendation[];
  pricingTier: string;
}

export const RecommendationList: React.FC<RecommendationListProps> = ({
  recommendations,
  pricingTier
}) => {
  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">No recommendations found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {recommendations.map((recommendation) => (
        <RecommendationCard
          key={recommendation.id}
          recommendation={recommendation}
          pricingTier={pricingTier}
        />
      ))}
    </div>
  );
};
