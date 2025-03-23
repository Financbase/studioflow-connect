
import { Language } from "../types";
import { ensureAllLanguages } from "../utils";

const userTranslations: Record<string, Record<Language, string>> = {
  "user.profile": ensureAllLanguages({
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
  }),
  "user.settings": ensureAllLanguages({
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
  "user.help": ensureAllLanguages({
    en: "Help",
    es: "Ayuda",
    fr: "Aide",
    de: "Hilfe",
    sv: "Hjälp",
    ja: "ヘルプ",
    zh: "帮助",
    ru: "Помощь",
    pt: "Ajuda",
    ar: "المساعدة"
  }),
  "user.signout": ensureAllLanguages({
    en: "Sign Out",
    es: "Cerrar Sesión",
    fr: "Déconnexion",
    de: "Abmelden",
    sv: "Logga ut",
    ja: "サインアウト",
    zh: "退出登录",
    ru: "Выйти",
    pt: "Sair",
    ar: "تسجيل الخروج"
  })
};

export default userTranslations;
