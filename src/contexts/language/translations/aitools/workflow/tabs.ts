
import { Language } from "../../../types";
import { ensureAllLanguages } from "../../../utils";

const workflowTabsTranslations: Record<string, Record<Language, string>> = {
  "ai.tabs.organization": ensureAllLanguages({
    en: "Organization",
    es: "Organización",
    fr: "Organisation",
    de: "Organisation",
    sv: "Organisation",
    ja: "組織化",
    zh: "组织",
    ru: "Организация",
    pt: "Organização",
    ar: "التنظيم"
  }),
  "ai.tabs.templates": ensureAllLanguages({
    en: "Templates",
    es: "Plantillas",
    fr: "Modèles",
    de: "Vorlagen",
    sv: "Mallar",
    ja: "テンプレート",
    zh: "模板",
    ru: "Шаблоны",
    pt: "Modelos",
    ar: "القوالب"
  }),
  "ai.tabs.projectManagement": ensureAllLanguages({
    en: "Project Management",
    es: "Gestión de Proyectos",
    fr: "Gestion de Projet",
    de: "Projektmanagement",
    sv: "Projektledning",
    ja: "プロジェクト管理",
    zh: "项目管理",
    ru: "Управление проектами",
    pt: "Gerenciamento de Projetos",
    ar: "إدارة المشاريع"
  }),
  "ai.tabs.studioTools": ensureAllLanguages({
    en: "Studio Tools",
    es: "Herramientas de Estudio",
    fr: "Outils de Studio",
    de: "Studio-Tools",
    sv: "Studiovertyg",
    ja: "スタジオツール",
    zh: "工作室工具",
    ru: "Студийные инструменты",
    pt: "Ferramentas de Estúdio",
    ar: "أدوات الاستوديو"
  })
};

export default workflowTabsTranslations;
