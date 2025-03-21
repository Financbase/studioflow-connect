
import { PricingTier } from './types';

/**
 * Checks if a plan change is valid (prevents downgrades from higher tiers)
 */
export const isValidPlanChange = (currentPlan: PricingTier, newPlan: PricingTier): boolean => {
  // Enterprise users cannot downgrade to any other plan
  if (currentPlan === "enterprise") {
    return newPlan === "enterprise";
  }
  
  // Pro users cannot downgrade to standard or free
  if (currentPlan === "pro" && (newPlan === "standard" || newPlan === "free")) {
    return false;
  }
  
  // Standard users cannot downgrade to free
  if (currentPlan === "standard" && newPlan === "free") {
    return false;
  }
  
  return true;
};
