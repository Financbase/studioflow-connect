
import { Language } from "../../types";
import { ensureAllLanguages } from "../../utils";

const generalAITranslations: Record<string, Record<Language, string>> = {
  "ai.title": ensureAllLanguages({
    en: "AI Tools",
    es: "Herramientas de IA",
    fr: "Outils d'IA",
    de: "KI-Werkzeuge",
    sv: "AI-verktyg",
    ja: "AIツール",
    zh: "AI工具",
    ru: "ИИ инструменты",
    pt: "Ferramentas de IA",
    ar: "أدوات الذكاء الاصطناعي"
  }),
  "ai.subtitle": ensureAllLanguages({
    en: "Enhance your workflow with intelligent assistants",
    es: "Mejora tu flujo de trabajo con asistentes inteligentes",
    fr: "Améliorez votre flux de travail avec des assistants intelligents",
    de: "Verbessern Sie Ihren Arbeitsablauf mit intelligenten Assistenten",
    sv: "Förbättra ditt arbetsflöde med intelligenta assistenter",
    ja: "インテリジェントアシスタントでワークフローを強化",
    zh: "使用智能助手增强您的工作流程",
    ru: "Улучшите рабочий процесс с помощью интеллектуальных помощников",
    pt: "Aprimore seu fluxo de trabalho com assistentes inteligentes",
    ar: "تعزيز سير العمل الخاص بك مع المساعدين الأذكياء"
  }),
  "ai.runAnalysis": ensureAllLanguages({
    en: "Run Analysis",
    es: "Ejecutar análisis",
    fr: "Exécuter l'analyse",
    de: "Analyse ausführen",
    sv: "Kör analys",
    ja: "分析を実行",
    zh: "运行分析",
    ru: "Запустить анализ",
    pt: "Executar análise",
    ar: "تشغيل التحليل"
  })
};

export default generalAITranslations;
