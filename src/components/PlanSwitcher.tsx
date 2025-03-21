
import React from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PricingTier } from "@/contexts/dashboard/types";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, Award, Zap, Building } from "lucide-react";

interface PlanSwitcherProps {
  currentPlan: PricingTier;
  onPlanChange: (plan: PricingTier) => void;
}

const PlanSwitcher: React.FC<PlanSwitcherProps> = ({ currentPlan, onPlanChange }) => {
  // Function to simulate a subscription upgrade
  const handleUpgradeSubscription = async (newPlan: PricingTier) => {
    toast({
      title: "Upgrade Required",
      description: "Please subscribe to upgrade your plan. This would typically redirect to a payment page.",
    });
  };
  
  const getPlanBadge = (plan: PricingTier) => {
    switch(plan) {
      case "free":
        return <Badge variant="outline" className="ml-2">Free</Badge>;
      case "standard":
        return <Badge variant="secondary" className="ml-2">Standard</Badge>;
      case "pro":
        return <Badge variant="default" className="bg-gradient-to-r from-gray-500 to-gray-700 text-white ml-2">Pro</Badge>;
      case "enterprise":
        return <Badge variant="default" className="bg-gradient-to-r from-gray-700 to-black text-white ml-2">Enterprise</Badge>;
    }
  };

  const getPlanIcon = (plan: PricingTier) => {
    switch(plan) {
      case "free":
        return <CreditCard className="h-4 w-4 mr-2" />;
      case "standard":
        return <Award className="h-4 w-4 mr-2" />;
      case "pro":
        return <Zap className="h-4 w-4 mr-2" />;
      case "enterprise":
        return <Building className="h-4 w-4 mr-2" />;
    }
  };

  // Generate upgrade options based on current plan
  const renderUpgradeOptions = () => {
    if (currentPlan === "enterprise") {
      return <div className="text-sm text-muted-foreground">You're on our highest tier plan</div>;
    }
    
    if (currentPlan === "pro") {
      return (
        <Button 
          onClick={() => handleUpgradeSubscription("enterprise")}
          className="bg-gradient-to-r from-gray-700 to-black text-white"
        >
          <Building className="mr-2 h-4 w-4" />
          Upgrade to Enterprise
        </Button>
      );
    }
    
    if (currentPlan === "standard") {
      return (
        <div className="flex flex-col gap-2">
          <Button 
            onClick={() => handleUpgradeSubscription("pro")}
            className="bg-gradient-to-r from-gray-500 to-gray-700 text-white"
          >
            <Zap className="mr-2 h-4 w-4" />
            Upgrade to Pro
          </Button>
          <Button 
            onClick={() => handleUpgradeSubscription("enterprise")}
            className="bg-gradient-to-r from-gray-700 to-black text-white"
          >
            <Building className="mr-2 h-4 w-4" />
            Upgrade to Enterprise
          </Button>
        </div>
      );
    }
    
    return (
      <div className="flex flex-col gap-2">
        <Button 
          onClick={() => handleUpgradeSubscription("standard")}
          variant="secondary"
        >
          <Award className="mr-2 h-4 w-4" />
          Upgrade to Standard
        </Button>
        <Button 
          onClick={() => handleUpgradeSubscription("pro")}
          className="bg-gradient-to-r from-gray-500 to-gray-700 text-white"
        >
          <Zap className="mr-2 h-4 w-4" />
          Upgrade to Pro
        </Button>
        <Button 
          onClick={() => handleUpgradeSubscription("enterprise")}
          className="bg-gradient-to-r from-gray-700 to-black text-white"
        >
          <Building className="mr-2 h-4 w-4" />
          Upgrade to Enterprise
        </Button>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground mr-1">Current Plan:</span>
        <div className="flex items-center">
          {getPlanIcon(currentPlan)}
          <span className="font-medium capitalize">{currentPlan}</span>
          {getPlanBadge(currentPlan)}
        </div>
      </div>
      
      <div className="p-4 bg-muted rounded-lg">
        <h3 className="text-sm font-medium mb-2">Plan Benefits</h3>
        
        {currentPlan === "free" && (
          <ul className="space-y-1 text-sm mb-4">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
              <span>Basic Studio Access</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
              <span>Limited Cloud Storage</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
              <span>Basic Project Exports</span>
            </li>
          </ul>
        )}
        
        {currentPlan === "standard" && (
          <ul className="space-y-1 text-sm mb-4">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
              <span>Everything in Free</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
              <span>Advanced Audio Tools</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
              <span>Unlimited Projects</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
              <span>Increased Storage</span>
            </li>
          </ul>
        )}
        
        {currentPlan === "pro" && (
          <ul className="space-y-1 text-sm mb-4">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
              <span>Everything in Standard</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
              <span>AI Audio Tools</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
              <span>Priority Support</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
              <span>AI Assistant Access</span>
            </li>
          </ul>
        )}
        
        {currentPlan === "enterprise" && (
          <ul className="space-y-1 text-sm mb-4">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
              <span>Everything in Pro</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
              <span>Custom Sound Library</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
              <span>Dedicated Account Manager</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
              <span>White Label Option</span>
            </li>
          </ul>
        )}
        
        {renderUpgradeOptions()}
      </div>
    </div>
  );
};

export default PlanSwitcher;
