
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';
import { toast } from '@/hooks/use-toast';
import { PricingTier, featureAccessMap, WidgetId } from '../types';
import { isValidPlanChange } from '../utils';

export const usePricingTier = (user: User | null, profile: any) => {
  // Pricing tier state - load from profile if available
  const [pricingTier, setPricingTier] = useState<PricingTier>('free');
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Load pricing tier from profile
  useEffect(() => {
    if (profile && profile.plan) {
      try {
        // Ensure plan is one of the allowed values
        const planValue = profile.plan as PricingTier;
        if (['free', 'standard', 'pro', 'enterprise'].includes(planValue)) {
          setPricingTier(planValue);
          console.log("Setting pricing tier from profile:", planValue);
        } else {
          console.warn(`Invalid plan value in profile: ${planValue}, defaulting to free`);
          setPricingTier('free');
        }
      } catch (err) {
        console.error("Error loading pricing tier from profile:", err);
        setPricingTier('free');
      }
    }
  }, [profile]);
  
  // Update user profile when pricing tier changes
  const updatePricingTierInDB = useCallback(async (newTier: PricingTier) => {
    if (!user || !profile) {
      console.warn("Cannot update pricing tier: Missing user or profile");
      return false;
    }
    
    // Check if the plan change is valid
    if (!isValidPlanChange(profile.plan as PricingTier, newTier)) {
      toast.error({
        title: 'Plan Downgrade Not Allowed',
        description: `You cannot downgrade from ${profile.plan} plan to ${newTier} plan.`
      });
      
      // Reset to the current plan in profile
      return false;
    }
    
    setIsUpdating(true);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          plan: newTier,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
        
      if (error) {
        console.error('Error updating pricing tier:', error);
        toast.error({
          title: 'Error',
          description: 'Could not update subscription plan'
        });
        return false;
      } 
      
      toast.default({
        title: 'Plan Updated',
        description: `Your plan has been updated to ${newTier}`
      });
      return true;
    } catch (err) {
      console.error('Error in updating pricing tier:', err);
      toast.error({
        title: 'Error',
        description: 'An unexpected error occurred while updating your subscription'
      });
      return false;
    } finally {
      setIsUpdating(false);
    }
  }, [user, profile]);
  
  // Safely update the pricing tier with validation
  const setValidatedPricingTier = useCallback(async (newTier: PricingTier) => {
    // Skip if the tier is the same
    if (newTier === pricingTier) return;
    
    // Only attempt to update the DB if needed
    const success = await updatePricingTierInDB(newTier);
    if (success) {
      setPricingTier(newTier);
    }
  }, [pricingTier, updatePricingTierInDB]);

  // Check if user has access to the feature based on pricing tier
  const hasFeatureAccess = useCallback((widgetId: WidgetId): boolean => {
    return featureAccessMap[pricingTier][widgetId];
  }, [pricingTier]);

  return {
    pricingTier,
    setPricingTier: setValidatedPricingTier,
    isUpdating,
    hasFeatureAccess,
    featureAccess: featureAccessMap[pricingTier]
  };
};
