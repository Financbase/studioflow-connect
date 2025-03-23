
import { Language } from "../types";
import { processTranslations } from "../utils";

const widgetTranslations = {
  "widgets.system": {
    en: "StudioFlow System Monitor",
    es: "Monitor del Sistema StudioFlow",
    fr: "Moniteur Système StudioFlow",
    de: "StudioFlow Systemmonitor",
    sv: "StudioFlow Systemövervakning",
    ja: "StudioFlow システムモニター",
    zh: "StudioFlow 系统监视器",
    ru: "Системный монитор StudioFlow",
    pt: "Monitor do Sistema StudioFlow",
    ar: "مراقب نظام StudioFlow"
  },
  "widgets.connect": {
    en: "StudioFlow Connect",
    es: "StudioFlow Connect",
    fr: "StudioFlow Connect",
    de: "StudioFlow Connect",
    sv: "StudioFlow Connect",
    ja: "StudioFlow Connect",
    zh: "StudioFlow Connect",
    ru: "StudioFlow Connect",
    pt: "StudioFlow Connect",
    ar: "StudioFlow Connect"
  },
  "widgets.vm": {
    en: "Virtual Machine Controller",
    es: "Controlador de Máquina Virtual",
    fr: "Contrôleur de Machine Virtuelle",
    de: "Virtueller Maschinen-Controller",
    sv: "Virtuell Maskinkontroller",
    ja: "仮想マシンコントローラー",
    zh: "虚拟机控制器",
    ru: "Контроллер Виртуальной Машины",
    pt: "Controlador de Máquina Virtual",
    ar: "وحدة تحكم الآلة الافتراضية"
  },
  "widgets.daw": {
    en: "DAW Workflow Integration",
    es: "Integración de Flujo de Trabajo DAW",
    fr: "Intégration des Flux de Travail DAW",
    de: "DAW-Workflow-Integration",
    sv: "DAW Arbetsflödesintegrering",
    ja: "DAWワークフロー統合",
    zh: "DAW工作流集成",
    ru: "Интеграция Рабочего Процесса DAW",
    pt: "Integração de Fluxo de Trabalho DAW",
    ar: "تكامل سير عمل DAW"
  },
  "widgets.audio": {
    en: "Audio Analysis",
    es: "Análisis de Audio",
    fr: "Analyse Audio",
    de: "Audio-Analyse",
    sv: "Ljudanalys",
    ja: "オーディオ分析",
    zh: "音频分析",
    ru: "Анализ Аудио",
    pt: "Análise de Áudio",
    ar: "تحليل الصوت"
  },
  "widgets.ai": {
    en: "AI-Powered Tools",
    es: "Herramientas Impulsadas por IA",
    fr: "Outils Alimentés par l'IA",
    de: "KI-gestützte Tools",
    sv: "AI-drivna Verktyg",
    ja: "AI搭載ツール",
    zh: "AI驱动工具",
    ru: "Инструменты на Базе ИИ",
    pt: "Ferramentas Baseadas em IA",
    ar: "أدوات مدعومة بالذكاء الاصطناعي"
  },
  "widgets.marketplace": {
    en: "Studio Marketplace",
    es: "Mercado de Estudio",
    fr: "Marché du Studio",
    de: "Studio-Marktplatz",
    sv: "Studiomarknadsplats",
    ja: "スタジオマーケットプレイス",
    zh: "工作室市场",
    ru: "Маркетплейс Студии",
    pt: "Mercado de Estúdio",
    ar: "سوق الاستوديو"
  },
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
  },
  "tooltips.featureNotAvailable": {
    en: "Feature not available",
    es: "Función no disponible",
    fr: "Fonctionnalité non disponible",
    de: "Funktion nicht verfügbar",
    sv: "Funktion inte tillgänglig",
    ja: "機能は利用できません",
    zh: "功能不可用",
    ru: "Функция недоступна",
    pt: "Recurso não disponível",
    ar: "الميزة غير متوفرة"
  }
};

export default processTranslations(widgetTranslations);
