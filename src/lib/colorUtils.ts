
/**
 * Converts an HSL color value to RGB format
 * Assumes h, s, and l are in the set [0, 1]
 */
export function hslToRgb(h: number, s: number, l: number): { r: number, g: number, b: number } {
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

/**
 * Converts RGB to HSL
 * Assumes r, g, and b are in the set [0, 255]
 */
export function rgbToHsl(r: number, g: number, b: number): { h: number, s: number, l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    
    h /= 6;
  }

  return { h, s, l };
}

/**
 * Converts RGB values to a hex string
 * @param r - Red (0-255)
 * @param g - Green (0-255)
 * @param b - Blue (0-255)
 * @returns Hex color string in the format "#RRGGBB"
 */
export function rgbToHex(rgb: string): string {
  // Parse "r g b" string to individual components
  const [r, g, b] = rgb.split(' ').map(Number);
  
  // Handle invalid input
  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    return '#000000';
  }
  
  return '#' + [r, g, b].map(x => {
    const hex = Math.round(x).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

/**
 * Converts a hex string to RGB values
 * @param hex - Hex color string in the format "#RRGGBB" or "#RGB"
 * @returns Object with r, g, b values (0-255)
 */
export function hexToRgb(hex: string): { r: number, g: number, b: number } {
  // Default to black for invalid input
  if (!hex || typeof hex !== 'string') {
    return { r: 0, g: 0, b: 0 };
  }
  
  // Expand shorthand form (e.g. "#03F") to full form (e.g. "#0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
}

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
