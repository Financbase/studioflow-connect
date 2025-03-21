
import { useState, useMemo } from 'react';
import { Recommendation } from '@/types/recommendation';
import { recommendations } from '@/data/recommendations';

interface UseRecommendationsProps {
  initialCategory?: string;
  pricingTier?: string;
  limit?: number;
  filterByTier?: boolean;
}

export function useRecommendations({
  initialCategory = 'system',
  pricingTier = 'free',
  limit,
  filterByTier = true
}: UseRecommendationsProps = {}) {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Get all available categories
  const categories = useMemo(() => {
    return Object.keys(recommendations);
  }, []);

  // Determine tier levels for filtering
  const tierLevel = useMemo(() => ({
    'free': 0,
    'standard': 1,
    'pro': 2
  }), []);
  
  const userTierLevel = useMemo(() => 
    tierLevel[pricingTier as keyof typeof tierLevel] || 0, 
  [pricingTier, tierLevel]);

  // Get recommendations for the active category
  const activeRecommendations = useMemo(() => {
    const items = recommendations[activeCategory as keyof typeof recommendations] || [];
    
    // Apply tier filtering if needed
    if (!filterByTier) return items;
    
    return items.map(item => {
      const recTierLevel = tierLevel[item.requiredTier as keyof typeof tierLevel] || 0;
      return {
        ...item,
        isAvailable: recTierLevel <= userTierLevel
      };
    });
  }, [activeCategory, filterByTier, tierLevel, userTierLevel]);

  // Filter recommendations based on search query
  const filteredRecommendations = useMemo(() => {
    if (!searchQuery.trim()) {
      // If no search query, return all recommendations
      if (!filterByTier) {
        return recommendations;
      }
      
      // Apply tier filtering if needed
      return Object.entries(recommendations).reduce((acc, [key, items]) => {
        acc[key] = items.map(item => {
          const recTierLevel = tierLevel[item.requiredTier as keyof typeof tierLevel] || 0;
          return {
            ...item,
            isAvailable: recTierLevel <= userTierLevel
          };
        });
        return acc;
      }, {} as Record<string, Recommendation[]>);
    }

    const query = searchQuery.toLowerCase();
    
    // Filter by search query and apply tier filtering if needed
    return Object.entries(recommendations).reduce((acc, [key, items]) => {
      const filtered = items.filter(
        item =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      ).map(item => {
        if (!filterByTier) return item;
        
        const recTierLevel = tierLevel[item.requiredTier as keyof typeof tierLevel] || 0;
        return {
          ...item,
          isAvailable: recTierLevel <= userTierLevel
        };
      });
      
      if (filtered.length > 0) {
        acc[key] = filtered;
      }
      return acc;
    }, {} as Record<string, Recommendation[]>);
  }, [searchQuery, filterByTier, tierLevel, userTierLevel]);

  // Get specific recommendation by ID
  const getRecommendationById = useMemo(() => {
    return (id?: string): Recommendation | null => {
      if (!id) return null;
      
      const allRecs = Object.values(recommendations).flat();
      const recommendation = allRecs.find(rec => rec.id === id);
      
      if (!recommendation) return null;
      
      if (!filterByTier) return recommendation;
      
      const recTierLevel = tierLevel[recommendation.requiredTier as keyof typeof tierLevel] || 0;
      return {
        ...recommendation,
        isAvailable: recTierLevel <= userTierLevel
      };
    };
  }, [filterByTier, tierLevel, userTierLevel]);

  // Get limited recommendations if limit is provided
  const limitedRecommendations = useMemo(() => {
    if (!limit || limit <= 0) {
      return activeRecommendations;
    }
    return activeRecommendations.slice(0, limit);
  }, [activeRecommendations, limit]);

  return {
    categories,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    activeRecommendations: limitedRecommendations,
    filteredRecommendations,
    getRecommendationById,
    allRecommendations: recommendations
  };
}
