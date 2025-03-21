
import React, { useState } from "react";
import { PricingTier } from "@/contexts/dashboard/types";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface DowngradeWorkflowProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: PricingTier;
  targetPlan: PricingTier;
  onConfirm: (plan: PricingTier) => void;
}

const FEATURE_COMPARISON: Record<string, { free: boolean; standard: boolean; pro: boolean; enterprise: boolean; name: string }> = {
  basicAccess: { free: true, standard: true, pro: true, enterprise: true, name: "Basic Studio Access" },
  cloudStorage: { free: true, standard: true, pro: true, enterprise: true, name: "Cloud Storage" },
  projectExports: { free: true, standard: true, pro: true, enterprise: true, name: "Project Exports" },
  advancedTools: { free: false, standard: true, pro: true, enterprise: true, name: "Advanced Audio Tools" },
  unlimitedProjects: { free: false, standard: true, pro: true, enterprise: true, name: "Unlimited Projects" },
  aiTools: { free: false, standard: false, pro: true, enterprise: true, name: "AI Audio Tools" },
  prioritySupport: { free: false, standard: false, pro: true, enterprise: true, name: "Priority Support" },
  customLibrary: { free: false, standard: false, pro: false, enterprise: true, name: "Custom Sound Library" },
  accountManager: { free: false, standard: false, pro: false, enterprise: true, name: "Dedicated Account Manager" },
  whiteLabel: { free: false, standard: false, pro: false, enterprise: true, name: "White Label Option" },
  mentalhealthSupport: { free: false, standard: true, pro: true, enterprise: true, name: "Mental Health Support" },
  usageAnalytics: { free: false, standard: false, pro: true, enterprise: true, name: "Usage Analytics" },
  aiAssistant: { free: false, standard: false, pro: true, enterprise: true, name: "AI Assistant" },
  customThemes: { free: false, standard: false, pro: true, enterprise: true, name: "Premium UI Themes" },
};

const DowngradeWorkflow: React.FC<DowngradeWorkflowProps> = ({
  isOpen,
  onClose,
  currentPlan,
  targetPlan,
  onConfirm
}) => {
  const [step, setStep] = useState(1);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  
  // Reset steps when dialog opens
  React.useEffect(() => {
    if (isOpen) {
      setStep(1);
      setCheckedItems({});
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  // Get features that will be lost
  const getLostFeatures = () => {
    return Object.entries(FEATURE_COMPARISON)
      .filter(([_, feature]) => {
        return feature[currentPlan] && !feature[targetPlan];
      })
      .map(([key, feature]) => ({ key, name: feature.name }));
  };
  
  const lostFeatures = getLostFeatures();
  
  const handleCheckItem = (key: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const allItemsChecked = lostFeatures.length === 0 || 
    lostFeatures.every(feature => checkedItems[feature.key]);
  
  const handleContinue = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2 && allItemsChecked) {
      // Proceed with downgrade
      onConfirm(targetPlan);
      onClose();
      
      toast({
        title: "Plan Downgraded",
        description: `Your subscription has been updated to ${targetPlan.charAt(0).toUpperCase() + targetPlan.slice(1)}`,
      });
    }
  };
  
  const getPlanDisplayName = (plan: PricingTier) => {
    return plan.charAt(0).toUpperCase() + plan.slice(1);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
            Downgrade from {getPlanDisplayName(currentPlan)} to {getPlanDisplayName(targetPlan)}
          </DialogTitle>
          <DialogDescription>
            Please review the changes before confirming your downgrade.
          </DialogDescription>
        </DialogHeader>
        
        {step === 1 && (
          <>
            <div className="space-y-4 py-4">
              <div className="text-center pb-2 border-b">
                <p className="text-amber-500 font-semibold">
                  The following features will no longer be available:
                </p>
              </div>
              
              {lostFeatures.length === 0 ? (
                <p className="text-center text-sm text-muted-foreground">
                  No features will be lost in this downgrade.
                </p>
              ) : (
                <ScrollArea className="h-[200px] rounded-md border p-4">
                  <ul className="space-y-3">
                    {lostFeatures.map(({ key, name }) => (
                      <li key={key} className="flex items-start">
                        <XCircle className="h-5 w-5 text-destructive mr-2 mt-0.5 flex-shrink-0" />
                        <span>{name}</span>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              )}
              
              <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-md text-sm text-amber-800 dark:text-amber-300">
                <p>Once you downgrade, any data associated with premium features may become inaccessible. We recommend exporting any important data before proceeding.</p>
              </div>
            </div>
            
            <DialogFooter className="flex sm:justify-between">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleContinue}>
                Continue
              </Button>
            </DialogFooter>
          </>
        )}
        
        {step === 2 && (
          <>
            <div className="space-y-4 py-4">
              <div className="text-center pb-2 border-b">
                <p className="font-semibold">
                  Please acknowledge the following changes:
                </p>
              </div>
              
              <ScrollArea className="h-[200px] rounded-md border p-4">
                <ul className="space-y-3">
                  {lostFeatures.length === 0 ? (
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>No feature changes with this downgrade</span>
                    </li>
                  ) : (
                    lostFeatures.map(({ key, name }) => (
                      <li key={key} className="flex items-center">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={`mr-2 h-5 w-5 p-0 ${checkedItems[key] ? 'bg-primary text-primary-foreground' : ''}`}
                          onClick={() => handleCheckItem(key)}
                        >
                          {checkedItems[key] && <CheckCircle className="h-3 w-3" />}
                        </Button>
                        <span>I understand I will lose access to <strong>{name}</strong></span>
                      </li>
                    ))
                  )}
                  
                  <li className="flex items-center pt-2 border-t">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className={`mr-2 h-5 w-5 p-0 ${checkedItems['price'] ? 'bg-primary text-primary-foreground' : ''}`}
                      onClick={() => handleCheckItem('price')}
                    >
                      {checkedItems['price'] && <CheckCircle className="h-3 w-3" />}
                    </Button>
                    <span>I understand my billing will change to {getPlanDisplayName(targetPlan)} plan pricing</span>
                  </li>
                </ul>
              </ScrollArea>
            </div>
            
            <DialogFooter className="flex sm:justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button 
                onClick={handleContinue}
                disabled={!allItemsChecked && !(lostFeatures.length === 0 && checkedItems['price'])}
              >
                Confirm Downgrade
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DowngradeWorkflow;
