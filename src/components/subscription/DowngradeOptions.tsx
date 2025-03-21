
import React from "react";
import { Button } from "@/components/ui/button";
import { PricingTier } from "@/contexts/dashboard/types";
import { CreditCard, Award, Zap } from "lucide-react";

interface DowngradeOptionsProps {
  currentPlan: PricingTier;
  handlePlanSwitch: (plan: PricingTier) => void;
}

const DowngradeOptions: React.FC<DowngradeOptionsProps> = ({ 
  currentPlan,
  handlePlanSwitch
}) => {
  if (currentPlan === "free") {
    return null; // Already on lowest plan
  }
  
  return (
    <div className="mt-4 pt-4 border-t">
      <h4 className="text-sm font-medium mb-2 text-muted-foreground">Downgrade Options</h4>
      <div className="flex flex-col gap-2">
        {currentPlan === "enterprise" && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePlanSwitch("pro")}
            >
              <Zap className="mr-2 h-4 w-4" />
              Switch to Pro
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePlanSwitch("standard")}
            >
              <Award className="mr-2 h-4 w-4" />
              Switch to Standard
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePlanSwitch("free")}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Switch to Free
            </Button>
          </>
        )}
        
        {currentPlan === "pro" && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePlanSwitch("standard")}
            >
              <Award className="mr-2 h-4 w-4" />
              Switch to Standard
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePlanSwitch("free")}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Switch to Free
            </Button>
          </>
        )}
        
        {currentPlan === "standard" && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePlanSwitch("free")}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Switch to Free
          </Button>
        )}
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        Note: Downgrading may result in loss of features and data
      </p>
    </div>
  );
};

export default DowngradeOptions;
