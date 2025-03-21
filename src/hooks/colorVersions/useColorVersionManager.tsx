import { useState, useEffect, useCallback, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from '../../hooks/use-local-storage';
import { toast } from '@/components/ui/use-toast';
import { useVersionFiltering } from './useVersionFiltering';
import { useVersionSorting } from './useVersionSorting';
import {
  ColorVersion,
  VersionFilter,
  VersionUpdateData,
  ThemeMode,
  ThemeVariant
} from './types';
import { generateThemePalette } from '@/lib/colorUtils/themeGenerator';

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

// Hook for managing theme color versions
export function useColorVersionManager() {
  // Store versions in local storage
  const [versions, setVersions] = useLocalStorage<ColorVersion[]>('studioflow-color-versions', defaultVersions);
  const [currentVersionId, setCurrentVersionId] = useLocalStorage<string | null>('studioflow-current-version', 'default-dark');
  
  // Get the current version based on ID
  const currentVersion = versions.find(version => version.id === currentVersionId) || versions[0];
  
  // Setup filtering and sorting hooks
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

  // Get current version (function interface for ThemeContext)
  const getCurrentVersion = useCallback(() => {
    return currentVersion;
  }, [currentVersion]);

  // Operations for managing versions
  const createVersion = useCallback((
    name: string, 
    themeData: Record<string, string>, 
    description?: string, 
    tags?: string[]
  ): ColorVersion => {
    const newVersion: ColorVersion = {
      id: uuidv4(),
      name,
      description,
      themeData,
      timestamp: Date.now(),
      previewColors: Object.values(themeData).slice(0, 3),
      tags: tags || [],
      isFavorite: false,
      lastUsed: Date.now()
    };

    setVersions(prev => [newVersion, ...prev]);
    toast({
      title: "Version Created",
      description: `"${name}" theme has been created.`,
    });

    return newVersion;
  }, [setVersions]);

  const updateVersion = useCallback((id: string, data: VersionUpdateData) => {
    setVersions(prev => prev.map(version => 
      version.id === id ? { ...version, ...data } : version
    ));

    toast({
      title: "Version Updated",
      description: `Theme version has been updated.`,
    });
  }, [setVersions]);

  const deleteVersion = useCallback((id: string) => {
    // Don't delete if it's the last version
    if (versions.length <= 1) {
      toast({
        variant: "destructive",
        title: "Cannot Delete",
        description: "At least one theme version must exist.",
      });
      return;
    }

    // If deleting current version, select another one
    if (id === currentVersionId) {
      const otherVersion = versions.find(v => v.id !== id);
      if (otherVersion) {
        setCurrentVersionId(otherVersion.id);
      }
    }

    setVersions(prev => prev.filter(version => version.id !== id));
    
    toast({
      title: "Version Deleted",
      description: "Theme version has been removed.",
    });
  }, [versions, currentVersionId, setCurrentVersionId, setVersions]);

  const duplicateVersion = useCallback((id: string) => {
    const versionToDuplicate = versions.find(version => version.id === id);
    
    if (!versionToDuplicate) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not find version to duplicate.",
      });
      return;
    }

    const newVersion: ColorVersion = {
      ...versionToDuplicate,
      id: uuidv4(),
      name: `${versionToDuplicate.name} (Copy)`,
      timestamp: Date.now(),
      isFavorite: false,
      lastUsed: Date.now()
    };

    setVersions(prev => [newVersion, ...prev]);
    
    toast({
      title: "Version Duplicated",
      description: `Created copy of "${versionToDuplicate.name}".`,
    });

    return newVersion;
  }, [versions, setVersions]);

  const setActiveVersion = useCallback((id: string) => {
    const version = versions.find(v => v.id === id);
    
    if (!version) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not find version to activate.",
      });
      return;
    }

    // Update lastUsed timestamp
    setVersions(prev => prev.map(v => 
      v.id === id ? { ...v, lastUsed: Date.now() } : v
    ));

    setCurrentVersionId(id);
    
    toast({
      title: "Theme Changed",
      description: `Switched to "${version.name}" theme.`,
    });
  }, [versions, setCurrentVersionId, setVersions]);

  const toggleFavorite = useCallback((id: string) => {
    setVersions(prev => prev.map(version => 
      version.id === id 
        ? { ...version, isFavorite: !version.isFavorite } 
        : version
    ));
  }, [setVersions]);

  // Note: We already have addTag and removeTag functions that do what addTagToVersion and removeTagFromVersion should do
  // We'll simply make addTagToVersion and removeTagFromVersion point to these existing functions
  const addTag = useCallback((id: string, tag: string) => {
    setVersions(prev => prev.map(version => 
      version.id === id && !version.tags.includes(tag)
        ? { ...version, tags: [...version.tags, tag] }
        : version
    ));
  }, [setVersions]);

  const removeTag = useCallback((id: string, tag: string) => {
    setVersions(prev => prev.map(version => 
      version.id === id
        ? { ...version, tags: version.tags.filter(t => t !== tag) }
        : version
    ));
  }, [setVersions]);

  // Create aliases for these functions to match what's being called in ThemeVersionControl.tsx
  const addTagToVersion = addTag;
  const removeTagFromVersion = removeTag;

  const exportVersionAsString = useCallback((id: string): string | null => {
    const version = versions.find(v => v.id === id);
    
    if (!version) {
      toast({
        title: "Export Failed",
        description: "The selected theme version could not be found",
        variant: "destructive"
      });
      return null;
    }
    
    // Create a export-friendly object
    const exportData = {
      id: version.id,
      name: version.name,
      description: version.description,
      themeData: version.themeData,
      tags: version.tags,
      timestamp: version.timestamp,
      type: "studioflow-theme-version",
      version: "1.0"
    };
    
    return JSON.stringify(exportData, null, 2);
  }, [versions]);
  
  const importVersionFromString = useCallback((jsonString: string): ColorVersion | null => {
    try {
      const importedData = JSON.parse(jsonString);
      
      // Verify this is a valid theme version
      if (!importedData.themeData || !importedData.name) {
        throw new Error("Invalid theme version format");
      }
      
      // Check if a version with this ID already exists
      const existingVersion = versions.find(v => v.id === importedData.id);
      
      // Create a new version with a new ID to avoid conflicts
      const newVersion: ColorVersion = {
        id: existingVersion ? Date.now().toString() : importedData.id,
        name: existingVersion ? `${importedData.name} (Imported)` : importedData.name,
        themeData: importedData.themeData,
        description: importedData.description,
        timestamp: Date.now(),
        previewColors: importedData.previewColors || Object.values(importedData.themeData).slice(0, 4),
        tags: importedData.tags || [],
        isFavorite: false
      };
      
      // Add to versions list
      const updatedVersions = [...versions, newVersion];
      setVersions(updatedVersions);
      
      toast({
        title: "Import Successful",
        description: `Theme version "${newVersion.name}" has been imported`
      });
      
      return newVersion;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Import Failed",
        description: "The provided data is not a valid theme version"
      });
      return null;
    }
  }, [versions, setVersions]);

  const generateThemeVariation = useCallback((
    baseColor: string, 
    isDark: boolean = false
  ): Record<string, string> => {
    return generateThemePalette(baseColor, isDark);
  }, []);

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

  const exportVersion = useCallback((id: string): string | null => {
    return exportVersionAsString(id);
  }, [exportVersionAsString]);

  const importVersion = useCallback((data: string): ColorVersion | null => {
    return importVersionFromString(data);
  }, [importVersionFromString]);

  const saveVersion = useCallback((
    name: string, 
    themeData: Record<string, string>, 
    description?: string, 
    tags?: string[]
  ) => {
    return createVersion(name, themeData, description, tags);
  }, [createVersion]);

  const switchToVersion = useCallback((id: string) => {
    // Find the version with this ID
    const version = versions.find(v => v.id === id);
    
    if (!version) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not find version to activate."
      });
      return;
    }

    // Update lastUsed timestamp
    setVersions(prev => prev.map(v => 
      v.id === id ? { ...v, lastUsed: Date.now() } : v
    ));

    setCurrentVersionId(id);
    
    toast({
      title: "Theme Changed",
      description: `Switched to "${version.name}" theme.`,
    });
  }, [versions, setCurrentVersionId, setVersions]);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    versions.forEach(version => {
      version.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [versions]);

  return {
    versions,
    currentVersion,
    currentVersionId,
    
    createVersion,
    updateVersion,
    deleteVersion,
    duplicateVersion,
    setActiveVersion,
    switchToVersion,
    toggleFavorite,
    
    addTag,
    removeTag,
    addTagToVersion,
    removeTagFromVersion,
    availableTags,
    allTags,
    
    filters,
    updateFilters,
    addTagFilter,
    removeTagFilter,
    toggleFavoritesFilter,
    resetFilters,
    filteredVersions,
    
    filterText,
    setFilterText,
    selectedTags,
    setSelectedTags,
    onlyFavorites,
    setOnlyFavorites,
    
    sortOption,
    setSortOption,
    sortedVersions,
    
    exportVersionAsString,
    importVersionFromString,
    exportVersion,
    importVersion,
    
    getCurrentVersion,
    saveVersion,
    
    generateThemeVariation
  };
}
