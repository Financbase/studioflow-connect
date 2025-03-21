
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useColorVersionManager, ColorVersion } from "@/hooks/useColorVersionManager";

export type ThemeVariant = "modern" | "legacy" | "classic" | "windows" | "default" | "retro";
export type ThemeMode = "dark" | "light";

interface ThemeContextType {
  themeVariant: ThemeVariant;
  setThemeVariant: (theme: ThemeVariant) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  saveCurrentTheme: (name: string, description?: string) => void;
  versionManager: ReturnType<typeof useColorVersionManager>;
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
  
  return (
    <ThemeContext.Provider value={{
      themeVariant,
      setThemeVariant: handleSetThemeVariant,
      isDarkMode,
      toggleDarkMode,
      theme,
      setTheme: handleSetTheme,
      saveCurrentTheme,
      versionManager
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
