
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
    en: "Help & Support",
    es: "Ayuda y Soporte",
    fr: "Aide et Support",
    de: "Hilfe und Support",
    sv: "Hjälp och Support",
    ja: "ヘルプとサポート",
    zh: "帮助与支持",
    ru: "Помощь и поддержка",
    pt: "Ajuda e Suporte",
    ar: "المساعدة والدعم"
  }),
  "user.signout": ensureAllLanguages({
    en: "Sign Out",
    es: "Cerrar Sesión",
    fr: "Déconnexion",
    de: "Abmelden",
    sv: "Logga Ut",
    ja: "ログアウト",
    zh: "退出登录",
    ru: "Выйти",
    pt: "Sair",
    ar: "تسجيل الخروج"
  }),
  "dashboard.user": ensureAllLanguages({
    en: "User",
    es: "Usuario",
    fr: "Utilisateur",
    de: "Benutzer",
    sv: "Användare",
    ja: "ユーザー",
    zh: "用户",
    ru: "Пользователь",
    pt: "Usuário",
    ar: "المستخدم"
  })
};

export default userTranslations;
