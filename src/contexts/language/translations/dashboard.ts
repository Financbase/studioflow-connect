
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
    zh: "仪表板",
    ru: "Панель управления",
    pt: "Painel",
    ar: "لوحة التحكم"
  }),
  "dashboard.welcome": ensureAllLanguages({
    en: "Welcome back",
    es: "Bienvenido de nuevo",
    fr: "Bienvenue à nouveau",
    de: "Willkommen zurück",
    sv: "Välkommen tillbaka",
    ja: "お帰りなさい",
    zh: "欢迎回来",
    ru: "Добро пожаловать",
    pt: "Bem-vindo de volta",
    ar: "مرحبًا بعودتك"
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
    en: "Frequently used tools and features",
    es: "Herramientas y funciones de uso frecuente",
    fr: "Outils et fonctionnalités fréquemment utilisés",
    de: "Häufig verwendete Tools und Funktionen",
    sv: "Frekvent använda verktyg och funktioner",
    ja: "よく使用されるツールと機能",
    zh: "常用工具和功能",
    ru: "Часто используемые инструменты и функции",
    pt: "Ferramentas e recursos usados com frequência",
    ar: "الأدوات والميزات المستخدمة بشكل متكرر"
  }),
  "dashboard.newProject": ensureAllLanguages({
    en: "New Project",
    es: "Nuevo Proyecto",
    fr: "Nouveau Projet",
    de: "Neues Projekt",
    sv: "Nytt projekt",
    ja: "新規プロジェクト",
    zh: "新建项目",
    ru: "Новый проект",
    pt: "Novo Projeto",
    ar: "مشروع جديد"
  }),
  "dashboard.myLibrary": ensureAllLanguages({
    en: "My Library",
    es: "Mi Biblioteca",
    fr: "Ma Bibliothèque",
    de: "Meine Bibliothek",
    sv: "Mitt bibliotek",
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
    ru: "Соединение",
    pt: "Conectar",
    ar: "اتصال"
  }),
  "dashboard.aiTools": ensureAllLanguages({
    en: "AI Tools",
    es: "Herramientas de IA",
    fr: "Outils d'IA",
    de: "KI-Tools",
    sv: "AI-verktyg",
    ja: "AIツール",
    zh: "AI工具",
    ru: "Инструменты ИИ",
    pt: "Ferramentas de IA",
    ar: "أدوات الذكاء الاصطناعي"
  }),
  "dashboard.recentProjects": ensureAllLanguages({
    en: "Recent Projects",
    es: "Proyectos Recientes",
    fr: "Projets Récents",
    de: "Aktuelle Projekte",
    sv: "Senaste projekten",
    ja: "最近のプロジェクト",
    zh: "最近的项目",
    ru: "Недавние проекты",
    pt: "Projetos Recentes",
    ar: "المشاريع الأخيرة"
  }),
  "dashboard.statistics": ensureAllLanguages({
    en: "Statistics",
    es: "Estadísticas",
    fr: "Statistiques",
    de: "Statistiken",
    sv: "Statistik",
    ja: "統計",
    zh: "统计数据",
    ru: "Статистика",
    pt: "Estatísticas",
    ar: "الإحصائيات"
  }),
  "dashboard.activity": ensureAllLanguages({
    en: "Activity",
    es: "Actividad",
    fr: "Activité",
    de: "Aktivität",
    sv: "Aktivitet",
    ja: "アクティビティ",
    zh: "活动",
    ru: "Активность",
    pt: "Atividade",
    ar: "النشاط"
  })
};

export default dashboardTranslations;
