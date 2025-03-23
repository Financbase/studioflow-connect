
import { Language } from "../../../types";
import { ensureAllLanguages } from "../../../utils";

const feedbackAnalysisTranslations: Record<string, Record<Language, string>> = {
  "ai.features.feedbackTitle": ensureAllLanguages({
    en: "Feedback Analysis",
    es: "Análisis de Retroalimentación",
    fr: "Analyse des Retours",
    de: "Feedback-Analyse",
    sv: "Feedbackanalys",
    ja: "フィードバック分析",
    zh: "反馈分析",
    ru: "Анализ обратной связи",
    pt: "Análise de Feedback",
    ar: "تحليل التعليقات"
  }),
  "ai.features.feedbackDesc": ensureAllLanguages({
    en: "Intelligent Feedback Analysis",
    es: "Análisis inteligente de retroalimentación",
    fr: "Analyse intelligente des retours",
    de: "Intelligente Feedback-Analyse",
    sv: "Intelligent feedbackanalys",
    ja: "インテリジェントなフィードバック分析",
    zh: "智能反馈分析",
    ru: "Интеллектуальный анализ обратной связи",
    pt: "Análise inteligente de feedback",
    ar: "تحليل التعليقات الذكية"
  }),
  "ai.features.feedbackLongDesc": ensureAllLanguages({
    en: "Get actionable insights from user feedback with AI-powered analysis",
    es: "Obtén información útil de los comentarios de los usuarios con análisis impulsado por IA",
    fr: "Obtenez des informations exploitables à partir des retours utilisateurs grâce à l'analyse alimentée par l'IA",
    de: "Erhalten Sie handlungsorientierte Erkenntnisse aus Benutzerfeedback mit KI-gestützter Analyse",
    sv: "Få handlingsbara insikter från användarfeedback med AI-driven analys",
    ja: "AI駆動の分析でユーザーフィードバックから実用的な洞察を得る",
    zh: "通过AI驱动的分析获取用户反馈的可行见解",
    ru: "Получайте практические выводы из обратной связи пользователей с помощью анализа на базе ИИ",
    pt: "Obtenha insights acionáveis a partir do feedback do usuário com análise alimentada por IA",
    ar: "الحصول على رؤى قابلة للتنفيذ من تعليقات المستخدمين باستخدام التحليل المدعوم بالذكاء الاصطناعي"
  }),
  "ai.features.feedbackFeature1": ensureAllLanguages({
    en: "Sentiment analysis and categorization",
    es: "Análisis y categorización de sentimientos",
    fr: "Analyse et catégorisation des sentiments",
    de: "Stimmungsanalyse und Kategorisierung",
    sv: "Sentimentanalys och kategorisering",
    ja: "感情分析とカテゴリ化",
    zh: "情感分析和分类",
    ru: "Анализ настроений и категоризация",
    pt: "Análise de sentimento e categorização",
    ar: "تحليل المشاعر والتصنيف"
  }),
  "ai.features.feedbackFeature2": ensureAllLanguages({
    en: "Trend identification and reporting",
    es: "Identificación y reporte de tendencias",
    fr: "Identification et reporting des tendances",
    de: "Trend-Identifikation und Berichterstattung",
    sv: "Trendidentifiering och rapportering",
    ja: "トレンド識別とレポート",
    zh: "趋势识别和报告",
    ru: "Выявление тенденций и формирование отчетов",
    pt: "Identificação de tendências e relatórios",
    ar: "تحديد الاتجاهات وإعداد التقارير"
  }),
  "ai.features.feedbackFeature3": ensureAllLanguages({
    en: "Actionable improvement suggestions",
    es: "Sugerencias prácticas de mejora",
    fr: "Suggestions d'amélioration exploitables",
    de: "Umsetzbare Verbesserungsvorschläge",
    sv: "Handlingsbara förbättringsförslag",
    ja: "実行可能な改善提案",
    zh: "可行的改进建议",
    ru: "Практические предложения по улучшению",
    pt: "Sugestões práticas de melhoria",
    ar: "اقتراحات تحسين قابلة للتنفيذ"
  })
};

export default feedbackAnalysisTranslations;
