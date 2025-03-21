
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useColorVersionManager, ColorVersion } from "@/hooks/useColorVersionManager";
import { hexToRgb } from "@/lib/colorUtils";

export type ThemeVariant = "modern" | "legacy" | "classic" | "windows" | "default" | "retro";
export type ThemeMode = "dark" | "light";

export interface ColorPalette {
  id: string;
  name: string;
  colors: Record<string, string>;
  description?: string;
  timestamp: number;
}

interface ThemeContextType {
  themeVariant: ThemeVariant;
  setThemeVariant: (theme: ThemeVariant) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  saveCurrentTheme: (name: string, description?: string) => void;
  versionManager: ReturnType<typeof useColorVersionManager>;
  // Color palette functions
  colorPalettes: ColorPalette[];
  saveCurrentColorPalette: (name: string, colors: Record<string, string>, description?: string) => void;
  applyColorPalette: (paletteId: string) => void;
  deleteColorPalette: (paletteId: string) => void;
  currentPaletteId: string | null;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  pricingTier?: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  pricingTier = "free" 
}) => {
  const [themeVariant, setThemeVariant] = useState<ThemeVariant>("modern");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [colorPalettes, setColorPalettes] = useState<ColorPalette[]>([]);
  const [currentPaletteId, setCurrentPaletteId] = useState<string | null>(null);
  const versionManager = useColorVersionManager();
  
  // Initialize theme from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("ui_theme_variant") as ThemeVariant;
    if (storedTheme && ["modern", "legacy", "classic", "windows", "default", "retro"].includes(storedTheme)) {
      setThemeVariant(storedTheme);
    }
    
    const isDark = localStorage.getItem("theme") === "dark" || 
      (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    setIsDarkMode(isDark);
    setTheme(isDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", isDark);
    
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
  
  // Check for current theme version and apply it if exists
  useEffect(() => {
    const currentVersion = versionManager.getCurrentVersion();
    if (currentVersion) {
      const variant = currentVersion.themeData['themeVariant'] as ThemeVariant;
      if (variant) {
        setThemeVariant(variant);
      }
      
      const mode = currentVersion.themeData['themeMode'] as ThemeMode;
      if (mode) {
        setTheme(mode);
        setIsDarkMode(mode === 'dark');
        document.documentElement.classList.toggle("dark", mode === 'dark');
      }
    }
  }, [versionManager.currentVersionId]);
  
  // Apply theme classes when the theme changes
  useEffect(() => {
    // Clean up existing theme classes first
    document.documentElement.classList.remove("theme-modern", "theme-legacy", "theme-classic", "theme-windows", "theme-default", "theme-retro");
    // Add the new theme class
    document.documentElement.classList.add(`theme-${themeVariant}`);
    
    // Save to localStorage if applicable
    localStorage.setItem("ui_theme_variant", themeVariant);
    
    console.log("Theme changed to:", themeVariant);
  }, [themeVariant]);
  
  const handleSetThemeVariant = (theme: ThemeVariant) => {
    setThemeVariant(theme);
    // Add a toast notification for feedback
    toast({
      title: "Theme Updated",
      description: `UI theme changed to ${theme.charAt(0).toUpperCase() + theme.slice(1)}`,
    });
  };
  
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    setTheme(newMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    
    toast({
      title: newMode ? "Dark Mode Enabled" : "Light Mode Enabled",
      description: "Theme mode has been changed",
    });
  };
  
  // A specific setter for theme mode
  const handleSetTheme = (mode: ThemeMode) => {
    const isDark = mode === "dark";
    setIsDarkMode(isDark);
    setTheme(mode);
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", mode);
    
    toast({
      title: isDark ? "Dark Mode Enabled" : "Light Mode Enabled",
      description: "Theme mode has been changed",
    });
  };
  
  // Save current theme as a version
  const saveCurrentTheme = (name: string, description?: string) => {
    const themeData = {
      themeVariant,
      themeMode: theme,
      isDarkMode: isDarkMode.toString()
    };
    
    versionManager.saveVersion(name, themeData, description);
  };
  
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
    <ThemeContext.Provider value={{
      themeVariant,
      setThemeVariant: handleSetThemeVariant,
      isDarkMode,
      toggleDarkMode,
      theme,
      setTheme: handleSetTheme,
      saveCurrentTheme,
      versionManager,
      // Color palette functions
      colorPalettes,
      saveCurrentColorPalette,
      applyColorPalette,
      deleteColorPalette,
      currentPaletteId
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
