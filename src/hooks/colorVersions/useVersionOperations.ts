
import { useState } from 'react';
import { ColorVersion } from './types';
import { toast } from "@/components/ui/use-toast";
import { extractPreviewColors } from './versionUtils';

export function useVersionOperations(
  versions: ColorVersion[],
  currentVersionId: string | null,
  persistVersions: (updatedVersions: ColorVersion[]) => void,
  persistCurrentVersionId: (versionId: string) => void
) {
  // Save a new theme version
  const saveVersion = (
    name: string, 
    themeData: Record<string, string>, 
    description?: string,
    tags?: string[]
  ) => {
    const id = Date.now().toString();
    const newVersion: ColorVersion = {
      id,
      timestamp: Date.now(),
      name,
      themeData,
      description,
      previewColors: extractPreviewColors(themeData),
      tags,
      isFavorite: false
    };
    
    const updatedVersions = [...versions, newVersion];
    persistVersions(updatedVersions);
    persistCurrentVersionId(id);
    
    return newVersion;
  };
  
  // Switch to another saved version
  const switchToVersion = (versionId: string) => {
    const version = versions.find(v => v.id === versionId);
    
    if (!version) {
      toast({
        title: "Version not found",
        description: "The selected theme version could not be found",
        variant: "destructive"
      });
      return false;
    }
    
    persistCurrentVersionId(versionId);
    
    toast({
      title: "Theme Switched",
      description: `Applied theme version: ${version.name}`
    });
    
    return true;
  };
  
  // Delete a version
  const deleteVersion = (versionId: string) => {
    if (versionId === currentVersionId) {
      toast({
        title: "Cannot Delete",
        description: "You cannot delete the currently active theme version",
        variant: "destructive"
      });
      return false;
    }
    
    const updatedVersions = versions.filter(v => v.id !== versionId);
    persistVersions(updatedVersions);
    
    toast({
      title: "Version Deleted",
      description: "The theme version has been removed"
    });
    
    return true;
  };
  
  // Update a version's properties
  const updateVersion = (
    versionId: string, 
    updates: Partial<Omit<ColorVersion, 'id' | 'timestamp'>>
  ) => {
    const versionIndex = versions.findIndex(v => v.id === versionId);
    
    if (versionIndex === -1) {
      toast({
        title: "Version not found",
        description: "The theme version could not be found",
        variant: "destructive"
      });
      return false;
    }
    
    const updatedVersions = [...versions];
    updatedVersions[versionIndex] = {
      ...updatedVersions[versionIndex],
      ...updates
    };
    
    persistVersions(updatedVersions);
    
    toast({
      title: "Version Updated",
      description: "The theme version has been updated"
    });
    
    return true;
  };
  
  // Toggle favorite status
  const toggleFavorite = (versionId: string) => {
    const versionIndex = versions.findIndex(v => v.id === versionId);
    
    if (versionIndex === -1) {
      return false;
    }
    
    const updatedVersions = [...versions];
    const currentVersion = updatedVersions[versionIndex];
    const isFavorite = !currentVersion.isFavorite;
    
    updatedVersions[versionIndex] = {
      ...currentVersion,
      isFavorite
    };
    
    persistVersions(updatedVersions);
    
    toast({
      title: isFavorite ? "Added to Favorites" : "Removed from Favorites",
      description: `"${currentVersion.name}" has been ${isFavorite ? 'added to' : 'removed from'} favorites`
    });
    
    return true;
  };
  
  return {
    saveVersion,
    switchToVersion,
    deleteVersion,
    updateVersion,
    toggleFavorite
  };
}
