
import { useMemo } from 'react';
import { Recommendation } from '@/types/recommendation';

interface FilterOptions {
  search?: string;
  category?: string;
  requiredTier?: string;
  sortBy?: 'newest' | 'popularity' | 'relevance';
}

export const useRecommendationFilter = (
  recommendations: Recommendation[],
  options: FilterOptions = {}
) => {
  const { search, category, requiredTier, sortBy } = options;
  
  const filteredRecommendations = useMemo(() => {
    let filtered = [...recommendations];
    
    // Filter by search term
    if (search && search.trim() !== '') {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(rec => 
        rec.title.toLowerCase().includes(searchLower) || 
        rec.description.toLowerCase().includes(searchLower) ||
        (rec.tags && rec.tags.some(tag => tag.toLowerCase().includes(searchLower)))
      );
    }
    
    // Filter by category
    if (category && category !== 'all') {
      filtered = filtered.filter(rec => rec.category === category);
    }
    
    // Filter by tier
    if (requiredTier) {
      const tierLevels = {
        'free': 0,
        'standard': 1,
        'pro': 2
      };
      
      const requiredLevel = tierLevels[requiredTier as keyof typeof tierLevels] || 0;
      
      filtered = filtered.filter(rec => {
        const recTierLevel = tierLevels[rec.requiredTier as keyof typeof tierLevels] || 0;
        return recTierLevel <= requiredLevel;
      });
    }
    
    // Sort results
    if (sortBy) {
      switch (sortBy) {
        case 'newest':
          filtered.sort((a, b) => ((b.createdAt ?? 0) - (a.createdAt ?? 0)));
          break;
        case 'popularity':
          filtered.sort((a, b) => ((b.popularity ?? 0) - (a.popularity ?? 0)));
          break;
        case 'relevance':
          // This would normally be handled server-side with a more sophisticated algorithm
          // But we'll do a basic implementation here
          if (search) {
            const searchLower = search.toLowerCase();
            filtered.sort((a, b) => {
              const aTitle = a.title.toLowerCase();
              const bTitle = b.title.toLowerCase();
              
              // Exact title matches get highest priority
              if (aTitle === searchLower && bTitle !== searchLower) return -1;
              if (bTitle === searchLower && aTitle !== searchLower) return 1;
              
              // Title starts with search term gets next priority
              if (aTitle.startsWith(searchLower) && !bTitle.startsWith(searchLower)) return -1;
              if (bTitle.startsWith(searchLower) && !aTitle.startsWith(searchLower)) return 1;
              
              // Default to popularity
              return ((b.popularity ?? 0) - (a.popularity ?? 0));
            });
          }
          break;
      }
    }
    
    return filtered;
  }, [recommendations, search, category, requiredTier, sortBy]);
  
  return {
    filteredRecommendations,
    count: filteredRecommendations.length
  };
};
