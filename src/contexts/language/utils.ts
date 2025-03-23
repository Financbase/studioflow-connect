
import { Language } from "./types";

// Flag emojis for each supported language
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

/**
 * Interpolates variables into a translated string
 * Example: interpolate("Hello {name}", { name: "World" }) => "Hello World"
 */
export const interpolate = (text: string, variables: Record<string, string | number>): string => {
  if (!text) return '';
  
  return Object.entries(variables).reduce((result, [key, value]) => {
    const regex = new RegExp(`{${key}}`, 'g');
    return result.replace(regex, String(value));
  }, text);
};

/**
 * Formats a date based on language preferences
 */
export const formatDate = (date: Date, language: Language): string => {
  try {
    return new Intl.DateTimeFormat(language).format(date);
  } catch (error) {
    console.error("Error formatting date:", error);
    return date.toLocaleDateString();
  }
};

/**
 * Formats a number based on language preferences
 */
export const formatNumber = (num: number, language: Language): string => {
  try {
    return new Intl.NumberFormat(language).format(num);
  } catch (error) {
    console.error("Error formatting number:", error);
    return num.toString();
  }
};
