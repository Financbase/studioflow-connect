
import { Language } from "../../types";
import { ensureAllLanguages } from "../../utils";

const generalAITranslations: Record<string, Record<Language, string>> = {
  "ai.title": ensureAllLanguages({
    en: "AI Tools",
    es: "Herramientas de IA",
    fr: "Outils d'IA",
    de: "KI-Tools",
    sv: "AI-verktyg",
    ja: "AIツール",
    zh: "AI工具",
    ru: "ИИ-инструменты",
    pt: "Ferramentas de IA",
    ar: "أدوات الذكاء الاصطناعي"
  }),
  "ai.subtitle": ensureAllLanguages({
    en: "Intelligent automation for your workflow",
    es: "Automatización inteligente para tu flujo de trabajo",
    fr: "Automatisation intelligente pour votre flux de travail",
    de: "Intelligente Automatisierung für Ihren Workflow",
    sv: "Intelligent automatisering för ditt arbetsflöde",
    ja: "ワークフローのためのインテリジェントな自動化",
    zh: "智能工作流程自动化",
    ru: "Интеллектуальная автоматизация вашего рабочего процесса",
    pt: "Automação inteligente para seu fluxo de trabalho",
    ar: "أتمتة ذكية لسير عملك"
  }),
  "ai.activated": ensureAllLanguages({
    en: "activated",
    es: "activado",
    fr: "activé",
    de: "aktiviert",
    sv: "aktiverad",
    ja: "有効化されました",
    zh: "已激活",
    ru: "активирован",
    pt: "ativado",
    ar: "تم تنشيطه"
  }),
  "ai.workflowStarted": ensureAllLanguages({
    en: "Workflow started successfully",
    es: "Flujo de trabajo iniciado con éxito",
    fr: "Flux de travail démarré avec succès",
    de: "Workflow erfolgreich gestartet",
    sv: "Arbetsflöde startades framgångsrikt",
    ja: "ワークフローが正常に開始されました",
    zh: "工作流程已成功启动",
    ru: "Рабочий процесс успешно запущен",
    pt: "Fluxo de trabalho iniciado com sucesso",
    ar: "بدأ سير العمل بنجاح"
  }),
  "ai.runAnalysis": ensureAllLanguages({
    en: "Run Analysis",
    es: "Ejecutar Análisis",
    fr: "Lancer l'Analyse",
    de: "Analyse Ausführen",
    sv: "Kör Analys",
    ja: "分析を実行",
    zh: "运行分析",
    ru: "Запустить анализ",
    pt: "Executar Análise",
    ar: "تشغيل التحليل"
  })
};

export default generalAITranslations;
