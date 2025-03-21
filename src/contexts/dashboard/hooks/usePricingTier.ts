
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';
import { toast } from '@/hooks/use-toast';
import { PricingTier, featureAccessMap, WidgetId } from '../types';
import { isValidPlanChange } from '../utils';

export const usePricingTier = (user: User | null, profile: any) => {
  // Pricing tier state - load from profile if available
  const [pricingTier, setPricingTier] = useState<PricingTier>('free');
  
  // Load pricing tier from profile
  useEffect(() => {
    if (profile && profile.plan) {
      // Ensure plan is one of the allowed values
      const planValue = profile.plan as PricingTier;
      if (planValue === 'free' || planValue === 'standard' || planValue === 'pro' || planValue === 'enterprise') {
        setPricingTier(planValue);
        console.log("Setting pricing tier from profile:", planValue);
      }
    }
  }, [profile]);
  
  // Update user profile when pricing tier changes
  useEffect(() => {
    const updatePricingTier = async () => {
      if (user && profile && profile.plan !== pricingTier) {
        // Check if the plan change is valid
        if (!isValidPlanChange(profile.plan as PricingTier, pricingTier)) {
          toast.destructive({
            title: 'Plan Downgrade Not Allowed',
            description: `You cannot downgrade from ${profile.plan} plan to ${pricingTier} plan.`
          });
          
          // Reset to the current plan in profile
          setPricingTier(profile.plan as PricingTier);
          return;
        }
        
        try {
          const { error } = await supabase
            .from('profiles')
            .update({
              plan: pricingTier,
              updated_at: new Date().toISOString()
            })
            .eq('id', user.id);
            
          if (error) {
            console.error('Error updating pricing tier:', error);
            toast.destructive({
              title: 'Error',
              description: 'Could not update subscription plan'
            });
          } else {
            toast.default({
              title: 'Plan Updated',
              description: `Your plan has been updated to ${pricingTier}`
            });
          }
        } catch (err) {
          console.error('Error in updating pricing tier:', err);
        }
      }
    };
    
    if (user && profile) {
      updatePricingTier();
    }
  }, [pricingTier, user, profile]);

  // Check if user has access to the feature based on pricing tier
  const hasFeatureAccess = (widgetId: WidgetId): boolean => {
    return featureAccessMap[pricingTier][widgetId];
  };

  return {
    pricingTier,
    setPricingTier,
    hasFeatureAccess,
    featureAccess: featureAccessMap[pricingTier]
  };
};
