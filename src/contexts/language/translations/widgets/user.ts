
import { Language } from "../../types";
import { processTranslations } from "../../utils";

const userWidgetTranslations = {
  "user.profile": {
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
  "user.settings": {
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
  "user.help": {
    en: "Help & Resources",
    es: "Ayuda y Recursos",
    fr: "Aide et Ressources",
    de: "Hilfe & Ressourcen",
    sv: "Hjälp & Resurser",
    ja: "ヘルプとリソース",
    zh: "帮助与资源",
    ru: "Помощь и Ресурсы",
    pt: "Ajuda e Recursos",
    ar: "المساعدة والموارد"
  },
  "user.signout": {
    en: "Sign Out",
    es: "Cerrar Sesión",
    fr: "Se Déconnecter",
    de: "Abmelden",
    sv: "Logga Ut",
    ja: "サインアウト",
    zh: "退出登录",
    ru: "Выйти",
    pt: "Sair",
    ar: "تسجيل الخروج"
  }
};

export default processTranslations(userWidgetTranslations);
