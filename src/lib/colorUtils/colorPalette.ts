
import { hslToRgb, hexToRgb, rgbToHsl } from './colorConversion';

/**
 * Generate a palette of colors based on a primary color
 * @param baseColor Base color in hex format
 * @param count Number of colors to generate
 * @returns Array of hex color strings
 */
export function generatePalette(baseColor: string, count: number = 5): string[] {
  const { r, g, b } = hexToRgb(baseColor);
  const { h, s, l } = rgbToHsl(r, g, b);
  
  // Generate colors with varying lightness
  const palette: string[] = [];
  const step = 0.8 / (count - 1);
  
  for (let i = 0; i < count; i++) {
    const newL = 0.1 + i * step;
    const { r: rNew, g: gNew, b: bNew } = hslToRgb(h, s, newL);
    palette.push(
      '#' + [rNew, gNew, bNew].map(x => {
        const hex = Math.round(x).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      }).join('')
    );
  }
  
  return palette;
}

/**
 * Generate an analogous color scheme
 * @param baseColor Base color in hex format
 * @param count Number of colors to generate
 * @returns Array of hex color strings
 */
export function generateAnalogous(baseColor: string, count: number = 3): string[] {
  const { r, g, b } = hexToRgb(baseColor);
  const { h, s, l } = rgbToHsl(r, g, b);
  
  const palette: string[] = [];
  const hueStep = 0.05;
  
  for (let i = 0; i < count; i++) {
    const newH = (h + (i - Math.floor(count / 2)) * hueStep) % 1;
    const { r: rNew, g: gNew, b: bNew } = hslToRgb(newH, s, l);
    palette.push(
      '#' + [rNew, gNew, bNew].map(x => {
        const hex = Math.round(x).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      }).join('')
    );
  }
  
  return palette;
}

/**
 * Generate a complementary color scheme
 * @param baseColor Base color in hex format
 * @returns Array of hex color strings (base color and its complement)
 */
export function generateComplementary(baseColor: string): string[] {
  const { r, g, b } = hexToRgb(baseColor);
  const { h, s, l } = rgbToHsl(r, g, b);
  
  // Complementary color is 180° (0.5 in [0,1] scale) away from the base color
  const complementaryH = (h + 0.5) % 1;
  const { r: rComp, g: gComp, b: bComp } = hslToRgb(complementaryH, s, l);
  
  return [
    baseColor,
    '#' + [rComp, gComp, bComp].map(x => {
      const hex = Math.round(x).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('')
  ];
}

/**
 * Generate a triadic color scheme
 * @param baseColor Base color in hex format
 * @returns Array of hex color strings (base color and two triadic colors)
 */
export function generateTriadic(baseColor: string): string[] {
  const { r, g, b } = hexToRgb(baseColor);
  const { h, s, l } = rgbToHsl(r, g, b);
  
  // Triadic colors are 120° (0.33 in [0,1] scale) away from each other
  const triadicH1 = (h + 0.33) % 1;
  const triadicH2 = (h + 0.66) % 1;
  
  const { r: r1, g: g1, b: b1 } = hslToRgb(triadicH1, s, l);
  const { r: r2, g: g2, b: b2 } = hslToRgb(triadicH2, s, l);
  
  return [
    baseColor,
    '#' + [r1, g1, b1].map(x => {
      const hex = Math.round(x).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join(''),
    '#' + [r2, g2, b2].map(x => {
      const hex = Math.round(x).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('')
  ];
}
