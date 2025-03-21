
import { useState, useMemo } from 'react';
import { ColorVersion, VersionFilter } from './types';

// Hook for filtering color versions by text, tags, and favorites
export function useVersionFiltering(versions: ColorVersion[]) {
  const [filterText, setFilterText] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  // Get all available tags across all versions
  const availableTags = useMemo(() => {
    const tagSet = new Set<string>();
    versions.forEach(version => {
      version.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [versions]);

  // Filter versions based on current filters
  const filteredVersions = useMemo(() => {
    return versions.filter(version => {
      // Filter by text (name or description)
      const textMatch = filterText === '' || 
        version.name.toLowerCase().includes(filterText.toLowerCase()) ||
        (version.description && version.description.toLowerCase().includes(filterText.toLowerCase()));
      
      // Filter by tags
      const tagsMatch = selectedTags.length === 0 || 
        selectedTags.every(tag => version.tags.includes(tag));
      
      // Filter by favorites
      const favoriteMatch = !onlyFavorites || version.isFavorite;
      
      return textMatch && tagsMatch && favoriteMatch;
    });
  }, [versions, filterText, selectedTags, onlyFavorites]);

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
