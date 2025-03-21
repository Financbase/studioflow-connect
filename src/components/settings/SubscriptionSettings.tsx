
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PlanSwitcher from "@/components/PlanSwitcher";
import { useDashboard } from "@/contexts/dashboard/useDashboard";
import { PricingTier } from "@/contexts/dashboard/types";
import { toast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, AlertTriangle } from "lucide-react";
import AIAssistant from "@/components/AIAssistant";
import { Button } from "@/components/ui/button";

const SubscriptionSettings = () => {
  const { pricingTier, setPricingTier } = useDashboard();
  const [error, setError] = useState<string | null>(null);
  
  const handlePlanChange = (plan: PricingTier) => {
    try {
      setPricingTier(plan);
      
      toast({
        title: "Subscription updated",
        description: `Your plan has been updated to ${plan.charAt(0).toUpperCase() + plan.slice(1)}`,
      });
      
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
          />
        </CardContent>
      </Card>
      
      <AIAssistant />
    </div>
  );
};

export default SubscriptionSettings;
