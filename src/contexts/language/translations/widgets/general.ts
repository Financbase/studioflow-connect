
import { Language } from "../../types";
import { processTranslations } from "../../utils";

const generalWidgetTranslations = {
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
  }
};

export default processTranslations(generalWidgetTranslations);
