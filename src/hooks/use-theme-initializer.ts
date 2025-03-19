
import { useEffect } from "react";

/**
 * A hook to initialize theme settings from localStorage or system preferences
 * and set up necessary event listeners
 */
export function useThemeInitializer() {
  useEffect(() => {
    // Set dark mode by default if not set
    if (!localStorage.getItem("theme")) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      // Apply existing theme setting
      const isDarkMode = localStorage.getItem("theme") === "dark";
      document.documentElement.classList.toggle("dark", isDarkMode);
    }
    
    // Initialize theme variant if it exists in localStorage
    const storedTheme = localStorage.getItem("ui_theme_variant");
    const validThemes = ["modern", "legacy", "classic", "windows"];
    
    if (storedTheme && validThemes.includes(storedTheme)) {
      document.documentElement.classList.add(`theme-${storedTheme}`);
    } else {
      document.documentElement.classList.add("theme-modern");
      localStorage.setItem("ui_theme_variant", "modern");
    }
    
    // Initialize language if not set
    if (!localStorage.getItem("app_language")) {
      localStorage.setItem("app_language", "en");
    }
    
    // Add event listener for language changes to adjust layout
    const handleLanguageChange = () => {
      document.documentElement.classList.add("text-adaptive");
    };
    
    window.addEventListener("languageChange", handleLanguageChange);
    
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange);
    };
  }, []);
}
