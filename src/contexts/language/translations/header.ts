
import { Language } from "../types";
import { processTranslations } from "../utils";

const headerTranslations = {
  "header.title": {
    en: "StudioFlow",
    es: "StudioFlow",
    fr: "StudioFlow",
    de: "StudioFlow",
    sv: "StudioFlow",
    ja: "StudioFlow",
    zh: "StudioFlow",
    ru: "StudioFlow",
    pt: "StudioFlow",
    ar: "StudioFlow"
  },
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
  "header.settings": {
    en: "Settings",
    es: "Configuración",
    fr: "Paramètres",
    de: "Einstellungen",
    sv: "Inställningar",
    ja: "設定",
    zh: "设置",
    ru: "Настройки",
    pt: "Configurações",
    ar: "الإعدادات"
  },
  "header.profile": {
    en: "Profile",
    es: "Perfil",
    fr: "Profil",
    de: "Profil",
    sv: "Profil",
    ja: "プロフィール",
    zh: "个人资料",
    ru: "Профиль",
    pt: "Perfil",
    ar: "الملف الشخصي"
  },
  "header.zenMode": {
    en: "Zen Mode",
    es: "Modo Zen",
    fr: "Mode Zen",
    de: "Zen-Modus",
    sv: "Zen-läge",
    ja: "ゼンモード",
    zh: "禅模式",
    ru: "Режим Дзен",
    pt: "Modo Zen",
    ar: "وضع زن"
  }
};

export default processTranslations(headerTranslations);
