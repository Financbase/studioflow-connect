
import { useState, useEffect } from 'react';
import { ColorVersion, VersionFilter } from './types';

export function useVersionFiltering(versions: ColorVersion[]) {
  const [filters, setFilters] = useState<VersionFilter>({
    sortBy: 'date',
    sortDirection: 'desc'
  });
  const [filteredVersions, setFilteredVersions] = useState<ColorVersion[]>([]);
  
  // Apply filters whenever versions or filters change
  useEffect(() => {
    let result = [...versions];
    
    // Apply search filter
    if (filters.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(v => 
        v.name.toLowerCase().includes(search) || 
        (v.description && v.description.toLowerCase().includes(search)) ||
        (v.tags && v.tags.some(tag => tag.toLowerCase().includes(search)))
      );
    }
    
    // Apply tag filters
    if (filters.tags && filters.tags.length > 0) {
      result = result.filter(v => 
        v.tags && filters.tags?.some(tag => v.tags?.includes(tag))
      );
    }
    
    // Apply sorting
    if (filters.sortBy) {
      result.sort((a, b) => {
        let comparison = 0;
        
        switch (filters.sortBy) {
          case 'name':
            comparison = a.name.localeCompare(b.name);
            break;
          case 'date':
            comparison = a.timestamp - b.timestamp;
            break;
          case 'favorites':
            comparison = (a.isFavorite ? 1 : 0) - (b.isFavorite ? 1 : 0);
            break;
        }
        
        return filters.sortDirection === 'desc' ? -comparison : comparison;
      });
    }
    
    setFilteredVersions(result);
  }, [versions, filters]);
  
  // Update filters
  const updateFilters = (newFilters: Partial<VersionFilter>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };
  
  return {
    filters,
    filteredVersions,
    updateFilters
  };
}
