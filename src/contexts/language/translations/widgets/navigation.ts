
import { Language } from "../../types";
import { processTranslations } from "../../utils";

const navigationWidgetTranslations = {
  "nav.dashboard": {
    en: "Dashboard",
    es: "Panel",
    fr: "Tableau de Bord",
    de: "Dashboard",
    sv: "Instrumentpanel",
    ja: "ダッシュボード",
    zh: "仪表板",
    ru: "Панель Управления",
    pt: "Painel",
    ar: "لوحة القيادة"
  },
  "nav.support": {
    en: "Support",
    es: "Soporte",
    fr: "Support",
    de: "Support",
    sv: "Support",
    ja: "サポート",
    zh: "支持",
    ru: "Поддержка",
    pt: "Suporte",
    ar: "الدعم"
  },
  "nav.admin": {
    en: "Admin Panel",
    es: "Panel de Administración",
    fr: "Panneau d'Administration",
    de: "Admin-Panel",
    sv: "Administratörspanel",
    ja: "管理パネル",
    zh: "管理面板",
    ru: "Панель Администратора",
    pt: "Painel de Administração",
    ar: "لوحة الإدارة"
  },
  "mobile.toggleMenu": {
    en: "Toggle menu",
    es: "Alternar menú",
    fr: "Basculer le menu",
    de: "Menü umschalten",
    sv: "Växla meny",
    ja: "メニュー切り替え",
    zh: "切换菜单",
    ru: "Переключить меню",
    pt: "Alternar menu",
    ar: "تبديل القائمة"
  }
};

export default processTranslations(navigationWidgetTranslations);
