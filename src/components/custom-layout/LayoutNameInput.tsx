
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface LayoutNameInputProps {
  layoutName: string;
  onLayoutNameChange: (name: string) => void;
  canSaveMultipleLayouts: boolean;
  pricingTier: string;
}

const LayoutNameInput = ({
  layoutName,
  onLayoutNameChange,
  canSaveMultipleLayouts,
  pricingTier
}: LayoutNameInputProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label htmlFor="layout-name">Layout Name</Label>
        {canSaveMultipleLayouts && (
          <Badge variant="outline" className="ml-2">
            {pricingTier === 'pro' ? 'Pro' : 'Enterprise'}
          </Badge>
        )}
      </div>
      <Input 
        id="layout-name" 
        value={layoutName} 
        onChange={(e) => onLayoutNameChange(e.target.value)}
        placeholder="Enter a name for this layout"
        className="w-full"
      />
      <p className="text-xs text-muted-foreground">
        {canSaveMultipleLayouts 
          ? "Pro users can save multiple custom layouts for different workflows" 
          : "Upgrade to Pro to save multiple custom layouts"}
      </p>
    </div>
  );
};

export default LayoutNameInput;
