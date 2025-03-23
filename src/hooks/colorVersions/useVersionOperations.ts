
import { v4 as uuidv4 } from 'uuid';
import { ColorVersion, VersionUpdateData } from './types';
import { toast } from "@/components/ui/use-toast";
import { generateThemePalette } from '@/lib/colorUtils/themeGenerator';

export function useVersionOperations(
  versions: ColorVersion[],
  currentVersionId: string | null,
  setVersions: (versions: ColorVersion[]) => void,
  setCurrentVersionId: (id: string) => void
) {
  // Create a new version
  const createVersion = (
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

    setVersions([newVersion, ...versions]);
    
    toast({
      title: "Version Created",
      description: `"${name}" theme has been created.`,
    });

    return newVersion;
  };

  // Update an existing version
  const updateVersion = (id: string, data: VersionUpdateData) => {
    setVersions(versions.map(version => 
      version.id === id ? { ...version, ...data } : version
    ));

    toast({
      title: "Version Updated",
      description: `Theme version has been updated.`,
    });
  };

  // Delete a version
  const deleteVersion = (id: string) => {
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

    setVersions(versions.filter(version => version.id !== id));
    
    toast({
      title: "Version Deleted",
      description: "Theme version has been removed.",
    });
  };

  // Duplicate a version
  const duplicateVersion = (id: string) => {
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

    setVersions([newVersion, ...versions]);
    
    toast({
      title: "Version Duplicated",
      description: `Created copy of "${versionToDuplicate.name}".`,
    });

    return newVersion;
  };

  // Set a version as active
  const setActiveVersion = (id: string) => {
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
    setVersions(versions.map(v => 
      v.id === id ? { ...v, lastUsed: Date.now() } : v
    ));

    setCurrentVersionId(id);
    
    toast({
      title: "Theme Changed",
      description: `Switched to "${version.name}" theme.`,
    });
  };

  // Toggle favorite status
  const toggleFavorite = (id: string) => {
    setVersions(versions.map(version => 
      version.id === id 
        ? { ...version, isFavorite: !version.isFavorite } 
        : version
    ));
  };

  // Add a tag to a version
  const addTag = (id: string, tag: string) => {
    setVersions(versions.map(version => 
      version.id === id && !version.tags.includes(tag)
        ? { ...version, tags: [...version.tags, tag] }
        : version
    ));
  };

  // Remove a tag from a version
  const removeTag = (id: string, tag: string) => {
    setVersions(versions.map(version => 
      version.id === id
        ? { ...version, tags: version.tags.filter(t => t !== tag) }
        : version
    ));
  };

  // Generate a theme variation - Fixed to return directly instead of a Promise
  const generateThemeVariation = (
    baseColor: string, 
    isDark: boolean = false
  ): Record<string, string> => {
    // Directly call and return the result from the generator function
    return generateThemePalette(baseColor, isDark);
  };

  return {
    createVersion,
    updateVersion,
    deleteVersion,
    duplicateVersion,
    setActiveVersion,
    toggleFavorite,
    addTag,
    removeTag,
    generateThemeVariation
  };
}
