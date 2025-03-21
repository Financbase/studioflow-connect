
import { useMemo } from 'react';
import { recommendations } from '@/data/featureRecommendations';
import { Recommendation } from '@/types/recommendation';
import { PricingTier } from '@/contexts/DashboardContext';

type FilterOptions = {
  category?: string;
  tier?: PricingTier;
  searchQuery?: string;
};

export const useFeatureRecommendations = () => {
  const getAllRecommendations = (): Recommendation[] => {
    return Object.values(recommendations).flat();
  };

  const getRecommendationsByCategory = (category: string): Recommendation[] => {
    return recommendations[category] || [];
  };

  const filterRecommendations = (options: FilterOptions = {}): Recommendation[] => {
    const { category, tier, searchQuery } = options;
    
    // Start with all recommendations or filter by category
    let filteredRecommendations = category 
      ? getRecommendationsByCategory(category)
      : getAllRecommendations();
    
    // Filter by tier if specified
    if (tier) {
      const tierLevels: PricingTier[] = ['free', 'standard', 'pro', 'enterprise'];
      const tierIndex = tierLevels.indexOf(tier);
      
      filteredRecommendations = filteredRecommendations.filter(rec => {
        const recTierIndex = tierLevels.indexOf(rec.requiredTier as PricingTier);
        // Include recommendations that are available at the user's tier or below
        return recTierIndex <= tierIndex;
      });
    }
    
    // Filter by search query if specified
    if (searchQuery && searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      filteredRecommendations = filteredRecommendations.filter(rec => 
        rec.title.toLowerCase().includes(query) || 
        rec.description.toLowerCase().includes(query) ||
        rec.category.toLowerCase().includes(query)
      );
    }
    
    return filteredRecommendations;
  };
  
  // Pre-filter some common recommendation sets
  const getAvailableRecommendations = (tier: PricingTier): Recommendation[] => {
    return filterRecommendations({ tier });
  };
  
  const getUpgradeRecommendations = (currentTier: PricingTier): Recommendation[] => {
    const tierLevels: PricingTier[] = ['free', 'standard', 'pro', 'enterprise'];
    const currentTierIndex = tierLevels.indexOf(currentTier);
    
    // Don't show upgrade recommendations for enterprise tier
    if (currentTier === 'enterprise') return [];
    
    return getAllRecommendations().filter(rec => {
      const recTierIndex = tierLevels.indexOf(rec.requiredTier as PricingTier);
      // Only include recommendations that require a higher tier
      return recTierIndex > currentTierIndex;
    });
  };

  return {
    getAllRecommendations,
    getRecommendationsByCategory,
    filterRecommendations,
    getAvailableRecommendations,
    getUpgradeRecommendations
  };
};
