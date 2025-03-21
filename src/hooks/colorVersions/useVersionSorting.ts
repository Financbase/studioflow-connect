
import { useState } from 'react';
import { ColorVersion } from './types';

export type SortOption = 'newest' | 'oldest' | 'alphabetical' | 'favorites' | 'recent';

export function useVersionSorting(versions: ColorVersion[], currentVersionId: string | null) {
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  
  // Sort versions based on selected criteria
  const sortedVersions = [...versions].sort((a, b) => {
    // First prioritize active version
    if (a.id === currentVersionId) return -1;
    if (b.id === currentVersionId) return 1;
    
    switch (sortOption) {
      case 'newest':
        return b.timestamp - a.timestamp;
        
      case 'oldest':
        return a.timestamp - b.timestamp;
        
      case 'alphabetical':
        return a.name.localeCompare(b.name);
        
      case 'favorites':
        // Sort by favorite status then by date
        if (a.isFavorite && !b.isFavorite) return -1;
        if (!a.isFavorite && b.isFavorite) return 1;
        return b.timestamp - a.timestamp;
        
      case 'recent':
        // This would use a separate "lastUsed" timestamp
        // For now, fall back to newest if lastUsed isn't available
        return b.timestamp - a.timestamp;
        
      default:
        return 0;
    }
  });
  
  return {
    sortOption,
    setSortOption,
    sortedVersions
  };
}
