
import React from "react";
import { useDashboard, WidgetId } from "@/contexts/DashboardContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import FeatureRecommendation from "@/components/FeatureRecommendation";
import { recommendations } from "@/data/featureRecommendations";

interface WidgetSectionProps {
  id: WidgetId;
  title: string;
  children: React.ReactNode;
}

const WidgetSection: React.FC<WidgetSectionProps> = ({ id, title, children }) => {
  const { isWidgetVisible, hasFeatureAccess } = useDashboard();
  
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
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {children}
      
      <FeatureRecommendation 
        recommendations={sectionRecommendations}
        category={title}
      />
    </section>
  );
};

export default WidgetSection;
