
import { useState, useMemo } from 'react';
import { Recommendation } from '@/types/recommendation';
import { recommendations } from '@/data/recommendations';

export function useRecommendations(pricingTier: string = 'free') {
  const [activeCategory, setActiveCategory] = useState<string>('system');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Get all available categories
  const categories = useMemo(() => {
    return Object.keys(recommendations);
  }, []);

  // Get recommendations for the active category
  const activeRecommendations = useMemo(() => {
    return recommendations[activeCategory as keyof typeof recommendations] || [];
  }, [activeCategory]);

  // Filter recommendations based on search query
  const filteredRecommendations = useMemo(() => {
    if (!searchQuery.trim()) {
      return recommendations;
    }

    const query = searchQuery.toLowerCase();
    
    return Object.entries(recommendations).reduce((acc, [key, items]) => {
      const filtered = items.filter(
        item =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
          // Remove the reference to item.tags since it doesn't exist in the Recommendation type
      );
      
      if (filtered.length > 0) {
        acc[key] = filtered;
      }
      return acc;
    }, {} as Record<string, Recommendation[]>);
  }, [searchQuery]);

  // Get recommendations appropriate for the user's pricing tier
  const availableRecommendations = useMemo(() => {
    const tierLevel = {
      'free': 0,
      'standard': 1,
      'pro': 2
    };

    const userTierLevel = tierLevel[pricingTier as keyof typeof tierLevel] || 0;

    return Object.entries(recommendations).reduce((acc, [key, items]) => {
      acc[key] = items.map(item => ({
        ...item,
        isAvailable: tierLevel[item.requiredTier as keyof typeof tierLevel] <= userTierLevel
      }));
      return acc;
    }, {} as Record<string, (Recommendation & { isAvailable: boolean })[]>);
  }, [pricingTier]);

  return {
    categories,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    filteredRecommendations,
    activeRecommendations,
    availableRecommendations,
    allRecommendations: recommendations
  };
}
