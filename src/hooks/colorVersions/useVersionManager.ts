import { useState, useCallback, useMemo } from 'react';
import { useLocalStorage } from '../../hooks/use-local-storage';
import { useVersionFiltering } from './useVersionFiltering';
import { useVersionSorting } from './useVersionSorting';
import { useVersionOperations } from './useVersionOperations';
import { useVersionImportExport } from './useVersionImportExport';
import { ColorVersion, VersionFilter } from './types';

// Default versions for initial setup
const defaultVersions: ColorVersion[] = [
  {
    id: 'default-dark',
    name: 'Default Dark',
    description: 'Default dark theme for StudioFlow',
    themeData: {
      '--background': '#09090B',
      '--foreground': '#fafafa',
      '--primary': '#6366f1',
      '--secondary': '#1e293b',
      '--accent': '#22d3ee',
    },
    timestamp: Date.now(),
    previewColors: ['#09090B', '#6366f1', '#22d3ee'],
    tags: ['dark', 'default'],
    isFavorite: true,
  },
  {
    id: 'default-light',
    name: 'Default Light',
    description: 'Default light theme for StudioFlow',
    themeData: {
      '--background': '#ffffff',
      '--foreground': '#09090B',
      '--primary': '#6366f1',
      '--secondary': '#f1f5f9',
      '--accent': '#0ea5e9',
    },
    timestamp: Date.now() - 100000,
    previewColors: ['#ffffff', '#6366f1', '#0ea5e9'],
    tags: ['light', 'default'],
    isFavorite: true,
  },
  {
    id: 'studio-dark',
    name: 'Studio Dark',
    description: 'Professional dark studio theme',
    themeData: {
      '--background': '#121212',
      '--foreground': '#e0e0e0',
      '--primary': '#bb86fc',
      '--secondary': '#1f1f1f',
      '--accent': '#03dac6',
    },
    timestamp: Date.now() - 200000,
    previewColors: ['#121212', '#bb86fc', '#03dac6'],
    tags: ['dark', 'professional', 'studio'],
    isFavorite: false,
  }
];

// Main hook for version management
export function useVersionManager() {
  // Store versions in local storage
  const [versions, setVersions] = useLocalStorage<ColorVersion[]>('studioflow-color-versions', defaultVersions);
  const [currentVersionId, setCurrentVersionId] = useLocalStorage<string | null>('studioflow-current-version', 'default-dark');
  
  // Get the current version based on ID
  const currentVersion = versions.find(version => version.id === currentVersionId) || versions[0];
  
  // Initialize sub-hooks
  const { 
    filterText, 
    setFilterText, 
    selectedTags, 
    setSelectedTags,
    onlyFavorites,
    setOnlyFavorites,
    filteredVersions,
    availableTags
  } = useVersionFiltering(versions);

  const { 
    sortOption, 
    setSortOption, 
    sortedVersions 
  } = useVersionSorting(filteredVersions, currentVersionId);

  const {
    createVersion,
    updateVersion,
    deleteVersion,
    duplicateVersion,
    setActiveVersion,
    toggleFavorite,
    addTag,
    removeTag,
    generateThemeVariation
  } = useVersionOperations(versions, currentVersionId, setVersions, setCurrentVersionId);

  const {
    exportVersionAsString,
    importVersionFromString,
    exportVersion,
    importVersion
  } = useVersionImportExport(versions, setVersions);

  // Get current version (function interface for ThemeContext)
  const getCurrentVersion = useCallback(() => {
    return currentVersion;
  }, [currentVersion]);

  // Aliases to maintain backward compatibility
  const addTagToVersion = addTag;
  const removeTagFromVersion = removeTag;
  const switchToVersion = setActiveVersion;
  const saveVersion = createVersion;

  // Filter state management
  const [filters, setFilters] = useState<VersionFilter>({
    search: '',
    tags: [],
    onlyFavorites: false
  });

  const updateFilters = useCallback((newFilters: Partial<VersionFilter>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    if (newFilters.search !== undefined) {
      setFilterText(newFilters.search);
    }
  }, [setFilterText]);

  const addTagFilter = useCallback((tag: string) => {
    setFilters(prev => ({
      ...prev, 
      tags: prev.tags.includes(tag) ? prev.tags : [...prev.tags, tag]
    }));
    setSelectedTags(prev => prev.includes(tag) ? prev : [...prev, tag]);
  }, [setSelectedTags]);

  const removeTagFilter = useCallback((tag: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
    setSelectedTags(prev => prev.filter(t => t !== tag));
  }, [setSelectedTags]);

  const toggleFavoritesFilter = useCallback(() => {
    setFilters(prev => ({
      ...prev,
      onlyFavorites: !prev.onlyFavorites
    }));
    setOnlyFavorites(prev => !prev);
  }, [setOnlyFavorites]);

  const resetFilters = useCallback(() => {
    setFilters({
      search: '',
      tags: [],
      onlyFavorites: false
    });
    setFilterText('');
    setSelectedTags([]);
    setOnlyFavorites(false);
  }, [setFilterText, setSelectedTags, setOnlyFavorites]);

  // Get all tags from all versions
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    versions.forEach(version => {
      version.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [versions]);

  // Return all the hooks and utilities
  return {
    versions,
    currentVersion,
    currentVersionId,
    
    // Version operations
    createVersion,
    updateVersion,
    deleteVersion,
    duplicateVersion,
    setActiveVersion,
    switchToVersion,
    toggleFavorite,
    
    // Tag operations
    addTag,
    removeTag,
    addTagToVersion,
    removeTagFromVersion,
    availableTags,
    allTags,
    
    // Filter operations
    filters,
    updateFilters,
    addTagFilter,
    removeTagFilter,
    toggleFavoritesFilter,
    resetFilters,
    filteredVersions,
    
    // Filter state
    filterText,
    setFilterText,
    selectedTags,
    setSelectedTags,
    onlyFavorites,
    setOnlyFavorites,
    
    // Sorting
    sortOption,
    setSortOption,
    sortedVersions,
    
    // Import/Export
    exportVersionAsString,
    importVersionFromString,
    exportVersion,
    importVersion,
    
    // Other utilities
    getCurrentVersion,
    saveVersion,
    generateThemeVariation
  };
}
