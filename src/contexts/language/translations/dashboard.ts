import { Language } from "../types";

type TranslationRecord = Record<Language, string>;

const dashboardTranslations: Record<string, TranslationRecord> = {
  // Dashboard quick overview
  "dashboard.quickOverview": {
    en: "Quick Overview",
    es: "Resumen Rápido",
    fr: "Aperçu Rapide",
    de: "Schnellübersicht",
    sv: "Snabb Översikt",
    ja: "クイック概要",
    zh: "快速概览",
    ru: "Быстрый обзор",
    pt: "Visão Rápida",
    ar: "نظرة سريعة"
  },
  
  // Dashboard stats
  "dashboard.stats.audioProjects": {
    en: "Audio Projects",
    es: "Proyectos de Audio",
    fr: "Projets Audio",
    de: "Audio-Projekte",
    sv: "Ljudprojekt",
    ja: "オーディオプロジェクト",
    zh: "音频项目",
    ru: "Аудио проекты",
    pt: "Projetos de Áudio",
    ar: "مشاريع صوتية"
  },
  "dashboard.stats.activeProjects": {
    en: "Active projects",
    es: "Proyectos activos",
    fr: "Projets actifs",
    de: "Aktive Projekte",
    sv: "Aktiva projekt",
    ja: "アクティブなプロジェクト",
    zh: "活跃项目",
    ru: "Активные проекты",
    pt: "Projetos ativos",
    ar: "مشاريع نشطة"
  },
  "dashboard.stats.connectedDevices": {
    en: "Connected Devices",
    es: "Dispositivos Conectados",
    fr: "Appareils Connectés",
    de: "Verbundene Geräte",
    sv: "Anslutna Enheter",
    ja: "接続されたデバイス",
    zh: "已连接设备",
    ru: "Подключенные устройства",
    pt: "Dispositivos Conectados",
    ar: "الأجهزة المتصلة"
  },
  "dashboard.stats.availableDevices": {
    en: "Available devices",
    es: "Dispositivos disponibles",
    fr: "Appareils disponibles",
    de: "Verfügbare Geräte",
    sv: "Tillgängliga enheter",
    ja: "利用可能なデバイス",
    zh: "可用设备",
    ru: "Доступные устройства",
    pt: "Dispositivos disponíveis",
    ar: "الأجهزة المتاحة"
  },
  "dashboard.stats.storageUsed": {
    en: "Storage Used",
    es: "Almacenamiento Usado",
    fr: "Stockage Utilisé",
    de: "Speichernutzung",
    sv: "Använt Lagringsutrymme",
    ja: "使用ストレージ",
    zh: "已用存储",
    ru: "Использовано хранилища",
    pt: "Armazenamento Utilizado",
    ar: "التخزين المستخدم"
  },
  "dashboard.stats.storageDetails": {
    en: "15GB of 30GB",
    es: "15GB de 30GB",
    fr: "15Go sur 30Go",
    de: "15GB von 30GB",
    sv: "15GB av 30GB",
    ja: "30GBの内15GB",
    zh: "15GB/30GB",
    ru: "15ГБ из 30ГБ",
    pt: "15GB de 30GB",
    ar: "15 جيجابايت من 30 جيجابايت"
  },
  "dashboard.stats.recentActivity": {
    en: "Recent Activity",
    es: "Actividad Reciente",
    fr: "Activité Récente",
    de: "Neueste Aktivitäten",
    sv: "Senaste Aktivitet",
    ja: "最近のアクティビティ",
    zh: "最近活动",
    ru: "Недавняя активность",
    pt: "Atividade Recente",
    ar: "النشاط الأخير"
  },
  "dashboard.stats.actionsThisWeek": {
    en: "Actions this week",
    es: "Acciones esta semana",
    fr: "Actions cette semaine",
    de: "Aktionen diese Woche",
    sv: "Åtgärder denna vecka",
    ja: "今週のアクション",
    zh: "本周操作",
    ru: "Действия за эту неделю",
    pt: "Ações desta semana",
    ar: "الإجراءات هذا الأسبوع"
  },
  // Greetings
  "dashboard.greeting.morning": {
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
  },
  "dashboard.greeting.afternoon": {
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
  },
  "dashboard.greeting.evening": {
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
  },
  "dashboard.user": {
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
  },
  
  // Plan names for translation
  "plan.free": {
    en: "Free",
    es: "Gratis",
    fr: "Gratuit",
    de: "Kostenlos",
    sv: "Gratis",
    ja: "無料",
    zh: "免费",
    ru: "Бесплатный",
    pt: "Gratuito",
    ar: "مجاني"
  },
  "plan.standard": {
    en: "Standard",
    es: "Estándar",
    fr: "Standard",
    de: "Standard",
    sv: "Standard",
    ja: "スタンダード",
    zh: "标准",
    ru: "Стандарт",
    pt: "Padrão",
    ar: "قياسي"
  },
  "plan.pro": {
    en: "Pro",
    es: "Pro",
    fr: "Pro",
    de: "Pro",
    sv: "Pro",
    ja: "プロ",
    zh: "专业",
    ru: "Про",
    pt: "Pro",
    ar: "احترافي"
  },
  "plan.enterprise": {
    en: "Enterprise",
    es: "Empresa",
    fr: "Entreprise",
    de: "Unternehmen",
    sv: "Företag",
    ja: "エンタープライズ",
    zh: "企业版",
    ru: "Корпоративный",
    pt: "Empresarial",
    ar: "المؤسسة"
  }
};

export default dashboardTranslations;
