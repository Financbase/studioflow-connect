
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { Language, LanguageContextType, LanguageProviderProps } from "./types";
import translations, { languageNames } from "./translations";
import { flagEmojis } from "./utils";

// Create the language context
export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("en");
  
  useEffect(() => {
    // Try to get stored language from localStorage
    const storedLanguage = localStorage.getItem("app_language") as Language;
    if (storedLanguage && Object.keys(flagEmojis).includes(storedLanguage)) {
      setLanguageState(storedLanguage);
    }
    
    // Debug output to verify translations are loaded
    console.log("Translation keys loaded:", Object.keys(translations).length);
  }, []);
  
  const setLanguage = (lang: Language) => {
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
  };
  
  // Get translation for a given key
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language] || translations[key].en;
  };
  
  // Get all translations for current language
  const getTranslationObject = (): Record<string, string> => {
    const result: Record<string, string> = {};
    
    Object.keys(translations).forEach(key => {
      result[key] = translations[key][language] || translations[key].en;
    });
    
    return result;
  };
  
  // Translate dynamic content
  const translateDynamic = (text: string): string => {
    // This function could be enhanced to use a translation service API
    // or to support interpolation of keys within text
    return text;
  };
  
  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        currentLanguage: language,
        setLanguage,
        translations,
        t,
        getTranslationObject,
        translateDynamic
      }}
    >
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
