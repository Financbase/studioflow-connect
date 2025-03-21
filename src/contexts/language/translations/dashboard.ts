
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
  }
};

export default processTranslations(dashboardTranslations);
