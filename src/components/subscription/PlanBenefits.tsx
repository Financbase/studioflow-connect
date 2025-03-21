
import React from "react";
import { PricingTier } from "@/contexts/dashboard/types";

interface PlanBenefitsProps {
  currentPlan: PricingTier;
}

const PlanBenefits: React.FC<PlanBenefitsProps> = ({ currentPlan }) => {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium mb-2">Plan Benefits</h3>
      
      {currentPlan === "free" && (
        <ul className="space-y-1 text-sm">
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
        <ul className="space-y-1 text-sm">
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
        <ul className="space-y-1 text-sm">
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
        <ul className="space-y-1 text-sm">
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
    </div>
  );
};

export default PlanBenefits;
