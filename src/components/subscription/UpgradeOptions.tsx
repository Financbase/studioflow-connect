
import React from "react";
import { Button } from "@/components/ui/button";
import { PricingTier } from "@/contexts/dashboard/types";
import { Award, Zap, Building } from "lucide-react";

interface UpgradeOptionsProps {
  currentPlan: PricingTier;
  handleUpgradeSubscription: (plan: PricingTier) => void;
}

const UpgradeOptions: React.FC<UpgradeOptionsProps> = ({ 
  currentPlan,
  handleUpgradeSubscription
}) => {
  if (currentPlan === "enterprise") {
    return <div className="text-sm text-muted-foreground">You're on our highest tier plan</div>;
  }
  
  if (currentPlan === "pro") {
    return (
      <Button 
        onClick={() => handleUpgradeSubscription("enterprise")}
        className="bg-gradient-to-r from-gray-700 to-black text-white"
      >
        <Building className="mr-2 h-4 w-4" />
        Upgrade to Enterprise
      </Button>
    );
  }
  
  if (currentPlan === "standard") {
    return (
      <div className="flex flex-col gap-2">
        <Button 
          onClick={() => handleUpgradeSubscription("pro")}
          className="bg-gradient-to-r from-gray-500 to-gray-700 text-white"
        >
          <Zap className="mr-2 h-4 w-4" />
          Upgrade to Pro
        </Button>
        <Button 
          onClick={() => handleUpgradeSubscription("enterprise")}
          className="bg-gradient-to-r from-gray-700 to-black text-white"
        >
          <Building className="mr-2 h-4 w-4" />
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
        <Award className="mr-2 h-4 w-4" />
        Upgrade to Standard
      </Button>
      <Button 
        onClick={() => handleUpgradeSubscription("pro")}
        className="bg-gradient-to-r from-gray-500 to-gray-700 text-white"
      >
        <Zap className="mr-2 h-4 w-4" />
        Upgrade to Pro
      </Button>
      <Button 
        onClick={() => handleUpgradeSubscription("enterprise")}
        className="bg-gradient-to-r from-gray-700 to-black text-white"
      >
        <Building className="mr-2 h-4 w-4" />
        Upgrade to Enterprise
      </Button>
    </div>
  );
};

export default UpgradeOptions;
