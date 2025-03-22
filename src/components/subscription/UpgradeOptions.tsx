
import React from "react";
import { Button } from "@/components/ui/button";
import { PricingTier } from "@/contexts/dashboard/types";
import { Building, Zap } from "lucide-react";

interface UpgradeOptionsProps {
  currentPlan: PricingTier;
  handleUpgradeSubscription: (plan: PricingTier) => void;
  isDisabled?: boolean;
}

const UpgradeOptions: React.FC<UpgradeOptionsProps> = ({ 
  currentPlan, 
  handleUpgradeSubscription,
  isDisabled = false
}) => {
  // The TypeScript error occurs because of type inference in the conditional check
  // TypeScript thinks `currentPlan` can't be "enterprise" at this point
  // We need to fix the comparison to satisfy TypeScript's type checking
  
  // First, we'll handle the case where we don't want to show any upgrade options
  if (currentPlan === "enterprise") {
    return null;
  }
  
  return (
    <div className="mt-4">
      <h4 className="text-sm font-medium mb-2">Upgrade Options</h4>
      <div className="flex flex-col gap-2">
        {/* Show Enterprise upgrade for all non-enterprise plans */}
        <Button
          onClick={() => handleUpgradeSubscription("enterprise")}
          className="bg-gradient-to-r from-gray-700 to-black text-white hover:from-gray-800 hover:to-gray-900"
          disabled={isDisabled}
        >
          <Building className="mr-2 h-4 w-4" />
          Upgrade to Enterprise
        </Button>
        
        {/* Show Pro upgrade for free and standard plans */}
        {(currentPlan === "free" || currentPlan === "standard") && (
          <Button
            onClick={() => handleUpgradeSubscription("pro")}
            className="bg-gradient-to-r from-gray-500 to-gray-700 text-white hover:from-gray-600 hover:to-gray-800"
            disabled={isDisabled}
          >
            <Zap className="mr-2 h-4 w-4" />
            Upgrade to Pro
          </Button>
        )}
        
        {/* Show Standard upgrade for free plan */}
        {currentPlan === "free" && (
          <Button
            onClick={() => handleUpgradeSubscription("standard")}
            disabled={isDisabled}
          >
            Upgrade to Standard
          </Button>
        )}
      </div>
    </div>
  );
};

export default UpgradeOptions;
