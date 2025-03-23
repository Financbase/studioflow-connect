
import { Language } from "../../types";
import { processTranslations } from "../../utils";

const featureTranslations = {
  "plan.projects": {
    en: "Projects",
    es: "Proyectos",
    fr: "Projets",
    de: "Projekte",
    sv: "Projekt",
    ja: "プロジェクト",
    zh: "项目",
    ru: "Проекты",
    pt: "Projetos",
    ar: "المشاريع"
  },
  "plan.storage": {
    en: "Storage",
    es: "Almacenamiento",
    fr: "Stockage",
    de: "Speicher",
    sv: "Lagring",
    ja: "ストレージ",
    zh: "存储",
    ru: "Хранилище",
    pt: "Armazenamento",
    ar: "التخزين"
  },
  "plan.aiFeatures": {
    en: "AI Features",
    es: "Funciones de IA",
    fr: "Fonctionnalités IA",
    de: "KI-Funktionen",
    sv: "AI-funktioner",
    ja: "AI機能",
    zh: "AI功能",
    ru: "ИИ Функции",
    pt: "Recursos de IA",
    ar: "ميزات الذكاء الاصطناعي"
  },
  "plan.limited": {
    en: "Limited",
    es: "Limitado",
    fr: "Limité",
    de: "Begrenzt",
    sv: "Begränsad",
    ja: "限定",
    zh: "有限",
    ru: "Ограничено",
    pt: "Limitado",
    ar: "محدود"
  },
  "plan.fullAccess": {
    en: "Full Access",
    es: "Acceso Completo",
    fr: "Accès Complet",
    de: "Voller Zugriff",
    sv: "Full Tillgång",
    ja: "フルアクセス",
    zh: "完全访问",
    ru: "Полный Доступ",
    pt: "Acesso Completo",
    ar: "وصول كامل"
  },
  "plan.unlimited": {
    en: "Unlimited",
    es: "Ilimitado",
    fr: "Illimité",
    de: "Unbegrenzt",
    sv: "Obegränsad",
    ja: "無制限",
    zh: "无限",
    ru: "Безлимитный",
    pt: "Ilimitado",
    ar: "غير محدود"
  }
};

export default processTranslations(featureTranslations);
