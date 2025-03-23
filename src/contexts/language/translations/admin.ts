
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
  })
};

export default adminTranslations;
