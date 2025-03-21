
import { hexToRgb } from "./colorUtils";

/**
 * Determines the best contrast color (black or white) for text displayed on a given background color
 * @param hexColor - The background color in hex format
 * @returns A hex color string for the text
 */
export const getContrastColor = (hexColor: string): string => {
  // Convert hex to RGB
  const { r, g, b } = hexToRgb(hexColor);
  
  // Calculate luminance - simplified formula
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return black for bright colors, white for dark ones
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};
