
import React, { createContext, useContext, useState, useEffect } from "react";

type ThemeVariant = "modern" | "legacy" | "classic" | "windows";

interface ThemeContextType {
  themeVariant: ThemeVariant;
  setThemeVariant: (theme: ThemeVariant) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
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
  
  // Initialize theme from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("ui_theme_variant") as ThemeVariant;
    if (storedTheme && pricingTier === "pro") {
      setThemeVariant(storedTheme);
    }
    
    const isDark = localStorage.getItem("theme") === "dark" || 
      (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    setIsDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
    
    // Apply theme-specific class
    document.documentElement.classList.remove("theme-modern", "theme-legacy", "theme-classic", "theme-windows");
    document.documentElement.classList.add(`theme-${themeVariant}`);
  }, [pricingTier]);
  
  // Save theme when it changes
  useEffect(() => {
    if (pricingTier === "pro") {
      localStorage.setItem("ui_theme_variant", themeVariant);
      
      // Apply theme-specific class
      document.documentElement.classList.remove("theme-modern", "theme-legacy", "theme-classic", "theme-windows");
      document.documentElement.classList.add(`theme-${themeVariant}`);
    }
  }, [themeVariant, pricingTier]);
  
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };
  
  return (
    <ThemeContext.Provider value={{
      themeVariant,
      setThemeVariant,
      isDarkMode,
      toggleDarkMode
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
