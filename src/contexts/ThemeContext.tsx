
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useColorVersionManager } from "@/hooks/useColorVersionManager";
import { ThemeVariant, ThemeMode } from "@/hooks/colorVersions/types";
import { ColorPaletteProvider } from "./ColorPaletteContext";

interface ThemeContextType {
  themeVariant: ThemeVariant;
  setThemeVariant: (theme: ThemeVariant) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  saveCurrentTheme: (name: string, description?: string, tags?: string[]) => void;
  versionManager: ReturnType<typeof useColorVersionManager>;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  pricingTier?: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProviderInner: React.FC<ThemeProviderProps> = ({ 
  children, 
  pricingTier = "free" 
}) => {
  const [themeVariant, setThemeVariant] = useState<ThemeVariant>("modern");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const versionManager = useColorVersionManager();
  
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
  
  useEffect(() => {
    const currentVersion = versionManager.currentVersion;
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
      
      document.documentElement.classList.add('animate-theme-transition');
      
      setTimeout(() => {
        document.documentElement.classList.remove('animate-theme-transition');
      }, 500);
    }
  }, [versionManager.currentVersionId]);
  
  useEffect(() => {
    document.documentElement.classList.remove("theme-modern", "theme-legacy", "theme-classic", "theme-windows", "theme-default", "theme-retro");
    document.documentElement.classList.add(`theme-${themeVariant}`);
    
    localStorage.setItem("ui_theme_variant", themeVariant);
    
    console.log("Theme changed to:", themeVariant);
  }, [themeVariant]);
  
  const handleSetThemeVariant = (theme: ThemeVariant) => {
    setThemeVariant(theme);
    document.documentElement.classList.add('animate-theme-transition');
    
    setTimeout(() => {
      document.documentElement.classList.remove('animate-theme-transition');
    }, 500);
    
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
    
    document.documentElement.classList.add('animate-theme-transition');
    
    setTimeout(() => {
      document.documentElement.classList.remove('animate-theme-transition');
    }, 500);
    
    toast({
      title: newMode ? "Dark Mode Enabled" : "Light Mode Enabled",
      description: "Theme mode has been changed",
    });
  };
  
  const handleSetTheme = (mode: ThemeMode) => {
    const isDark = mode === "dark";
    setIsDarkMode(isDark);
    setTheme(mode);
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", mode);
    
    document.documentElement.classList.add('animate-theme-transition');
    
    setTimeout(() => {
      document.documentElement.classList.remove('animate-theme-transition');
    }, 500);
    
    toast({
      title: isDark ? "Dark Mode Enabled" : "Light Mode Enabled",
      description: "Theme mode has been changed",
    });
  };
  
  const saveCurrentTheme = (name: string, description?: string, tags?: string[]) => {
    const themeData = {
      themeVariant,
      themeMode: theme,
      isDarkMode: isDarkMode.toString()
    };
    
    const themeDataRecord: Record<string, string> = {
      themeVariant,
      themeMode: theme,
      isDarkMode: isDarkMode.toString()
    };
    
    versionManager.createVersion(name, themeDataRecord, description, tags);
    
    toast({
      title: "Theme Version Saved",
      description: `"${name}" has been saved to your versions`
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
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, pricingTier }) => {
  return (
    <ColorPaletteProvider>
      <ThemeProviderInner pricingTier={pricingTier}>
        {children}
      </ThemeProviderInner>
    </ColorPaletteProvider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
