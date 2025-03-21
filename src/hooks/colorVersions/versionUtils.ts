
import { ColorVersion } from './types';

/**
 * Extract a subset of colors to use as a preview for a theme version
 */
export function extractPreviewColors(themeData: Record<string, string>): string[] {
  // Priority order for colors to use in preview
  const colorKeys = [
    'primary',
    'secondary',
    'accent', 
    'background',
    'foreground',
    'card',
    'muted'
  ];
  
  // Extract up to 4 colors for the preview
  const previewColors: string[] = [];
  
  // First try to get colors from our priority list
  for (const key of colorKeys) {
    if (themeData[key] && !previewColors.includes(themeData[key])) {
      previewColors.push(themeData[key]);
      if (previewColors.length >= 4) break;
    }
  }
  
  // If we still don't have enough, get any other colors
  if (previewColors.length < 4) {
    for (const [key, value] of Object.entries(themeData)) {
      if (key.includes('color') || key.endsWith('bg') || key.includes('background')) {
        if (!previewColors.includes(value)) {
          previewColors.push(value);
          if (previewColors.length >= 4) break;
        }
      }
    }
  }
  
  // Fallback if we still don't have 4 colors
  while (previewColors.length < 4) {
    const fallbackColor = Object.values(themeData)[previewColors.length] || '#cccccc';
    if (!previewColors.includes(fallbackColor)) {
      previewColors.push(fallbackColor);
    } else {
      previewColors.push('#cccccc');
    }
  }
  
  return previewColors;
}

/**
 * Compare two color versions for equality
 */
export function areVersionsEqual(version1: ColorVersion, version2: ColorVersion): boolean {
  // Compare IDs first
  if (version1.id !== version2.id) return false;
  
  // Compare basic properties
  if (
    version1.name !== version2.name ||
    version1.description !== version2.description ||
    version1.isFavorite !== version2.isFavorite
  ) {
    return false;
  }
  
  // Compare tags
  const tags1 = version1.tags || [];
  const tags2 = version2.tags || [];
  if (tags1.length !== tags2.length) return false;
  if (!tags1.every(tag => tags2.includes(tag))) return false;
  
  // Compare theme data
  const keys1 = Object.keys(version1.themeData);
  const keys2 = Object.keys(version2.themeData);
  if (keys1.length !== keys2.length) return false;
  
  for (const key of keys1) {
    if (version1.themeData[key] !== version2.themeData[key]) {
      return false;
    }
  }
  
  return true;
}
