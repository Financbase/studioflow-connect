
import React from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PricingTier } from "@/contexts/DashboardContext";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";

interface PlanSwitcherProps {
  currentPlan: PricingTier;
  onPlanChange: (plan: PricingTier) => void;
}

const PlanSwitcher: React.FC<PlanSwitcherProps> = ({ currentPlan, onPlanChange }) => {
  const { user, profile } = useAuth();
  
  // Function to simulate a subscription upgrade
  const handleUpgradeSubscription = async (newPlan: PricingTier) => {
    toast({
      title: "Upgrade Required",
      description: "Please subscribe to upgrade your plan. This would typically redirect to a payment page.",
    });
  };
  
  const getPlanBadge = (plan: PricingTier) => {
    switch(plan) {
      case "free":
        return <Badge variant="outline" className="ml-2">Free</Badge>;
      case "standard":
        return <Badge variant="secondary" className="ml-2">Standard</Badge>;
      case "pro":
        return <Badge variant="default" className="bg-gradient-to-r from-blue-500 to-purple-500 ml-2">Pro</Badge>;
      case "enterprise":
        return <Badge variant="default" className="bg-gradient-to-r from-purple-500 to-red-500 ml-2">Enterprise</Badge>;
    }
  };

  // Generate upgrade options based on current plan
  const renderUpgradeOptions = () => {
    if (currentPlan === "enterprise") {
      return <div className="text-sm text-muted-foreground">You're on our highest tier plan</div>;
    }
    
    if (currentPlan === "pro") {
      return (
        <Button 
          onClick={() => handleUpgradeSubscription("enterprise")}
          className="bg-gradient-to-r from-purple-500 to-red-500 text-white"
        >
          Upgrade to Enterprise
        </Button>
      );
    }
    
    if (currentPlan === "standard") {
      return (
        <div className="flex flex-col gap-2">
          <Button 
            onClick={() => handleUpgradeSubscription("pro")}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
          >
            Upgrade to Pro
          </Button>
          <Button 
            onClick={() => handleUpgradeSubscription("enterprise")}
            className="bg-gradient-to-r from-purple-500 to-red-500 text-white"
          >
            Upgrade to Enterprise
          </Button>
        </div>
      );
    }
    
    return (
      <div className="flex flex-col gap-2">
        <Button 
          onClick={() => handleUpgradeSubscription("standard")}
          variant="secondary"
        >
          Upgrade to Standard
        </Button>
        <Button 
          onClick={() => handleUpgradeSubscription("pro")}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
        >
          Upgrade to Pro
        </Button>
        <Button 
          onClick={() => handleUpgradeSubscription("enterprise")}
          className="bg-gradient-to-r from-purple-500 to-red-500 text-white"
        >
          Upgrade to Enterprise
        </Button>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground mr-1">Current Plan:</span>
        <span className="font-medium capitalize">{currentPlan}</span>
        {getPlanBadge(currentPlan)}
      </div>
      {renderUpgradeOptions()}
    </div>
  );
};

export default PlanSwitcher;
