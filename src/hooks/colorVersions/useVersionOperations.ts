
import { ColorVersion, VersionUpdateData } from './types';
import { extractPreviewColors } from './versionUtils';
import { toast } from "@/components/ui/use-toast";

export function useVersionOperations(
  versions: ColorVersion[],
  currentVersionId: string | null,
  persistVersions: (updatedVersions: ColorVersion[]) => void,
  persistCurrentVersionId: (id: string | null) => void
) {
  // Save a new version
  const saveVersion = (name: string, description: string, themeData: Record<string, string>, tags: string[] = []) => {
    const timestamp = Date.now();
    const previewColors = extractPreviewColors(themeData);
    
    const newVersion: ColorVersion = {
      id: timestamp.toString(),
      name,
      description,
      themeData,
      timestamp,
      previewColors,
      tags,
      isFavorite: false,
      lastUsed: timestamp
    };
    
    const updatedVersions = [...versions, newVersion];
    persistVersions(updatedVersions);
    persistCurrentVersionId(newVersion.id);
    
    toast({
      title: "Theme Saved",
      description: `"${name}" has been saved as a new theme version`
    });
    
    return newVersion;
  };
  
  // Switch to a different version
  const switchToVersion = (versionId: string) => {
    // Find the version to switch to
    const versionToActivate = versions.find(v => v.id === versionId);
    
    if (!versionToActivate) {
      toast({
        title: "Error",
        description: "Could not find the selected theme version",
        variant: "destructive"
      });
      return false;
    }
    
    // Update the lastUsed timestamp
    const updatedVersions = versions.map(v => 
      v.id === versionId ? { ...v, lastUsed: Date.now() } : v
    );
    
    persistVersions(updatedVersions);
    persistCurrentVersionId(versionId);
    
    toast({
      title: "Theme Applied",
      description: `"${versionToActivate.name}" is now active`
    });
    
    return true;
  };
  
  // Delete a version
  const deleteVersion = (versionId: string) => {
    // Prevent deleting the current version
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
    
    const versionName = versions.find(v => v.id === versionId)?.name;
    toast({
      title: "Theme Deleted",
      description: `"${versionName || 'Version'}" has been deleted`
    });
    
    return true;
  };
  
  // Update an existing version
  const updateVersion = (versionId: string, updateData: VersionUpdateData) => {
    const updatedVersions = versions.map(v => {
      if (v.id === versionId) {
        return {
          ...v,
          ...updateData,
        };
      }
      return v;
    });
    
    persistVersions(updatedVersions);
    
    toast({
      title: "Theme Updated",
      description: "The theme version has been updated"
    });
    
    return true;
  };
  
  // Toggle favorite status
  const toggleFavorite = (versionId: string) => {
    const version = versions.find(v => v.id === versionId);
    if (!version) return false;
    
    const updatedVersions = versions.map(v => {
      if (v.id === versionId) {
        return {
          ...v,
          isFavorite: !v.isFavorite
        };
      }
      return v;
    });
    
    persistVersions(updatedVersions);
    
    const status = !version.isFavorite ? 'added to' : 'removed from';
    toast({
      title: `Theme ${status} favorites`,
      description: `"${version.name}" has been ${status} your favorites`
    });
    
    return true;
  };
  
  // Duplicate a version
  const duplicateVersion = (versionId: string) => {
    const versionToDuplicate = versions.find(v => v.id === versionId);
    
    if (!versionToDuplicate) {
      toast({
        title: "Error",
        description: "Could not find the version to duplicate",
        variant: "destructive"
      });
      return null;
    }
    
    const timestamp = Date.now();
    const duplicatedVersion: ColorVersion = {
      ...versionToDuplicate,
      id: timestamp.toString(),
      name: `${versionToDuplicate.name} (Copy)`,
      timestamp,
      isFavorite: false,
      lastUsed: timestamp
    };
    
    const updatedVersions = [...versions, duplicatedVersion];
    persistVersions(updatedVersions);
    
    toast({
      title: "Theme Duplicated",
      description: `"${duplicatedVersion.name}" has been created`
    });
    
    return duplicatedVersion;
  };
  
  // Add tag to a version
  const addTagToVersion = (versionId: string, tag: string) => {
    const version = versions.find(v => v.id === versionId);
    if (!version) return false;
    
    // Don't add duplicate tags
    if (version.tags.includes(tag)) return true;
    
    const updatedVersions = versions.map(v => {
      if (v.id === versionId) {
        return {
          ...v,
          tags: [...v.tags, tag]
        };
      }
      return v;
    });
    
    persistVersions(updatedVersions);
    return true;
  };
  
  // Remove tag from a version
  const removeTagFromVersion = (versionId: string, tag: string) => {
    const updatedVersions = versions.map(v => {
      if (v.id === versionId) {
        return {
          ...v,
          tags: v.tags.filter(t => t !== tag)
        };
      }
      return v;
    });
    
    persistVersions(updatedVersions);
    return true;
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
