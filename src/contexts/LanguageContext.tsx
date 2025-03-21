import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

export type Language = "en" | "es" | "fr" | "de" | "sv" | "ja" | "zh" | "ru" | "pt" | "ar";

interface LanguageContextType {
  language: Language;
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  translations: Record<string, Record<Language, string>>;
  t: (key: string) => string;
  getTranslationObject: () => Record<string, string>;
  translateDynamic: (text: string) => string;
}

// Helper function to ensure all languages are present for each translation
const ensureAllLanguages = (translationObj: Record<string, string>): Record<Language, string> => {
  const allLanguages: Language[] = ["en", "es", "fr", "de", "sv", "ja", "zh", "ru", "pt", "ar"];
  const result: Record<Language, string> = {} as Record<Language, string>;
  
  // Set defaults for all languages using English as fallback
  allLanguages.forEach(lang => {
    result[lang] = translationObj["en"] || "";
  });
  
  // Override with actual translations where available
  Object.keys(translationObj).forEach(lang => {
    if (allLanguages.includes(lang as Language)) {
      result[lang as Language] = translationObj[lang];
    }
  });
  
  return result;
};

// Apply the helper to all translation entries
const processTranslations = (translations: Record<string, Record<string, string>>): Record<string, Record<Language, string>> => {
  const result: Record<string, Record<Language, string>> = {};
  
  Object.keys(translations).forEach(key => {
    result[key] = ensureAllLanguages(translations[key]);
  });
  
  return result;
};

