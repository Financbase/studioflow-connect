
import { hexToRgb } from "./colorUtils/colorConversion";

/**
 * Calculates the relative luminance of a color according to WCAG
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns The relative luminance value (0-1)
 */
export const calculateRelativeLuminance = (r: number, g: number, b: number): number => {
  // Normalize RGB values
  const sR = r / 255;
  const sG = g / 255;
  const sB = b / 255;
  
  // Convert to linear RGB values
  const R = sR <= 0.03928 ? sR / 12.92 : Math.pow((sR + 0.055) / 1.055, 2.4);
  const G = sG <= 0.03928 ? sG / 12.92 : Math.pow((sG + 0.055) / 1.055, 2.4);
  const B = sB <= 0.03928 ? sB / 12.92 : Math.pow((sB + 0.055) / 1.055, 2.4);
  
  // Calculate the luminance
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
};

/**
 * Determines the best contrast color (black or white) for text displayed on a given background color
 * This implementation follows the WCAG guidelines
 * @param hexColor - The background color in hex format
 * @returns A hex color string for the text (#000000 or #FFFFFF)
 */
export const getContrastColor = (hexColor: string): string => {
  // Convert hex to RGB
  const { r, g, b } = hexToRgb(hexColor);
  
  // Calculate relative luminance 
  const luminance = calculateRelativeLuminance(r, g, b);
  
  // Return black for bright colors, white for dark ones
  // The threshold of 0.5 is commonly used for this purpose
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};

/**
 * Calculates the contrast ratio between two colors according to WCAG
 * @param color1 - First color in hex format
 * @param color2 - Second color in hex format
 * @returns The contrast ratio (1-21)
 */
export const calculateContrastRatio = (color1: string, color2: string): number => {
  const color1Rgb = hexToRgb(color1);
  const color2Rgb = hexToRgb(color2);
  
  const luminance1 = calculateRelativeLuminance(color1Rgb.r, color1Rgb.g, color1Rgb.b);
  const luminance2 = calculateRelativeLuminance(color2Rgb.r, color2Rgb.g, color2Rgb.b);
  
  // Ensure the lighter color is always the first one for consistent calculation
  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);
  
  // Calculate contrast ratio: (L1 + 0.05) / (L2 + 0.05)
  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * Checks if a color combination meets WCAG contrast guidelines
 * @param foreground - Foreground color in hex format
 * @param background - Background color in hex format
 * @param level - Accessibility level to test against ('AA' or 'AAA')
 * @param isLargeText - Whether the text is considered large (18pt+)
 * @returns Whether the colors meet the specified contrast requirements
 */
export const meetsContrastGuidelines = (
  foreground: string, 
  background: string, 
  level: 'AA' | 'AAA' = 'AA', 
  isLargeText: boolean = false
): boolean => {
  const ratio = calculateContrastRatio(foreground, background);
  
  if (level === 'AA') {
    return isLargeText ? ratio >= 3 : ratio >= 4.5;
  } else { // AAA level
    return isLargeText ? ratio >= 4.5 : ratio >= 7;
  }
};

/**
 * Suggests an alternate color with better contrast if the provided colors don't meet guidelines
 * @param foreground - Foreground color in hex format
 * @param background - Background color in hex format
 * @param level - Accessibility level to test against ('AA' or 'AAA')
 * @param isLargeText - Whether the text is considered large (18pt+)
 * @returns A suggested foreground color or null if current colors are sufficient
 */
export const suggestBetterContrastColor = (
  foreground: string, 
  background: string, 
  level: 'AA' | 'AAA' = 'AA', 
  isLargeText: boolean = false
): string | null => {
  // Check if current contrast is sufficient
  if (meetsContrastGuidelines(foreground, background, level, isLargeText)) {
    return null; // No suggestion needed
  }
  
  // If not, suggest black or white based on background luminance
  const { r, g, b } = hexToRgb(background);
  const luminance = calculateRelativeLuminance(r, g, b);
  
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};
