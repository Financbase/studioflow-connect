
import { Language } from "../../types";
import { ensureAllLanguages } from "../../utils";

const privacySettingsTranslations: Record<string, Record<Language, string>> = {
  "settings.privacy.dataUsage": ensureAllLanguages({
    en: "Data Usage",
    es: "Uso de Datos",
    fr: "Utilisation des Données",
    de: "Datennutzung",
    sv: "Dataanvändning",
    ja: "データ使用量",
    zh: "数据使用",
    ru: "Использование данных",
    pt: "Uso de Dados",
    ar: "استخدام البيانات"
  }),
  "settings.privacy.dataSharingConsent": ensureAllLanguages({
    en: "Data Sharing Consent",
    es: "Consentimiento de Compartir Datos",
    fr: "Consentement au Partage de Données",
    de: "Zustimmung zur Datenweitergabe",
    sv: "Samtycke till Datadelning",
    ja: "データ共有の同意",
    zh: "数据共享同意",
    ru: "Согласие на обмен данными",
    pt: "Consentimento de Compartilhamento de Dados",
    ar: "موافقة على مشاركة البيانات"
  }),
  "settings.privacy.cookieSettings": ensureAllLanguages({
    en: "Cookie Settings",
    es: "Configuración de Cookies",
    fr: "Paramètres des Cookies",
    de: "Cookie-Einstellungen",
    sv: "Cookie-inställningar",
    ja: "Cookieの設定",
    zh: "Cookie设置",
    ru: "Настройки файлов cookie",
    pt: "Configurações de Cookies",
    ar: "إعدادات ملفات تعريف الارتباط"
  })
};

export default privacySettingsTranslations;
