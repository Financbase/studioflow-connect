
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { Language, LanguageContextType, LanguageProviderProps } from "./types";
import translations, { languageNames } from "./translations";
import { flagEmojis } from "./utils";

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("en");
  
  useEffect(() => {
    const storedLanguage = localStorage.getItem("app_language") as Language;
    if (storedLanguage && Object.keys(flagEmojis).includes(storedLanguage)) {
      setLanguageState(storedLanguage);
    }
  }, []);
  
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("app_language", lang);
    
    const event = new CustomEvent("languageChange", { detail: { language: lang } });
    window.dispatchEvent(event);
    
    toast({
      title: "Language Updated",
      description: `Language changed to ${languageNames[lang][lang]}`,
    });
    
    document.documentElement.lang = lang;
    
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  };
  
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language] || translations[key].en;
  };
  
  const getTranslationObject = (): Record<string, string> => {
    const result: Record<string, string> = {};
    
    Object.keys(translations).forEach(key => {
      result[key] = translations[key][language] || translations[key].en;
    });
    
    return result;
  };
  
  const translateDynamic = (text: string): string => {
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

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
