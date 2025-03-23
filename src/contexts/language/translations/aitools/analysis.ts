
import { Language } from "../../types";
import { ensureAllLanguages } from "../../utils";

const analysisTranslations: Record<string, Record<Language, string>> = {
  "ai.analysis.title": ensureAllLanguages({
    en: "AI Analysis",
    es: "Análisis de IA",
    fr: "Analyse IA",
    de: "KI-Analyse",
    sv: "AI-analys",
    ja: "AI分析",
    zh: "AI分析",
    ru: "ИИ анализ",
    pt: "Análise de IA",
    ar: "تحليل الذكاء الاصطناعي"
  }),
  "ai.analysis.processing": ensureAllLanguages({
    en: "Processing data...",
    es: "Procesando datos...",
    fr: "Traitement des données...",
    de: "Daten werden verarbeitet...",
    sv: "Bearbetar data...",
    ja: "データ処理中...",
    zh: "处理数据中...",
    ru: "Обработка данных...",
    pt: "Processando dados...",
    ar: "معالجة البيانات..."
  }),
  "ai.analysis.complete": ensureAllLanguages({
    en: "Analysis complete",
    es: "Análisis completo",
    fr: "Analyse terminée",
    de: "Analyse abgeschlossen",
    sv: "Analys klar",
    ja: "分析完了",
    zh: "分析完成",
    ru: "Анализ завершен",
    pt: "Análise completa",
    ar: "اكتمل التحليل"
  }),
  "ai.analysis.error": ensureAllLanguages({
    en: "Analysis error",
    es: "Error de análisis",
    fr: "Erreur d'analyse",
    de: "Analysefehler",
    sv: "Analysfel",
    ja: "分析エラー",
    zh: "分析错误",
    ru: "Ошибка анализа",
    pt: "Erro de análise",
    ar: "خطأ في التحليل"
  })
};

export default analysisTranslations;
