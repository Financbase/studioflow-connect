
import { Language } from "../types";
import { processTranslations } from "../utils";

const dashboardTranslations = {
  "dashboard.title": {
    en: "StudioFlow X",
    es: "StudioFlow X",
    fr: "StudioFlow X",
    de: "StudioFlow X",
    sv: "StudioFlow X",
    ja: "StudioFlow X",
    zh: "StudioFlow X",
    ru: "StudioFlow X",
    pt: "StudioFlow X",
    ar: "StudioFlow X"
  },
  "dashboard.subtitle": {
    en: "Unified music production platform for legacy integration, multi-DAW workflows, and creative tools",
    es: "Plataforma unificada de producción musical para integración heredada, flujos de trabajo multi-DAW y herramientas creativas",
    fr: "Plateforme de production musicale unifiée pour l'intégration héritée, les flux de travail multi-DAW et les outils créatifs",
    de: "Einheitliche Musikproduktionsplattform für Legacy-Integration, Multi-DAW-Workflows und kreative Tools",
    sv: "Enhetlig musikproduktionsplattform för legacy-integration, multi-DAW-arbetsflöden och kreativa verktyg",
    ja: "レガシー統合、マルチDAWワークフロー、クリエイティブツールのための統合音楽制作プラットフォーム",
    zh: "统一的音乐制作平台，用于传统集成、多DAW工作流程和创意工具",
    ru: "Единая платформа для музыкального производства с поддержкой устаревших систем, мульти-DAW рабочих процессов и креативных инструментов",
    pt: "Plataforma unificada de produção musical para integração legada, fluxos de trabalho multi-DAW e ferramentas criativas",
    ar: "منصة إنتاج موسيقي موحدة للتكامل القديم وتدفقات عمل DAW المتعددة والأدوات الإبداعية"
  },
  "dashboard.greeting.morning": {
    en: "Good morning",
    es: "Buenos días",
    fr: "Bonjour",
    de: "Guten Morgen",
    sv: "God morgon",
    ja: "おはようございます",
    zh: "早上好",
    ru: "Доброе утро",
    pt: "Bom dia",
    ar: "صباح الخير"
  },
  "dashboard.greeting.afternoon": {
    en: "Good afternoon",
    es: "Buenas tardes",
    fr: "Bon après-midi",
    de: "Guten Tag",
    sv: "God eftermiddag",
    ja: "こんにちは",
    zh: "下午好",
    ru: "Добрый день",
    pt: "Boa tarde",
    ar: "مساء الخير"
  },
  "dashboard.greeting.evening": {
    en: "Good evening",
    es: "Buenas noches",
    fr: "Bonsoir",
    de: "Guten Abend",
    sv: "God kväll",
    ja: "こんばんは",
    zh: "晚上好",
    ru: "Добрый вечер",
    pt: "Boa noite",
    ar: "مساء الخير"
  },
  "dashboard.user": {
    en: "User",
    es: "Usuario",
    fr: "Utilisateur",
    de: "Benutzer",
    sv: "Användare",
    ja: "ユーザー",
    zh: "用户",
    ru: "Пользователь",
    pt: "Usuário",
    ar: "مستخدم"
  },
  "dashboard.loading": {
    en: "Loading dashboard...",
    es: "Cargando panel...",
    fr: "Chargement du tableau de bord...",
    de: "Dashboard wird geladen...",
    sv: "Laddar instrumentpanel...",
    ja: "ダッシュボードを読み込んでいます...",
    zh: "正在加载仪表板...",
    ru: "Загрузка панели...",
    pt: "Carregando painel...",
    ar: "جار تحميل لوحة القيادة..."
  },
  "dashboard.viewChanged": {
    en: "View Changed",
    es: "Vista Cambiada",
    fr: "Vue Modifiée",
    de: "Ansicht Geändert",
    sv: "Vy Ändrad",
    ja: "表示が変更されました",
    zh: "视图已更改",
    ru: "Вид Изменен",
    pt: "Visualização Alterada",
    ar: "تم تغيير العرض"
  },
  "dashboard.viewSet": {
    en: "Dashboard view set to",
    es: "Vista del panel establecida en",
    fr: "Vue du tableau de bord définie sur",
    de: "Dashboard-Ansicht eingestellt auf",
    sv: "Instrumentpanelvy inställd på",
    ja: "ダッシュボードの表示が次に設定されました：",
    zh: "仪表板视图设置为",
    ru: "Вид панели установлен на",
    pt: "Visualização do painel definida para",
    ar: "تم تعيين عرض لوحة القيادة إلى"
  },
  "errors.dashboardError": {
    en: "Dashboard Error",
    es: "Error del Panel",
    fr: "Erreur du Tableau de Bord",
    de: "Dashboard-Fehler",
    sv: "Instrumentpanelsfel",
    ja: "ダッシュボードエラー",
    zh: "仪表板错误",
    ru: "Ошибка Панели",
    pt: "Erro no Painel",
    ar: "خطأ في لوحة القيادة"
  }
};

export default processTranslations(dashboardTranslations);
