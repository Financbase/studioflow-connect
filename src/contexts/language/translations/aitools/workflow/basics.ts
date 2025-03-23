
import { Language } from "../../../types";
import { ensureAllLanguages } from "../../../utils";

const workflowBasicsTranslations: Record<string, Record<Language, string>> = {
  "ai.workflowAssistant": ensureAllLanguages({
    en: "AI Workflow Assistant",
    es: "Asistente de Flujo de Trabajo IA",
    fr: "Assistant de Flux de Travail IA",
    de: "KI-Workflow-Assistent",
    sv: "AI-arbetsflödesassistent",
    ja: "AIワークフローアシスタント",
    zh: "AI工作流助手",
    ru: "ИИ-ассистент рабочего процесса",
    pt: "Assistente de Fluxo de Trabalho IA",
    ar: "مساعد سير العمل بالذكاء الاصطناعي"
  }),
  "ai.generator.title": ensureAllLanguages({
    en: "AI Generator",
    es: "Generador de IA",
    fr: "Générateur d'IA",
    de: "KI-Generator",
    sv: "AI-generator",
    ja: "AIジェネレーター",
    zh: "AI生成器",
    ru: "ИИ-генератор",
    pt: "Gerador de IA",
    ar: "مولد الذكاء الاصطناعي"
  }),
  "ai.workflowDescription": ensureAllLanguages({
    en: "Enhance your creative process with AI-powered assistance",
    es: "Mejora tu proceso creativo con asistencia potenciada por IA",
    fr: "Améliorez votre processus créatif avec l'assistance alimentée par l'IA",
    de: "Verbessern Sie Ihren kreativen Prozess mit KI-gestützter Unterstützung",
    sv: "Förbättra din kreativa process med AI-driven assistans",
    ja: "AI支援によりクリエイティブプロセスを強化",
    zh: "通过AI支持增强您的创作过程",
    ru: "Улучшите творческий процесс с помощью ИИ-ассистента",
    pt: "Aprimore seu processo criativo com assistência baseada em IA",
    ar: "تعزيز عمليتك الإبداعية بمساعدة الذكاء الاصطناعي"
  }),
  "ai.viewHistory": ensureAllLanguages({
    en: "View History",
    es: "Ver Historial",
    fr: "Voir l'Historique",
    de: "Verlauf anzeigen",
    sv: "Visa historik",
    ja: "履歴を表示",
    zh: "查看历史",
    ru: "Просмотр истории",
    pt: "Ver Histórico",
    ar: "عرض السجل"
  }),
  "ai.startBatch": ensureAllLanguages({
    en: "Start Batch",
    es: "Iniciar Lote",
    fr: "Démarrer Lot",
    de: "Stapel starten",
    sv: "Starta batch",
    ja: "バッチを開始",
    zh: "开始批处理",
    ru: "Начать пакет",
    pt: "Iniciar Lote",
    ar: "بدء الدفعة"
  }),
  "ai.browse": ensureAllLanguages({
    en: "Browse Templates",
    es: "Explorar Plantillas",
    fr: "Parcourir les Modèles",
    de: "Vorlagen durchsuchen",
    sv: "Bläddra bland mallar",
    ja: "テンプレートを閲覧",
    zh: "浏览模板",
    ru: "Просмотр шаблонов",
    pt: "Explorar Modelos",
    ar: "تصفح القوالب"
  }),
  "ai.openPortal": ensureAllLanguages({
    en: "Open AI Portal",
    es: "Abrir Portal de IA",
    fr: "Ouvrir le Portail IA",
    de: "KI-Portal öffnen",
    sv: "Öppna AI-portal",
    ja: "AIポータルを開く",
    zh: "打开AI门户",
    ru: "Открыть ИИ-портал",
    pt: "Abrir Portal de IA",
    ar: "فتح بوابة الذكاء الاصطناعي"
  })
};

export default workflowBasicsTranslations;
