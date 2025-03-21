import { hexToRgb } from './colorConversion';

/**
 * Calculate the relative luminance of a color
 * Based on WCAG 2.0 formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html
 * @param color Hex color string
 * @returns Relative luminance value between 0 and 1
 */
export function getLuminance(color: string): number {
  const rgb = hexToRgb(color);
  
  // Convert RGB components to the 0-1 range and apply the luminance formula
  const [r, g, b] = [rgb.r / 255, rgb.g / 255, rgb.b / 255].map(val => {
    return val <= 0.03928
      ? val / 12.92
      : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  
  // Calculate luminance using the WCAG formula
  return r * 0.2126 + g * 0.7152 + b * 0.0722;
}

/**
 * Calculate contrast ratio between two colors
 * Based on WCAG 2.0 formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 * @param color1 First color in hex format
 * @param color2 Second color in hex format
 * @returns Contrast ratio (1-21)
 */
export function getContrastRatio(color1: string, color2: string): number {
  const luminance1 = getLuminance(color1);
  const luminance2 = getLuminance(color2);
  
  // Calculate contrast ratio: (L1 + 0.05) / (L2 + 0.05)
  // where L1 is the lighter color and L2 is the darker color
  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Evaluate WCAG 2.0 contrast compliance level
 * @param color1 First color in hex format
 * @param color2 Second color in hex format
 * @returns Object with compliance results for different levels
 */
export function evaluateWCAGCompliance(color1: string, color2: string): {
  ratio: number;
  AALarge: boolean;
  AA: boolean;
  AAALarge: boolean;
  AAA: boolean;
} {
  const ratio = getContrastRatio(color1, color2);
  
  return {
    ratio,
    AALarge: ratio >= 3, // WCAG AA for large text (14pt bold / 18pt)
    AA: ratio >= 4.5,    // WCAG AA for normal text
    AAALarge: ratio >= 4.5, // WCAG AAA for large text
    AAA: ratio >= 7      // WCAG AAA for normal text
  };
}

/**
 * Find the best foreground color (black or white) for a given background color
 * @param backgroundColor Background color in hex format
 * @returns Hex color (#FFFFFF or #000000)
 */
export function getAccessibleForeground(backgroundColor: string): string {
  const luminance = getLuminance(backgroundColor);
  // Use white text on dark backgrounds and black text on light backgrounds
  return luminance > 0.179 ? "#000000" : "#FFFFFF";
}

/**
 * Get a user-friendly description of the contrast ratio
 * @param ratio Contrast ratio (1-21)
 * @returns Descriptive string of the contrast level
 */
export function getContrastDescription(ratio: number): string {
  if (ratio >= 7) return "Excellent";
  if (ratio >= 4.5) return "Good";
  if (ratio >= 3) return "Acceptable for large text";
  return "Poor";
}

/**
 * Suggest improved colors for better accessibility
 * @param backgroundColor Background color in hex
 * @param foregroundColor Foreground color in hex
 * @returns Object with suggested colors and their contrast ratios
 */
export function suggestAccessibleColors(backgroundColor: string, foregroundColor: string): {
  original: { color: string; ratio: number; };
  suggested: { color: string; ratio: number; };
} {
  const originalRatio = getContrastRatio(backgroundColor, foregroundColor);
  
  // If the contrast is already good, return the original
  if (originalRatio >= 4.5) {
    return {
      original: { color: foregroundColor, ratio: originalRatio },
      suggested: { color: foregroundColor, ratio: originalRatio }
    };
  }
  
  // Otherwise, suggest black or white based on background luminance
  const suggested = getAccessibleForeground(backgroundColor);
  const suggestedRatio = getContrastRatio(backgroundColor, suggested);
  
  return {
    original: { color: foregroundColor, ratio: originalRatio },
    suggested: { color: suggested, ratio: suggestedRatio }
  };
}
