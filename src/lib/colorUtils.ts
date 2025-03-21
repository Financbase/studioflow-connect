
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
