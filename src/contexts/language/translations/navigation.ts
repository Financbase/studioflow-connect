
import { Language } from "../types";
import { ensureAllLanguages } from "../utils";

const navigationTranslations: Record<string, Record<Language, string>> = {
  "nav.dashboard": ensureAllLanguages({
    en: "Dashboard",
    es: "Panel",
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
    fr: "Administration",
    de: "Administration",
    sv: "Admin",
    ja: "管理者",
    zh: "管理员",
    ru: "Администратор",
    pt: "Administração",
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
  }),
  "mobile.toggleMenu": ensureAllLanguages({
    en: "Toggle Menu",
    es: "Alternar Menú",
    fr: "Basculer le Menu",
    de: "Menü umschalten",
    sv: "Växla Meny",
    ja: "メニュー切替",
    zh: "切换菜单",
    ru: "Переключить меню",
    pt: "Alternar Menu",
    ar: "تبديل القائمة"
  })
};

export default navigationTranslations;
