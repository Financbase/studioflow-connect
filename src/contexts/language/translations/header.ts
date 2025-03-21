
import { Language } from "../types";
import { processTranslations } from "../utils";

const headerTranslations = {
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
  }
};

export default processTranslations(headerTranslations);
