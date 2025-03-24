
import { useState, useEffect, useCallback } from 'react';
import { PricingTier } from '../types';
import { useAuth } from '@/hooks/use-auth';
import { toast } from '@/hooks/use-toast';

interface UsePricingTierOptions {
  defaultTier?: PricingTier;
  storageKey?: string;
}

export const usePricingTier = (options: UsePricingTierOptions = {}) => {
  const { 
    defaultTier = 'free', 
    storageKey = 'studioflow_pricing_tier' 
  } = options;
  
  const { user } = useAuth();
  const [currentTier, setCurrentTier] = useState<PricingTier>(() => {
    if (typeof window === 'undefined') return defaultTier;
    
    try {
      const storedTier = localStorage.getItem(storageKey);
      if (storedTier) {
        return JSON.parse(storedTier) as PricingTier;
      }
    } catch (err) {
      console.error('Error reading pricing tier from storage:', err);
    }
    
    return defaultTier;
  });
  
  const [isChangingTier, setIsChangingTier] = useState(false);
  
  // Sync the pricing tier to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(currentTier));
    } catch (err) {
      console.error('Error saving pricing tier to storage:', err);
    }
  }, [currentTier, storageKey]);
  
  // Fetch the user's pricing tier from the server when they log in
  useEffect(() => {
    const fetchUserTier = async () => {
      if (!user) return;
      
      try {
        // In a real app, this would be an API call to get the user's pricing tier
        // This is a simulated delay for demo purposes
        setIsChangingTier(true);
        
        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For demo purposes, we'll just use the stored tier or default
        const storedTier = localStorage.getItem(storageKey);
        if (storedTier) {
          setCurrentTier(JSON.parse(storedTier) as PricingTier);
        }
      } catch (err) {
        console.error('Error fetching user pricing tier:', err);
        toast({
          title: 'Error',
          description: 'Could not fetch your subscription information',
          variant: 'destructive',
        });
      } finally {
        setIsChangingTier(false);
      }
    };
    
    fetchUserTier();
  }, [user, storageKey]);
  
  // Function to change the user's pricing tier
  const changePricingTier = useCallback(async (newTier: PricingTier): Promise<boolean> => {
    if (currentTier === newTier) return true;
    
    setIsChangingTier(true);
    
    try {
      // In a real app, this would be an API call to update the user's pricing tier
      // This is a simulated delay for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setCurrentTier(newTier);
      
      toast({
        title: 'Subscription Updated',
        description: `Your subscription has been updated to ${newTier}`,
      });
      
      return true;
    } catch (err) {
      console.error('Error changing pricing tier:', err);
      toast({
        title: 'Error',
        description: 'Could not update your subscription',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsChangingTier(false);
    }
  }, [currentTier]);
  
  return {
    currentTier,
    changePricingTier,
    isChangingTier,
    // Alias for easier integration with existing code
    isUpdating: isChangingTier
  };
};
