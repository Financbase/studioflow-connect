
import { Language } from "./types";

// Helper function to ensure all languages are present for each translation
export const ensureAllLanguages = (translationObj: Record<string, string>): Record<Language, string> => {
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
export const processTranslations = (translations: Record<string, Record<string, string>>): Record<string, Record<Language, string>> => {
  const result: Record<string, Record<Language, string>> = {};
  
  Object.keys(translations).forEach(key => {
    result[key] = ensureAllLanguages(translations[key]);
  });
  
  return result;
};

export const flagEmojis: Record<Language, string> = {
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
