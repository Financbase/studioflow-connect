
import React from "react";
import { Recommendation } from "@/types/recommendation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecommendationCardProps {
  recommendation: Recommendation;
  pricingTier: string;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  pricingTier
}) => {
  const Icon = recommendation.icon;
  const isAvailable = 
    pricingTier === "pro" || 
    recommendation.requiredTier === "free" ||
    (pricingTier === "standard" && recommendation.requiredTier !== "pro");

  return (
    <Card className={cn(
      "group transition-all duration-300 hover:shadow-lg",
      !isAvailable && "opacity-75"
    )}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className={cn(
            "p-2 rounded-lg",
            isAvailable ? "bg-primary/10" : "bg-muted"
          )}>
            {Icon && <Icon className={cn(
              "w-5 h-5",
              isAvailable ? "text-primary" : "text-muted-foreground"
            )} />}
          </div>
          
          <Badge variant={
            recommendation.requiredTier === "free" ? "outline" : 
            recommendation.requiredTier === "standard" ? "secondary" : 
            "default"
          }>
            {recommendation.requiredTier === "free" ? "Free" : 
             recommendation.requiredTier === "standard" ? "Standard" : "Pro"}
          </Badge>
        </div>
        <CardTitle className="mt-2 text-xl">{recommendation.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {recommendation.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isAvailable && (
          <div className="flex items-center text-sm text-muted-foreground gap-1.5 mb-2">
            <Lock className="h-3.5 w-3.5" />
            <span>
              Requires {recommendation.requiredTier} plan
            </span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          variant={isAvailable ? "default" : "outline"} 
          size="sm" 
          className="w-full"
          disabled={!isAvailable}
        >
          {recommendation.actionLabel || "Learn More"}
        </Button>
      </CardFooter>
    </Card>
  );
};
