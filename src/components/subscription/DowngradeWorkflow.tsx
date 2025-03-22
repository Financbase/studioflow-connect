
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { PricingTier } from "@/contexts/dashboard/types";

interface DowngradeWorkflowProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: PricingTier;
  targetPlan: PricingTier;
  onConfirm: (plan: PricingTier) => void;
  isDisabled?: boolean;
}

const DowngradeWorkflow: React.FC<DowngradeWorkflowProps> = ({
  isOpen,
  onClose,
  currentPlan,
  targetPlan,
  onConfirm,
  isDisabled = false
}) => {
  const handleDowngrade = () => {
    onConfirm(targetPlan);
    onClose();
  };
  
  // Determine which features will be lost based on current and target plans
  const getLostFeatures = (): string[] => {
    const lostFeatures = [];
    
    if (currentPlan === "enterprise") {
      lostFeatures.push("Dedicated account manager");
      lostFeatures.push("White label option");
      lostFeatures.push("Custom sound library");
      
      if (targetPlan === "free" || targetPlan === "standard") {
        lostFeatures.push("AI audio tools");
        lostFeatures.push("Priority support");
      }
      
      if (targetPlan === "free") {
        lostFeatures.push("Advanced audio tools");
        lostFeatures.push("Unlimited projects");
      }
    }
    else if (currentPlan === "pro") {
      lostFeatures.push("AI audio tools");
      lostFeatures.push("Priority support");
      
      if (targetPlan === "free") {
        lostFeatures.push("Advanced audio tools");
        lostFeatures.push("Unlimited projects");
      }
    }
    else if (currentPlan === "standard" && targetPlan === "free") {
      lostFeatures.push("Advanced audio tools");
      lostFeatures.push("Unlimited projects");
    }
    
    return lostFeatures;
  };
  
  const lostFeatures = getLostFeatures();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Confirm Downgrade
          </DialogTitle>
          <DialogDescription>
            You are about to downgrade from {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)} to {targetPlan.charAt(0).toUpperCase() + targetPlan.slice(1)}. This will result in reduced features and may affect your existing projects.
          </DialogDescription>
        </DialogHeader>
        
        {lostFeatures.length > 0 && (
          <div className="py-4">
            <h4 className="text-sm font-semibold mb-2">You will lose access to:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {lostFeatures.map((feature, index) => (
                <li key={index} className="text-sm text-muted-foreground">{feature}</li>
              ))}
            </ul>
          </div>
        )}
        
        <DialogFooter className="sm:justify-between">
          <Button variant="ghost" onClick={onClose} disabled={isDisabled}>
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleDowngrade} 
            disabled={isDisabled}
          >
            Confirm Downgrade
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DowngradeWorkflow;
