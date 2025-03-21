import { useState, useMemo } from 'react';
import { ColorVersion } from './types';

export type SortOption = 'newest' | 'oldest' | 'name-asc' | 'name-desc' | 'last-used';

export function useVersionSorting(
  versions: ColorVersion[], 
  currentVersionId: string | null
) {
  // Sort state
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  
  // Sort versions based on the selected sort option
  const sortedVersions = useMemo(() => {
    // Make a copy to avoid mutating the original array
    const versionsToSort = [...versions];
    
    // Sort based on the selected option
    switch (sortOption) {
      case 'newest':
        return versionsToSort.sort((a, b) => b.timestamp - a.timestamp);
      
      case 'oldest':
        return versionsToSort.sort((a, b) => a.timestamp - b.timestamp);
      
      case 'name-asc':
        return versionsToSort.sort((a, b) => a.name.localeCompare(b.name));
      
      case 'name-desc':
        return versionsToSort.sort((a, b) => b.name.localeCompare(a.name));
      
      case 'last-used':
        return versionsToSort.sort((a, b) => {
          // If this is the current version, it should be first
          if (a.id === currentVersionId) return -1;
          if (b.id === currentVersionId) return 1;
          
          // Otherwise sort by lastUsed timestamp
          const aLastUsed = a.lastUsed || a.timestamp;
          const bLastUsed = b.lastUsed || b.timestamp;
          return bLastUsed - aLastUsed;
        });
      
      default:
        return versionsToSort;
    }
  }, [versions, sortOption, currentVersionId]);
  
  return {
    sortOption,
    setSortOption,
    sortedVersions
  };
}
