
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

export type Language = "en" | "es" | "fr" | "de" | "sv";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Record<string, Record<Language, string>>;
  t: (key: string) => string;
}

const translations = {
  "header.documentation": {
    en: "Documentation",
    es: "Documentación",
    fr: "Documentation",
    de: "Dokumentation",
    sv: "Dokumentation"
  },
  "header.need_help": {
    en: "Need Help?",
    es: "¿Necesitas Ayuda?",
    fr: "Besoin d'Aide?",
    de: "Brauchen Sie Hilfe?",
    sv: "Behöver du hjälp?"
  },
  "dashboard.title": {
    en: "StudioFlow X",
    es: "StudioFlow X",
    fr: "StudioFlow X",
    de: "StudioFlow X",
    sv: "StudioFlow X"
  },
  "dashboard.subtitle": {
    en: "Unified music production platform for legacy integration, multi-DAW workflows, and creative tools",
    es: "Plataforma unificada de producción musical para integración heredada, flujos de trabajo multi-DAW y herramientas creativas",
    fr: "Plateforme de production musicale unifiée pour l'intégration héritée, les flux de travail multi-DAW et les outils créatifs",
    de: "Einheitliche Musikproduktionsplattform für Legacy-Integration, Multi-DAW-Workflows und kreative Tools",
    sv: "Enhetlig musikproduktionsplattform för legacy-integration, multi-DAW-arbetsflöden och kreativa verktyg"
  },
  "footer.terms": {
    en: "Terms",
    es: "Términos",
    fr: "Conditions",
    de: "Bedingungen",
    sv: "Villkor"
  },
  "footer.privacy": {
    en: "Privacy",
    es: "Privacidad",
    fr: "Confidentialité",
    de: "Datenschutz",
    sv: "Integritet"
  },
  "footer.contact": {
    en: "Contact",
    es: "Contacto",
    fr: "Contact",
    de: "Kontakt",
    sv: "Kontakt"
  },
  "footer.copyright": {
    en: "© 2024 StudioFlow X. All rights reserved.",
    es: "© 2024 StudioFlow X. Todos los derechos reservados.",
    fr: "© 2024 StudioFlow X. Tous droits réservés.",
    de: "© 2024 StudioFlow X. Alle Rechte vorbehalten.",
    sv: "© 2024 StudioFlow X. Alla rättigheter förbehållna."
  },
  "widgets.system": {
    en: "StudioFlow System Monitor",
    es: "Monitor del Sistema StudioFlow",
    fr: "Moniteur Système StudioFlow",
    de: "StudioFlow Systemmonitor",
    sv: "StudioFlow Systemövervakning"
  },
  "language.en": {
    en: "English",
    es: "Inglés",
    fr: "Anglais",
    de: "Englisch",
    sv: "Engelska"
  },
  "language.es": {
    en: "Spanish",
    es: "Español",
    fr: "Espagnol",
    de: "Spanisch",
    sv: "Spanska"
  },
  "language.fr": {
    en: "French",
    es: "Francés",
    fr: "Français",
    de: "Französisch",
    sv: "Franska"
  },
  "language.de": {
    en: "German",
    es: "Alemán",
    fr: "Allemand",
    de: "Deutsch",
    sv: "Tyska"
  },
  "language.sv": {
    en: "Swedish",
    es: "Sueco",
    fr: "Suédois",
    de: "Schwedisch",
    sv: "Svenska"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("en");
  
  // Initialize language from localStorage
  useEffect(() => {
    const storedLanguage = localStorage.getItem("app_language") as Language;
    if (storedLanguage && ["en", "es", "fr", "de", "sv"].includes(storedLanguage)) {
      setLanguageState(storedLanguage);
    }
  }, []);
  
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("app_language", lang);
    
    toast({
      title: "Language Updated",
      description: `Language changed to ${translations[`language.${lang}`][lang]}`,
    });
  };
  
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language] || translations[key].en;
  };
  
  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage,
        translations,
        t
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
