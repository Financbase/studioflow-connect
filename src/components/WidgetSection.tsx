
import React from "react";
import { useDashboard, WidgetId } from "@/contexts/DashboardContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Sparkles } from "lucide-react";
import FeatureRecommendation from "@/components/FeatureRecommendation";
import { recommendations } from "@/data/featureRecommendations";
import { Badge } from "@/components/ui/badge";

interface WidgetSectionProps {
  id: WidgetId;
  title: string;
  children: React.ReactNode;
  isPremiumFeature?: boolean;
}

const WidgetSection: React.FC<WidgetSectionProps> = ({ id, title, children, isPremiumFeature }) => {
  const { isWidgetVisible, hasFeatureAccess, pricingTier } = useDashboard();
  
  const visible = isWidgetVisible(id);
  const hasAccess = hasFeatureAccess(id);
  
  if (!visible) {
    return null;
  }
  
  if (!hasAccess) {
    return (
      <section id={id} className="py-6 w-full">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <Card className="p-8 flex flex-col items-center justify-center text-center">
          <Lock className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">Feature Locked</h3>
          <p className="text-muted-foreground max-w-md mb-6">
            This feature is available with our premium plans. Upgrade to access {title} and other advanced features.
          </p>
          <Button size="lg">
            Upgrade Plan
          </Button>
        </Card>
      </section>
    );
  }
  
  const sectionRecommendations = recommendations[id] || [];
  
  return (
    <section id={id} className="py-6 w-full">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-2xl font-semibold">{title}</h2>
        {isPremiumFeature && pricingTier !== "free" && (
          <Badge variant="default" className="bg-gradient-to-r from-amber-500 to-orange-500">
            <Sparkles className="h-3 w-3 mr-1" /> Premium
          </Badge>
        )}
      </div>
      {children}
      
      <FeatureRecommendation 
        recommendations={sectionRecommendations}
        category={title}
      />
    </section>
  );
};

export default WidgetSection;
