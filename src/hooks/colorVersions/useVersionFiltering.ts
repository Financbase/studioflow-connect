
import { useState, useMemo, useEffect } from 'react';
import { ColorVersion, VersionFilter } from './types';

export function useVersionFiltering(versions: ColorVersion[]) {
  const [filters, setFilters] = useState<VersionFilter>({
    search: '',
    tags: [],
    onlyFavorites: false
  });
  
  // Get all unique tags from all versions
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    versions.forEach(version => {
      version.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [versions]);
  
  // Apply filters to versions
  const filteredVersions = useMemo(() => {
    return versions.filter(version => {
      // Filter by search term
      const matchesSearch = !filters.search || 
        version.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        (version.description?.toLowerCase() || '').includes(filters.search.toLowerCase()) ||
        version.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()));
      
      // Filter by selected tags
      const matchesTags = filters.tags.length === 0 || 
        filters.tags.every(tag => version.tags.includes(tag));
      
      // Filter by favorites
      const matchesFavorites = !filters.onlyFavorites || version.isFavorite;
      
      return matchesSearch && matchesTags && matchesFavorites;
    });
  }, [versions, filters]);
  
  // Update filters
  const updateFilters = (newFilters: Partial<VersionFilter>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };
  
  // Add a tag to filters
  const addTagFilter = (tag: string) => {
    if (!filters.tags.includes(tag)) {
      updateFilters({ tags: [...filters.tags, tag] });
    }
  };
  
  // Remove a tag from filters
  const removeTagFilter = (tag: string) => {
    updateFilters({ tags: filters.tags.filter(t => t !== tag) });
  };
  
  // Toggle favorites only filter
  const toggleFavoritesFilter = () => {
    updateFilters({ onlyFavorites: !filters.onlyFavorites });
  };
  
  // Reset all filters
  const resetFilters = () => {
    setFilters({
      search: '',
      tags: [],
      onlyFavorites: false
    });
  };
  
  return {
    filters,
    filteredVersions,
    updateFilters,
    addTagFilter,
    removeTagFilter,
    toggleFavoritesFilter,
    resetFilters,
    allTags
  };
}
