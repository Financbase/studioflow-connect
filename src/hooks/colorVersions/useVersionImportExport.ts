
import { toast } from "@/components/ui/use-toast";
import { ColorVersion } from './types';
import { extractPreviewColors } from './versionUtils';

export function useVersionImportExport(
  versions: ColorVersion[],
  persistVersions: (updatedVersions: ColorVersion[]) => void
) {
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
      persistVersions(updatedVersions);
      
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
    exportVersion,
    importVersion
  };
}
