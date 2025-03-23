
import { Language } from "../types";
import { ensureAllLanguages } from "../utils";

const aiToolsTranslations: Record<string, Record<Language, string>> = {
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

export default aiToolsTranslations;
