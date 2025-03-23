
import { Language } from "../../types";
import { ensureAllLanguages } from "../../utils";

const featuresTranslations: Record<string, Record<Language, string>> = {
  "ai.features.resourceDesc": ensureAllLanguages({
    en: "Smart Resource Management",
    es: "Gestión inteligente de recursos",
    fr: "Gestion intelligente des ressources",
    de: "Intelligentes Ressourcenmanagement",
    sv: "Smart resurshantering",
    ja: "スマートリソース管理",
    zh: "智能资源管理",
    ru: "Умное управление ресурсами",
    pt: "Gerenciamento inteligente de recursos",
    ar: "إدارة الموارد الذكية"
  }),
  "ai.features.resourceLongDesc": ensureAllLanguages({
    en: "Optimize your storage and processing resources with AI-powered recommendations",
    es: "Optimiza tus recursos de almacenamiento y procesamiento con recomendaciones impulsadas por IA",
    fr: "Optimisez vos ressources de stockage et de traitement avec des recommandations alimentées par l'IA",
    de: "Optimieren Sie Ihre Speicher- und Verarbeitungsressourcen mit KI-gestützten Empfehlungen",
    sv: "Optimera dina lagrings- och bearbetningsresurser med AI-drivna rekommendationer",
    ja: "AI駆動の推奨事項によりストレージと処理リソースを最適化",
    zh: "通过人工智能驱动的建议优化您的存储和处理资源",
    ru: "Оптимизируйте ресурсы хранения и обработки с помощью рекомендаций на базе ИИ",
    pt: "Otimize seus recursos de armazenamento e processamento com recomendações alimentadas por IA",
    ar: "تحسين موارد التخزين والمعالجة باستخدام توصيات مدعومة بالذكاء الاصطناعي"
  }),
  "ai.features.resourceFeature1": ensureAllLanguages({
    en: "Intelligent storage optimization",
    es: "Optimización inteligente del almacenamiento",
    fr: "Optimisation intelligente du stockage",
    de: "Intelligente Speicheroptimierung",
    sv: "Intelligent lagringsoptimering",
    ja: "インテリジェントなストレージ最適化",
    zh: "智能存储优化",
    ru: "Интеллектуальная оптимизация хранилища",
    pt: "Otimização inteligente de armazenamento",
    ar: "تحسين التخزين الذكي"
  }),
  "ai.features.resourceFeature2": ensureAllLanguages({
    en: "Automated resource allocation",
    es: "Asignación automatizada de recursos",
    fr: "Allocation automatisée des ressources",
    de: "Automatisierte Ressourcenzuweisung",
    sv: "Automatiserad resursallokering",
    ja: "自動リソース割り当て",
    zh: "自动资源分配",
    ru: "Автоматическое распределение ресурсов",
    pt: "Alocação automatizada de recursos",
    ar: "تخصيص الموارد الآلي"
  }),
  "ai.features.resourceFeature3": ensureAllLanguages({
    en: "Predictive scaling suggestions",
    es: "Sugerencias predictivas de escalado",
    fr: "Suggestions de mise à l'échelle prédictives",
    de: "Prädiktive Skalierungsvorschläge",
    sv: "Prediktiva skalningsförslag",
    ja: "予測スケーリング提案",
    zh: "预测性扩展建议",
    ru: "Предиктивные предложения по масштабированию",
    pt: "Sugestões preditivas de escalonamento",
    ar: "اقتراحات التوسع التنبؤية"
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
  }),
  "ai.features.resourceTitle": ensureAllLanguages({
    en: "Resource Management",
    es: "Gestión de Recursos",
    fr: "Gestion des Ressources",
    de: "Ressourcenverwaltung",
    sv: "Resurshantering",
    ja: "リソース管理",
    zh: "资源管理",
    ru: "Управление ресурсами",
    pt: "Gerenciamento de Recursos",
    ar: "إدارة الموارد"
  })
};

export default featuresTranslations;
