
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
  "dashboard.subtitle": ensureAllLanguages({
    en: "Manage your music production workflow",
    es: "Gestiona tu flujo de trabajo de producción musical",
    fr: "Gérez votre flux de travail de production musicale",
    de: "Verwalten Sie Ihren Musikproduktionsworkflow",
    sv: "Hantera ditt musikproduktionsarbetsflöde",
    ja: "音楽制作ワークフローを管理する",
    zh: "管理您的音乐制作工作流程",
    ru: "Управляйте рабочим процессом создания музыки",
    pt: "Gerencie seu fluxo de trabalho de produção musical",
    ar: "إدارة سير عمل إنتاج الموسيقى الخاص بك"
  }),
  "dashboard.loading": ensureAllLanguages({
    en: "Loading dashboard...",
    es: "Cargando panel...",
    fr: "Chargement du tableau de bord...",
    de: "Dashboard wird geladen...",
    sv: "Laddar instrumentpanelen...",
    ja: "ダッシュボードを読み込んでいます...",
    zh: "加载仪表板...",
    ru: "Загрузка панели управления...",
    pt: "Carregando painel...",
    ar: "جاري تحميل لوحة المعلومات..."
  }),
  "dashboard.greeting.morning": ensureAllLanguages({
    en: "Good morning",
    es: "Buenos días",
    fr: "Bonjour",
    de: "Guten Morgen",
    sv: "God morgon",
    ja: "おはようございます",
    zh: "早上好",
    ru: "Доброе утро",
    pt: "Bom dia",
    ar: "صباح الخير"
  }),
  "dashboard.greeting.afternoon": ensureAllLanguages({
    en: "Good afternoon",
    es: "Buenas tardes",
    fr: "Bon après-midi",
    de: "Guten Tag",
    sv: "God eftermiddag",
    ja: "こんにちは",
    zh: "下午好",
    ru: "Добрый день",
    pt: "Boa tarde",
    ar: "مساء الخير"
  }),
  "dashboard.greeting.evening": ensureAllLanguages({
    en: "Good evening",
    es: "Buenas noches",
    fr: "Bonsoir",
    de: "Guten Abend",
    sv: "God kväll",
    ja: "こんばんは",
    zh: "晚上好",
    ru: "Добрый вечер",
    pt: "Boa noite",
    ar: "مساء الخير"
  }),
  "dashboard.user": ensureAllLanguages({
    en: "User",
    es: "Usuario",
    fr: "Utilisateur",
    de: "Benutzer",
    sv: "Användare",
    ja: "ユーザー",
    zh: "用户",
    ru: "Пользователь",
    pt: "Usuário",
    ar: "المستخدم"
  }),
  "dashboard.quickActions": ensureAllLanguages({
    en: "Quick Actions",
    es: "Acciones Rápidas",
    fr: "Actions Rapides",
    de: "Schnellaktionen",
    sv: "Snabbåtgärder",
    ja: "クイックアクション",
    zh: "快捷操作",
    ru: "Быстрые действия",
    pt: "Ações Rápidas",
    ar: "إجراءات سريعة"
  }),
  "dashboard.frequentlyUsed": ensureAllLanguages({
    en: "Frequently used tools and actions",
    es: "Herramientas y acciones de uso frecuente",
    fr: "Outils et actions fréquemment utilisés",
    de: "Häufig verwendete Tools und Aktionen",
    sv: "Ofta använda verktyg och åtgärder",
    ja: "よく使うツールとアクション",
    zh: "常用工具和操作",
    ru: "Часто используемые инструменты и действия",
    pt: "Ferramentas e ações usadas com frequência",
    ar: "الأدوات والإجراءات المستخدمة بشكل متكرر"
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
    ru: "Подключить",
    pt: "Conectar",
    ar: "توصيل"
  }),
  "dashboard.aiTools": ensureAllLanguages({
    en: "AI Tools",
    es: "Herramientas de IA",
    fr: "Outils d'IA",
    de: "KI-Werkzeuge",
    sv: "AI-verktyg",
    ja: "AIツール",
    zh: "AI工具",
    ru: "ИИ инструменты",
    pt: "Ferramentas de IA",
    ar: "أدوات الذكاء الاصطناعي"
  }),
  "dashboard.viewChanged": ensureAllLanguages({
    en: "View Changed",
    es: "Vista Cambiada",
    fr: "Vue Modifiée",
    de: "Ansicht Geändert",
    sv: "Vy Ändrad",
    ja: "表示が変更されました",
    zh: "视图已更改",
    ru: "Вид Изменен",
    pt: "Visualização Alterada",
    ar: "تم تغيير العرض"
  }),
  "dashboard.viewSet": ensureAllLanguages({
    en: "View set to",
    es: "Vista establecida a",
    fr: "Vue définie sur",
    de: "Ansicht eingestellt auf",
    sv: "Vy inställd på",
    ja: "表示が設定されました：",
    zh: "视图设置为",
    ru: "Вид установлен на",
    pt: "Visualização definida para",
    ar: "تم تعيين العرض إلى"
  })
};

export default dashboardTranslations;
