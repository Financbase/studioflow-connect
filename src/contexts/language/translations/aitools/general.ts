
import { Language } from "../../types";
import { ensureAllLanguages } from "../../utils";

const generalAITranslations: Record<string, Record<Language, string>> = {
  "ai.tools.title": ensureAllLanguages({
    en: "AI Tools",
    es: "Herramientas de IA",
    fr: "Outils d'IA",
    de: "KI-Werkzeuge",
    sv: "AI-verktyg",
    ja: "AIツール",
    zh: "AI工具",
    ru: "ИИ-инструменты",
    pt: "Ferramentas de IA",
    ar: "أدوات الذكاء الاصطناعي"
  }),
  "ai.tools.subtitle": ensureAllLanguages({
    en: "Powerful AI tools to enhance your workflow",
    es: "Potentes herramientas de IA para mejorar tu flujo de trabajo",
    fr: "Outils d'IA puissants pour améliorer votre flux de travail",
    de: "Leistungsstarke KI-Werkzeuge zur Verbesserung Ihres Workflows",
    sv: "Kraftfulla AI-verktyg för att förbättra ditt arbetsflöde",
    ja: "ワークフローを強化する強力なAIツール",
    zh: "增强工作流程的强大AI工具",
    ru: "Мощные ИИ-инструменты для улучшения рабочего процесса",
    pt: "Ferramentas poderosas de IA para melhorar seu fluxo de trabalho",
    ar: "أدوات ذكاء اصطناعي قوية لتحسين سير عملك"
  }),
  "ai.tools.projectTemplates": ensureAllLanguages({
    en: "Project Templates",
    es: "Plantillas de proyectos",
    fr: "Modèles de projets",
    de: "Projektvorlagen",
    sv: "Projektmallar",
    ja: "プロジェクトテンプレート",
    zh: "项目模板",
    ru: "Шаблоны проектов",
    pt: "Modelos de Projetos",
    ar: "قوالب المشاريع"
  }),
  "ai.tools.projectTemplatesDesc": ensureAllLanguages({
    en: "AI-generated project templates based on your preferences",
    es: "Plantillas de proyectos generadas por IA basadas en tus preferencias",
    fr: "Modèles de projets générés par l'IA selon vos préférences",
    de: "KI-generierte Projektvorlagen basierend auf Ihren Präferenzen",
    sv: "AI-genererade projektmallar baserade på dina preferenser",
    ja: "あなたの好みに基づいたAI生成プロジェクトテンプレート",
    zh: "基于您偏好的AI生成项目模板",
    ru: "Шаблоны проектов, созданные ИИ на основе ваших предпочтений",
    pt: "Modelos de projetos gerados por IA com base em suas preferências",
    ar: "قوالب مشاريع تم إنشاؤها بواسطة الذكاء الاصطناعي بناءً على تفضيلاتك"
  }),
  "ai.tools.signalFlow": ensureAllLanguages({
    en: "Signal Flow",
    es: "Flujo de señal",
    fr: "Flux de signal",
    de: "Signalfluss",
    sv: "Signalflöde",
    ja: "シグナルフロー",
    zh: "信号流",
    ru: "Поток сигнала",
    pt: "Fluxo de Sinal",
    ar: "تدفق الإشارة"
  }),
  "ai.tools.signalFlowDesc": ensureAllLanguages({
    en: "Analyze and optimize your audio signal chain",
    es: "Analiza y optimiza tu cadena de señal de audio",
    fr: "Analysez et optimisez votre chaîne de signal audio",
    de: "Analysieren und optimieren Sie Ihre Audiosignalkette",
    sv: "Analysera och optimera din ljudsignalkedja",
    ja: "オーディオ信号チェーンを分析して最適化",
    zh: "分析和优化您的音频信号链",
    ru: "Анализируйте и оптимизируйте вашу цепочку аудиосигналов",
    pt: "Analise e otimize sua cadeia de sinal de áudio",
    ar: "تحليل وتحسين سلسلة إشارة الصوت الخاصة بك"
  }),
  "ai.tools.referenceLibrary": ensureAllLanguages({
    en: "Reference Library",
    es: "Biblioteca de referencia",
    fr: "Bibliothèque de référence",
    de: "Referenzbibliothek",
    sv: "Referensbibliotek",
    ja: "リファレンスライブラリ",
    zh: "参考库",
    ru: "Справочная библиотека",
    pt: "Biblioteca de Referência",
    ar: "مكتبة المراجع"
  }),
  "ai.tools.referenceLibraryDesc": ensureAllLanguages({
    en: "AI-powered reference track recommendations",
    es: "Recomendaciones de pistas de referencia impulsadas por IA",
    fr: "Recommandations de pistes de référence alimentées par l'IA",
    de: "KI-gestützte Empfehlungen für Referenztracks",
    sv: "AI-drivna rekommendationer för referensspår",
    ja: "AI駆動のリファレンストラック推奨",
    zh: "AI驱动的参考轨道推荐",
    ru: "Рекомендации референсных треков на основе ИИ",
    pt: "Recomendações de faixas de referência com tecnologia de IA",
    ar: "توصيات المسارات المرجعية المدعومة بالذكاء الاصطناعي"
  }),
  "ai.tools.autoDocumentation": ensureAllLanguages({
    en: "Auto Documentation",
    es: "Documentación automática",
    fr: "Documentation automatique",
    de: "Auto-Dokumentation",
    sv: "Automatisk dokumentation",
    ja: "自動ドキュメンテーション",
    zh: "自动文档",
    ru: "Автодокументация",
    pt: "Documentação Automática",
    ar: "التوثيق التلقائي"
  }),
  "ai.tools.autoDocumentationDesc": ensureAllLanguages({
    en: "Generate project documentation automatically",
    es: "Genera documentación de proyectos automáticamente",
    fr: "Générez automatiquement la documentation du projet",
    de: "Generieren Sie Projektdokumentation automatisch",
    sv: "Generera projektdokumentation automatiskt",
    ja: "プロジェクトドキュメントを自動生成",
    zh: "自动生成项目文档",
    ru: "Автоматически создавайте документацию проекта",
    pt: "Gere documentação de projeto automaticamente",
    ar: "إنشاء وثائق المشروع تلقائيًا"
  }),
  "ai.tools.deadlineTracker": ensureAllLanguages({
    en: "Deadline Tracker",
    es: "Rastreador de plazos",
    fr: "Suivi des échéances",
    de: "Deadline-Tracker",
    sv: "Deadline-spårare",
    ja: "締め切りトラッカー",
    zh: "截止日期追踪器",
    ru: "Трекер дедлайнов",
    pt: "Rastreador de Prazos",
    ar: "متتبع المواعيد النهائية"
  }),
  "ai.tools.deadlineTrackerDesc": ensureAllLanguages({
    en: "AI estimates completion times and tracks deadlines",
    es: "La IA estima los tiempos de finalización y rastrea los plazos",
    fr: "L'IA estime les délais d'achèvement et suit les échéances",
    de: "KI schätzt Fertigstellungszeiten und verfolgt Fristen",
    sv: "AI uppskattar färdigställandetider och spårar deadlines",
    ja: "AIが完了時間を見積もり、締め切りを追跡",
    zh: "AI估计完成时间并跟踪截止日期",
    ru: "ИИ оценивает время завершения и отслеживает дедлайны",
    pt: "IA estima tempos de conclusão e rastreia prazos",
    ar: "يقدر الذكاء الاصطناعي أوقات الإنجاز ويتتبع المواعيد النهائية"
  }),
  "ai.tools.clientFeedback": ensureAllLanguages({
    en: "Client Feedback",
    es: "Comentarios del cliente",
    fr: "Retour client",
    de: "Kundenfeedback",
    sv: "Klientfeedback",
    ja: "クライアントフィードバック",
    zh: "客户反馈",
    ru: "Обратная связь с клиентами",
    pt: "Feedback do Cliente",
    ar: "ملاحظات العملاء"
  }),
  "ai.tools.clientFeedbackDesc": ensureAllLanguages({
    en: "AI interprets and categorizes client feedback",
    es: "La IA interpreta y categoriza los comentarios del cliente",
    fr: "L'IA interprète et catégorise les retours clients",
    de: "KI interpretiert und kategorisiert Kundenfeedback",
    sv: "AI tolkar och kategoriserar klientfeedback",
    ja: "AIがクライアントフィードバックを解釈して分類",
    zh: "AI解释和分类客户反馈",
    ru: "ИИ интерпретирует и категоризирует обратную связь клиентов",
    pt: "IA interpreta e categoriza feedback de clientes",
    ar: "يفسر الذكاء الاصطناعي ملاحظات العملاء ويصنفها"
  }),
  "ai.tools.timeTracker": ensureAllLanguages({
    en: "Time Tracker",
    es: "Rastreador de tiempo",
    fr: "Suivi du temps",
    de: "Zeiterfassung",
    sv: "Tidsspårare",
    ja: "タイムトラッカー",
    zh: "时间追踪器",
    ru: "Учет времени",
    pt: "Rastreador de Tempo",
    ar: "متتبع الوقت"
  }),
  "ai.tools.timeTrackerDesc": ensureAllLanguages({
    en: "AI-powered time tracking and efficiency analysis",
    es: "Seguimiento del tiempo y análisis de eficiencia impulsados por IA",
    fr: "Suivi du temps et analyse d'efficacité alimentés par l'IA",
    de: "KI-gestützte Zeiterfassung und Effizienzanalyse",
    sv: "AI-driven tidsspårning och effektivitetsanalys",
    ja: "AI駆動の時間追跡と効率分析",
    zh: "AI驱动的时间跟踪和效率分析",
    ru: "Учет времени и анализ эффективности на основе ИИ",
    pt: "Rastreamento de tempo e análise de eficiência com tecnologia de IA",
    ar: "تتبع الوقت وتحليل الكفاءة المدعومين بالذكاء الاصطناعي"
  }),
  "ai.tools.backupManager": ensureAllLanguages({
    en: "Backup Manager",
    es: "Gestor de copias de seguridad",
    fr: "Gestionnaire de sauvegarde",
    de: "Backup-Manager",
    sv: "Säkerhetskopieringshanterare",
    ja: "バックアップマネージャー",
    zh: "备份管理器",
    ru: "Менеджер резервного копирования",
    pt: "Gerenciador de Backup",
    ar: "مدير النسخ الاحتياطي"
  }),
  "ai.tools.backupManagerDesc": ensureAllLanguages({
    en: "Smart backup scheduling and version management",
    es: "Programación inteligente de copias de seguridad y gestión de versiones",
    fr: "Planification intelligente des sauvegardes et gestion des versions",
    de: "Intelligente Backup-Planung und Versionsverwaltung",
    sv: "Smart schemaläggning av säkerhetskopiering och versionshantering",
    ja: "スマートなバックアップスケジューリングとバージョン管理",
    zh: "智能备份调度和版本管理",
    ru: "Умное планирование резервного копирования и управление версиями",
    pt: "Agendamento inteligente de backup e gerenciamento de versão",
    ar: "جدولة النسخ الاحتياطي الذكية وإدارة الإصدار"
  }),
  "ai.tools.resourceMonitor": ensureAllLanguages({
    en: "Resource Monitor",
    es: "Monitor de recursos",
    fr: "Moniteur de ressources",
    de: "Ressourcenmonitor",
    sv: "Resursövervakare",
    ja: "リソースモニター",
    zh: "资源监视器",
    ru: "Монитор ресурсов",
    pt: "Monitor de Recursos",
    ar: "مراقب الموارد"
  }),
  "ai.tools.resourceMonitorDesc": ensureAllLanguages({
    en: "AI-optimized system resource management",
    es: "Gestión de recursos del sistema optimizada por IA",
    fr: "Gestion des ressources système optimisée par l'IA",
    de: "KI-optimierte Systemressourcenverwaltung",
    sv: "AI-optimerad systemresurshantering",
    ja: "AI最適化されたシステムリソース管理",
    zh: "AI优化的系统资源管理",
    ru: "Управление системными ресурсами, оптимизированное с помощью ИИ",
    pt: "Gerenciamento de recursos do sistema otimizado por IA",
    ar: "إدارة موارد النظام المحسنة بالذكاء الاصطناعي"
  }),
  "ai.tools.equipmentScanner": ensureAllLanguages({
    en: "Equipment Scanner",
    es: "Escáner de equipos",
    fr: "Scanner d'équipement",
    de: "Geräte-Scanner",
    sv: "Utrustningsscanner",
    ja: "機器スキャナー",
    zh: "设备扫描仪",
    ru: "Сканер оборудования",
    pt: "Scanner de Equipamentos",
    ar: "ماسح المعدات"
  }),
  "ai.tools.equipmentScannerDesc": ensureAllLanguages({
    en: "Automatic detection and optimization of audio hardware",
    es: "Detección automática y optimización de hardware de audio",
    fr: "Détection automatique et optimisation du matériel audio",
    de: "Automatische Erkennung und Optimierung von Audio-Hardware",
    sv: "Automatisk upptäckt och optimering av ljudhårdvara",
    ja: "オーディオハードウェアの自動検出と最適化",
    zh: "自动检测和优化音频硬件",
    ru: "Автоматическое обнаружение и оптимизация аудиооборудования",
    pt: "Detecção automática e otimização de hardware de áudio",
    ar: "الكشف التلقائي وتحسين أجهزة الصوت"
  }),
  "ai.tools.pluginAnalytics": ensureAllLanguages({
    en: "Plugin Analytics",
    es: "Análisis de complementos",
    fr: "Analytique des plugins",
    de: "Plugin-Analytik",
    sv: "Pluginanalys",
    ja: "プラグイン分析",
    zh: "插件分析",
    ru: "Аналитика плагинов",
    pt: "Análise de Plugins",
    ar: "تحليلات المكونات الإضافية"
  }),
  "ai.tools.pluginAnalyticsDesc": ensureAllLanguages({
    en: "Usage analysis and recommendations for plugins",
    es: "Análisis de uso y recomendaciones para complementos",
    fr: "Analyse d'utilisation et recommandations pour les plugins",
    de: "Nutzungsanalyse und Empfehlungen für Plugins",
    sv: "Användningsanalys och rekommendationer för plugins",
    ja: "プラグインの使用状況分析と推奨事項",
    zh: "插件的使用分析和建议",
    ru: "Анализ использования и рекомендации для плагинов",
    pt: "Análise de uso e recomendações para plugins",
    ar: "تحليل الاستخدام والتوصيات للمكونات الإضافية"
  }),
  "ai.tools.bpmDetector": ensureAllLanguages({
    en: "BPM Detector",
    es: "Detector de BPM",
    fr: "Détecteur de BPM",
    de: "BPM-Detektor",
    sv: "BPM-detektor",
    ja: "BPM検出器",
    zh: "BPM检测器",
    ru: "Детектор BPM",
    pt: "Detector de BPM",
    ar: "كاشف BPM"
  }),
  "ai.tools.bpmDetectorDesc": ensureAllLanguages({
    en: "AI-powered tempo detection and analysis",
    es: "Detección y análisis de tempo impulsados por IA",
    fr: "Détection et analyse du tempo alimentées par l'IA",
    de: "KI-gestützte Tempo-Erkennung und -Analyse",
    sv: "AI-driven tempodetektering och analys",
    ja: "AI駆動のテンポ検出と分析",
    zh: "AI驱动的节奏检测和分析",
    ru: "Определение и анализ темпа на основе ИИ",
    pt: "Detecção e análise de andamento com tecnologia de IA",
    ar: "الكشف عن الإيقاع والتحليل المدعوم بالذكاء الاصطناعي"
  })
};

export default generalAITranslations;
