
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
    ar: "مستخدم"
  }),
  "dashboard.subtitle": ensureAllLanguages({
    en: "Monitor and manage your audio production environment",
    es: "Monitorea y gestiona tu entorno de producción de audio",
    fr: "Surveillez et gérez votre environnement de production audio",
    de: "Überwachen und verwalten Sie Ihre Audioproduktionsumgebung",
    sv: "Övervaka och hantera din ljudproduktionsmiljö",
    ja: "オーディオ制作環境を監視・管理する",
    zh: "监控和管理您的音频制作环境",
    ru: "Мониторинг и управление средой аудиопроизводства",
    pt: "Monitore e gerencie seu ambiente de produção de áudio",
    ar: "مراقبة وإدارة بيئة إنتاج الصوت الخاصة بك"
  }),
  "dashboard.loading": ensureAllLanguages({
    en: "Loading dashboard...",
    es: "Cargando panel de control...",
    fr: "Chargement du tableau de bord...",
    de: "Dashboard wird geladen...",
    sv: "Laddar instrumentpanel...",
    ja: "ダッシュボードを読み込み中...",
    zh: "正在加载仪表盘...",
    ru: "Загрузка панели управления...",
    pt: "Carregando painel...",
    ar: "جاري تحميل لوحة التحكم..."
  }),
  "dashboard.activity.commented": ensureAllLanguages({
    en: "commented on",
    es: "comentó en",
    fr: "a commenté sur",
    de: "kommentierte",
    sv: "kommenterade på",
    ja: "にコメントしました",
    zh: "评论了",
    ru: "прокомментировал",
    pt: "comentou em",
    ar: "علق على"
  }),
  "dashboard.activity.shared": ensureAllLanguages({
    en: "shared",
    es: "compartió",
    fr: "a partagé",
    de: "teilte",
    sv: "delade",
    ja: "を共有しました",
    zh: "分享了",
    ru: "поделился",
    pt: "compartilhou",
    ar: "شارك"
  }),
  "dashboard.activity.uploaded": ensureAllLanguages({
    en: "uploaded",
    es: "subió",
    fr: "a téléchargé",
    de: "hochgeladen",
    sv: "laddade upp",
    ja: "をアップロードしました",
    zh: "上传了",
    ru: "загрузил",
    pt: "fez upload de",
    ar: "رفع"
  }),
  "dashboard.activity.edited": ensureAllLanguages({
    en: "edited",
    es: "editó",
    fr: "a modifié",
    de: "bearbeitete",
    sv: "redigerade",
    ja: "を編集しました",
    zh: "编辑了",
    ru: "отредактировал",
    pt: "editou",
    ar: "عدل"
  }),
  "dashboard.recentActivity": ensureAllLanguages({
    en: "Recent Activity",
    es: "Actividad Reciente",
    fr: "Activité Récente",
    de: "Kürzliche Aktivität",
    sv: "Senaste Aktivitet",
    ja: "最近のアクティビティ",
    zh: "最近活动",
    ru: "Недавняя активность",
    pt: "Atividade Recente",
    ar: "النشاط الأخير"
  }),
  "dashboard.viewAll": ensureAllLanguages({
    en: "View All",
    es: "Ver Todo",
    fr: "Voir Tout",
    de: "Alle Anzeigen",
    sv: "Visa Alla",
    ja: "すべて表示",
    zh: "查看全部",
    ru: "Просмотреть все",
    pt: "Ver Tudo",
    ar: "عرض الكل"
  })
};

export default dashboardTranslations;
