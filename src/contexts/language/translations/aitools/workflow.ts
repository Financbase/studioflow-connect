
import { Language } from "../../types";
import { ensureAllLanguages } from "../../utils";

const workflowTranslations: Record<string, Record<Language, string>> = {
  "ai.features.deadlineTitle": ensureAllLanguages({
    en: "Deadline Tracker",
    es: "Seguidor de Plazos",
    fr: "Suivi des Délais",
    de: "Terminverfolgung",
    sv: "Deadline-spårare",
    ja: "締め切り追跡ツール",
    zh: "截止日期追踪器",
    ru: "Отслеживание сроков",
    pt: "Rastreador de Prazos",
    ar: "متتبع المواعيد النهائية"
  }),
  
  "ai.features.deadlineDesc": ensureAllLanguages({
    en: "Manage project timelines and milestones",
    es: "Gestionar cronogramas y puntos de referencia del proyecto",
    fr: "Gérer les délais et jalons du projet",
    de: "Projektzeitpläne und Meilensteine verwalten",
    sv: "Hantera projekttidslinjer och milstolpar",
    ja: "プロジェクトのタイムラインとマイルストーンを管理",
    zh: "管理项目时间线和里程碑",
    ru: "Управление сроками и этапами проекта",
    pt: "Gerenciar cronogramas e marcos de projetos",
    ar: "إدارة الجداول الزمنية ومعالم المشروع"
  }),
  
  "ai.features.deadlineLongDesc": ensureAllLanguages({
    en: "Track all your project deadlines in one place. Our AI assistant helps you prioritize tasks and allocate resources efficiently to meet all your project timelines.",
    es: "Realice un seguimiento de todos los plazos de su proyecto en un solo lugar. Nuestro asistente de IA le ayuda a priorizar tareas y asignar recursos de manera eficiente para cumplir con todos los cronogramas del proyecto.",
    fr: "Suivez tous vos délais de projet en un seul endroit. Notre assistant IA vous aide à hiérarchiser les tâches et à allouer efficacement les ressources pour respecter tous les délais de votre projet.",
    de: "Verfolge alle deine Projektfristen an einem Ort. Unser KI-Assistent hilft dir, Aufgaben zu priorisieren und Ressourcen effizient zuzuweisen, um alle Projektfristen einzuhalten.",
    sv: "Spåra alla dina projektdeadlines på ett ställe. Vår AI-assistent hjälper dig att prioritera uppgifter och fördela resurser effektivt för att uppfylla alla dina projekttidslinjer.",
    ja: "すべてのプロジェクトの締め切りを一か所で追跡します。AIアシスタントがタスクの優先順位付けとリソースの効率的な配分を支援し、すべてのプロジェクトのタイムラインを満たします。",
    zh: "在一个地方跟踪所有项目截止日期。我们的AI助手帮助您有效地确定任务优先级并分配资源，以满足所有项目时间表。",
    ru: "Отслеживайте все сроки проекта в одном месте. Наш ИИ-помощник помогает вам расставлять приоритеты задач и эффективно распределять ресурсы для соблюдения всех сроков проекта.",
    pt: "Acompanhe todos os prazos do seu projeto em um só lugar. Nosso assistente de IA ajuda você a priorizar tarefas e alocar recursos com eficiência para cumprir todos os cronogramas do projeto.",
    ar: "تتبع جميع مواعيد مشروعك النهائية في مكان واحد. يساعدك مساعد الذكاء الاصطناعي على تحديد أولويات المهام وتخصيص الموارد بكفاءة لتلبية جميع الجداول الزمنية لمشروعك."
  }),
  
  "ai.features.deadlineFeature1": ensureAllLanguages({
    en: "Intelligent deadline prediction based on project complexity",
    es: "Predicción inteligente de plazos basada en la complejidad del proyecto",
    fr: "Prédiction intelligente des délais basée sur la complexité du projet",
    de: "Intelligente Fristvorhersage basierend auf der Projektkomplexität",
    sv: "Intelligent deadline-förutsägelse baserad på projektkomplexitet",
    ja: "プロジェクトの複雑さに基づくインテリジェントな締め切り予測",
    zh: "基于项目复杂性的智能截止日期预测",
    ru: "Интеллектуальное прогнозирование сроков на основе сложности проекта",
    pt: "Previsão inteligente de prazos com base na complexidade do projeto",
    ar: "تنبؤ ذكي بالمواعيد النهائية بناءً على تعقيد المشروع"
  }),
  
  "ai.features.deadlineFeature2": ensureAllLanguages({
    en: "Automatic resource allocation suggestions to meet tight deadlines",
    es: "Sugerencias automáticas de asignación de recursos para cumplir con plazos ajustados",
    fr: "Suggestions automatiques d'allocation des ressources pour respecter les délais serrés",
    de: "Automatische Ressourcenzuweisungsvorschläge zur Einhaltung enger Fristen",
    sv: "Automatiska förslag på resursallokering för att möta snäva deadlines",
    ja: "厳しい締め切りを守るための自動リソース割り当て提案",
    zh: "自动资源分配建议，以满足紧张的截止日期",
    ru: "Автоматические предложения по распределению ресурсов для соблюдения жестких сроков",
    pt: "Sugestões automáticas de alocação de recursos para cumprir prazos apertados",
    ar: "اقتراحات تخصيص الموارد التلقائية لتلبية المواعيد النهائية الضيقة"
  }),
  
  "ai.features.deadlineFeature3": ensureAllLanguages({
    en: "Risk analysis and early warning system for potential delays",
    es: "Análisis de riesgos y sistema de alerta temprana para posibles retrasos",
    fr: "Analyse des risques et système d'alerte précoce pour les retards potentiels",
    de: "Risikoanalyse und Frühwarnsystem für potenzielle Verzögerungen",
    sv: "Riskanalys och förvarningssystem för potentiella förseningar",
    ja: "潜在的な遅延のためのリスク分析と早期警告システム",
    zh: "风险分析和潜在延迟的预警系统",
    ru: "Анализ рисков и система раннего предупреждения о возможных задержках",
    pt: "Análise de risco e sistema de alerta antecipado para possíveis atrasos",
    ar: "تحليل المخاطر ونظام الإنذار المبكر للتأخيرات المحتملة"
  }),
  
  "ai.viewProjects": ensureAllLanguages({
    en: "View Projects",
    es: "Ver Proyectos",
    fr: "Voir les Projets",
    de: "Projekte Anzeigen",
    sv: "Visa Projekt",
    ja: "プロジェクトを表示",
    zh: "查看项目",
    ru: "Просмотр Проектов",
    pt: "Ver Projetos",
    ar: "عرض المشاريع"
  }),
  
  "ai.runAnalysis": ensureAllLanguages({
    en: "Run Analysis",
    es: "Ejecutar Análisis",
    fr: "Lancer l'Analyse",
    de: "Analyse Starten",
    sv: "Kör Analys",
    ja: "分析を実行",
    zh: "运行分析",
    ru: "Запустить Анализ",
    pt: "Executar Análise",
    ar: "تشغيل التحليل"
  }),
  
  // Add other workflow related translations here
  "ai.tools.projectTemplates": ensureAllLanguages({
    en: "Project Templates",
    es: "Plantillas de Proyectos",
    fr: "Modèles de Projets",
    de: "Projektvorlagen",
    sv: "Projektmallar",
    ja: "プロジェクトテンプレート",
    zh: "项目模板",
    ru: "Шаблоны проектов",
    pt: "Modelos de Projetos",
    ar: "قوالب المشاريع"
  }),
  "ai.tools.projectTemplatesDesc": ensureAllLanguages({
    en: "Start from pre-configured layouts",
    es: "Comience desde diseños preconfigurados",
    fr: "Démarrer à partir de mises en page préconfigurées",
    de: "Starten Sie mit vorkonfigurierten Layouts",
    sv: "Börja från förkonfigurerade layouter",
    ja: "事前構成されたレイアウトから開始",
    zh: "从预配置的布局开始",
    ru: "Начать с предварительно настроенных макетов",
    pt: "Comece com layouts pré-configurados",
    ar: "ابدأ من تخطيطات معدة مسبقًا"
  }),
  "ai.tools.signalFlow": ensureAllLanguages({
    en: "Signal Flow",
    es: "Flujo de Señal",
    fr: "Flux de Signal",
    de: "Signalfluss",
    sv: "Signalflöde",
    ja: "シグナルフロー",
    zh: "信号流",
    ru: "Поток сигнала",
    pt: "Fluxo de Sinal",
    ar: "تدفق الإشارة"
  }),
  "ai.tools.signalFlowDesc": ensureAllLanguages({
    en: "Optimize audio signal routing",
    es: "Optimizar el enrutamiento de señales de audio",
    fr: "Optimiser le routage du signal audio",
    de: "Optimieren Sie die Audio-Signalführung",
    sv: "Optimera ljudsignalrutning",
    ja: "オーディオ信号ルーティングを最適化",
    zh: "优化音频信号路由",
    ru: "Оптимизация маршрутизации аудиосигнала",
    pt: "Otimizar roteamento de sinal de áudio",
    ar: "تحسين توجيه إشارة الصوت"
  }),
  "ai.tools.referenceLibrary": ensureAllLanguages({
    en: "Reference Library",
    es: "Biblioteca de Referencia",
    fr: "Bibliothèque de Référence",
    de: "Referenzbibliothek",
    sv: "Referensbibliotek",
    ja: "リファレンスライブラリ",
    zh: "参考库",
    ru: "Справочная библиотека",
    pt: "Biblioteca de Referência",
    ar: "مكتبة المراجع"
  }),
  "ai.tools.referenceLibraryDesc": ensureAllLanguages({
    en: "Store and analyze reference tracks",
    es: "Almacenar y analizar pistas de referencia",
    fr: "Stocker et analyser les pistes de référence",
    de: "Speichern und analysieren Sie Referenztracks",
    sv: "Lagra och analysera referensspår",
    ja: "リファレンストラックを保存して分析",
    zh: "存储和分析参考轨道",
    ru: "Хранение и анализ эталонных треков",
    pt: "Armazenar e analisar faixas de referência",
    ar: "تخزين وتحليل المسارات المرجعية"
  }),
  "ai.tools.autoDocumentation": ensureAllLanguages({
    en: "Auto Documentation",
    es: "Documentación Automática",
    fr: "Documentation Automatique",
    de: "Automatische Dokumentation",
    sv: "Automatisk Dokumentation",
    ja: "自動ドキュメント",
    zh: "自动文档",
    ru: "Автодокументация",
    pt: "Documentação Automática",
    ar: "التوثيق التلقائي"
  }),
  "ai.tools.autoDocumentationDesc": ensureAllLanguages({
    en: "Generate session notes automatically",
    es: "Generar notas de sesión automáticamente",
    fr: "Générer automatiquement des notes de session",
    de: "Generieren Sie Sitzungsnotizen automatisch",
    sv: "Generera sessionsanteckningar automatiskt",
    ja: "セッションノートを自動的に生成",
    zh: "自动生成会话笔记",
    ru: "Автоматическое создание заметок о сеансе",
    pt: "Gerar notas de sessão automaticamente",
    ar: "إنشاء ملاحظات الجلسة تلقائيًا"
  }),
  "ai.tools.deadlineTracker": ensureAllLanguages({
    en: "Deadline Tracker",
    es: "Seguidor de Plazos",
    fr: "Suivi des Délais",
    de: "Terminverfolgung",
    sv: "Deadline-spårare",
    ja: "締め切り追跡ツール",
    zh: "截止日期追踪器",
    ru: "Отслеживание сроков",
    pt: "Rastreador de Prazos",
    ar: "متتبع المواعيد النهائية"
  }),
  "ai.tools.deadlineTrackerDesc": ensureAllLanguages({
    en: "Manage project timelines efficiently",
    es: "Gestionar cronogramas de proyectos eficientemente",
    fr: "Gérer efficacement les délais des projets",
    de: "Verwalten Sie Projektzeitpläne effizient",
    sv: "Hantera projekttidslinjer effektivt",
    ja: "プロジェクトのタイムラインを効率的に管理",
    zh: "高效管理项目时间线",
    ru: "Эффективное управление сроками проекта",
    pt: "Gerenciar cronogramas de projetos com eficiência",
    ar: "إدارة الجداول الزمنية للمشاريع بكفاءة"
  }),
  "ai.tools.clientFeedback": ensureAllLanguages({
    en: "Client Feedback",
    es: "Retroalimentación del Cliente",
    fr: "Retour Client",
    de: "Kunden-Feedback",
    sv: "Klientfeedback",
    ja: "クライアントフィードバック",
    zh: "客户反馈",
    ru: "Обратная связь с клиентом",
    pt: "Feedback do Cliente",
    ar: "تعليقات العملاء"
  }),
  "ai.tools.clientFeedbackDesc": ensureAllLanguages({
    en: "Streamline revision process",
    es: "Optimizar el proceso de revisión",
    fr: "Rationaliser le processus de révision",
    de: "Rationalisieren Sie den Revisionsprozess",
    sv: "Effektivisera revisionsprocessen",
    ja: "改訂プロセスを合理化",
    zh: "简化修订过程",
    ru: "Упростите процесс пересмотра",
    pt: "Simplifique o processo de revisão",
    ar: "تبسيط عملية المراجعة"
  }),
  "ai.tools.timeTracker": ensureAllLanguages({
    en: "Time Tracker",
    es: "Seguidor de Tiempo",
    fr: "Suivi du Temps",
    de: "Zeiterfassung",
    sv: "Tidsspårare",
    ja: "タイムトラッカー",
    zh: "时间追踪器",
    ru: "Учет времени",
    pt: "Rastreador de Tempo",
    ar: "متتبع الوقت"
  }),
  "ai.tools.timeTrackerDesc": ensureAllLanguages({
    en: "Log hours and calculate billing",
    es: "Registrar horas y calcular facturación",
    fr: "Enregistrer les heures et calculer la facturation",
    de: "Protokollieren Sie Stunden und berechnen Sie die Abrechnung",
    sv: "Logga timmar och beräkna fakturering",
    ja: "時間を記録し、請求を計算",
    zh: "记录时间并计算账单",
    ru: "Регистрируйте часы и рассчитывайте счета",
    pt: "Registre horas e calcule cobranças",
    ar: "تسجيل الساعات وحساب الفواتير"
  }),
  "ai.tools.backupManager": ensureAllLanguages({
    en: "Backup Manager",
    es: "Administrador de Copias de Seguridad",
    fr: "Gestionnaire de Sauvegarde",
    de: "Backup-Manager",
    sv: "Säkerhetskopieringshanterare",
    ja: "バックアップマネージャー",
    zh: "备份管理器",
    ru: "Менеджер резервного копирования",
    pt: "Gerenciador de Backup",
    ar: "مدير النسخ الاحتياطي"
  }),
  "ai.tools.backupManagerDesc": ensureAllLanguages({
    en: "Automate project backups",
    es: "Automatizar copias de seguridad de proyectos",
    fr: "Automatiser les sauvegardes de projets",
    de: "Automatisieren Sie Projekt-Backups",
    sv: "Automatisera projektsäkerhetskopior",
    ja: "プロジェクトのバックアップを自動化",
    zh: "自动化项目备份",
    ru: "Автоматизация резервного копирования проекта",
    pt: "Automatizar backups de projetos",
    ar: "أتمتة النسخ الاحتياطية للمشاريع"
  }),
  "ai.tools.resourceMonitor": ensureAllLanguages({
    en: "Resource Monitor",
    es: "Monitor de Recursos",
    fr: "Moniteur de Ressources",
    de: "Ressourcenmonitor",
    sv: "Resursövervakare",
    ja: "リソースモニター",
    zh: "资源监视器",
    ru: "Монитор ресурсов",
    pt: "Monitor de Recursos",
    ar: "مراقب الموارد"
  }),
  "ai.tools.resourceMonitorDesc": ensureAllLanguages({
    en: "Track CPU, RAM, and disk usage",
    es: "Seguimiento de uso de CPU, RAM y disco",
    fr: "Suivre l'utilisation du CPU, de la RAM et du disque",
    de: "Verfolgen Sie CPU-, RAM- und Festplattennutzung",
    sv: "Spåra CPU-, RAM- och diskanvändning",
    ja: "CPU、RAM、ディスク使用量を追跡",
    zh: "跟踪CPU、RAM和磁盘使用情况",
    ru: "Отслеживание использования ЦП, ОЗУ и диска",
    pt: "Rastrear uso de CPU, RAM e disco",
    ar: "تتبع استخدام وحدة المعالجة المركزية والذاكرة والقرص"
  }),
  "ai.tools.equipmentScanner": ensureAllLanguages({
    en: "Equipment Scanner",
    es: "Escáner de Equipos",
    fr: "Scanner d'Équipement",
    de: "Ausrüstungsscanner",
    sv: "Utrustningsscanner",
    ja: "機器スキャナー",
    zh: "设备扫描仪",
    ru: "Сканер оборудования",
    pt: "Scanner de Equipamentos",
    ar: "ماسح المعدات"
  }),
  "ai.tools.equipmentScannerDesc": ensureAllLanguages({
    en: "Identify and optimize gear setups",
    es: "Identificar y optimizar configuraciones de equipo",
    fr: "Identifier et optimiser les configurations d'équipement",
    de: "Identifizieren und optimieren Sie Geräteeinstellungen",
    sv: "Identifiera och optimera utrustningsuppsättningar",
    ja: "機器のセットアップを特定して最適化",
    zh: "识别和优化设备设置",
    ru: "Определение и оптимизация настроек оборудования",
    pt: "Identificar e otimizar configurações de equipamentos",
    ar: "تحديد وتحسين إعدادات المعدات"
  }),
  "ai.tools.pluginAnalytics": ensureAllLanguages({
    en: "Plugin Analytics",
    es: "Análisis de Complementos",
    fr: "Analytique des Plugins",
    de: "Plugin-Analytik",
    sv: "Plugin-analys",
    ja: "プラグイン分析",
    zh: "插件分析",
    ru: "Аналитика плагинов",
    pt: "Análise de Plugins",
    ar: "تحليلات المكونات الإضافية"
  }),
  "ai.tools.pluginAnalyticsDesc": ensureAllLanguages({
    en: "Usage stats for plugins and effects",
    es: "Estadísticas de uso para complementos y efectos",
    fr: "Statistiques d'utilisation pour les plugins et effets",
    de: "Nutzungsstatistiken für Plugins und Effekte",
    sv: "Användningsstatistik för plugins och effekter",
    ja: "プラグインとエフェクトの使用統計",
    zh: "插件和效果的使用统计",
    ru: "Статистика использования плагинов и эффектов",
    pt: "Estatísticas de uso para plugins e efeitos",
    ar: "إحصاءات الاستخدام للمكونات الإضافية والتأثيرات"
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
    en: "Auto-detect tempo and rhythm patterns",
    es: "Detección automática de patrones de tempo y ritmo",
    fr: "Détection automatique du tempo et des motifs rythmiques",
    de: "Automatische Erkennung von Tempo- und Rhythmusmustern",
    sv: "Automatisk detektering av tempo- och rytmmönster",
    ja: "テンポとリズムパターンを自動検出",
    zh: "自动检测节奏和律动模式",
    ru: "Автоматическое определение темпа и ритмических паттернов",
    pt: "Detecção automática de tempo e padrões rítmicos",
    ar: "الكشف التلقائي عن أنماط الإيقاع والوزن"
  })
};

export default workflowTranslations;
