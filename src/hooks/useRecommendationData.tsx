
import { useMemo } from 'react';
import { recommendations } from '@/data/recommendations';
import { Recommendation } from '@/types/recommendation';

interface UseRecommendationDataProps {
  category?: string;
  id?: string;
  pricingTier?: string;
  limit?: number;
  filterByTier?: boolean;
}

export const useRecommendationData = ({
  category,
  id,
  pricingTier = 'free',
  limit,
  filterByTier = false
}: UseRecommendationDataProps = {}) => {
  
  const tierLevel = useMemo(() => ({
    'free': 0,
    'standard': 1,
    'pro': 2
  }), []);
  
  const userTierLevel = useMemo(() => 
    tierLevel[pricingTier as keyof typeof tierLevel] || 0, 
  [pricingTier, tierLevel]);
  
  // Get all recommendations or filter by category
  const categoryRecommendations = useMemo(() => {
    if (category && recommendations[category]) {
      return recommendations[category];
    }
    return Object.values(recommendations).flat();
  }, [category]);
  
  // Filter by tier if needed
  const availableRecommendations = useMemo(() => {
    if (!filterByTier) return categoryRecommendations;
    
    return categoryRecommendations.filter(rec => {
      const recTierLevel = tierLevel[rec.requiredTier as keyof typeof tierLevel] || 0;
      return recTierLevel <= userTierLevel;
    });
  }, [categoryRecommendations, filterByTier, tierLevel, userTierLevel]);
  
  // Apply limit if provided
  const limitedRecommendations = useMemo(() => {
    if (limit && limit > 0) {
      return availableRecommendations.slice(0, limit);
    }
    return availableRecommendations;
  }, [availableRecommendations, limit]);
  
  // Get specific recommendation by ID
  const recommendation = useMemo(() => {
    if (!id) return null;
    return categoryRecommendations.find(rec => rec.id === id) || null;
  }, [id, categoryRecommendations]);
  
  // Check if a recommendation is available for the user's tier
  const isRecommendationAvailable = useMemo(() => {
    if (!recommendation) return false;
    const recTierLevel = tierLevel[recommendation.requiredTier as keyof typeof tierLevel] || 0;
    return recTierLevel <= userTierLevel;
  }, [recommendation, tierLevel, userTierLevel]);
  
  return {
    recommendations: limitedRecommendations,
    recommendation,
    isAvailable: isRecommendationAvailable,
    categories: Object.keys(recommendations),
    allRecommendations: recommendations
  };
};
