
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Lightbulb } from "lucide-react";
import { useDashboard, PricingTier } from "@/contexts/DashboardContext";
import RecommendationList from "./recommendation/RecommendationList";
import { Recommendation } from "./recommendation/RecommendationCard";

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
  
  const filterRecommendations = () => {
    const available: Recommendation[] = [];
    const locked: Recommendation[] = [];
    
    recommendations.forEach(rec => {
      const tierLevels: PricingTier[] = ['free', 'standard', 'pro'];
      const currentTierIndex = tierLevels.indexOf(pricingTier);
      const recommendationTierIndex = tierLevels.indexOf(rec.requiredTier);
      
      if (recommendationTierIndex <= currentTierIndex) {
        available.push(rec);
      } else {
        locked.push(rec);
      }
    });
    
    return { available, locked };
  };
  
  const { available, locked } = filterRecommendations();
  
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
          {available.length > 0 && (
            <RecommendationList 
              recommendations={available} 
              isLocked={false} 
            />
          )}
          
          {locked.length > 0 && (
            <RecommendationList 
              recommendations={locked} 
              isLocked={true} 
              title="Unlock more with higher tier plans:" 
            />
          )}
        </div>
      )}
    </div>
  );
};

export default FeatureRecommendation;
