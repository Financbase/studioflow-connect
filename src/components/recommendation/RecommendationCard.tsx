
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Recommendation } from "@/types/recommendation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-sm mb-1">{recommendation.title}</h4>
          {recommendation.requiredTier !== 'free' && (
            <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
              {recommendation.requiredTier}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mb-2">{recommendation.description}</p>
        {recommendation.actionLabel && (
          <Button 
            size="sm" 
            variant="outline" 
            className="mt-1 text-xs h-7 px-2"
            onClick={recommendation.onClick}
          >
            {recommendation.actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;
