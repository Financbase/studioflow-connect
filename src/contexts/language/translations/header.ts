
import { Language } from "../types";
import { processTranslations } from "../utils";

const headerTranslations = {
  "header.title": {
    en: "StudioFlow",
    es: "StudioFlow",
    fr: "StudioFlow",
    de: "StudioFlow",
    sv: "StudioFlow",
    ja: "StudioFlow",
    zh: "StudioFlow",
    ru: "StudioFlow",
    pt: "StudioFlow",
    ar: "StudioFlow"
  },
  "header.documentation": {
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
  },
  "header.settings": {
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
  },
  "header.profile": {
    en: "Profile",
    es: "Perfil",
    fr: "Profil",
    de: "Profil",
    sv: "Profil",
    ja: "プロフィール",
    zh: "个人资料",
    ru: "Профиль",
    pt: "Perfil",
    ar: "الملف الشخصي"
  },
  "header.zenMode": {
    en: "Zen Mode",
    es: "Modo Zen",
    fr: "Mode Zen",
    de: "Zen-Modus",
    sv: "Zen-läge",
    ja: "ゼンモード",
    zh: "禅模式",
    ru: "Режим Дзен",
    pt: "Modo Zen",
    ar: "وضع زن"
  },
  "settings.title": {
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
  },
  "settings.description": {
    en: "Manage your account settings and preferences",
    es: "Administra la configuración y preferencias de tu cuenta",
    fr: "Gérez les paramètres et les préférences de votre compte",
    de: "Verwalten Sie Ihre Kontoeinstellungen und Präferenzen",
    sv: "Hantera dina kontoinställningar och preferenser",
    ja: "アカウント設定と設定を管理する",
    zh: "管理您的帐户设置和偏好",
    ru: "Управление настройками и предпочтениями учетной записи",
    pt: "Gerencie as configurações e preferências da sua conta",
    ar: "إدارة إعدادات وتفضيلات حسابك"
  },
  "settings.tabs.general": {
    en: "General",
    es: "General",
    fr: "Général",
    de: "Allgemein",
    sv: "Allmänt",
    ja: "一般",
    zh: "通用",
    ru: "Общие",
    pt: "Geral",
    ar: "عام"
  },
  "settings.tabs.appearance": {
    en: "Appearance",
    es: "Apariencia",
    fr: "Apparence",
    de: "Aussehen",
    sv: "Utseende",
    ja: "外観",
    zh: "外观",
    ru: "Внешний вид",
    pt: "Aparência",
    ar: "المظهر"
  },
  "settings.tabs.notifications": {
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
  },
  "settings.tabs.privacy": {
    en: "Privacy",
    es: "Privacidad",
    fr: "Confidentialité",
    de: "Datenschutz",
    sv: "Sekretess",
    ja: "プライバシー",
    zh: "隐私",
    ru: "Конфиденциальность",
    pt: "Privacidade",
    ar: "الخصوصية"
  },
  "settings.tabs.subscription": {
    en: "Subscription",
    es: "Suscripción",
    fr: "Abonnement",
    de: "Abonnement",
    sv: "Prenumeration",
    ja: "サブスクリプション",
    zh: "订阅",
    ru: "Подписка",
    pt: "Assinatura",
    ar: "الاشتراك"
  }
};

export default processTranslations(headerTranslations);
