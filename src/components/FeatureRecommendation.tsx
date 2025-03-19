
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Lightbulb } from "lucide-react";
import { useDashboard, PricingTier } from "@/contexts/DashboardContext";

export interface Recommendation {
  title: string;
  description: string;
  requiredTier: PricingTier;
}

interface FeatureRecommendationProps {
  recommendations: Recommendation[];
  category: string;
}

const FeatureRecommendation: React.FC<FeatureRecommendationProps> = ({
  recommendations,
  category
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { pricingTier } = useDashboard();
  
  // Filter recommendations to show only those available in current plan or one tier higher
  const availableRecommendations = recommendations.filter(rec => {
    if (pricingTier === "pro") return true;
    if (pricingTier === "standard") return rec.requiredTier !== "pro";
    if (pricingTier === "free") return rec.requiredTier === "free";
    return false;
  });
  
  const lockedRecommendations = recommendations.filter(rec => {
    if (pricingTier === "pro") return false;
    if (pricingTier === "standard") return rec.requiredTier === "pro";
    if (pricingTier === "free") return rec.requiredTier === "standard" || rec.requiredTier === "pro";
    return true;
  });
  
  if (recommendations.length === 0) return null;
  
  return (
    <div className="mt-4">
      <Button 
        variant="outline" 
        className="flex items-center gap-2 w-full justify-between mb-2"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-yellow-500" />
          <span>Smart Recommendations for {category}</span>
        </div>
        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </Button>
      
      {isExpanded && (
        <div className="space-y-3 animate-fade-in">
          {availableRecommendations.length > 0 && (
            <div className="space-y-2">
              {availableRecommendations.map((rec, idx) => (
                <Card key={idx} className="border border-border/50 hover:border-primary/50 transition-colors">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-sm mb-1">{rec.title}</h4>
                    <p className="text-xs text-muted-foreground">{rec.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {lockedRecommendations.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Unlock more with higher tier plans:</p>
              {lockedRecommendations.map((rec, idx) => (
                <Card key={idx} className="border border-border/50 bg-muted/30">
                  <CardContent className="p-4 opacity-60">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm mb-1">{rec.title}</h4>
                      <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                        {rec.requiredTier} plan
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{rec.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FeatureRecommendation;
