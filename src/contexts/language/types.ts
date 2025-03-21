
export type Language = "en" | "es" | "fr" | "de" | "sv" | "ja" | "zh" | "ru" | "pt" | "ar";

export interface LanguageContextType {
  language: Language;
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  translations: Record<string, Record<Language, string>>;
  t: (key: string) => string;
  getTranslationObject: () => Record<string, string>;
  translateDynamic: (text: string) => string;
}

export interface LanguageProviderProps {
  children: React.ReactNode;
}
