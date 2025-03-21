
import { toast } from "@/components/ui/use-toast";
import { ColorVersion } from './types';
import { extractPreviewColors, applyThemeVersion } from './versionUtils';

export function useVersionOperations(
  versions: ColorVersion[],
  currentVersionId: string | null,
  persistVersions: (updatedVersions: ColorVersion[]) => void,
  persistCurrentVersionId: (versionId: string) => void
) {
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
    persistVersions(updatedVersions);
    persistCurrentVersionId(newVersion.id);
    
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
    
    persistCurrentVersionId(versionId);
    
    // Apply the theme from this version
    const success = applyThemeVersion(version);
    
    if (success) {
      toast({
        title: "Theme version restored",
        description: `Switched to "${version.name}" theme version`
      });
    }
    
    return success;
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
    persistVersions(updatedVersions);
    
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
    
    persistVersions(updatedVersions);
    
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
    
    persistVersions(updatedVersions);
    
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
