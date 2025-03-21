
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Recommendation } from '@/types/recommendation';
import { cn } from '@/lib/utils';

interface FeatureRecommendationProps {
  title?: string;
  description?: string;
  recommendations: Recommendation[];
  pricingTier?: string;
  limit?: number;
  compact?: boolean;
  className?: string;
  showViewAll?: boolean;
}

const FeatureRecommendation: React.FC<FeatureRecommendationProps> = ({
  title = "Recommended for you",
  description = "Features that might enhance your workflow",
  recommendations,
  pricingTier = "free",
  limit = 3,
  compact = false,
  className,
  showViewAll = true
}) => {
  // Get the pricing tier level for comparison
  const getTierLevel = (tier: string) => {
    switch (tier) {
      case 'pro': return 2;
      case 'standard': return 1;
      default: return 0; // 'free'
    }
  };
  
  const userTierLevel = getTierLevel(pricingTier);
  
  // Limit the number of recommendations shown
  const displayRecommendations = recommendations.slice(0, limit);
  
  // Get a sample category if available for the "View all" link
  const sampleCategory = recommendations[0]?.category || 'system';
  
  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className={compact ? "pb-2" : undefined}>
        <CardTitle>{title}</CardTitle>
        {!compact && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      
      <CardContent className="space-y-3">
        {displayRecommendations.map((recommendation) => {
          const Icon = recommendation.icon;
          const isAvailable = getTierLevel(recommendation.requiredTier) <= userTierLevel;
          
          return (
            <div 
              key={recommendation.id} 
              className={cn(
                "flex items-start space-x-3 border rounded-lg p-3 transition-all",
                "hover:bg-muted/40",
                !isAvailable && "opacity-75"
              )}
            >
              <div className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-md",
                isAvailable ? "bg-primary/10" : "bg-muted"
              )}>
                {Icon && <Icon className={cn(
                  "h-4 w-4",
                  isAvailable ? "text-primary" : "text-muted-foreground"
                )} />}
              </div>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm">{recommendation.title}</p>
                  <Badge variant={
                    recommendation.requiredTier === "free" ? "outline" : 
                    recommendation.requiredTier === "standard" ? "secondary" : 
                    "default"
                  } className="text-xs">
                    {recommendation.requiredTier}
                  </Badge>
                </div>
                
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {recommendation.description}
                </p>
                
                {!isAvailable && (
                  <div className="flex items-center text-xs text-muted-foreground mt-1 gap-1">
                    <Lock className="h-3 w-3" />
                    <span>Requires {recommendation.requiredTier} plan</span>
                  </div>
                )}
                
                {compact && (
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="p-0 h-auto text-xs mt-1" 
                    asChild
                  >
                    <Link to={`/recommendations?category=${recommendation.category}&id=${recommendation.id}`}>
                      {recommendation.actionLabel || "Learn more"}
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
      
      {showViewAll && (
        <CardFooter className={cn(
          "flex justify-end pt-0",
          compact ? "pb-2" : undefined
        )}>
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-1" 
            asChild
          >
            <Link to="/recommendations">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default FeatureRecommendation;
