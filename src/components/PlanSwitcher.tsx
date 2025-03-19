
import React from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PricingTier } from "@/contexts/DashboardContext";
import { toast } from "@/components/ui/use-toast";

interface PlanSwitcherProps {
  currentPlan: PricingTier;
  onPlanChange: (plan: PricingTier) => void;
}

const PlanSwitcher: React.FC<PlanSwitcherProps> = ({ currentPlan, onPlanChange }) => {
  const handlePlanChange = (value: string) => {
    const newPlan = value as PricingTier;
    onPlanChange(newPlan);
    
    localStorage.setItem("pricing_tier", newPlan);
    
    toast({
      title: "Plan Changed",
      description: `Your plan has been updated to ${value}`,
    });
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground mr-1">Plan:</span>
      <Select value={currentPlan} onValueChange={handlePlanChange}>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Select plan" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="free">Free</SelectItem>
          <SelectItem value="standard">Standard</SelectItem>
          <SelectItem value="pro">Pro</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PlanSwitcher;
