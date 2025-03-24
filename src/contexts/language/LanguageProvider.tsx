import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { Language, LanguageContextType, LanguageProviderProps } from "./types";
import translations, { languageNames } from "./translations";
import { flagEmojis } from "./utils";

// Create the language context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("en");
  const [isInitialized, setIsInitialized] = useState(false);
  
  useEffect(() => {
    try {
      // Try to get stored language from localStorage
      const storedLanguage = localStorage.getItem("app_language") as Language;
      if (storedLanguage && Object.keys(flagEmojis).includes(storedLanguage)) {
        setLanguageState(storedLanguage);
      }
      
      // Debug output to verify translations are loaded
      console.log("Translation keys loaded:", Object.keys(translations).length);
      
      // Print some example keys to check they're properly available
      if (process.env.NODE_ENV === 'development') {
        console.log("Sample translation keys:", 
          Object.keys(translations).filter(key => key.startsWith("dashboard")).slice(0, 5)
        );
        
        // Log all dashboard keys for debugging
        const dashboardKeys = Object.keys(translations).filter(key => key.startsWith("dashboard"));
        console.log("All dashboard translation keys:", dashboardKeys);
      }
    } catch (error) {
      console.error("Error initializing language provider:", error);
    } finally {
      // Set initialized to true even if there was an error
      setIsInitialized(true);
    }
  }, []);
  
  const setLanguage = (lang: Language) => {
    try {
      setLanguageState(lang);
      localStorage.setItem("app_language", lang);
      
      // Dispatch a custom event for any listeners
      const event = new CustomEvent("languageChange", { detail: { language: lang } });
      window.dispatchEvent(event);
      
      // Show a toast notification
      toast({
        title: "Language Updated",
        description: `Language changed to ${languageNames[lang][lang]}`,
      });
      
      // Update HTML lang attribute
      document.documentElement.lang = lang;
      
      // Set RTL direction for Arabic language
      if (lang === 'ar') {
        document.documentElement.dir = 'rtl';
      } else {
        document.documentElement.dir = 'ltr';
      }
      
      console.log(`Language changed to ${lang} with ${Object.keys(translations).length} translation keys available`);
    } catch (error) {
      console.error("Error setting language:", error);
      toast({
        title: "Error",
        description: "Failed to change language. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  // Get translation for a given key
  const t = (key: string): string => {
    try {
      if (!translations[key]) {
        // Log missing keys but with specific category info to help debugging
        const category = key.split('.')[0];
        console.warn(`Translation key not found: ${key} (category: ${category})`);
        return key;
      }
      
      const result = translations[key][language] || translations[key].en || key;
      
      // Debug log missing translations for current language
      if (!translations[key][language] && language !== 'en') {
        console.warn(`Missing ${language} translation for key: ${key}`);
      }
      
      return result;
    } catch (error) {
      console.error(`Error translating key ${key}:`, error);
      return key;
    }
  };
  
  // Get all translations for current language
  const getTranslationObject = (): Record<string, string> => {
    try {
      const result: Record<string, string> = {};
      
      Object.keys(translations).forEach(key => {
        result[key] = translations[key][language] || translations[key].en || key;
      });
      
      return result;
    } catch (error) {
      console.error("Error getting translation object:", error);
      return {};
    }
  };
  
  // Translate dynamic content
  const translateDynamic = (text: string): string => {
    try {
      // Check if text contains translation keys in the format {{key}}
      if (text && text.includes('{{') && text.includes('}}')) {
        return text.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
          return t(key.trim());
        });
      }
      
      // Otherwise return the text as is
      return text;
    } catch (error) {
      console.error("Error translating dynamic content:", error);
      return text;
    }
  };
  
  // Create the context value
  const contextValue: LanguageContextType = {
    language, 
    currentLanguage: language,
    setLanguage,
    translations,
    t,
    getTranslationObject,
    translateDynamic,
    isInitialized
  };
  
  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook for easy context usage
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

// Export the context for direct access if needed
export { LanguageContext };
