
import React from "react";
import { Badge } from "@/components/ui/badge";
import { PricingTier } from "@/contexts/dashboard/types";
import { CreditCard, Award, Zap, Building } from "lucide-react";

interface CurrentPlanDisplayProps {
  currentPlan: PricingTier;
}

const CurrentPlanDisplay: React.FC<CurrentPlanDisplayProps> = ({ currentPlan }) => {
  const getPlanIcon = (plan: PricingTier) => {
    switch(plan) {
      case "free":
        return <CreditCard className="h-4 w-4 mr-2" />;
      case "standard":
        return <Award className="h-4 w-4 mr-2" />;
      case "pro":
        return <Zap className="h-4 w-4 mr-2" />;
      case "enterprise":
        return <Building className="h-4 w-4 mr-2" />;
    }
  };

  const getPlanBadge = (plan: PricingTier) => {
    switch(plan) {
      case "free":
        return <Badge variant="outline" className="ml-2">Free</Badge>;
      case "standard":
        return <Badge variant="secondary" className="ml-2">Standard</Badge>;
      case "pro":
        return <Badge variant="default" className="bg-gradient-to-r from-gray-500 to-gray-700 text-white ml-2">Pro</Badge>;
      case "enterprise":
        return <Badge variant="default" className="bg-gradient-to-r from-gray-700 to-black text-white ml-2">Enterprise</Badge>;
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground mr-1">Current Plan:</span>
      <div className="flex items-center">
        {getPlanIcon(currentPlan)}
        <span className="font-medium capitalize">{currentPlan}</span>
        {getPlanBadge(currentPlan)}
      </div>
    </div>
  );
};

export default CurrentPlanDisplay;
