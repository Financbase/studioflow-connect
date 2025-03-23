
import { Language } from "../../types";
import { ensureAllLanguages } from "../../utils";

const viewTranslations: Record<string, Record<Language, string>> = {
  "view.simple": ensureAllLanguages({
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
  }),
  "view.advanced": ensureAllLanguages({
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
  }),
  "view.custom": ensureAllLanguages({
    en: "Custom",
    es: "Personalizado",
    fr: "Personnalisé",
    de: "Benutzerdefiniert",
    sv: "Anpassad",
    ja: "カスタム",
    zh: "自定义",
    ru: "Пользовательский",
    pt: "Personalizado",
    ar: "مخصص"
  }),
  "label.dashboardview": ensureAllLanguages({
    en: "Dashboard View",
    es: "Vista del Panel",
    fr: "Vue du Tableau de Bord",
    de: "Dashboard-Ansicht",
    sv: "Instrumentpanelsvy",
    ja: "ダッシュボード表示",
    zh: "仪表板视图",
    ru: "Вид Панели Управления",
    pt: "Visualização do Painel",
    ar: "عرض لوحة المعلومات"
  }),
  "label.language": ensureAllLanguages({
    en: "Language",
    es: "Idioma",
    fr: "Langue",
    de: "Sprache",
    sv: "Språk",
    ja: "言語",
    zh: "语言",
    ru: "Язык",
    pt: "Idioma",
    ar: "اللغة"
  })
};

export default viewTranslations;
