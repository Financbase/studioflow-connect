
import { Language } from "../../../types";
import { ensureAllLanguages } from "../../../utils";

const contentInsightTranslations: Record<string, Record<Language, string>> = {
  "ai.features.contentTitle": ensureAllLanguages({
    en: "Content Insights",
    es: "Información de Contenido",
    fr: "Aperçus de Contenu",
    de: "Inhaltseinblicke",
    sv: "Innehållsinsikter",
    ja: "コンテンツインサイト",
    zh: "内容洞察",
    ru: "Аналитика контента",
    pt: "Insights de Conteúdo",
    ar: "رؤى المحتوى"
  }),
  "ai.features.contentDesc": ensureAllLanguages({
    en: "Advanced Content Analysis",
    es: "Análisis avanzado de contenido",
    fr: "Analyse avancée de contenu",
    de: "Erweiterte Inhaltsanalyse",
    sv: "Avancerad innehållsanalys",
    ja: "高度なコンテンツ分析",
    zh: "高级内容分析",
    ru: "Расширенный анализ контента",
    pt: "Análise avançada de conteúdo",
    ar: "تحليل محتوى متقدم"
  }),
  "ai.features.contentLongDesc": ensureAllLanguages({
    en: "Gain deeper understanding of your content with AI-powered semantic analysis",
    es: "Obtenga una comprensión más profunda de su contenido con análisis semántico impulsado por IA",
    fr: "Acquérez une compréhension plus profonde de votre contenu grâce à l'analyse sémantique alimentée par l'IA",
    de: "Gewinnen Sie ein tieferes Verständnis Ihrer Inhalte mit KI-gestützter semantischer Analyse",
    sv: "Få djupare förståelse för ditt innehåll med AI-driven semantisk analys",
    ja: "AI駆動の意味解析であなたのコンテンツをより深く理解する",
    zh: "通过AI驱动的语义分析深入了解您的内容",
    ru: "Получите более глубокое понимание вашего контента с помощью семантического анализа на базе ИИ",
    pt: "Obtenha um entendimento mais profundo do seu conteúdo com análise semântica alimentada por IA",
    ar: "احصل على فهم أعمق لمحتواك من خلال التحليل الدلالي المدعوم بالذكاء الاصطناعي"
  }),
  "ai.features.contentFeature1": ensureAllLanguages({
    en: "Semantic content tagging",
    es: "Etiquetado semántico de contenido",
    fr: "Balisage sémantique du contenu",
    de: "Semantische Inhaltsmarkierung",
    sv: "Semantisk innehållstaggning",
    ja: "セマンティックコンテンツタグ付け",
    zh: "语义内容标记",
    ru: "Семантическая маркировка контента",
    pt: "Marcação semântica de conteúdo",
    ar: "وسم المحتوى الدلالي"
  }),
  "ai.features.contentFeature2": ensureAllLanguages({
    en: "Audience engagement predictions",
    es: "Predicciones de engagement de la audiencia",
    fr: "Prédictions d'engagement du public",
    de: "Vorhersagen zum Publikumsengagement",
    sv: "Publikengagemangsprognoser",
    ja: "視聴者エンゲージメント予測",
    zh: "受众参与度预测",
    ru: "Прогнозы вовлеченности аудитории",
    pt: "Previsões de engajamento do público",
    ar: "توقعات مشاركة الجمهور"
  }),
  "ai.features.contentFeature3": ensureAllLanguages({
    en: "Content quality scoring",
    es: "Puntuación de calidad de contenido",
    fr: "Évaluation de la qualité du contenu",
    de: "Bewertung der Inhaltsqualität",
    sv: "Kvalitetsbedömning av innehåll",
    ja: "コンテンツ品質スコアリング",
    zh: "内容质量评分",
    ru: "Оценка качества контента",
    pt: "Pontuação de qualidade de conteúdo",
    ar: "تقييم جودة المحتوى"
  })
};

export default contentInsightTranslations;
