
import { Language } from "../../../types";
import { ensureAllLanguages } from "../../../utils";

const workflowToolsTranslations: Record<string, Record<Language, string>> = {
  "ai.tools.sampleOrganizer": ensureAllLanguages({
    en: "Sample Organizer",
    es: "Organizador de Muestras",
    fr: "Organisateur d'Échantillons",
    de: "Sample-Organizer",
    sv: "Sampel-organisatör",
    ja: "サンプルオーガナイザー",
    zh: "样本整理器",
    ru: "Организатор сэмплов",
    pt: "Organizador de Amostras",
    ar: "منظم العينات"
  }),
  "ai.tools.sampleOrganizerDesc": ensureAllLanguages({
    en: "Automatically organize your sample library",
    es: "Organiza automáticamente tu biblioteca de muestras",
    fr: "Organisez automatiquement votre bibliothèque d'échantillons",
    de: "Organisieren Sie Ihre Sample-Bibliothek automatisch",
    sv: "Organisera ditt sampelbibliotek automatiskt",
    ja: "サンプルライブラリを自動的に整理",
    zh: "自动整理您的样本库",
    ru: "Автоматически организуйте вашу библиотеку сэмплов",
    pt: "Organize automaticamente sua biblioteca de amostras",
    ar: "تنظيم مكتبة العينات الخاصة بك تلقائيًا"
  }),
  "ai.tools.patternCategorizer": ensureAllLanguages({
    en: "Pattern Categorizer",
    es: "Categorizador de Patrones",
    fr: "Catégoriseur de Motifs",
    de: "Muster-Kategorisierer",
    sv: "Mönsterkategoriserare",
    ja: "パターン分類器",
    zh: "模式分类器",
    ru: "Категоризатор паттернов",
    pt: "Categorizador de Padrões",
    ar: "مصنف الأنماط"
  }),
  "ai.tools.patternCategorizerDesc": ensureAllLanguages({
    en: "Identify and categorize musical patterns",
    es: "Identifica y categoriza patrones musicales",
    fr: "Identifiez et catégorisez les motifs musicaux",
    de: "Identifizieren und kategorisieren Sie musikalische Muster",
    sv: "Identifiera och kategorisera musikaliska mönster",
    ja: "音楽パターンを識別して分類",
    zh: "识别并分类音乐模式",
    ru: "Определяйте и категоризируйте музыкальные паттерны",
    pt: "Identifique e categorize padrões musicais",
    ar: "تحديد وتصنيف الأنماط الموسيقية"
  }),
  "ai.tools.smartTagging": ensureAllLanguages({
    en: "Smart Tagging",
    es: "Etiquetado Inteligente",
    fr: "Étiquetage Intelligent",
    de: "Intelligentes Tagging",
    sv: "Smart taggning",
    ja: "スマートタギング",
    zh: "智能标记",
    ru: "Умная маркировка",
    pt: "Marcação Inteligente",
    ar: "التصنيف الذكي"
  }),
  "ai.tools.smartTaggingDesc": ensureAllLanguages({
    en: "Auto-tag your tracks with relevant metadata",
    es: "Etiqueta automáticamente tus pistas con metadatos relevantes",
    fr: "Auto-étiquetez vos pistes avec des métadonnées pertinentes",
    de: "Taggen Sie Ihre Tracks automatisch mit relevanten Metadaten",
    sv: "Auto-tagga dina spår med relevant metadata",
    ja: "関連メタデータでトラックを自動タグ付け",
    zh: "使用相关元数据自动标记您的音轨",
    ru: "Автоматически отмечайте треки актуальными метаданными",
    pt: "Marque automaticamente suas faixas com metadados relevantes",
    ar: "وضع علامات تلقائية على المسارات الخاصة بك مع البيانات الوصفية ذات الصلة"
  }),
  "ai.tools.sessionPlanner": ensureAllLanguages({
    en: "Session Planner",
    es: "Planificador de Sesiones",
    fr: "Planificateur de Session",
    de: "Sitzungsplaner",
    sv: "Sessionsplanerare",
    ja: "セッションプランナー",
    zh: "会话规划器",
    ru: "Планировщик сессий",
    pt: "Planejador de Sessões",
    ar: "مخطط الجلسات"
  }),
  "ai.tools.sessionPlannerDesc": ensureAllLanguages({
    en: "AI-powered workflow and session planning",
    es: "Planificación de flujo de trabajo y sesiones con IA",
    fr: "Planification de flux de travail et de session alimentée par l'IA",
    de: "KI-gestützte Workflow- und Sitzungsplanung",
    sv: "AI-driven arbetsflödes- och sessionsplanering",
    ja: "AI駆動のワークフローとセッション計画",
    zh: "AI驱动的工作流和会话规划",
    ru: "Планирование рабочего процесса и сессий на базе ИИ",
    pt: "Planejamento de fluxo de trabalho e sessão baseado em IA",
    ar: "تخطيط سير العمل والجلسات المدعوم بالذكاء الاصطناعي"
  })
};

export default workflowToolsTranslations;
