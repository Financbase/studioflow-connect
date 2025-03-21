
import { useState } from "react";
import { hexToRgb, generateThemePalette, generateAnalogous, generateComplementary, generateTriadic } from "@/lib/colorUtils";

export const usePaletteGenerator = (theme: string) => {
  const [generatedPalettes, setGeneratedPalettes] = useState<Record<string, string>[]>([]);
  const [selectedPalette, setSelectedPalette] = useState<Record<string, string> | null>(null);
  
  // Function to generate theme palettes based on primary color
  const generatePalettes = (primaryColor: string) => {
    const isDark = theme === "dark";
    
    // Create various versions of the palette
    const mainPalette = generateThemePalette(primaryColor, isDark);
    
    // Create complementary palette
    const [_, complementaryColor] = generateComplementary(primaryColor);
    const complementaryPalette = generateThemePalette(complementaryColor, isDark);
    
    // Create triadic palettes
    const [__, triadicColor1, triadicColor2] = generateTriadic(primaryColor);
    const triadicPalette1 = generateThemePalette(triadicColor1, isDark);
    const triadicPalette2 = generateThemePalette(triadicColor2, isDark);
    
    // Create analogous palettes
    const analogousColors = generateAnalogous(primaryColor, 5);
    const analogousPalette1 = generateThemePalette(analogousColors[1], isDark);
    const analogousPalette2 = generateThemePalette(analogousColors[3], isDark);
    
    // Save the generated palettes
    setGeneratedPalettes([
      mainPalette, 
      complementaryPalette, 
      triadicPalette1, 
      triadicPalette2,
      analogousPalette1,
      analogousPalette2
    ]);
    
    // Select the first palette by default
    setSelectedPalette(mainPalette);
    
    // Preview the first palette
    applyTempPalette(mainPalette);
  };
  
  // Apply a temporary palette without saving
  const applyTempPalette = (palette: Record<string, string>) => {
    Object.entries(palette).forEach(([key, hexValue]) => {
      const { r, g, b } = hexToRgb(hexValue);
      document.documentElement.style.setProperty(`--${key}`, `${r} ${g} ${b}`);
    });
  };

  return {
    generatedPalettes,
    selectedPalette,
    setSelectedPalette,
    generatePalettes,
    applyTempPalette
  };
};
