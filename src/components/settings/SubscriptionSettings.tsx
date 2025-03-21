
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PlanSwitcher from "@/components/PlanSwitcher";
import { useDashboard } from "@/contexts/dashboard/useDashboard";
import { PricingTier } from "@/contexts/dashboard/types";
import { toast } from "@/components/ui/use-toast";

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
    <Card>
      <CardHeader>
        <CardTitle>Subscription Plan</CardTitle>
        <CardDescription>
          Manage your subscription and billing
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PlanSwitcher 
          currentPlan={pricingTier} 
          onPlanChange={handlePlanChange}
        />
      </CardContent>
    </Card>
  );
};

export default SubscriptionSettings;
