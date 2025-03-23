
import { Language } from "../../types";
import { ensureAllLanguages } from "../../utils";

const notificationsSettingsTranslations: Record<string, Record<Language, string>> = {
  "settings.notifications.email": ensureAllLanguages({
    en: "Email Notifications",
    es: "Notificaciones por Correo",
    fr: "Notifications par Email",
    de: "E-Mail-Benachrichtigungen",
    sv: "E-postaviseringar",
    ja: "メール通知",
    zh: "电子邮件通知",
    ru: "Уведомления по электронной почте",
    pt: "Notificações por E-mail",
    ar: "إشعارات البريد الإلكتروني"
  }),
  "settings.notifications.push": ensureAllLanguages({
    en: "Push Notifications",
    es: "Notificaciones Push",
    fr: "Notifications Push",
    de: "Push-Benachrichtigungen",
    sv: "Push-notiser",
    ja: "プッシュ通知",
    zh: "推送通知",
    ru: "Push-уведомления",
    pt: "Notificações Push",
    ar: "الإشعارات المنبثقة"
  }),
  "settings.notifications.marketing": ensureAllLanguages({
    en: "Marketing Communications",
    es: "Comunicaciones de Marketing",
    fr: "Communications Marketing",
    de: "Marketing-Mitteilungen",
    sv: "Marknadsföringskommunikation",
    ja: "マーケティングコミュニケーション",
    zh: "营销通讯",
    ru: "Маркетинговые сообщения",
    pt: "Comunicações de Marketing",
    ar: "الاتصالات التسويقية"
  })
};

export default notificationsSettingsTranslations;
