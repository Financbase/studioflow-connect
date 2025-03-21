
import { hexToRgb } from "./colorUtils";

/**
 * Determines the best contrast color (black or white) for text displayed on a given background color
 * This implementation follows the WCAG guidelines more closely
 * @param hexColor - The background color in hex format
 * @returns A hex color string for the text (#000000 or #FFFFFF)
 */
export const getContrastColor = (hexColor: string): string => {
  // Convert hex to RGB
  const { r, g, b } = hexToRgb(hexColor);
  
  // Calculate relative luminance according to WCAG formula
  // https://www.w3.org/TR/WCAG20-TECHS/G17.html
  
  // First normalize RGB values
  const sR = r / 255;
  const sG = g / 255;
  const sB = b / 255;
  
  // Convert to linear RGB values
  const R = sR <= 0.03928 ? sR / 12.92 : Math.pow((sR + 0.055) / 1.055, 2.4);
  const G = sG <= 0.03928 ? sG / 12.92 : Math.pow((sG + 0.055) / 1.055, 2.4);
  const B = sB <= 0.03928 ? sB / 12.92 : Math.pow((sB + 0.055) / 1.055, 2.4);
  
  // Calculate the luminance
  const luminance = 0.2126 * R + 0.7152 * G + 0.0722 * B;
  
  // Return black for bright colors, white for dark ones
  // The threshold of 0.5 is commonly used for this purpose
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};
