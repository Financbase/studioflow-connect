
import { Language } from "../types";
import { processTranslations } from "../utils";

export const languageNames: Record<Language, Record<Language, string>> = {
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

const languageTranslations = {
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

export default processTranslations(languageTranslations);
