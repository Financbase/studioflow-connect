
import { Language } from "../types";
import { ensureAllLanguages } from "../utils";

const navigationTranslations: Record<string, Record<Language, string>> = {
  "nav.dashboard": ensureAllLanguages({
    en: "Dashboard",
    es: "Panel de Control",
    fr: "Tableau de Bord",
    de: "Dashboard",
    sv: "Instrumentpanel",
    ja: "ダッシュボード",
    zh: "仪表盘",
    ru: "Панель управления",
    pt: "Painel",
    ar: "لوحة التحكم"
  }),
  "nav.support": ensureAllLanguages({
    en: "Support",
    es: "Soporte",
    fr: "Support",
    de: "Support",
    sv: "Support",
    ja: "サポート",
    zh: "支持",
    ru: "Поддержка",
    pt: "Suporte",
    ar: "الدعم"
  }),
  "nav.admin": ensureAllLanguages({
    en: "Admin",
    es: "Administrador",
    fr: "Admin",
    de: "Admin",
    sv: "Admin",
    ja: "管理者",
    zh: "管理员",
    ru: "Администратор",
    pt: "Admin",
    ar: "المشرف"
  }),
  "header.documentation": ensureAllLanguages({
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
  })
};

export default navigationTranslations;
