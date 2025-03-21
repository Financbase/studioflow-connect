
import { ColorVersion } from './types';
import { toast } from "@/components/ui/use-toast";

export function useVersionImportExport(
  versions: ColorVersion[],
  persistVersions: (updatedVersions: ColorVersion[]) => void
) {
  // Export a version as a JSON string
  const exportVersion = (versionId: string): string | null => {
    const version = versions.find(v => v.id === versionId);
    
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
  };
  
  // Import a version from a JSON string
  const importVersion = (jsonString: string): ColorVersion | null => {
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
      persistVersions(updatedVersions);
      
      toast({
        title: "Import Successful",
        description: `Theme version "${newVersion.name}" has been imported`
      });
      
      return newVersion;
    } catch (error) {
      toast({
        title: "Import Failed",
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
