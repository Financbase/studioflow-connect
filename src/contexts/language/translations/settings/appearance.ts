
import { Language } from "../../types";
import { ensureAllLanguages } from "../../utils";

const appearanceSettingsTranslations: Record<string, Record<Language, string>> = {
  "settings.appearance.tabs.themes": ensureAllLanguages({
    en: "Themes",
    es: "Temas",
    fr: "Thèmes",
    de: "Themen",
    sv: "Teman",
    ja: "テーマ",
    zh: "主题",
    ru: "Темы",
    pt: "Temas",
    ar: "السمات"
  }),
  "settings.appearance.tabs.palettes": ensureAllLanguages({
    en: "Color Palettes",
    es: "Paletas de Colores",
    fr: "Palettes de Couleurs",
    de: "Farbpaletten",
    sv: "Färgpaletter",
    ja: "カラーパレット",
    zh: "调色板",
    ru: "Цветовые палитры",
    pt: "Paletas de Cores",
    ar: "لوحات الألوان"
  }),
  "settings.appearance.tabs.tokens": ensureAllLanguages({
    en: "Design Tokens",
    es: "Tokens de Diseño",
    fr: "Jetons de Design",
    de: "Design-Tokens",
    sv: "Designtokens",
    ja: "デザイントークン",
    zh: "设计令牌",
    ru: "Дизайн-токены",
    pt: "Tokens de Design",
    ar: "رموز التصميم"
  })
};

export default appearanceSettingsTranslations;
