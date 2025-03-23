
import { Language } from "../types";
import { ensureAllLanguages } from "../utils";

const settingsTranslations: Record<string, Record<Language, string>> = {
  "settings.appearance.tabs.themes": ensureAllLanguages({
    en: "Themes",
    es: "Temas",
    fr: "Thèmes",
    de: "Themen",
    sv: "Teman",
    ja: "テーマ",
    zh: "主题",
    ru: "Темы",
    pt: "Temas",
    ar: "السمات"
  }),
  "settings.appearance.tabs.palettes": ensureAllLanguages({
    en: "Color Palettes",
    es: "Paletas de Colores",
    fr: "Palettes de Couleurs",
    de: "Farbpaletten",
    sv: "Färgpaletter",
    ja: "カラーパレット",
    zh: "调色板",
    ru: "Цветовые палитры",
    pt: "Paletas de Cores",
    ar: "لوحات الألوان"
  }),
  "settings.appearance.tabs.tokens": ensureAllLanguages({
    en: "Design Tokens",
    es: "Tokens de Diseño",
    fr: "Jetons de Design",
    de: "Design-Tokens",
    sv: "Designtokens",
    ja: "デザイントークン",
    zh: "设计令牌",
    ru: "Дизайн-токены",
    pt: "Tokens de Design",
    ar: "رموز التصميم"
  }),
  "settings.general.language": ensureAllLanguages({
    en: "Language",
    es: "Idioma",
    fr: "Langue",
    de: "Sprache",
    sv: "Språk",
    ja: "言語",
    zh: "语言",
    ru: "Язык",
    pt: "Idioma",
    ar: "اللغة"
  }),
  "settings.general.darkMode": ensureAllLanguages({
    en: "Dark Mode",
    es: "Modo Oscuro",
    fr: "Mode Sombre",
    de: "Dunkelmodus",
    sv: "Mörkt Läge",
    ja: "ダークモード",
    zh: "深色模式",
    ru: "Тёмный режим",
    pt: "Modo Escuro",
    ar: "الوضع المظلم"
  }),
  "settings.general.autoTheme": ensureAllLanguages({
    en: "Use System Theme",
    es: "Usar Tema del Sistema",
    fr: "Utiliser le Thème du Système",
    de: "System-Theme verwenden",
    sv: "Använd Systemtema",
    ja: "システムテーマを使用",
    zh: "使用系统主题",
    ru: "Использовать системную тему",
    pt: "Usar Tema do Sistema",
    ar: "استخدام سمة النظام"
  }),
  "settings.general.profile": ensureAllLanguages({
    en: "Profile Information",
    es: "Información de Perfil",
    fr: "Informations de Profil",
    de: "Profilinformationen",
    sv: "Profilinformation",
    ja: "プロフィール情報",
    zh: "个人资料信息",
    ru: "Информация профиля",
    pt: "Informações de Perfil",
    ar: "معلومات الملف الشخصي"
  }),
  "settings.general.email": ensureAllLanguages({
    en: "Email",
    es: "Correo Electrónico",
    fr: "Email",
    de: "E-Mail",
    sv: "E-post",
    ja: "メール",
    zh: "电子邮件",
    ru: "Электронная почта",
    pt: "E-mail",
    ar: "البريد الإلكتروني"
  }),
  "settings.general.username": ensureAllLanguages({
    en: "Username",
    es: "Nombre de Usuario",
    fr: "Nom d'Utilisateur",
    de: "Benutzername",
    sv: "Användarnamn",
    ja: "ユーザー名",
    zh: "用户名",
    ru: "Имя пользователя",
    pt: "Nome de Usuário",
    ar: "اسم المستخدم"
  }),
  "settings.general.save": ensureAllLanguages({
    en: "Save Changes",
    es: "Guardar Cambios",
    fr: "Enregistrer les Modifications",
    de: "Änderungen Speichern",
    sv: "Spara Ändringar",
    ja: "変更を保存",
    zh: "保存更改",
    ru: "Сохранить изменения",
    pt: "Salvar Alterações",
    ar: "حفظ التغييرات"
  }),
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
  }),
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
  }),
  "settings.subscription.currentPlan": ensureAllLanguages({
    en: "Current Plan",
    es: "Plan Actual",
    fr: "Plan Actuel",
    de: "Aktueller Plan",
    sv: "Nuvarande Plan",
    ja: "現在のプラン",
    zh: "当前计划",
    ru: "Текущий план",
    pt: "Plano Atual",
    ar: "الخطة الحالية"
  }),
  "settings.subscription.billing": ensureAllLanguages({
    en: "Billing Information",
    es: "Información de Facturación",
    fr: "Informations de Facturation",
    de: "Zahlungsinformationen",
    sv: "Faktureringsinformation",
    ja: "請求情報",
    zh: "账单信息",
    ru: "Платежная информация",
    pt: "Informações de Cobrança",
    ar: "معلومات الفواتير"
  }),
  "settings.subscription.history": ensureAllLanguages({
    en: "Payment History",
    es: "Historial de Pagos",
    fr: "Historique des Paiements",
    de: "Zahlungsverlauf",
    sv: "Betalningshistorik",
    ja: "支払い履歴",
    zh: "支付历史",
    ru: "История платежей",
    pt: "Histórico de Pagamentos",
    ar: "سجل المدفوعات"
  }),
  "settings.subscription.upgrade": ensureAllLanguages({
    en: "Upgrade Plan",
    es: "Mejorar Plan",
    fr: "Mettre à Niveau le Plan",
    de: "Plan Upgraden",
    sv: "Uppgradera Plan",
    ja: "プランをアップグレード",
    zh: "升级计划",
    ru: "Улучшить план",
    pt: "Atualizar Plano",
    ar: "ترقية الخطة"
  })
};

export default settingsTranslations;
