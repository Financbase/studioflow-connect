
import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useToast } from '@/hooks/use-toast';
import { useVersionFiltering } from './useVersionFiltering';
import { useVersionSorting } from './useVersionSorting';
import {
  ColorVersion,
  VersionFilter,
  VersionUpdateData,
  ThemeMode,
  ThemeVariant
} from './types';

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
  const { toast } = useToast();

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
  }, [setVersions, toast]);

  const updateVersion = useCallback((id: string, data: VersionUpdateData) => {
    setVersions(prev => prev.map(version => 
      version.id === id ? { ...version, ...data } : version
    ));

    toast({
      title: "Version Updated",
      description: `Theme version has been updated.`,
    });
  }, [setVersions, toast]);

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
  }, [versions, currentVersionId, setCurrentVersionId, setVersions, toast]);

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
  }, [versions, setVersions, toast]);

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
  }, [versions, setCurrentVersionId, setVersions, toast]);

  const toggleFavorite = useCallback((id: string) => {
    setVersions(prev => prev.map(version => 
      version.id === id 
        ? { ...version, isFavorite: !version.isFavorite } 
        : version
    ));
  }, [setVersions]);

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

  // Share theme as a string that can be imported
  const exportVersionAsString = useCallback((id: string): string => {
    const version = versions.find(v => v.id === id);
    if (!version) return '';
    
    const exportData = {
      name: version.name,
      description: version.description,
      themeData: version.themeData,
      tags: version.tags
    };
    
    return `studioflow-theme:${btoa(JSON.stringify(exportData))}`;
  }, [versions]);

  // Import theme from a string
  const importVersionFromString = useCallback((themeString: string): boolean => {
    try {
      if (!themeString.startsWith('studioflow-theme:')) {
        throw new Error('Invalid theme format');
      }
      
      const encodedData = themeString.replace('studioflow-theme:', '');
      const decodedData = atob(encodedData);
      const importData = JSON.parse(decodedData);
      
      // Validate required fields
      if (!importData.name || !importData.themeData) {
        throw new Error('Invalid theme data');
      }
      
      // Create new version from imported data
      createVersion(
        importData.name,
        importData.themeData,
        importData.description,
        importData.tags
      );
      
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Import Failed",
        description: "Could not import theme. Invalid format.",
      });
      return false;
    }
  }, [createVersion, toast]);

  // Generate specific theme variations
  const generateThemeVariation = useCallback((
    baseVersionId: string, 
    mode: ThemeMode, 
    variant: ThemeVariant
  ): ColorVersion | null => {
    const baseVersion = versions.find(v => v.id === baseVersionId);
    if (!baseVersion) return null;
    
    // Generate variation based on mode and variant
    // This is a simplified implementation - in a real app,
    // you would have more complex transforms based on the variant
    const themeData = { ...baseVersion.themeData };
    
    // Apply mode-specific transforms
    if (mode === 'dark') {
      themeData['--background'] = '#121212';
      themeData['--foreground'] = '#e0e0e0';
    } else {
      themeData['--background'] = '#f7f7f7';
      themeData['--foreground'] = '#111111';
    }
    
    // Apply variant-specific transforms
    switch (variant) {
      case 'modern':
        themeData['--primary'] = '#6366f1';
        themeData['--accent'] = '#22d3ee';
        break;
      case 'legacy':
        themeData['--primary'] = '#3b82f6';
        themeData['--accent'] = '#10b981';
        break;
      case 'classic':
        themeData['--primary'] = '#1e40af';
        themeData['--accent'] = '#0284c7';
        break;
      case 'windows':
        themeData['--primary'] = '#0078d7';
        themeData['--accent'] = '#6264a7';
        break;
      case 'retro':
        themeData['--primary'] = '#ff5722';
        themeData['--accent'] = '#ffeb3b';
        break;
      default:
        // Default variant
        break;
    }
    
    const newVersion = createVersion(
      `${baseVersion.name} (${mode}-${variant})`,
      themeData,
      `${mode} ${variant} variation of ${baseVersion.name}`,
      [...baseVersion.tags, mode, variant]
    );
    
    return newVersion;
  }, [versions, createVersion]);

  // Return all the necessary functions and state
  return {
    // State
    versions,
    currentVersion,
    currentVersionId,
    
    // Core operations
    createVersion,
    updateVersion,
    deleteVersion,
    duplicateVersion,
    setActiveVersion,
    toggleFavorite,
    
    // Tag operations
    addTag,
    removeTag,
    availableTags,
    
    // Filtering
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
    
    // Theme generation
    generateThemeVariation
  };
}
