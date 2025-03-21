
import { useState, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";

export type ColorVersion = {
  id: string;
  timestamp: number;
  name: string;
  themeData: Record<string, string>;
  description?: string;
};

export function useColorVersionManager() {
  const [versions, setVersions] = useState<ColorVersion[]>([]);
  const [currentVersionId, setCurrentVersionId] = useState<string | null>(null);
  
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
  
  // Save a new version
  const saveVersion = (
    name: string, 
    themeData: Record<string, string>, 
    description?: string
  ) => {
    const newVersion: ColorVersion = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      name,
      themeData,
      description
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
          // Try to extract RGB values for CSS variables
          const hexToRgb = (hex: string) => {
            const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            const formattedHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(formattedHex);
            return result ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16)
            } : { r: 0, g: 0, b: 0 };
          };
          
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
  
  // Get the current version
  const getCurrentVersion = () => {
    if (!currentVersionId) return null;
    return versions.find(v => v.id === currentVersionId) || null;
  };
  
  return {
    versions,
    currentVersionId,
    saveVersion,
    switchToVersion,
    deleteVersion,
    getCurrentVersion
  };
}
