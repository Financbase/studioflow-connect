
import { Language } from "../types";
import { ensureAllLanguages } from "../utils";

const dashboardTranslations: Record<string, Record<Language, string>> = {
  "dashboard.title": ensureAllLanguages({
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
  "dashboard.quickActions": ensureAllLanguages({
    en: "Quick Actions",
    es: "Acciones Rápidas",
    fr: "Actions Rapides",
    de: "Schnellaktionen",
    sv: "Snabbåtgärder",
    ja: "クイックアクション",
    zh: "快速操作",
    ru: "Быстрые действия",
    pt: "Ações Rápidas",
    ar: "إجراءات سريعة"
  }),
  "dashboard.frequentlyUsed": ensureAllLanguages({
    en: "Frequently Used",
    es: "Usado Frecuentemente",
    fr: "Fréquemment Utilisé",
    de: "Häufig Verwendet",
    sv: "Ofta Använt",
    ja: "よく使う機能",
    zh: "常用功能",
    ru: "Часто используемые",
    pt: "Frequentemente Usado",
    ar: "مستخدم بشكل متكرر"
  }),
  "dashboard.newProject": ensureAllLanguages({
    en: "New Project",
    es: "Nuevo Proyecto",
    fr: "Nouveau Projet",
    de: "Neues Projekt",
    sv: "Nytt Projekt",
    ja: "新規プロジェクト",
    zh: "新项目",
    ru: "Новый проект",
    pt: "Novo Projeto",
    ar: "مشروع جديد"
  }),
  "dashboard.myLibrary": ensureAllLanguages({
    en: "My Library",
    es: "Mi Biblioteca",
    fr: "Ma Bibliothèque",
    de: "Meine Bibliothek",
    sv: "Mitt Bibliotek",
    ja: "マイライブラリ",
    zh: "我的库",
    ru: "Моя библиотека",
    pt: "Minha Biblioteca",
    ar: "مكتبتي"
  }),
  "dashboard.connect": ensureAllLanguages({
    en: "Connect",
    es: "Conectar",
    fr: "Connecter",
    de: "Verbinden",
    sv: "Anslut",
    ja: "接続",
    zh: "连接",
    ru: "Подключение",
    pt: "Conectar",
    ar: "ربط"
  }),
  "dashboard.aiTools": ensureAllLanguages({
    en: "AI Tools",
    es: "Herramientas IA",
    fr: "Outils IA",
    de: "KI-Werkzeuge",
    sv: "AI-verktyg",
    ja: "AIツール",
    zh: "AI工具",
    ru: "ИИ инструменты",
    pt: "Ferramentas IA",
    ar: "أدوات الذكاء الاصطناعي"
  })
};

export default dashboardTranslations;
