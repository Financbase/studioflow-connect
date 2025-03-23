
import { Language } from "../types";
import { ensureAllLanguages } from "../utils";

const supportTranslations: Record<string, Record<Language, string>> = {
  "support.tickets": ensureAllLanguages({
    en: "Tickets",
    es: "Tickets",
    fr: "Tickets",
    de: "Tickets",
    sv: "Ärenden",
    ja: "チケット",
    zh: "工单",
    ru: "Тикеты",
    pt: "Tickets",
    ar: "التذاكر"
  }),
  "support.notifications": ensureAllLanguages({
    en: "Notifications",
    es: "Notificaciones",
    fr: "Notifications",
    de: "Benachrichtigungen",
    sv: "Notiser",
    ja: "通知",
    zh: "通知",
    ru: "Уведомления",
    pt: "Notificações",
    ar: "الإشعارات"
  }),
  "support.faq": ensureAllLanguages({
    en: "FAQ",
    es: "Preguntas Frecuentes",
    fr: "FAQ",
    de: "FAQ",
    sv: "FAQ",
    ja: "よくある質問",
    zh: "常见问题",
    ru: "ЧЗВ",
    pt: "FAQ",
    ar: "الأسئلة الشائعة"
  }),
  "support.contact": ensureAllLanguages({
    en: "Contact",
    es: "Contacto",
    fr: "Contact",
    de: "Kontakt",
    sv: "Kontakt",
    ja: "お問い合わせ",
    zh: "联系我们",
    ru: "Контакты",
    pt: "Contato",
    ar: "اتصل بنا"
  }),
  "support.no_tickets": ensureAllLanguages({
    en: "No tickets found",
    es: "No se encontraron tickets",
    fr: "Aucun ticket trouvé",
    de: "Keine Tickets gefunden",
    sv: "Inga ärenden hittades",
    ja: "チケットが見つかりません",
    zh: "未找到工单",
    ru: "Тикеты не найдены",
    pt: "Nenhum ticket encontrado",
    ar: "لم يتم العثور على تذاكر"
  })
};

export default supportTranslations;
