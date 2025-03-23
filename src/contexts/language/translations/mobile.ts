
import { Language } from "../types";
import { ensureAllLanguages } from "../utils";

const mobileTranslations: Record<string, Record<Language, string>> = {
  "mobile.toggleMenu": ensureAllLanguages({
    en: "Toggle Menu",
    es: "Alternar Menú",
    fr: "Basculer le Menu",
    de: "Menü umschalten",
    sv: "Växla Meny",
    ja: "メニュー切り替え",
    zh: "切换菜单",
    ru: "Переключить Меню",
    pt: "Alternar Menu",
    ar: "تبديل القائمة"
  })
};

export default mobileTranslations;
