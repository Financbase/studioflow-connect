
import { useState, useEffect } from 'react';
import { recommendations } from '@/data/recommendations';
import { useDashboard } from '@/contexts/dashboard/useDashboard';

export const useFeatureRecommendations = (category?: string, limit: number = 3) => {
  const { pricingTier = 'free' } = useDashboard();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [recommendedFeatures, setRecommendedFeatures] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Get recommendations for the requested category or all categories
        let features;
        if (category && recommendations[category]) {
          features = recommendations[category];
        } else {
          // Get a mix of recommendations from all categories
          features = Object.values(recommendations)
            .flat()
            .sort(() => 0.5 - Math.random()); // Shuffle them
        }
        
        // Apply tier filtering - in a real app, this would be done server-side
        const tierLevel = {
          'free': 0,
          'standard': 1,
          'pro': 2
        };
        
        const userTierLevel = tierLevel[pricingTier as keyof typeof tierLevel] || 0;
        
        const filtered = features.filter(feature => {
          const featureTierLevel = tierLevel[feature.requiredTier as keyof typeof tierLevel] || 0;
          // Return all features, but mark some as unavailable
          return true;
        }).slice(0, limit).map(feature => {
          const featureTierLevel = tierLevel[feature.requiredTier as keyof typeof tierLevel] || 0;
          return {
            ...feature,
            isAvailable: featureTierLevel <= userTierLevel
          };
        });
        
        setRecommendedFeatures(filtered);
        setError(null);
      } catch (err) {
        console.error('Error fetching recommendations:', err);
        setError('Failed to load recommendations');
        setRecommendedFeatures([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecommendations();
  }, [category, pricingTier, limit]);
  
  return { 
    recommendations: recommendedFeatures, 
    loading, 
    error 
  };
};
