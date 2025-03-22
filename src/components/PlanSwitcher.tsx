
import React, { useState } from "react";
import { PricingTier } from "@/contexts/dashboard/types";
import { toast } from "@/components/ui/use-toast";
import DowngradeWorkflow from "./subscription/DowngradeWorkflow";
import CurrentPlanDisplay from "./subscription/CurrentPlanDisplay";
import PlanBenefits from "./subscription/PlanBenefits";
import UpgradeOptions from "./subscription/UpgradeOptions";
import DowngradeOptions from "./subscription/DowngradeOptions";
import { isValidPlanChange } from "@/contexts/dashboard/utils";

interface PlanSwitcherProps {
  currentPlan: PricingTier;
  onPlanChange: (plan: PricingTier) => void;
  isUpdating?: boolean;
}

const PlanSwitcher: React.FC<PlanSwitcherProps> = ({ 
  currentPlan, 
  onPlanChange,
  isUpdating = false 
}) => {
  const [showDowngradeDialog, setShowDowngradeDialog] = useState(false);
  const [targetPlan, setTargetPlan] = useState<PricingTier>("free");
  
  // Function to simulate a subscription upgrade
  const handleUpgradeSubscription = async (newPlan: PricingTier) => {
    if (isUpdating) return;
    
    toast({
      title: "Upgrade Required",
      description: "Please subscribe to upgrade your plan. This would typically redirect to a payment page.",
    });
  };
  
  // Handle plan switch with downgrades requiring confirmation
  const handlePlanSwitch = (newPlan: PricingTier) => {
    if (isUpdating) return;
    
    // Check if this is a downgrade
    if (isValidPlanChange(currentPlan, newPlan)) {
      // Direct change if not a downgrade
      onPlanChange(newPlan);
    } else {
      // Show confirmation dialog for downgrades
      setTargetPlan(newPlan);
      setShowDowngradeDialog(true);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <CurrentPlanDisplay currentPlan={currentPlan} />
      
      <div className="p-4 bg-muted rounded-lg">
        <PlanBenefits currentPlan={currentPlan} />
        
        <UpgradeOptions 
          currentPlan={currentPlan} 
          handleUpgradeSubscription={handleUpgradeSubscription} 
          isDisabled={isUpdating}
        />
        
        <DowngradeOptions 
          currentPlan={currentPlan}
          handlePlanSwitch={handlePlanSwitch}
          isDisabled={isUpdating}
        />
      </div>
      
      <DowngradeWorkflow
        isOpen={showDowngradeDialog}
        onClose={() => setShowDowngradeDialog(false)}
        currentPlan={currentPlan}
        targetPlan={targetPlan}
        onConfirm={onPlanChange}
        isDisabled={isUpdating}
      />
    </div>
  );
};

export default PlanSwitcher;