const rawTranslations = {
  // Header translations
  "header.documentation": {
    en: "Documentation",
    es: "Documentación",
    fr: "Documentation",
    de: "Dokumentation",
    sv: "Dokumentation",
    ja: "ドキュメント",
    zh: "文档",
    ru: "Документация",
    pt: "Documentação",
    ar: "التوثيق"
  },
  "header.need_help": {
    en: "Need Help?",
    es: "¿Necesitas Ayuda?",
    fr: "Besoin d'Aide?",
    de: "Brauchen Sie Hilfe?",
    sv: "Behöver du hjälp?",
    ja: "お手伝いが必要ですか？",
    zh: "需要帮助吗？",
    ru: "Нужна помощь?",
    pt: "Precisa de Ajuda?",
    ar: "تحتاج مساعدة؟"
  },
  "header.welcome": {
    en: "Welcome to StudioFlow X",
    es: "Bienvenido a StudioFlow X",
    fr: "Bienvenue sur StudioFlow X",
    de: "Willkommen bei StudioFlow X",
    sv: "Välkommen till StudioFlow X",
    ja: "StudioFlow Xへようこそ",
    zh: "欢迎使用StudioFlow X",
    ru: "Добро пожаловать в StudioFlow X",
    pt: "Bem-vindo ao StudioFlow X",
    ar: "مرحبًا بك في StudioFlow X"
  },
  
  // Dashboard translations
  "dashboard.title": {
    en: "StudioFlow X",
    es: "StudioFlow X",
    fr: "StudioFlow X",
    de: "StudioFlow X",
    sv: "StudioFlow X",
    ja: "StudioFlow X",
    zh: "StudioFlow X",
    ru: "StudioFlow X",
    pt: "StudioFlow X",
    ar: "StudioFlow X"
  },
  "dashboard.subtitle": {
    en: "Unified music production platform for legacy integration, multi-DAW workflows, and creative tools",
    es: "Plataforma unificada de producción musical para integración heredada, flujos de trabajo multi-DAW y herramientas creativas",
    fr: "Plateforme de production musicale unifiée pour l'intégration héritée, les flux de travail multi-DAW et les outils créatifs",
    de: "Einheitliche Musikproduktionsplattform für Legacy-Integration, Multi-DAW-Workflows und kreative Tools",
    sv: "Enhetlig musikproduktionsplattform för legacy-integration, multi-DAW-arbetsflöden och kreativa verktyg",
    ja: "レガシー統合、マルチDAWワークフロー、クリエイティブツールのための統合音楽制作プラットフォーム",
    zh: "统一的音乐制作平台，用于传统集成、多DAW工作流程和创意工具",
    ru: "Единая платформа для музыкального производства с поддержкой устаревших систем, мульти-DAW рабочих процессов и креативных инструментов",
    pt: "Plataforma unificada de produção musical para integração legada, fluxos de trabalho multi-DAW e ferramentas criativas",
    ar: "منصة إنتاج موسيقي موحدة للتكامل القديم وتدفقات عمل DAW المتعددة والأدوات الإبداعية"
  },
  
  // Footer translations
  "footer.terms": {
    en: "Terms",
    es: "Términos",
    fr: "Conditions",
    de: "Bedingungen",
    sv: "Villkor",
    ja: "利用規約",
    zh: "条款",
    ru: "Условия",
    pt: "Termos",
    ar: "الشروط"
  },
  "footer.privacy": {
    en: "Privacy",
    es: "Privacidad",
    fr: "Confidentialité",
    de: "Datenschutz",
    sv: "Integritet",
    ja: "プライバシー",
    zh: "隐私",
    ru: "Конфиденциальность",
    pt: "Privacidade",
    ar: "الخصوصية"
  },
  "footer.contact": {
    en: "Contact",
    es: "Contacto",
    fr: "Contact",
    de: "Kontakt",
    sv: "Kontakt",
    ja: "お問い合わせ",
    zh: "联系我们",
    ru: "Контакты",
    pt: "Contato",
    ar: "اتصل بنا"
  },
  "footer.copyright": {
    en: "© 2024 StudioFlow X. All rights reserved.",
    es: "© 2024 StudioFlow X. Todos los derechos reservados.",
    fr: "© 2024 StudioFlow X. Tous droits réservés.",
    de: "© 2024 StudioFlow X. Alle Rechte vorbehalten.",
    sv: "© 2024 StudioFlow X. Alla rättigheter förbehållna.",
    ja: "© 2024 StudioFlow X. All rights reserved.",
    zh: "© 2024 StudioFlow X. 保留所有权利。",
    ru: "© 2024 StudioFlow X. Все права защищены.",
    pt: "© 2024 StudioFlow X. Todos os direitos reservados.",
    ar: "© 2024 StudioFlow X. جميع الحقوق محفوظة."
  },
  
  // Widget titles
  "widgets.system": {
    en: "StudioFlow System Monitor",
    es: "Monitor del Sistema StudioFlow",
    fr: "Moniteur Système StudioFlow",
    de: "StudioFlow Systemmonitor",
    sv: "StudioFlow Systemövervakning",
    ja: "StudioFlow システムモニター",
    zh: "StudioFlow 系统监视器",
    ru: "Системный монитор StudioFlow",
    pt: "Monitor do Sistema StudioFlow",
    ar: "مراقب نظام StudioFlow"
  },
  
  // Language names
  "language.en": {
    en: "English",
    es: "Inglés",
    fr: "Anglais",
    de: "Englisch",
    sv: "Engelska",
    ja: "英語",
    zh: "英语",
    ru: "Английский",
    pt: "Inglês",
    ar: "الإنجليزية"
  },
  "language.es": {
    en: "Spanish",
    es: "Español",
    fr: "Espagnol",
    de: "Spanisch",
    sv: "Spanska",
    ja: "スペイン語",
    zh: "西班牙语",
    ru: "Испанский",
    pt: "Espanhol",
    ar: "الإسبانية"
  },
  "language.fr": {
    en: "French",
    es: "Francés",
    fr: "Français",
    de: "Französisch",
    sv: "Franska",
    ja: "フランス語",
    zh: "法语",
    ru: "Французский",
    pt: "Francês",
    ar: "الفرنسية"
  },
  "language.de": {
    en: "German",
    es: "Alemán",
    fr: "Allemand",
    de: "Deutsch",
    sv: "Tyska",
    ja: "ドイツ語",
    zh: "德语",
    ru: "Немецкий",
    pt: "Alemão",
    ar: "الألمانية"
  },
  "language.sv": {
    en: "Swedish",
    es: "Sueco",
    fr: "Suédois",
    de: "Schwedisch",
    sv: "Svenska",
    ja: "スウェーデン語",
    zh: "瑞典语",
    ru: "Шведский",
    pt: "Sueco",
    ar: "السويدية"
  },
  "language.ja": {
    en: "Japanese",
    es: "Japonés",
    fr: "Japonais",
    de: "Japanisch",
    sv: "Japanska",
    ja: "日本語",
    zh: "日语",
    ru: "Японский",
    pt: "Japonês",
    ar: "اليابانية"
  },
  "language.zh": {
    en: "Chinese",
    es: "Chino",
    fr: "Chinois",
    de: "Chinesisch",
    sv: "Kinesiska",
    ja: "中国語",
    zh: "中文",
    ru: "Китайский",
    pt: "Chinês",
    ar: "الصينية"
  },
  "language.ru": {
    en: "Russian",
    es: "Ruso",
    fr: "Russe",
    de: "Russisch",
    sv: "Ryska",
    ja: "ロシア語",
    zh: "俄语",
    ru: "Русский",
    pt: "Russo",
    ar: "الروسية"
  },
  "language.pt": {
    en: "Portuguese",
    es: "Portugués",
    fr: "Portugais",
    de: "Portugiesisch",
    sv: "Portugisiska",
    ja: "ポルトガル語",
    zh: "葡萄牙语",
    ru: "Португальский",
    pt: "Português",
    ar: "البرتغالية"
  },
  "language.ar": {
    en: "Arabic",
    es: "Árabe",
    fr: "Arabe",
    de: "Arabisch",
    sv: "Arabiska",
    ja: "アラビア語",
    zh: "阿拉伯语",
    ru: "Арабский",
    pt: "Árabe",
    ar: "العربية"
  }
};

