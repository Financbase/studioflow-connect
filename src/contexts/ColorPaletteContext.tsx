
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { hexToRgb } from "@/lib/colorUtils";

export interface ColorPalette {
  id: string;
  name: string;
  colors: Record<string, string>;
  description?: string;
  timestamp: number;
}

interface ColorPaletteContextType {
  colorPalettes: ColorPalette[];
  saveCurrentColorPalette: (name: string, colors: Record<string, string>, description?: string) => void;
  applyColorPalette: (paletteId: string) => void;
  deleteColorPalette: (paletteId: string) => void;
  currentPaletteId: string | null;
}

interface ColorPaletteProviderProps {
  children: React.ReactNode;
}

const ColorPaletteContext = createContext<ColorPaletteContextType | undefined>(undefined);

export const ColorPaletteProvider: React.FC<ColorPaletteProviderProps> = ({ 
  children 
}) => {
  const [colorPalettes, setColorPalettes] = useState<ColorPalette[]>([]);
  const [currentPaletteId, setCurrentPaletteId] = useState<string | null>(null);
  
  // Initialize from localStorage
  useEffect(() => {
    // Load saved color palettes
    const savedPalettes = localStorage.getItem("color_palettes");
    if (savedPalettes) {
      try {
        setColorPalettes(JSON.parse(savedPalettes));
      } catch (e) {
        console.error("Failed to parse saved color palettes", e);
      }
    }
    
    // Load active palette if exists
    const activePaletteId = localStorage.getItem("active_color_palette_id");
    if (activePaletteId) {
      setCurrentPaletteId(activePaletteId);
      const palette = JSON.parse(savedPalettes || "[]").find(
        (p: ColorPalette) => p.id === activePaletteId
      );
      if (palette) {
        applyPaletteToDOM(palette.colors);
      }
    }
  }, []);
  
  // Apply color palette to DOM
  const applyPaletteToDOM = (colors: Record<string, string>) => {
    Object.entries(colors).forEach(([key, hexValue]) => {
      const { r, g, b } = hexToRgb(hexValue);
      document.documentElement.style.setProperty(`--${key}`, `${r} ${g} ${b}`);
    });
  };
  
  // Save current color palette
  const saveCurrentColorPalette = (name: string, colors: Record<string, string>, description?: string) => {
    const newPalette: ColorPalette = {
      id: Date.now().toString(),
      name,
      colors,
      description,
      timestamp: Date.now()
    };
    
    const updatedPalettes = [...colorPalettes, newPalette];
    setColorPalettes(updatedPalettes);
    setCurrentPaletteId(newPalette.id);
    
    localStorage.setItem("color_palettes", JSON.stringify(updatedPalettes));
    localStorage.setItem("active_color_palette_id", newPalette.id);
    
    toast({
      title: "Color Palette Saved",
      description: `"${name}" has been saved as a new palette`
    });
  };
  
  // Apply a saved color palette
  const applyColorPalette = (paletteId: string) => {
    const palette = colorPalettes.find(p => p.id === paletteId);
    if (!palette) return;
    
    applyPaletteToDOM(palette.colors);
    setCurrentPaletteId(paletteId);
    localStorage.setItem("active_color_palette_id", paletteId);
    
    toast({
      title: "Color Palette Applied",
      description: `"${palette.name}" palette has been applied`
    });
  };
  
  // Delete a color palette
  const deleteColorPalette = (paletteId: string) => {
    if (paletteId === currentPaletteId) {
      toast({
        title: "Cannot Delete Active Palette",
        description: "Please switch to another palette before deleting this one",
        variant: "destructive"
      });
      return;
    }
    
    const updatedPalettes = colorPalettes.filter(p => p.id !== paletteId);
    setColorPalettes(updatedPalettes);
    localStorage.setItem("color_palettes", JSON.stringify(updatedPalettes));
    
    toast({
      title: "Color Palette Deleted",
      description: "The selected color palette has been removed"
    });
  };
  
  return (
    <ColorPaletteContext.Provider value={{
      colorPalettes,
      saveCurrentColorPalette,
      applyColorPalette,
      deleteColorPalette,
      currentPaletteId
    }}>
      {children}
    </ColorPaletteContext.Provider>
  );
};

export const useColorPalette = () => {
  const context = useContext(ColorPaletteContext);
  if (context === undefined) {
    throw new Error("useColorPalette must be used within a ColorPaletteProvider");
  }
  return context;
};
