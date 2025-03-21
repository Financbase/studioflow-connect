
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ColorVersion, VersionUpdateData } from './types';

export function useVersionOperations(
  versions: ColorVersion[],
  currentVersionId: string | null,
  persistVersions: (versions: ColorVersion[]) => void,
  persistCurrentVersionId: (id: string | null) => void
) {
  // Save a new version
  const saveVersion = (
    name: string,
    themeData: Record<string, string>,
    description?: string,
    tags: string[] = []
  ) => {
    // Extract primary colors for preview
    const previewColors = Object.entries(themeData)
      .filter(([key]) => key.includes('primary') || key.includes('accent') || key.includes('background'))
      .map(([, value]) => value)
      .slice(0, 5);
    
    const newVersion: ColorVersion = {
      id: uuidv4(),
      name,
      description,
      themeData,
      timestamp: Date.now(),
      previewColors,
      tags,
      isFavorite: false,
      lastUsed: Date.now() // Set initial lastUsed timestamp
    };
    
    const updatedVersions = [newVersion, ...versions];
    persistVersions(updatedVersions);
    persistCurrentVersionId(newVersion.id);
    
    return newVersion;
  };
  
  // Switch to an existing version
  const switchToVersion = (versionId: string) => {
    if (!versionId) return;
    
    // Update the lastUsed timestamp when switching to a version
    const updatedVersions = versions.map(version => 
      version.id === versionId 
        ? { ...version, lastUsed: Date.now() } 
        : version
    );
    
    persistVersions(updatedVersions);
    persistCurrentVersionId(versionId);
  };
  
  // Delete a version
  const deleteVersion = (versionId: string) => {
    // Can't delete the active version
    if (versionId === currentVersionId) return;
    
    const updatedVersions = versions.filter(v => v.id !== versionId);
    persistVersions(updatedVersions);
  };
  
  // Update a version's metadata
  const updateVersion = (versionId: string, updateData: VersionUpdateData) => {
    const updatedVersions = versions.map(version => 
      version.id === versionId 
        ? { ...version, ...updateData } 
        : version
    );
    
    persistVersions(updatedVersions);
  };
  
  // Toggle a version's favorite status
  const toggleFavorite = (versionId: string) => {
    const updatedVersions = versions.map(version => 
      version.id === versionId 
        ? { ...version, isFavorite: !version.isFavorite } 
        : version
    );
    
    persistVersions(updatedVersions);
  };
  
  // Duplicate a version
  const duplicateVersion = (versionId: string) => {
    const versionToDuplicate = versions.find(v => v.id === versionId);
    if (!versionToDuplicate) return;
    
    const newName = `${versionToDuplicate.name} (Copy)`;
    const newVersion: ColorVersion = {
      ...versionToDuplicate,
      id: uuidv4(),
      name: newName,
      timestamp: Date.now(),
      lastUsed: Date.now(), // Set lastUsed for the new copy
      isFavorite: false // Duplicated versions start as non-favorites
    };
    
    const updatedVersions = [newVersion, ...versions];
    persistVersions(updatedVersions);
    
    return newVersion;
  };
  
  // Add a tag to a version
  const addTagToVersion = (versionId: string, tag: string) => {
    const updatedVersions = versions.map(version => {
      if (version.id === versionId && !version.tags.includes(tag)) {
        return {
          ...version,
          tags: [...version.tags, tag]
        };
      }
      return version;
    });
    
    persistVersions(updatedVersions);
  };
  
  // Remove a tag from a version
  const removeTagFromVersion = (versionId: string, tag: string) => {
    const updatedVersions = versions.map(version => {
      if (version.id === versionId) {
        return {
          ...version,
          tags: version.tags.filter(t => t !== tag)
        };
      }
      return version;
    });
    
    persistVersions(updatedVersions);
  };
  
  return {
    saveVersion,
    switchToVersion,
    deleteVersion,
    updateVersion,
    toggleFavorite,
    duplicateVersion,
    addTagToVersion,
    removeTagFromVersion
  };
}