const translations = processTranslations(rawTranslations);

const flagEmojis: Record<Language, string> = {
  en: "🇬🇧",
  es: "🇪🇸",
  fr: "🇫🇷",
  de: "🇩🇪",
  sv: "🇸🇪",
  ja: "🇯🇵",
  zh: "🇨🇳",
  ru: "🇷🇺",
  pt: "🇵🇹",
  ar: "🇸🇦"
};

const languageNames: Record<Language, Record<Language, string>> = {
  en: {
    en: "English",
    es: "Inglés",
    fr: "Anglais",
    de: "Englisch",
    sv: "Engelska",
    ja: "英語",
    zh: "英语",
    ru: "Английский",
    pt: "Inglês",
    ar: "الإنجليزية"
  },
  es: {
    en: "Spanish",
    es: "Español",
    fr: "Espagnol",
    de: "Spanisch",
    sv: "Spanska",
    ja: "スペイン語",
    zh: "西班牙语",
    ru: "Испанский",
    pt: "Espanhol",
    ar: "الإسبانية"
  },
  fr: {
    en: "French",
    es: "Francés",
    fr: "Français",
    de: "Französisch",
    sv: "Franska",
    ja: "フランス語",
    zh: "法语",
    ru: "Французский",
    pt: "Francês",
    ar: "الفرنسية"
  },
  de: {
    en: "German",
    es: "Alemán",
    fr: "Allemand",
    de: "Deutsch",
    sv: "Tyska",
    ja: "ドイツ語",
    zh: "德语",
    ru: "Немецкий",
    pt: "Alemão",
    ar: "الألمانية"
  },
  sv: {
    en: "Swedish",
    es: "Sueco",
    fr: "Suédois",
    de: "Schwedisch",
    sv: "Svenska",
    ja: "スウェーデン語",
    zh: "瑞典语",
    ru: "Шведский",
    pt: "Sueco",
    ar: "السويدية"
  },
  ja: {
    en: "Japanese",
    es: "Japonés",
    fr: "Japonais",
    de: "Japanisch",
    sv: "Japanska",
    ja: "日本語",
    zh: "日语",
    ru: "Японский",
    pt: "Japonês",
    ar: "اليابانية"
  },
  zh: {
    en: "Chinese",
    es: "Chino",
    fr: "Chinois",
    de: "Chinesisch",
    sv: "Kinesiska",
    ja: "中国語",
    zh: "中文",
    ru: "Китайский",
    pt: "Chinês",
    ar: "الصينية"
  },
  ru: {
    en: "Russian",
    es: "Ruso",
    fr: "Russe",
    de: "Russisch",
    sv: "Ryska",
    ja: "ロシア語",
    zh: "俄语",
    ru: "Русский",
    pt: "Russo",
    ar: "الروسية"
  },
  pt: {
    en: "Portuguese",
    es: "Portugués",
    fr: "Portugais",
    de: "Portugiesisch",
    sv: "Portugisiska",
    ja: "ポルトガル語",
    zh: "葡萄牙语",
    ru: "Португальский",
    pt: "Português",
    ar: "البرتغالية"
  },
  ar: {
    en: "Arabic",
    es: "Árabe",
    fr: "Arabe",
    de: "Arabisch",
    sv: "Arabiska",
    ja: "アラビア語",
    zh: "阿拉伯语",
    ru: "Арабский",
    pt: "Árabe",
    ar: "العربية"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
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

export { flagEmojis, languageNames };
