
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { useDashboard } from "@/contexts/DashboardContext";

const PlanInfoCard = () => {
  const { pricingTier } = useDashboard();

  return (
    <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
      <CardHeader>
        <CardTitle>Your Plan</CardTitle>
        <CardDescription>Current subscription details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold capitalize">{pricingTier} Plan</span>
          {pricingTier !== 'enterprise' && (
            <Button size="sm" variant="outline" className="border-primary/30" asChild>
              <Link to="/subscription">Upgrade</Link>
            </Button>
          )}
        </div>
        
        <Separator />
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Projects</span>
            <span>{pricingTier === 'free' ? '5' : pricingTier === 'standard' ? '20' : 'Unlimited'}</span>
          </div>
          <div className="flex justify-between">
            <span>Storage</span>
            <span>{pricingTier === 'free' ? '5GB' : pricingTier === 'standard' ? '30GB' : '100GB'}</span>
          </div>
          <div className="flex justify-between">
            <span>AI Features</span>
            <span>{pricingTier === 'free' ? 'Limited' : 'Full Access'}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanInfoCard;
