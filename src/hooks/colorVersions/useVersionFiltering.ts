
import { useState, useEffect, useMemo } from 'react';
import { ColorVersion } from './types';

export function useVersionFiltering(versions: ColorVersion[]) {
  // Filter state
  const [filterText, setFilterText] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  
  // Filter versions based on search text, tags, and favorites
  const filteredVersions = useMemo(() => {
    return versions.filter(version => {
      // Filter by search text
      const matchesText = !filterText.trim() || 
        version.name.toLowerCase().includes(filterText.toLowerCase()) ||
        (version.description?.toLowerCase().includes(filterText.toLowerCase()));
      
      // Filter by selected tags
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => version.tags.includes(tag));
      
      // Filter by favorites
      const matchesFavorites = !onlyFavorites || version.isFavorite;
      
      return matchesText && matchesTags && matchesFavorites;
    });
  }, [versions, filterText, selectedTags, onlyFavorites]);
  
  // Get all available tags from versions
  const availableTags = useMemo(() => {
    const tagSet = new Set<string>();
    versions.forEach(version => {
      version.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [versions]);
  
  return {
    filterText,
    setFilterText,
    selectedTags,
    setSelectedTags,
    onlyFavorites,
    setOnlyFavorites,
    filteredVersions,
    availableTags
  };
}
