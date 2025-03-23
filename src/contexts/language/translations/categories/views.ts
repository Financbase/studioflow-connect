
import { Language } from "../../types";
import { processTranslations } from "../../utils";

const viewTranslations = {
  "view.simple": {
    en: "Simple",
    es: "Simple",
    fr: "Simple",
    de: "Einfach",
    sv: "Enkel",
    ja: "シンプル",
    zh: "简单",
    ru: "Простой",
    pt: "Simples",
    ar: "بسيط"
  },
  "view.advanced": {
    en: "Advanced",
    es: "Avanzado",
    fr: "Avancé",
    de: "Erweitert",
    sv: "Avancerad",
    ja: "高度",
    zh: "高级",
    ru: "Расширенный",
    pt: "Avançado",
    ar: "متقدم"
  },
  "view.custom": {
    en: "Custom",
    es: "Personalizado",
    fr: "Personnalisé",
    de: "Benutzerdefiniert",
    sv: "Anpassad",
    ja: "カスタム",
    zh: "自定义",
    ru: "Настраиваемый",
    pt: "Personalizado",
    ar: "مخصص"
  }
};

export default processTranslations(viewTranslations);
