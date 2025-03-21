
import { useState, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";
import { hexToRgb } from '@/lib/colorUtils/colorConversion';

export type ThemeMode = 'light' | 'dark';
export type ThemeVariant = 'modern' | 'legacy' | 'classic' | 'windows' | 'default' | 'retro' | string;

export type ColorVersion = {
  id: string;
  timestamp: number;
  name: string;
  themeData: Record<string, string>;
  description?: string;
  previewColors?: string[]; // Array of hex colors for preview
  tags?: string[]; // Optional tags for categorization
  isFavorite?: boolean; // Mark as favorite for quick access
};

export interface VersionFilter {
  search?: string;
  tags?: string[];
  sortBy?: 'name' | 'date' | 'favorites';
  sortDirection?: 'asc' | 'desc';
}

export function useColorVersionManager() {
  const [versions, setVersions] = useState<ColorVersion[]>([]);
  const [currentVersionId, setCurrentVersionId] = useState<string | null>(null);
  const [filteredVersions, setFilteredVersions] = useState<ColorVersion[]>([]);
  const [filters, setFilters] = useState<VersionFilter>({
    sortBy: 'date',
    sortDirection: 'desc'
  });
  
  // Load saved versions from localStorage
  useEffect(() => {
    const savedVersions = localStorage.getItem('theme_color_versions');
    if (savedVersions) {
      try {
        const parsedVersions = JSON.parse(savedVersions) as ColorVersion[];
        setVersions(parsedVersions);
      } catch (e) {
        console.error('Failed to parse saved theme versions', e);
      }
    }
    
    const currentId = localStorage.getItem('current_theme_version_id');
    if (currentId) {
      setCurrentVersionId(currentId);
    }
  }, []);
  
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
  
  // Extract preview colors from a theme
  const extractPreviewColors = (themeData: Record<string, string>): string[] => {
    const previewColors: string[] = [];
    
    // Extract key brand colors for preview
    const colorKeys = ['primary', 'secondary', 'accent', 'background', 'destructive'];
    
    colorKeys.forEach(key => {
      if (themeData[key] && themeData[key].startsWith('#')) {
        previewColors.push(themeData[key]);
      }
    });
    
    return previewColors;
  };
  
  // Save a new version
  const saveVersion = (
    name: string, 
    themeData: Record<string, string>, 
    description?: string,
    tags?: string[]
  ) => {
    const previewColors = extractPreviewColors(themeData);
    
    const newVersion: ColorVersion = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      name,
      themeData,
      description,
      previewColors,
      tags,
      isFavorite: false
    };
    
    const updatedVersions = [...versions, newVersion];
    setVersions(updatedVersions);
    setCurrentVersionId(newVersion.id);
    
    localStorage.setItem('theme_color_versions', JSON.stringify(updatedVersions));
    localStorage.setItem('current_theme_version_id', newVersion.id);
    
    toast({
      title: "Theme version saved",
      description: `"${name}" has been saved as a new version`
    });
    
    return newVersion;
  };
  
  // Switch to a different version
  const switchToVersion = (versionId: string) => {
    const version = versions.find(v => v.id === versionId);
    if (!version) return false;
    
    setCurrentVersionId(versionId);
    localStorage.setItem('current_theme_version_id', versionId);
    
    // Apply the theme from this version
    document.documentElement.classList.remove(
      "theme-modern", "theme-legacy", "theme-classic", "theme-windows", "theme-default", "theme-retro"
    );
    
    // Apply the theme variant
    const themeVariant = version.themeData['themeVariant'] || 'modern';
    document.documentElement.classList.add(`theme-${themeVariant}`);
    localStorage.setItem('ui_theme_variant', themeVariant);
    
    // Apply dark/light mode if stored
    if (version.themeData['themeMode']) {
      const isDark = version.themeData['themeMode'] === 'dark';
      document.documentElement.classList.toggle('dark', isDark);
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
    
    // Apply any color variables if they exist in the version
    Object.entries(version.themeData).forEach(([key, value]) => {
      // Only apply if it's a color value (starts with # or has rgb format)
      if ((value.startsWith('#') || value.includes('rgb')) && !['themeVariant', 'themeMode', 'isDarkMode'].includes(key)) {
        try {
          if (value.startsWith('#')) {
            const { r, g, b } = hexToRgb(value);
            document.documentElement.style.setProperty(`--${key}`, `${r} ${g} ${b}`);
          }
        } catch (error) {
          console.error(`Failed to apply color variable ${key}:`, error);
        }
      }
    });
    
    toast({
      title: "Theme version restored",
      description: `Switched to "${version.name}" theme version`
    });
    
    return true;
  };
  
  // Delete a version
  const deleteVersion = (versionId: string) => {
    // Don't allow deleting the current version
    if (versionId === currentVersionId) {
      toast({
        title: "Cannot delete active version",
        description: "Please switch to another version before deleting this one",
        variant: "destructive"
      });
      return false;
    }
    
    const updatedVersions = versions.filter(v => v.id !== versionId);
    setVersions(updatedVersions);
    localStorage.setItem('theme_color_versions', JSON.stringify(updatedVersions));
    
    toast({
      title: "Theme version deleted",
      description: "The selected theme version has been removed"
    });
    
    return true;
  };
  
  // Update an existing version
  const updateVersion = (versionId: string, updates: Partial<Omit<ColorVersion, 'id'>>) => {
    const versionIndex = versions.findIndex(v => v.id === versionId);
    if (versionIndex === -1) return false;
    
    const updatedVersions = [...versions];
    updatedVersions[versionIndex] = {
      ...updatedVersions[versionIndex],
      ...updates,
      // If theme data was updated, recalculate preview colors
      ...(updates.themeData ? { 
        previewColors: extractPreviewColors(updates.themeData) 
      } : {})
    };
    
    setVersions(updatedVersions);
    localStorage.setItem('theme_color_versions', JSON.stringify(updatedVersions));
    
    // If this is the current version and theme data was updated, apply changes
    if (versionId === currentVersionId && updates.themeData) {
      switchToVersion(versionId);
    }
    
    toast({
      title: "Theme version updated",
      description: `"${updatedVersions[versionIndex].name}" has been updated`
    });
    
    return true;
  };
  
  // Toggle favorite status
  const toggleFavorite = (versionId: string) => {
    const versionIndex = versions.findIndex(v => v.id === versionId);
    if (versionIndex === -1) return false;
    
    const updatedVersions = [...versions];
    updatedVersions[versionIndex] = {
      ...updatedVersions[versionIndex],
      isFavorite: !updatedVersions[versionIndex].isFavorite
    };
    
    setVersions(updatedVersions);
    localStorage.setItem('theme_color_versions', JSON.stringify(updatedVersions));
    
    return true;
  };
  
  // Get the current version
  const getCurrentVersion = () => {
    if (!currentVersionId) return null;
    return versions.find(v => v.id === currentVersionId) || null;
  };
  
  // Update filters
  const updateFilters = (newFilters: Partial<VersionFilter>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };
  
  // Export a version to JSON
  const exportVersion = (versionId: string) => {
    const version = versions.find(v => v.id === versionId);
    if (!version) return null;
    
    return JSON.stringify(version, null, 2);
  };
  
  // Import a version from JSON
  const importVersion = (jsonData: string) => {
    try {
      const importedVersion = JSON.parse(jsonData) as ColorVersion;
      
      // Validate the imported data
      if (!importedVersion.name || !importedVersion.themeData) {
        throw new Error('Invalid version data');
      }
      
      // Create a new ID and timestamp for the imported version
      const newVersion: ColorVersion = {
        ...importedVersion,
        id: Date.now().toString(),
        timestamp: Date.now(),
        previewColors: extractPreviewColors(importedVersion.themeData)
      };
      
      const updatedVersions = [...versions, newVersion];
      setVersions(updatedVersions);
      localStorage.setItem('theme_color_versions', JSON.stringify(updatedVersions));
      
      toast({
        title: "Theme version imported",
        description: `"${newVersion.name}" has been imported`
      });
      
      return newVersion;
    } catch (error) {
      console.error('Failed to import theme version:', error);
      
      toast({
        title: "Import failed",
        description: "The provided data is not a valid theme version",
        variant: "destructive"
      });
      
      return null;
    }
  };
  
  return {
    versions,
    filteredVersions,
    currentVersionId,
    filters,
    saveVersion,
    switchToVersion,
    deleteVersion,
    updateVersion,
    toggleFavorite,
    getCurrentVersion,
    updateFilters,
    exportVersion,
    importVersion
  };
}
