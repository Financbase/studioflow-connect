
import { Language } from "../types";
import { ensureAllLanguages } from "../utils";

const adminTranslations: Record<string, Record<Language, string>> = {
  "admin.overview": ensureAllLanguages({
    en: "Overview",
    es: "Resumen",
    fr: "Aperçu",
    de: "Übersicht",
    sv: "Översikt",
    ja: "概要",
    zh: "概述",
    ru: "Обзор",
    pt: "Visão Geral",
    ar: "نظرة عامة"
  }),
  "admin.support_tickets": ensureAllLanguages({
    en: "Support Tickets",
    es: "Tickets de Soporte",
    fr: "Tickets d'Assistance",
    de: "Support-Tickets",
    sv: "Supportärenden",
    ja: "サポートチケット",
    zh: "支持票",
    ru: "Тикеты поддержки",
    pt: "Tickets de Suporte",
    ar: "تذاكر الدعم"
  }),
  "admin.user_sessions": ensureAllLanguages({
    en: "User Sessions",
    es: "Sesiones de Usuario",
    fr: "Sessions Utilisateur",
    de: "Benutzersitzungen",
    sv: "Användarsessioner",
    ja: "ユーザーセッション",
    zh: "用户会话",
    ru: "Сессии пользователей",
    pt: "Sessões de Usuário",
    ar: "جلسات المستخدم"
  }),
  "admin.manage_users": ensureAllLanguages({
    en: "Manage Users",
    es: "Administrar Usuarios",
    fr: "Gérer les Utilisateurs",
    de: "Benutzer verwalten",
    sv: "Hantera användare",
    ja: "ユーザー管理",
    zh: "管理用户",
    ru: "Управление пользователями",
    pt: "Gerenciar Usuários",
    ar: "إدارة المستخدمين"
  }),
  "admin.remote_assistance": ensureAllLanguages({
    en: "Remote Assistance",
    es: "Asistencia Remota",
    fr: "Assistance à Distance",
    de: "Fernunterstützung",
    sv: "Fjärrassistans",
    ja: "リモートアシスタンス",
    zh: "远程协助",
    ru: "Удаленная помощь",
    pt: "Assistência Remota",
    ar: "المساعدة عن بعد"
  }),
  "admin.system_analytics": ensureAllLanguages({
    en: "System Analytics",
    es: "Análisis del Sistema",
    fr: "Analytique du Système",
    de: "Systemanalyse",
    sv: "Systemanalys",
    ja: "システム分析",
    zh: "系统分析",
    ru: "Аналитика системы",
    pt: "Análise do Sistema",
    ar: "تحليلات النظام"
  }),
  "admin.dashboard": ensureAllLanguages({
    en: "Dashboard",
    es: "Panel de Control",
    fr: "Tableau de Bord",
    de: "Dashboard",
    sv: "Instrumentpanel",
    ja: "ダッシュボード",
    zh: "仪表板",
    ru: "Панель управления",
    pt: "Painel",
    ar: "لوحة المعلومات"
  }),
  "admin.settings": ensureAllLanguages({
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
  }),
  "admin.help": ensureAllLanguages({
    en: "Help & Support",
    es: "Ayuda y Soporte",
    fr: "Aide et Support",
    de: "Hilfe & Support",
    sv: "Hjälp & Support",
    ja: "ヘルプとサポート",
    zh: "帮助与支持",
    ru: "Помощь и поддержка",
    pt: "Ajuda e Suporte",
    ar: "المساعدة والدعم"
  }),
  "admin.notifications": ensureAllLanguages({
    en: "Notifications",
    es: "Notificaciones",
    fr: "Notifications",
    de: "Benachrichtigungen",
    sv: "Aviseringar",
    ja: "通知",
    zh: "通知",
    ru: "Уведомления",
    pt: "Notificações",
    ar: "الإشعارات"
  }),
  "admin.system_stats": ensureAllLanguages({
    en: "System Statistics",
    es: "Estadísticas del Sistema",
    fr: "Statistiques du Système",
    de: "Systemstatistiken",
    sv: "Systemstatistik",
    ja: "システム統計",
    zh: "系统统计",
    ru: "Статистика системы",
    pt: "Estatísticas do Sistema",
    ar: "إحصائيات النظام"
  }),
  "admin.main_navigation": ensureAllLanguages({
    en: "MAIN NAVIGATION",
    es: "NAVEGACIÓN PRINCIPAL",
    fr: "NAVIGATION PRINCIPALE",
    de: "HAUPTNAVIGATION",
    sv: "HUVUDNAVIGERING",
    ja: "メインナビゲーション",
    zh: "主导航",
    ru: "ОСНОВНАЯ НАВИГАЦИЯ",
    pt: "NAVEGAÇÃO PRINCIPAL",
    ar: "التنقل الرئيسي"
  }),
  "dashboard.system_performance": ensureAllLanguages({
    en: "System Performance",
    es: "Rendimiento del Sistema",
    fr: "Performance du Système",
    de: "Systemleistung",
    sv: "Systemprestanda",
    ja: "システムパフォーマンス",
    zh: "系统性能",
    ru: "Производительность системы",
    pt: "Desempenho do Sistema",
    ar: "أداء النظام"
  }),
  "dashboard.performance_metrics": ensureAllLanguages({
    en: "CPU, Memory and Network usage over time",
    es: "Uso de CPU, Memoria y Red a lo largo del tiempo",
    fr: "Utilisation CPU, Mémoire et Réseau au fil du temps",
    de: "CPU-, Speicher- und Netzwerknutzung im Zeitverlauf",
    sv: "CPU-, minnes- och nätverksanvändning över tid",
    ja: "CPU、メモリ、ネットワークの使用状況の推移",
    zh: "CPU、内存和网络使用情况随时间变化",
    ru: "Использование ЦП, памяти и сети с течением времени",
    pt: "Uso de CPU, Memória e Rede ao longo do tempo",
    ar: "استخدام وحدة المعالجة المركزية والذاكرة والشبكة بمرور الوقت"
  }),
  "dashboard.weekly_activity": ensureAllLanguages({
    en: "Weekly User Activity",
    es: "Actividad Semanal de Usuarios",
    fr: "Activité Hebdomadaire des Utilisateurs",
    de: "Wöchentliche Benutzeraktivität",
    sv: "Veckovis användaraktivitet",
    ja: "週間ユーザーアクティビティ",
    zh: "每周用户活动",
    ru: "Еженедельная активность пользователей",
    pt: "Atividade Semanal de Usuários",
    ar: "نشاط المستخدم الأسبوعي"
  }),
  "dashboard.active_idle_sessions": ensureAllLanguages({
    en: "Active vs. idle sessions per day",
    es: "Sesiones activas vs. inactivas por día",
    fr: "Sessions actives vs. inactives par jour",
    de: "Aktive vs. inaktive Sitzungen pro Tag",
    sv: "Aktiva vs. inaktiva sessioner per dag",
    ja: "1日あたりのアクティブセッションとアイドルセッション",
    zh: "每日活跃与空闲会话对比",
    ru: "Активные и неактивные сессии в день",
    pt: "Sessões ativas vs. inativas por dia",
    ar: "الجلسات النشطة مقابل الخاملة يوميًا"
  })
};

export default adminTranslations;
