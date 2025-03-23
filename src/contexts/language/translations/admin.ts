
import { Language } from "../types";
import { ensureAllLanguages } from "../utils";

const adminTranslations: Record<string, Record<Language, string>> = {
  "admin.overview": ensureAllLanguages({
    en: "Overview",
    es: "Resumen",
    fr: "Aperçu",
    de: "Überblick",
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
    fr: "Tickets de Support",
    de: "Support-Tickets",
    sv: "Supportärenden",
    ja: "サポートチケット",
    zh: "支持票据",
    ru: "Заявки в поддержку",
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
  "admin.remote_assistance": ensureAllLanguages({
    en: "Remote Assistance",
    es: "Asistencia Remota",
    fr: "Assistance à Distance",
    de: "Fernunterstützung",
    sv: "Fjärrhjälp",
    ja: "リモートアシスタンス",
    zh: "远程协助",
    ru: "Удаленная помощь",
    pt: "Assistência Remota",
    ar: "المساعدة عن بعد"
  }),
  "admin.system_analytics": ensureAllLanguages({
    en: "System Analytics",
    es: "Análisis del Sistema",
    fr: "Analytique Système",
    de: "Systemanalyse",
    sv: "Systemanalys",
    ja: "システム分析",
    zh: "系统分析",
    ru: "Системная аналитика",
    pt: "Análise do Sistema",
    ar: "تحليلات النظام"
  }),
  "admin.dashboard": ensureAllLanguages({
    en: "Admin Dashboard",
    es: "Panel de Administrador",
    fr: "Tableau de Bord Admin",
    de: "Admin-Dashboard",
    sv: "Administratörspanel",
    ja: "管理ダッシュボード",
    zh: "管理员仪表板",
    ru: "Панель администратора",
    pt: "Painel de Administração",
    ar: "لوحة تحكم المشرف"
  }),
  "admin.manage_users": ensureAllLanguages({
    en: "Manage Users",
    es: "Gestionar Usuarios",
    fr: "Gérer les Utilisateurs",
    de: "Benutzer verwalten",
    sv: "Hantera användare",
    ja: "ユーザー管理",
    zh: "管理用户",
    ru: "Управление пользователями",
    pt: "Gerenciar Usuários",
    ar: "إدارة المستخدمين"
  }),
  "admin.system_health": ensureAllLanguages({
    en: "System Health",
    es: "Salud del Sistema",
    fr: "Santé du Système",
    de: "Systemzustand",
    sv: "Systemstatus",
    ja: "システム状態",
    zh: "系统健康",
    ru: "Состояние системы",
    pt: "Saúde do Sistema",
    ar: "صحة النظام"
  }),
  "admin.performance": ensureAllLanguages({
    en: "Performance",
    es: "Rendimiento",
    fr: "Performance",
    de: "Leistung",
    sv: "Prestanda",
    ja: "パフォーマンス",
    zh: "性能",
    ru: "Производительность",
    pt: "Desempenho",
    ar: "الأداء"
  }),
  "admin.refresh": ensureAllLanguages({
    en: "Refresh",
    es: "Actualizar",
    fr: "Rafraîchir",
    de: "Aktualisieren",
    sv: "Uppdatera",
    ja: "更新",
    zh: "刷新",
    ru: "Обновить",
    pt: "Atualizar",
    ar: "تحديث"
  }),
  "admin.refreshing": ensureAllLanguages({
    en: "Refreshing...",
    es: "Actualizando...",
    fr: "Rafraîchissement...",
    de: "Aktualisiere...",
    sv: "Uppdaterar...",
    ja: "更新中...",
    zh: "刷新中...",
    ru: "Обновление...",
    pt: "Atualizando...",
    ar: "جاري التحديث..."
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
    en: "Help",
    es: "Ayuda",
    fr: "Aide",
    de: "Hilfe",
    sv: "Hjälp",
    ja: "ヘルプ",
    zh: "帮助",
    ru: "Помощь",
    pt: "Ajuda",
    ar: "مساعدة"
  }),
  "admin.back_to_dashboard": ensureAllLanguages({
    en: "Back to Dashboard",
    es: "Volver al Panel",
    fr: "Retour au Tableau de Bord",
    de: "Zurück zum Dashboard",
    sv: "Tillbaka till Instrumentpanelen",
    ja: "ダッシュボードに戻る",
    zh: "返回仪表板",
    ru: "Вернуться к панели управления",
    pt: "Voltar ao Painel",
    ar: "العودة إلى لوحة التحكم"
  })
};

export default adminTranslations;
