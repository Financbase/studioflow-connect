
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Recommendation } from "@/types/recommendation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface RecommendationSectionProps {
  title: string;
  icon: React.ReactNode;
  recommendations: Recommendation[];
  pricingTier: string;
}

const RecommendationSection: React.FC<RecommendationSectionProps> = ({
  title,
  icon,
  recommendations,
  pricingTier
}) => {
  if (recommendations.length === 0) return null;
  
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map(rec => (
          <Card key={rec.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  {rec.icon}
                  <CardTitle className="text-base">{rec.title}</CardTitle>
                </div>
                <Badge variant={rec.requiredTier === "free" ? "outline" : "secondary"}>
                  {rec.requiredTier}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{rec.description}</p>
              <Button 
                size="sm" 
                disabled={
                  (pricingTier === "free" && rec.requiredTier !== "free") ||
                  (pricingTier === "standard" && rec.requiredTier === "pro") ||
                  (pricingTier === "standard" && rec.requiredTier === "enterprise")
                }
                variant={
                  (pricingTier === "free" && rec.requiredTier !== "free") ||
                  (pricingTier === "standard" && rec.requiredTier === "pro") ||
                  (pricingTier === "standard" && rec.requiredTier === "enterprise")
                    ? "outline" : "default"
                }
                className={
                  rec.category === "ai" && (pricingTier === "pro" || pricingTier === "enterprise") 
                    ? "bg-gradient-to-r from-blue-500 to-purple-500" 
                    : ""
                }
              >
                {rec.actionLabel}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecommendationSection;
