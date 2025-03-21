
import { ColorVersion } from './types';
import { hexToRgb } from '@/lib/colorUtils/colorConversion';

/**
 * Extract preview colors from a theme
 * @param themeData Theme color data
 * @returns Array of hex colors for preview
 */
export const extractPreviewColors = (themeData: Record<string, string>): string[] => {
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

/**
 * Apply theme version to the DOM
 * @param version The theme version to apply
 */
export const applyThemeVersion = (version: ColorVersion | null): boolean => {
  if (!version) return false;
  
  // Apply the theme variant
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
  
  return true;
};
