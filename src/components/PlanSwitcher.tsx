
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
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

interface PlanSwitcherProps {
  currentPlan: PricingTier;
  onPlanChange: (plan: PricingTier) => void;
}

const PlanSwitcher: React.FC<PlanSwitcherProps> = ({ currentPlan, onPlanChange }) => {
  const { user } = useAuth();
  
  const handlePlanChange = async (value: string) => {
    const newPlan = value as PricingTier;
    
    try {
      if (user) {
        // Update the plan in the database
        const { error } = await supabase
          .from('profiles')
          .update({ 
            plan: newPlan,
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id);
          
        if (error) {
          throw error;
        }
      }
      
      // Update the state in the context
      onPlanChange(newPlan);
      
      toast({
        title: "Plan Changed",
        description: `Your plan has been updated to ${value}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update plan. " + error.message,
        variant: "destructive"
      });
    }
  };
  
  const getPlanBadge = (plan: PricingTier) => {
    switch(plan) {
      case "free":
        return <Badge variant="outline" className="ml-2">Free</Badge>;
      case "standard":
        return <Badge variant="secondary" className="ml-2">Standard</Badge>;
      case "pro":
        return <Badge variant="default" className="bg-gradient-to-r from-blue-500 to-purple-500 ml-2">Pro</Badge>;
    }
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
      {getPlanBadge(currentPlan)}
    </div>
  );
};

export default PlanSwitcher;
