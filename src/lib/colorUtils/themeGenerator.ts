
import { hexToRgb, hslToRgb, rgbToHsl } from './colorConversion';

/**
 * Generates a complete theme palette suitable for UI applications
 * @param primaryColor The primary brand color in hex format
 * @param isDark Whether to generate a dark or light theme
 * @returns Object with all theme color keys and their hex values
 */
export function generateThemePalette(primaryColor: string, isDark: boolean = false): Record<string, string> {
  // Convert the primary color to HSL for manipulation
  const { r, g, b } = hexToRgb(primaryColor);
  const { h, s, l } = rgbToHsl(r, g, b);
  
  // Generate the base colors with appropriate lightness for the theme mode
  const baseL = isDark ? 0.85 : 0.5; // Primary lightness for the theme
  const bgL = isDark ? 0.1 : 0.98; // Background lightness
  const contrastL = isDark ? 0.1 : 0.95; // Contrast for text on colored backgrounds
  
  // Primary color adjustments
  const primaryRgb = hslToRgb(h, s * 0.9, baseL);
  const primary = `#${primaryRgb.r.toString(16).padStart(2, '0')}${primaryRgb.g.toString(16).padStart(2, '0')}${primaryRgb.b.toString(16).padStart(2, '0')}`;
  
  // Secondary color (slightly desaturated and different lightness)
  const secondaryRgb = hslToRgb(h, s * 0.25, isDark ? 0.2 : 0.95);
  const secondary = `#${secondaryRgb.r.toString(16).padStart(2, '0')}${secondaryRgb.g.toString(16).padStart(2, '0')}${secondaryRgb.b.toString(16).padStart(2, '0')}`;
  
  // Accent color (complementary hue)
  const accentH = (h + 0.5) % 1;
  const accentRgb = hslToRgb(accentH, s * 0.9, baseL);
  const accent = `#${accentRgb.r.toString(16).padStart(2, '0')}${accentRgb.g.toString(16).padStart(2, '0')}${accentRgb.b.toString(16).padStart(2, '0')}`;
  
  // Background & foreground
  const bgRgb = hslToRgb(h, 0.05, isDark ? 0.1 : 0.98);
  const background = `#${bgRgb.r.toString(16).padStart(2, '0')}${bgRgb.g.toString(16).padStart(2, '0')}${bgRgb.b.toString(16).padStart(2, '0')}`;
  
  const fgRgb = hslToRgb(h, 0.05, isDark ? 0.9 : 0.1);
  const foreground = `#${fgRgb.r.toString(16).padStart(2, '0')}${fgRgb.g.toString(16).padStart(2, '0')}${fgRgb.b.toString(16).padStart(2, '0')}`;
  
  // Destructive color (red, slightly adjusted for theme)
  const destructiveRgb = hslToRgb(0, 0.85, isDark ? 0.5 : 0.45);
  const destructive = `#${destructiveRgb.r.toString(16).padStart(2, '0')}${destructiveRgb.g.toString(16).padStart(2, '0')}${destructiveRgb.b.toString(16).padStart(2, '0')}`;
  
  // Border colors
  const borderRgb = hslToRgb(h, 0.05, isDark ? 0.3 : 0.85);
  const border = `#${borderRgb.r.toString(16).padStart(2, '0')}${borderRgb.g.toString(16).padStart(2, '0')}${borderRgb.b.toString(16).padStart(2, '0')}`;
  
  // Muted colors
  const mutedRgb = hslToRgb(h, 0.05, isDark ? 0.2 : 0.95);
  const muted = `#${mutedRgb.r.toString(16).padStart(2, '0')}${mutedRgb.g.toString(16).padStart(2, '0')}${mutedRgb.b.toString(16).padStart(2, '0')}`;
  
  const mutedFgRgb = hslToRgb(h, 0.1, isDark ? 0.6 : 0.4);
  const mutedForeground = `#${mutedFgRgb.r.toString(16).padStart(2, '0')}${mutedFgRgb.g.toString(16).padStart(2, '0')}${mutedFgRgb.b.toString(16).padStart(2, '0')}`;
  
  // Foreground for colored backgrounds
  const primaryFgRgb = hslToRgb(h, 0.05, contrastL);
  const primaryForeground = `#${primaryFgRgb.r.toString(16).padStart(2, '0')}${primaryFgRgb.g.toString(16).padStart(2, '0')}${primaryFgRgb.b.toString(16).padStart(2, '0')}`;
  
  const secondaryFgRgb = hslToRgb(h, 0.05, isDark ? 0.9 : 0.1);
  const secondaryForeground = `#${secondaryFgRgb.r.toString(16).padStart(2, '0')}${secondaryFgRgb.g.toString(16).padStart(2, '0')}${secondaryFgRgb.b.toString(16).padStart(2, '0')}`;
  
  const accentFgRgb = hslToRgb(accentH, 0.05, contrastL);
  const accentForeground = `#${accentFgRgb.r.toString(16).padStart(2, '0')}${accentFgRgb.g.toString(16).padStart(2, '0')}${accentFgRgb.b.toString(16).padStart(2, '0')}`;
  
  // Card colors (slightly different from background)
  const cardRgb = hslToRgb(h, 0.05, isDark ? 0.12 : 1);
  const card = `#${cardRgb.r.toString(16).padStart(2, '0')}${cardRgb.g.toString(16).padStart(2, '0')}${cardRgb.b.toString(16).padStart(2, '0')}`;
  
  // Return the complete palette
  return {
    'background': background,
    'foreground': foreground,
    'card': card,
    'card-foreground': foreground,
    'primary': primary,
    'primary-foreground': primaryForeground,
    'secondary': secondary,
    'secondary-foreground': secondaryForeground,
    'accent': accent,
    'accent-foreground': accentForeground,
    'muted': muted,
    'muted-foreground': mutedForeground,
    'destructive': destructive,
    'destructive-foreground': primaryForeground,
    'border': border,
    'input': border,
    'ring': isDark ? primary : accent,
  };
}
