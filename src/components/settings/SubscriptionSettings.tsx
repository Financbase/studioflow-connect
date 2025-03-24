
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PlanSwitcher from "@/components/PlanSwitcher";
import { useDashboard } from "@/contexts/dashboard/useDashboard";
import { PricingTier } from "@/contexts/dashboard/types";
import { toast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, AlertTriangle } from "lucide-react";
import AIAssistant from "@/components/AIAssistant";
import { Button } from "@/components/ui/button";
import { useDashboardSettings } from "@/contexts/dashboard/hooks/useDashboardSettings";

const SubscriptionSettings = () => {
  const { pricingTier } = useDashboard();
  const { setPricingTier, isUpdating } = useDashboardSettings();
  const [error, setError] = useState<string | null>(null);
  
  const handlePlanChange = async (plan: PricingTier) => {
    try {
      // Only update if the plan actually changes and not currently updating
      if (plan !== pricingTier && !isUpdating && setPricingTier) {
        await setPricingTier(plan);
      }
      
      // Clear any existing errors
      setError(null);
    } catch (err: any) {
      // Handle errors from the pricing tier change
      setError(err.message || "There was an error updating your subscription");
      
      toast({
        title: "Error updating subscription",
        description: err.message || "There was an error updating your subscription",
        variant: "destructive"
      });
    }
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
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Subscription error</AlertTitle>
              <AlertDescription className="flex items-center justify-between">
                <span>{error}</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="ml-2" 
                  onClick={() => setError(null)}
                >
                  Dismiss
                </Button>
              </AlertDescription>
            </Alert>
          )}
          
          <Alert className="mb-4">
            <Info className="h-4 w-4" />
            <AlertDescription>
              Changes to your subscription will be applied immediately. For more detailed plan information, visit the <a href="/subscription" className="underline">Subscription</a> page.
            </AlertDescription>
          </Alert>
          
          <PlanSwitcher 
            currentPlan={pricingTier} 
            onPlanChange={handlePlanChange}
            isUpdating={isUpdating}
          />
        </CardContent>
      </Card>
      
      <AIAssistant />
    </div>
  );
};

export default SubscriptionSettings;
