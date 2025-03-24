
import { useCallback, useState } from 'react';
import { PricingTier } from '../types';
import { useAuth } from '@/hooks/use-auth';
import { toast } from '@/hooks/use-toast';

/**
 * Function to determine if a user can downgrade from their current plan
 * to a new pricing tier.
 */
function isValidPlanChange(currentPlan: PricingTier, newPlan: PricingTier): boolean {
  // Free users can upgrade to any plan
  // Standard users can upgrade to pro or downgrade to free
  // Pro users can downgrade to standard or free
  
  const tiers: Record<PricingTier, number> = {
    'free': 0,
    'standard': 1,
    'pro': 2
  };
  
  // Allow any change if it's the same tier or an upgrade
  // Only allow downgrades of one tier at a time
  if (tiers[newPlan] >= tiers[currentPlan] || 
      tiers[currentPlan] - tiers[newPlan] <= 1) {
    return true;
  }
  
  return false;
}

/**
 * Custom hook for managing pricing tier-related functionality
 */
export const usePricingTier = () => {
  const { profile, updateProfile } = useAuth();
  const [isChangingTier, setIsChangingTier] = useState(false);
  
  /**
   * Update the user's pricing tier
   */
  const changePricingTier = useCallback(async (newTier: PricingTier): Promise<boolean> => {
    if (!profile) {
      toast.error({
        title: 'Error',
        description: 'You must be logged in to change your subscription plan'
      });
      return false;
    }
    
    // Check if the plan change is valid
    if (!isValidPlanChange(profile.plan as PricingTier, newTier)) {
      toast.error({
        title: 'Plan Downgrade Not Allowed',
        description: `You cannot downgrade from ${profile.plan} plan to ${newTier} plan.`
      });
      return false;
    }
    
    // Same plan, no need to update
    if (profile.plan === newTier) {
      return true;
    }
    
    setIsChangingTier(true);
    
    try {
      // In a real app, we would call a payment processor here
      // and handle the actual payment and subscription update
      
      // Update the user's profile with the new plan
      await updateProfile({ 
        plan: newTier
      });
        
      console.info('PricingTier changed:', newTier);
        
      // Show success message
      toast.default({
        title: 'Subscription Updated',
        description: `Your plan has been changed to ${newTier}.`
      });
      
      setIsChangingTier(false);
      return true;
    } catch (err) {
      console.error('Error in updating pricing tier:', err);
      toast.error({
        title: 'Error',
        description: 'An unexpected error occurred while updating your subscription'
      });
      setIsChangingTier(false);
      return false;
    }
  }, [profile, updateProfile]);
  
  return {
    currentTier: profile?.plan as PricingTier | undefined, 
    changePricingTier,
    isChangingTier
  };
};
