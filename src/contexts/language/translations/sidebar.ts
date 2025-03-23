
import { Language } from "../types";
import { ensureAllLanguages } from "../utils";

const sidebarTranslations: Record<string, Record<Language, string>> = {
  "sidebar.dashboard": ensureAllLanguages({
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
  "sidebar.projects": ensureAllLanguages({
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
  }),
  "sidebar.library": ensureAllLanguages({
    en: "Library",
    es: "Biblioteca",
    fr: "Bibliothèque",
    de: "Bibliothek",
    sv: "Bibliotek",
    ja: "ライブラリ",
    zh: "库",
    ru: "Библиотека",
    pt: "Biblioteca",
    ar: "المكتبة"
  }),
  "sidebar.connect": ensureAllLanguages({
    en: "Connect",
    es: "Conectar",
    fr: "Connecter",
    de: "Verbinden",
    sv: "Anslut",
    ja: "接続",
    zh: "连接",
    ru: "Подключение",
    pt: "Conectar",
    ar: "توصيل"
  }),
  "sidebar.aiTools": ensureAllLanguages({
    en: "AI Tools",
    es: "Herramientas de IA",
    fr: "Outils d'IA",
    de: "KI-Werkzeuge",
    sv: "AI-verktyg",
    ja: "AIツール",
    zh: "AI工具",
    ru: "Инструменты ИИ",
    pt: "Ferramentas de IA",
    ar: "أدوات الذكاء الاصطناعي"
  }),
  "sidebar.documentation": ensureAllLanguages({
    en: "Documentation",
    es: "Documentación",
    fr: "Documentation",
    de: "Dokumentation",
    sv: "Dokumentation",
    ja: "ドキュメンテーション",
    zh: "文档",
    ru: "Документация",
    pt: "Documentação",
    ar: "التوثيق"
  }),
  "sidebar.support": ensureAllLanguages({
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
  "sidebar.admin": ensureAllLanguages({
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
  "sidebar.settings": ensureAllLanguages({
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
  })
};

export default sidebarTranslations;
