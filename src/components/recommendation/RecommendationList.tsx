
import React from "react";
import RecommendationCard from "./RecommendationCard";
import { Recommendation } from "@/types/recommendation";

interface RecommendationListProps {
  recommendations: Recommendation[];
  isLocked: boolean;
  title?: string;
}

const RecommendationList: React.FC<RecommendationListProps> = ({
  recommendations,
  isLocked,
  title
}) => {
  if (recommendations.length === 0) return null;
  
  return (
    <div className="space-y-2">
      {title && <p className="text-xs text-muted-foreground">{title}</p>}
      {recommendations.map((rec) => (
        <RecommendationCard 
          key={rec.id} 
          recommendation={rec} 
          isLocked={isLocked} 
        />
      ))}
    </div>
  );
};

export default RecommendationList;
