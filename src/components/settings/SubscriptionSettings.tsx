
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PlanSwitcher from "@/components/PlanSwitcher";
import { useDashboard } from "@/contexts/dashboard/useDashboard";
import { PricingTier } from "@/contexts/dashboard/types";
import { toast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import AIAssistant from "@/components/AIAssistant";

const SubscriptionSettings = () => {
  const { pricingTier, setPricingTier } = useDashboard();
  
  const handlePlanChange = (plan: PricingTier) => {
    setPricingTier(plan);
    
    toast({
      title: "Subscription updated",
      description: `Your plan has been updated to ${plan.charAt(0).toUpperCase() + plan.slice(1)}`,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Subscription Plan</CardTitle>
          <CardDescription>
            Manage your subscription and billing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <Info className="h-4 w-4" />
            <AlertDescription>
              Changes to your subscription will be applied immediately. For more detailed plan information, visit the <a href="/subscription" className="underline">Subscription</a> page.
            </AlertDescription>
          </Alert>
          <PlanSwitcher 
            currentPlan={pricingTier} 
            onPlanChange={handlePlanChange}
          />
        </CardContent>
      </Card>
      
      <AIAssistant />
    </div>
  );
};

export default SubscriptionSettings;
