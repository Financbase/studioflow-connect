
import { Language } from "../../../types";
import { ensureAllLanguages } from "../../../utils";

const workflowTemplatesTranslations: Record<string, Record<Language, string>> = {
  "ai.features.templatesTitle": ensureAllLanguages({
    en: "Project Templates",
    es: "Plantillas de Proyecto",
    fr: "Modèles de Projet",
    de: "Projektvorlagen",
    sv: "Projektmallar",
    ja: "プロジェクトテンプレート",
    zh: "项目模板",
    ru: "Шаблоны проектов",
    pt: "Modelos de Projeto",
    ar: "قوالب المشروع"
  }),
  "ai.features.templatesDesc": ensureAllLanguages({
    en: "Get started quickly with AI-optimized templates",
    es: "Comienza rápidamente con plantillas optimizadas por IA",
    fr: "Démarrez rapidement avec des modèles optimisés par l'IA",
    de: "Starten Sie schnell mit KI-optimierten Vorlagen",
    sv: "Kom igång snabbt med AI-optimerade mallar",
    ja: "AI最適化テンプレートですぐに始める",
    zh: "使用AI优化的模板快速入门",
    ru: "Быстрый старт с шаблонами, оптимизированными ИИ",
    pt: "Comece rapidamente com modelos otimizados por IA",
    ar: "ابدأ بسرعة باستخدام قوالب محسّنة بالذكاء الاصطناعي"
  }),
  "ai.features.templatesLongDesc": ensureAllLanguages({
    en: "Our AI analyzes thousands of successful projects to create optimized starting points",
    es: "Nuestra IA analiza miles de proyectos exitosos para crear puntos de partida optimizados",
    fr: "Notre IA analyse des milliers de projets réussis pour créer des points de départ optimisés",
    de: "Unsere KI analysiert tausende erfolgreicher Projekte, um optimierte Ausgangspunkte zu schaffen",
    sv: "Vår AI analyserar tusentals framgångsrika projekt för att skapa optimerade startpunkter",
    ja: "私たちのAIは何千もの成功プロジェクトを分析して最適化された出発点を作成します",
    zh: "我们的AI分析了数千个成功项目，创建了优化的起点",
    ru: "Наш ИИ анализирует тысячи успешных проектов для создания оптимизированных отправных точек",
    pt: "Nossa IA analisa milhares de projetos bem-sucedidos para criar pontos de partida otimizados",
    ar: "يقوم الذكاء الاصطناعي لدينا بتحليل آلاف المشاريع الناجحة لإنشاء نقاط بداية محسّنة"
  }),
  "ai.features.templatesFeature1": ensureAllLanguages({
    en: "Genre-specific templates",
    es: "Plantillas específicas por género",
    fr: "Modèles spécifiques au genre",
    de: "Genrespezifische Vorlagen",
    sv: "Genrespecifika mallar",
    ja: "ジャンル固有のテンプレート",
    zh: "特定于流派的模板",
    ru: "Шаблоны по жанрам",
    pt: "Modelos específicos por gênero",
    ar: "قوالب خاصة بالنوع"
  }),
  "ai.features.templatesFeature2": ensureAllLanguages({
    en: "Smart instrument configuration",
    es: "Configuración inteligente de instrumentos",
    fr: "Configuration intelligente des instruments",
    de: "Intelligente Instrumentenkonfiguration",
    sv: "Smart instrumentkonfiguration",
    ja: "スマートな楽器構成",
    zh: "智能乐器配置",
    ru: "Умная настройка инструментов",
    pt: "Configuração inteligente de instrumentos",
    ar: "إعداد ذكي للأدوات"
  }),
  "ai.features.templatesFeature3": ensureAllLanguages({
    en: "Workflow optimization presets",
    es: "Preajustes de optimización de flujo de trabajo",
    fr: "Préréglages d'optimisation du flux de travail",
    de: "Workflow-Optimierungsvoreinstellungen",
    sv: "Förinställningar för arbetsflödesoptimering",
    ja: "ワークフロー最適化プリセット",
    zh: "工作流程优化预设",
    ru: "Пресеты оптимизации рабочего процесса",
    pt: "Predefinições de otimização de fluxo de trabalho",
    ar: "إعدادات مسبقة لتحسين سير العمل"
  })
};

export default workflowTemplatesTranslations;
