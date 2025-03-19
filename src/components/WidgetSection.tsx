
import React, { useState } from "react";
import { useDashboard, WidgetId } from "@/contexts/DashboardContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
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
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const visible = isWidgetVisible(id);
  const hasAccess = hasFeatureAccess(id);
  
  if (!visible) {
    return null;
  }
  
  const toggleCollapse = () => {
    setIsCollapsed(prev => !prev);
  };
  
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
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-semibold">{title}</h2>
          {isPremiumFeature && pricingTier !== "free" && (
            <Badge variant="default" className="bg-gradient-to-r from-amber-500 to-orange-500">
              <Sparkles className="h-3 w-3 mr-1" /> Premium
            </Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleCollapse}
          className="h-8 w-8 p-0"
          aria-label={isCollapsed ? "Expand" : "Collapse"}
        >
          {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </Button>
      </div>
      
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isCollapsed ? 'max-h-0 opacity-0' : 'max-h-[2000px] opacity-100'}`}>
        {children}
        
        <FeatureRecommendation 
          recommendations={sectionRecommendations}
          category={title}
        />
      </div>
    </section>
  );
};

export default WidgetSection;
