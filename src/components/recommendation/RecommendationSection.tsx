
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Recommendation } from '@/types/recommendation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RecommendationSectionProps {
  title?: string;
  description?: string;
  category: string;
  limit?: number;
  pricingTier?: string;
  recommendations: Recommendation[];
}

export const RecommendationSection: React.FC<RecommendationSectionProps> = ({
  title = 'Recommended for you',
  description = 'Features that might improve your workflow',
  category,
  limit = 3,
  pricingTier = 'free',
  recommendations
}) => {
  // Get recommendations from the specified category and limit them
  const items = recommendations.slice(0, limit);
  
  // Determine which recommendations are available based on pricing tier
  const tierLevel = {
    'free': 0,
    'standard': 1,
    'pro': 2
  };

  const userTierLevel = tierLevel[pricingTier as keyof typeof tierLevel] || 0;
  
  return (
    <Card className="bg-card border">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          {items.map((recommendation) => {
            const Icon = recommendation.icon;
            const recommendationTierLevel = tierLevel[recommendation.requiredTier as keyof typeof tierLevel] || 0;
            const isAvailable = recommendationTierLevel <= userTierLevel;
            
            return (
              <div
                key={recommendation.id}
                className="flex items-start space-x-4 rounded-lg border p-3 transition-colors hover:bg-muted/50"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border bg-background">
                  {Icon && <Icon className="h-5 w-5" />}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{recommendation.title}</p>
                    <Badge variant={
                      recommendation.requiredTier === "free" ? "outline" : 
                      recommendation.requiredTier === "standard" ? "secondary" : 
                      "default"
                    }>{recommendation.requiredTier}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {recommendation.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="flex justify-end">
          <Button variant="ghost" asChild>
            <Link to={`/recommendations?category=${category}`} className="flex items-center gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
