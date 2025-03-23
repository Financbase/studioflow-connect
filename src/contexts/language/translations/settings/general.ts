
import { Language } from "../../types";
import { ensureAllLanguages } from "../../utils";

const generalSettingsTranslations: Record<string, Record<Language, string>> = {
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
  })
};

export default generalSettingsTranslations;
