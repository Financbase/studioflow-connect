
import { Language } from "../types";
import { ensureAllLanguages } from "../utils";

const aiToolsTranslations: Record<string, Record<Language, string>> = {
  // Main AITools component translations
  "ai.title": ensureAllLanguages({
    en: "AI Tools",
    es: "Herramientas de IA",
    fr: "Outils d'IA",
    de: "KI-Werkzeuge",
    sv: "AI-verktyg",
    ja: "AIツール",
    zh: "AI工具",
    ru: "Инструменты ИИ",
    pt: "Ferramentas de IA",
    ar: "أدوات الذكاء الاصطناعي"
  }),
  "ai.subtitle": ensureAllLanguages({
    en: "Enhance your workflow with AI-powered tools",
    es: "Mejora tu flujo de trabajo con herramientas impulsadas por IA",
    fr: "Améliorez votre flux de travail avec des outils alimentés par l'IA",
    de: "Verbessern Sie Ihren Workflow mit KI-gestützten Tools",
    sv: "Förbättra ditt arbetsflöde med AI-drivna verktyg",
    ja: "AIを活用したツールでワークフローを強化",
    zh: "用AI驱动的工具增强您的工作流程",
    ru: "Улучшите свой рабочий процесс с помощью инструментов на базе ИИ",
    pt: "Aprimore seu fluxo de trabalho com ferramentas baseadas em IA",
    ar: "تعزيز سير عملك باستخدام أدوات مدعومة بالذكاء الاصطناعي"
  }),
  
  // Workflow Assistant
  "ai.workflowAssistant": ensureAllLanguages({
    en: "AI Workflow Assistant",
    es: "Asistente de Flujo de Trabajo IA",
    fr: "Assistant de Flux de Travail IA",
    de: "KI-Workflow-Assistent",
    sv: "AI-arbetsflödesassistent",
    ja: "AIワークフローアシスタント",
    zh: "AI工作流助手",
    ru: "ИИ-ассистент рабочего процесса",
    pt: "Assistente de Fluxo de Trabalho com IA",
    ar: "مساعد سير العمل بالذكاء الاصطناعي"
  }),
  "ai.workflowDescription": ensureAllLanguages({
    en: "AI-powered tools to organize and optimize your production workflow without affecting your creative output.",
    es: "Herramientas basadas en IA para organizar y optimizar tu flujo de trabajo de producción sin afectar tu salida creativa.",
    fr: "Outils alimentés par l'IA pour organiser et optimiser votre flux de travail de production sans affecter votre création.",
    de: "KI-gestützte Tools zur Organisation und Optimierung Ihres Produktionsablaufs ohne Beeinflussung Ihrer kreativen Ergebnisse.",
    sv: "AI-drivna verktyg för att organisera och optimera ditt produktionsflöde utan att påverka ditt kreativa arbete.",
    ja: "あなたの創造的な出力に影響を与えることなく、制作ワークフローを整理および最適化するためのAI駆動ツール。",
    zh: "AI驱动的工具，在不影响您的创意输出的情况下组织和优化您的制作工作流程。",
    ru: "Инструменты на базе ИИ для организации и оптимизации рабочего процесса без влияния на ваш творческий результат.",
    pt: "Ferramentas baseadas em IA para organizar e otimizar seu fluxo de trabalho de produção sem afetar sua produção criativa.",
    ar: "أدوات مدعومة بالذكاء الاصطناعي لتنظيم وتحسين سير عمل الإنتاج دون التأثير على المخرجات الإبداعية."
  }),
  
  // Tab names
  "ai.tabs.organization": ensureAllLanguages({
    en: "Organization",
    es: "Organización",
    fr: "Organisation",
    de: "Organisation",
    sv: "Organisation",
    ja: "整理",
    zh: "组织",
    ru: "Организация",
    pt: "Organização",
    ar: "التنظيم"
  }),
  "ai.tabs.templates": ensureAllLanguages({
    en: "Templates",
    es: "Plantillas",
    fr: "Modèles",
    de: "Vorlagen",
    sv: "Mallar",
    ja: "テンプレート",
    zh: "模板",
    ru: "Шаблоны",
    pt: "Modelos",
    ar: "القوالب"
  }),
  "ai.tabs.projectManagement": ensureAllLanguages({
    en: "Project Management",
    es: "Gestión de Proyectos",
    fr: "Gestion de Projet",
    de: "Projektmanagement",
    sv: "Projekthantering",
    ja: "プロジェクト管理",
    zh: "项目管理",
    ru: "Управление проектами",
    pt: "Gerenciamento de Projetos",
    ar: "إدارة المشاريع"
  }),
  "ai.tabs.studioTools": ensureAllLanguages({
    en: "Studio Tools",
    es: "Herramientas de Estudio",
    fr: "Outils de Studio",
    de: "Studio-Werkzeuge",
    sv: "Studioverktyg",
    ja: "スタジオツール",
    zh: "工作室工具",
    ru: "Студийные инструменты",
    pt: "Ferramentas de Estúdio",
    ar: "أدوات الاستوديو"
  }),
  
  // Tool names and descriptions
  "ai.tools.sampleOrganizer": ensureAllLanguages({
    en: "Sample Organizer",
    es: "Organizador de Muestras",
    fr: "Organiseur d'Échantillons",
    de: "Sample-Organizer",
    sv: "Samplingsorganisatör",
    ja: "サンプル整理ツール",
    zh: "样本整理器",
    ru: "Органайзер сэмплов",
    pt: "Organizador de Amostras",
    ar: "منظم العينات"
  }),
  "ai.tools.sampleOrganizerDesc": ensureAllLanguages({
    en: "Automatically categorize and tag sample libraries by instrument, genre, and character",
    es: "Categoriza y etiqueta automáticamente bibliotecas de muestras por instrumento, género y carácter",
    fr: "Catégoriser et étiqueter automatiquement les bibliothèques d'échantillons par instrument, genre et caractère",
    de: "Automatische Kategorisierung und Kennzeichnung von Sample-Bibliotheken nach Instrument, Genre und Charakter",
    sv: "Kategorisera och tagga samplingsbibliotek automatiskt efter instrument, genre och karaktär",
    ja: "楽器、ジャンル、特性別にサンプルライブラリを自動的に分類およびタグ付け",
    zh: "按乐器、流派和特性自动分类和标记样本库",
    ru: "Автоматическая категоризация и маркировка библиотек сэмплов по инструментам, жанрам и характеру",
    pt: "Categorize e marque bibliotecas de amostras automaticamente por instrumento, gênero e caráter",
    ar: "تصنيف ووسم مكتبات العينات تلقائيًا حسب الآلة والنوع والطابع"
  }),
  "ai.tools.patternCategorizer": ensureAllLanguages({
    en: "Drum Pattern Categorizer",
    es: "Categorizador de Patrones de Batería",
    fr: "Catégoriseur de Motifs de Batterie",
    de: "Drum-Pattern-Kategorisierer",
    sv: "Trummönsterkategoriserare",
    ja: "ドラムパターン分類ツール",
    zh: "鼓点模式分类器",
    ru: "Категоризатор барабанных паттернов",
    pt: "Categorizador de Padrões de Bateria",
    ar: "مصنف أنماط الطبول"
  }),
  "ai.tools.patternCategorizerDesc": ensureAllLanguages({
    en: "Identify and categorize drum patterns by genre, BPM, and complexity",
    es: "Identifica y categoriza patrones de batería por género, BPM y complejidad",
    fr: "Identifier et catégoriser les motifs de batterie par genre, BPM et complexité",
    de: "Identifizierung und Kategorisierung von Drumpatterns nach Genre, BPM und Komplexität",
    sv: "Identifiera och kategorisera trummönster efter genre, BPM och komplexitet",
    ja: "ジャンル、BPM、複雑さによってドラムパターンを識別および分類",
    zh: "按流派、BPM和复杂度识别和分类鼓点模式",
    ru: "Идентификация и категоризация барабанных паттернов по жанру, BPM и сложности",
    pt: "Identifique e categorize padrões de bateria por gênero, BPM e complexidade",
    ar: "تحديد وتصنيف أنماط الطبول حسب النوع والإيقاع والتعقيد"
  }),
  "ai.tools.smartTagging": ensureAllLanguages({
    en: "Smart Tagging",
    es: "Etiquetado Inteligente",
    fr: "Étiquetage Intelligent",
    de: "Intelligentes Tagging",
    sv: "Smart taggning",
    ja: "スマートタグ付け",
    zh: "智能标记",
    ru: "Умная маркировка",
    pt: "Marcação Inteligente",
    ar: "الوسم الذكي"
  }),
  "ai.tools.smartTaggingDesc": ensureAllLanguages({
    en: "Automatically generate consistent tags and metadata across your entire library",
    es: "Genera automáticamente etiquetas y metadatos consistentes en toda tu biblioteca",
    fr: "Générer automatiquement des étiquettes et des métadonnées cohérentes dans toute votre bibliothèque",
    de: "Automatische Generierung konsistenter Tags und Metadaten für Ihre gesamte Bibliothek",
    sv: "Generera automatiskt konsekventa taggar och metadata i hela ditt bibliotek",
    ja: "ライブラリ全体で一貫したタグとメタデータを自動的に生成",
    zh: "在整个库中自动生成一致的标签和元数据",
    ru: "Автоматическое создание согласованных тегов и метаданных во всей библиотеке",
    pt: "Gere automaticamente tags e metadados consistentes em toda sua biblioteca",
    ar: "إنشاء وسوم وبيانات وصفية متسقة تلقائيًا عبر المكتبة بأكملها"
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
    pt: "Planejador de Sessão",
    ar: "مخطط الجلسات"
  }),
  "ai.tools.sessionPlannerDesc": ensureAllLanguages({
    en: "Optimize your studio time with intelligent session planning and reminders",
    es: "Optimiza tu tiempo de estudio con planificación inteligente de sesiones y recordatorios",
    fr: "Optimisez votre temps de studio avec une planification de session intelligente et des rappels",
    de: "Optimieren Sie Ihre Studiozeit mit intelligenter Sitzungsplanung und Erinnerungen",
    sv: "Optimera din studiotid med intelligent sessionsplanering och påminnelser",
    ja: "インテリジェントなセッション計画とリマインダーでスタジオ時間を最適化",
    zh: "通过智能会话规划和提醒优化您的工作室时间",
    ru: "Оптимизируйте время в студии с помощью интеллектуального планирования сессий и напоминаний",
    pt: "Otimize seu tempo de estúdio com planejamento de sessão inteligente e lembretes",
    ar: "تحسين وقت الاستوديو مع تخطيط ذكي للجلسات وتذكيرات"
  }),
  
  // More tools in other tabs
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
    en: "Pre-configured session templates for mixing, tracking, mastering, and other workflows",
    es: "Plantillas de sesión preconfiguradas para mezcla, grabación, masterización y otros flujos de trabajo",
    fr: "Modèles de session préconfigurés pour le mixage, l'enregistrement, le mastering et autres flux de travail",
    de: "Vorkonfigurierte Sitzungsvorlagen für Mixing, Tracking, Mastering und andere Workflows",
    sv: "Förkonfigurerade sessionsmallar för mixning, inspelning, mastering och andra arbetsflöden",
    ja: "ミキシング、トラッキング、マスタリングなどのワークフロー用の事前設定されたセッションテンプレート",
    zh: "混音、录音、母带处理和其他工作流程的预配置会话模板",
    ru: "Предварительно настроенные шаблоны сессий для микширования, записи, мастеринга и других рабочих процессов",
    pt: "Modelos de sessão pré-configurados para mixagem, gravação, masterização e outros fluxos de trabalho",
    ar: "قوالب جلسات معدة مسبقًا للمزج والتسجيل والمعالجة النهائية وسير العمل الأخرى"
  }),
  "ai.tools.signalFlow": ensureAllLanguages({
    en: "Signal Flow Visualizer",
    es: "Visualizador de Flujo de Señal",
    fr: "Visualiseur de Flux de Signal",
    de: "Signalfluss-Visualisierer",
    sv: "Signalflödesvisualiserare",
    ja: "シグナルフロービジュアライザ",
    zh: "信号流可视化器",
    ru: "Визуализатор потока сигнала",
    pt: "Visualizador de Fluxo de Sinal",
    ar: "عارض تدفق الإشارة"
  }),
  "ai.tools.signalFlowDesc": ensureAllLanguages({
    en: "Create and save routing diagrams of complex signal paths for future reference",
    es: "Crea y guarda diagramas de enrutamiento de rutas de señales complejas para referencia futura",
    fr: "Créer et sauvegarder des diagrammes de routage de chemins de signaux complexes pour référence future",
    de: "Erstellung und Speicherung von Routing-Diagrammen komplexer Signalpfade für zukünftige Referenzen",
    sv: "Skapa och spara routingdiagram för komplexa signalvägar för framtida referens",
    ja: "将来の参照のために複雑な信号経路のルーティング図を作成して保存",
    zh: "创建并保存复杂信号路径的路由图以供将来参考",
    ru: "Создание и сохранение схем маршрутизации сложных сигнальных путей для будущих ссылок",
    pt: "Crie e salve diagramas de roteamento de caminhos de sinal complexos para referência futura",
    ar: "إنشاء وحفظ مخططات التوجيه لمسارات الإشارة المعقدة للرجوع إليها في المستقبل"
  }),
  
  // Actions and UI elements
  "ai.activated": ensureAllLanguages({
    en: "activated",
    es: "activado",
    fr: "activé",
    de: "aktiviert",
    sv: "aktiverad",
    ja: "が有効化されました",
    zh: "已激活",
    ru: "активирован",
    pt: "ativado",
    ar: "تم تفعيله"
  }),
  "ai.workflowStarted": ensureAllLanguages({
    en: "AI workflow assistance has started. This feature is a placeholder.",
    es: "La asistencia del flujo de trabajo de IA ha comenzado. Esta función es provisional.",
    fr: "L'assistance au flux de travail IA a commencé. Cette fonctionnalité est un espace réservé.",
    de: "KI-Workflow-Unterstützung wurde gestartet. Diese Funktion ist ein Platzhalter.",
    sv: "AI-arbetsflödesassistans har startat. Denna funktion är en platshållare.",
    ja: "AIワークフローアシスタンスが開始されました。この機能はプレースホルダーです。",
    zh: "AI工作流程辅助已启动。此功能是一个占位符。",
    ru: "Помощь ИИ-рабочего процесса запущена. Эта функция является заполнителем.",
    pt: "A assistência de fluxo de trabalho com IA começou. Este recurso é um espaço reservado.",
    ar: "بدأت مساعدة سير العمل بالذكاء الاصطناعي. هذه الميزة هي مجرد عنصر نائب."
  }),
  "ai.philosophyTitle": ensureAllLanguages({
    en: "AI Workflow Assistant Philosophy",
    es: "Filosofía del Asistente de Flujo de Trabajo de IA",
    fr: "Philosophie de l'Assistant de Flux de Travail IA",
    de: "Philosophie des KI-Workflow-Assistenten",
    sv: "AI-arbetsflödesassistentens filosofi",
    ja: "AIワークフローアシスタントの理念",
    zh: "AI工作流助手理念",
    ru: "Философия ИИ-ассистента рабочего процесса",
    pt: "Filosofia do Assistente de Fluxo de Trabalho com IA",
    ar: "فلسفة مساعد سير العمل بالذكاء الاصطناعي"
  }),
  "ai.philosophyDescription": ensureAllLanguages({
    en: "Our AI tools focus solely on workflow optimization - organizing samples, categorizing content, and planning sessions. These tools never modify your audio or creative content, preserving your artistic vision while eliminating tedious organization tasks.",
    es: "Nuestras herramientas de IA se centran únicamente en la optimización del flujo de trabajo: organizar muestras, categorizar contenido y planificar sesiones. Estas herramientas nunca modifican tu audio o contenido creativo, preservando tu visión artística mientras eliminan tareas tediosas de organización.",
    fr: "Nos outils d'IA se concentrent uniquement sur l'optimisation du flux de travail - organisation d'échantillons, catégorisation de contenu et planification de sessions. Ces outils ne modifient jamais votre audio ou contenu créatif, préservant votre vision artistique tout en éliminant les tâches d'organisation fastidieuses.",
    de: "Unsere KI-Tools konzentrieren sich ausschließlich auf die Workflow-Optimierung - Organisation von Samples, Kategorisierung von Inhalten und Planung von Sitzungen. Diese Tools ändern niemals Ihre Audio- oder kreativen Inhalte und bewahren Ihre künstlerische Vision, während mühsame Organisationsaufgaben eliminiert werden.",
    sv: "Våra AI-verktyg fokuserar enbart på arbetsflödesoptimering – att organisera samplar, kategorisera innehåll och planera sessioner. Dessa verktyg ändrar aldrig ditt ljud eller kreativa innehåll, bevarar din konstnärliga vision samtidigt som de eliminerar tråkiga organisationsuppgifter.",
    ja: "当社のAIツールは、サンプルの整理、コンテンツの分類、セッションの計画など、ワークフロー最適化のみに焦点を当てています。これらのツールは、あなたのオーディオや創造的なコンテンツを決して変更せず、退屈な整理タスクを排除しながらあなたの芸術的なビジョンを保持します。",
    zh: "我们的AI工具仅专注于工作流程优化 - 组织样本、分类内容和规划会话。这些工具永远不会修改您的音频或创意内容，在消除繁琐的组织任务的同时保留您的艺术愿景。",
    ru: "Наши инструменты ИИ сосредоточены исключительно на оптимизации рабочего процесса - организации образцов, категоризации контента и планировании сессий. Эти инструменты никогда не изменяют ваш аудио или творческий контент, сохраняя ваше художественное видение и устраняя утомительные задачи по организации.",
    pt: "Nossas ferramentas de IA focam exclusivamente na otimização do fluxo de trabalho - organizando amostras, categorizando conteúdo e planejando sessões. Essas ferramentas nunca modificam seu áudio ou conteúdo criativo, preservando sua visão artística enquanto eliminam tarefas tediosas de organização.",
    ar: "تركز أدوات الذكاء الاصطناعي لدينا فقط على تحسين سير العمل - تنظيم العينات وتصنيف المحتوى وتخطيط الجلسات. لا تقوم هذه الأدوات أبدًا بتعديل الصوت أو المحتوى الإبداعي الخاص بك، مع الحفاظ على رؤيتك الفنية أثناء القضاء على مهام التنظيم المملة."
  }),
  
  // Additional translations needed to support AITools.tsx
  "ai.viewHistory": ensureAllLanguages({
    en: "View Assistant History",
    es: "Ver Historial del Asistente",
    fr: "Voir l'Historique de l'Assistant",
    de: "Assistenten-Verlauf anzeigen",
    sv: "Visa assistenthistorik",
    ja: "アシスタント履歴を表示",
    zh: "查看助手历史",
    ru: "Просмотр истории ассистента",
    pt: "Ver Histórico do Assistente",
    ar: "عرض سجل المساعد"
  }),
  "ai.startBatch": ensureAllLanguages({
    en: "Start Batch Organization",
    es: "Iniciar Organización por Lotes",
    fr: "Démarrer l'Organisation par Lots",
    de: "Batch-Organisation starten",
    sv: "Starta batch-organisation",
    ja: "バッチ整理を開始",
    zh: "开始批量组织",
    ru: "Начать пакетную организацию",
    pt: "Iniciar Organização em Lote",
    ar: "بدء التنظيم الدفعي"
  }),
  
  // Feature showcase translations
  "ai.features.templatesTitle": ensureAllLanguages({
    en: "Project Templates Library",
    es: "Biblioteca de Plantillas de Proyectos",
    fr: "Bibliothèque de Modèles de Projets",
    de: "Projektvorlagen-Bibliothek",
    sv: "Projektmallsbibliotek",
    ja: "プロジェクトテンプレートライブラリ",
    zh: "项目模板库",
    ru: "Библиотека шаблонов проектов",
    pt: "Biblioteca de Modelos de Projetos",
    ar: "مكتبة قوالب المشاريع"
  }),
  "ai.features.templatesDesc": ensureAllLanguages({
    en: "Start new projects faster with intelligent templates that adapt to your workflow.",
    es: "Inicia nuevos proyectos más rápido con plantillas inteligentes que se adaptan a tu flujo de trabajo.",
    fr: "Démarrez de nouveaux projets plus rapidement avec des modèles intelligents qui s'adaptent à votre flux de travail.",
    de: "Starten Sie neue Projekte schneller mit intelligenten Vorlagen, die sich an Ihren Workflow anpassen.",
    sv: "Starta nya projekt snabbare med intelligenta mallar som anpassar sig till ditt arbetsflöde.",
    ja: "あなたのワークフローに適応するインテリジェントなテンプレートで、新しいプロジェクトをより速く開始します。",
    zh: "使用适应您工作流程的智能模板，更快地启动新项目。",
    ru: "Начинайте новые проекты быстрее с помощью интеллектуальных шаблонов, которые адаптируются к вашему рабочему процессу.",
    pt: "Inicie novos projetos mais rapidamente com modelos inteligentes que se adaptam ao seu fluxo de trabalho.",
    ar: "ابدأ مشاريع جديدة بشكل أسرع باستخدام قوالب ذكية تتكيف مع سير عملك."
  }),
  "ai.features.templatesLongDesc": ensureAllLanguages({
    en: "Our AI-powered Project Templates Library analyzes your most successful workflows and creates optimized templates for different production scenarios. Each template includes:",
    es: "Nuestra Biblioteca de Plantillas de Proyectos potenciada por IA analiza tus flujos de trabajo más exitosos y crea plantillas optimizadas para diferentes escenarios de producción. Cada plantilla incluye:",
    fr: "Notre Bibliothèque de Modèles de Projets alimentée par l'IA analyse vos flux de travail les plus réussis et crée des modèles optimisés pour différents scénarios de production. Chaque modèle comprend :",
    de: "Unsere KI-gestützte Projektvorlagen-Bibliothek analysiert Ihre erfolgreichsten Workflows und erstellt optimierte Vorlagen für verschiedene Produktionsszenarien. Jede Vorlage enthält:",
    sv: "Vårt AI-drivna projektmallsbibliotek analyserar dina mest framgångsrika arbetsflöden och skapar optimerade mallar för olika produktionsscenarier. Varje mall inkluderar:",
    ja: "当社のAI駆動プロジェクトテンプレートライブラリーは、あなたの最も成功したワークフローを分析し、さまざまな制作シナリオに最適化されたテンプレートを作成します。各テンプレートには以下が含まれます：",
    zh: "我们的AI驱动项目模板库分析您最成功的工作流程，并为不同的制作场景创建优化的模板。每个模板包括：",
    ru: "Наша библиотека шаблонов проектов на базе ИИ анализирует ваши самые успешные рабочие процессы и создает оптимизированные шаблоны для различных сценариев производства. Каждый шаблон включает:",
    pt: "Nossa Biblioteca de Modelos de Projetos baseada em IA analisa seus fluxos de trabalho mais bem-sucedidos e cria modelos otimizados para diferentes cenários de produção. Cada modelo inclui:",
    ar: "تقوم مكتبة قوالب المشاريع المدعومة بالذكاء الاصطناعي لدينا بتحليل سير العمل الأكثر نجاحًا وإنشاء قوالب محسنة لسيناريوهات إنتاج مختلفة. يتضمن كل قالب:"
  }),
  "ai.features.templatesFeature1": ensureAllLanguages({
    en: "Pre-configured track layouts and routing based on your most productive sessions",
    es: "Diseños de pistas y enrutamiento preconfigurados basados en tus sesiones más productivas",
    fr: "Dispositions et routage de pistes préconfigurés basés sur vos sessions les plus productives",
    de: "Vorkonfigurierte Track-Layouts und Routing basierend auf Ihren produktivsten Sitzungen",
    sv: "Förkonfigurerade spårlayouter och routing baserade på dina mest produktiva sessioner",
    ja: "あなたの最も生産的なセッションに基づいて事前設定されたトラックレイアウトとルーティング",
    zh: "基于您最高效的会话预配置的轨道布局和路由",
    ru: "Предварительно настроенные макеты треков и маршрутизация на основе ваших самых продуктивных сессий",
    pt: "Layouts de faixas e roteamento pré-configurados com base em suas sessões mais produtivas",
    ar: "تخطيطات المسارات والتوجيه المكونة مسبقًا بناءً على جلساتك الأكثر إنتاجية"
  }),
  "ai.features.templatesFeature2": ensureAllLanguages({
    en: "Optimized plugin chains for different instruments and production styles",
    es: "Cadenas de plugins optimizadas para diferentes instrumentos y estilos de producción",
    fr: "Chaînes de plugins optimisées pour différents instruments et styles de production",
    de: "Optimierte Plugin-Ketten für verschiedene Instrumente und Produktionsstile",
    sv: "Optimerade plugin-kedjor för olika instrument och produktionsstilar",
    ja: "さまざまな楽器や制作スタイルに最適化されたプラグインチェーン",
    zh: "针对不同乐器和制作风格优化的插件链",
    ru: "Оптимизированные цепочки плагинов для различных инструментов и стилей производства",
    pt: "Cadeias de plugins otimizadas para diferentes instrumentos e estilos de produção",
    ar: "سلاسل البرامج المساعدة المحسنة لمختلف الآلات وأساليب الإنتاج"
  }),
  "ai.features.templatesFeature3": ensureAllLanguages({
    en: "Smart defaults for mixing templates based on genre and instrumentation",
    es: "Valores predeterminados inteligentes para plantillas de mezcla basados en género e instrumentación",
    fr: "Paramètres par défaut intelligents pour les modèles de mixage basés sur le genre et l'instrumentation",
    de: "Intelligente Standardeinstellungen für Mixing-Vorlagen basierend auf Genre und Instrumentierung",
    sv: "Smarta standardinställningar för mixningsmallar baserade på genre och instrumentation",
    ja: "ジャンルと楽器編成に基づいたミキシングテンプレートのスマートなデフォルト設定",
    zh: "基于流派和乐器编配的混音模板智能默认设置",
    ru: "Умные настройки по умолчанию для шаблонов микширования на основе жанра и инструментовки",
    pt: "Padrões inteligentes para modelos de mixagem com base em gênero e instrumentação",
    ar: "الإعدادات الافتراضية الذكية لقوالب المزج بناءً على النوع والآلات الموسيقية"
  }),
  
  // Buttons and actions
  "ai.browse": ensureAllLanguages({
    en: "Browse Templates",
    es: "Explorar Plantillas",
    fr: "Parcourir les Modèles",
    de: "Vorlagen durchsuchen",
    sv: "Bläddra bland mallar",
    ja: "テンプレートを閲覧",
    zh: "浏览模板",
    ru: "Просмотр шаблонов",
    pt: "Navegar pelos Modelos",
    ar: "تصفح القوالب"
  }),
  "ai.viewProjects": ensureAllLanguages({
    en: "View Projects",
    es: "Ver Proyectos",
    fr: "Voir les Projets",
    de: "Projekte anzeigen",
    sv: "Visa projekt",
    ja: "プロジェクトを表示",
    zh: "查看项目",
    ru: "Просмотр проектов",
    pt: "Ver Projetos",
    ar: "عرض المشاريع"
  }),
  "ai.openPortal": ensureAllLanguages({
    en: "Open Portal",
    es: "Abrir Portal",
    fr: "Ouvrir le Portail",
    de: "Portal öffnen",
    sv: "Öppna portal",
    ja: "ポータルを開く",
    zh: "打开门户",
    ru: "Открыть портал",
    pt: "Abrir Portal",
    ar: "فتح البوابة"
  }),
  "ai.runAnalysis": ensureAllLanguages({
    en: "Run Analysis",
    es: "Ejecutar Análisis",
    fr: "Lancer l'Analyse",
    de: "Analyse ausführen",
    sv: "Kör analys",
    ja: "分析を実行",
    zh: "运行分析",
    ru: "Запустить анализ",
    pt: "Executar Análise",
    ar: "تشغيل التحليل"
  }),
  
  // All feature tools and additional UI elements
  "ai.tools.deadlineTracker": ensureAllLanguages({
    en: "Deadline Tracker",
    es: "Rastreador de Plazos",
    fr: "Suivi des Échéances",
    de: "Deadline-Tracker",
    sv: "Deadline-spårare",
    ja: "締切トラッカー",
    zh: "截止日期跟踪器",
    ru: "Трекер сроков",
    pt: "Rastreador de Prazos",
    ar: "متتبع المواعيد النهائية"
  }),
  "ai.tools.deadlineTrackerDesc": ensureAllLanguages({
    en: "Manage multiple projects with deadlines, milestones, and automated reminders",
    es: "Gestiona múltiples proyectos con plazos, hitos y recordatorios automatizados",
    fr: "Gérez plusieurs projets avec des échéances, des jalons et des rappels automatisés",
    de: "Verwalten Sie mehrere Projekte mit Fristen, Meilensteinen und automatisierten Erinnerungen",
    sv: "Hantera flera projekt med deadlines, milstolpar och automatiserade påminnelser",
    ja: "締め切り、マイルストーン、自動リマインダーで複数のプロジェクトを管理",
    zh: "使用截止日期、里程碑和自动提醒管理多个项目",
    ru: "Управляйте несколькими проектами с помощью сроков, этапов и автоматических напоминаний",
    pt: "Gerencie vários projetos com prazos, marcos e lembretes automatizados",
    ar: "إدارة مشاريع متعددة مع مواعيد نهائية ومعالم وتذكيرات آلية"
  }),
  "ai.tools.clientFeedback": ensureAllLanguages({
    en: "Client Feedback Portal",
    es: "Portal de Comentarios de Clientes",
    fr: "Portail de Retours Clients",
    de: "Kundenfeedback-Portal",
    sv: "Kundåterkopplingsportal",
    ja: "クライアントフィードバックポータル",
    zh: "客户反馈门户",
    ru: "Портал обратной связи клиентов",
    pt: "Portal de Feedback de Clientes",
    ar: "بوابة ملاحظات العملاء"
  }),
  "ai.tools.clientFeedbackDesc": ensureAllLanguages({
    en: "Allow clients to leave timestamped comments on shared audio drafts",
    es: "Permite a los clientes dejar comentarios con marca de tiempo en borradores de audio compartidos",
    fr: "Permettez aux clients de laisser des commentaires horodatés sur les brouillons audio partagés",
    de: "Ermöglichen Sie Kunden, zeitgestempelte Kommentare zu geteilten Audio-Entwürfen zu hinterlassen",
    sv: "Låt kunder lämna tidsstämplade kommentarer på delade ljudutkast",
    ja: "クライアントが共有オーディオドラフトにタイムスタンプ付きコメントを残すことを許可",
    zh: "允许客户在共享的音频草稿上留下带时间戳的评论",
    ru: "Позвольте клиентам оставлять комментарии с отметками времени на общих аудио-черновиках",
    pt: "Permita que os clientes deixem comentários com marcação de tempo em rascunhos de áudio compartilhados",
    ar: "السماح للعملاء بترك تعليقات مختومة بالوقت على مسودات الصوت المشتركة"
  }),
  "ai.tools.timeTracker": ensureAllLanguages({
    en: "Studio Time Tracker",
    es: "Rastreador de Tiempo de Estudio",
    fr: "Suivi du Temps de Studio",
    de: "Studio-Zeiterfassung",
    sv: "Studiotids-tracker",
    ja: "スタジオ時間トラッカー",
    zh: "工作室时间跟踪器",
    ru: "Трекер студийного времени",
    pt: "Rastreador de Tempo de Estúdio",
    ar: "متتبع وقت الاستوديو"
  }),
  "ai.tools.timeTrackerDesc": ensureAllLanguages({
    en: "Log hours spent on different projects for time management and client billing",
    es: "Registra las horas dedicadas a diferentes proyectos para la gestión del tiempo y la facturación de clientes",
    fr: "Enregistrez les heures passées sur différents projets pour la gestion du temps et la facturation des clients",
    de: "Protokollieren Sie die für verschiedene Projekte aufgewendeten Stunden für Zeitmanagement und Kundenabrechnung",
    sv: "Logga timmar spenderade på olika projekt för tidshantering och kundfakturering",
    ja: "時間管理とクライアント請求のために、さまざまなプロジェクトに費やした時間を記録",
    zh: "记录在不同项目上花费的时间，用于时间管理和客户计费",
    ru: "Регистрируйте часы, потраченные на различные проекты, для управления временем и выставления счетов клиентам",
    pt: "Registre horas gastas em diferentes projetos para gerenciamento de tempo e faturamento de clientes",
    ar: "تسجيل الساعات التي تقضيها في مشاريع مختلفة لإدارة الوقت وفواتير العملاء"
  }),
  "ai.tools.backupManager": ensureAllLanguages({
    en: "Session Backup Manager",
    es: "Administrador de Copias de Seguridad de Sesiones",
    fr: "Gestionnaire de Sauvegarde de Session",
    de: "Sitzungs-Backup-Manager",
    sv: "Sessions-backuphanterare",
    ja: "セッションバックアップマネージャー",
    zh: "会话备份管理器",
    ru: "Менеджер резервного копирования сессий",
    pt: "Gerenciador de Backup de Sessão",
    ar: "مدير نسخ جلسات احتياطية"
  }),
  "ai.tools.backupManagerDesc": ensureAllLanguages({
    en: "Automatically back up sessions at regular intervals with blockchain verification",
    es: "Respalda automáticamente las sesiones a intervalos regulares con verificación blockchain",
    fr: "Sauvegardez automatiquement les sessions à intervalles réguliers avec vérification par blockchain",
    de: "Automatische Sicherung von Sitzungen in regelmäßigen Abständen mit Blockchain-Verifizierung",
    sv: "Säkerhetskopiera automatiskt sessioner med jämna mellanrum med blockchain-verifiering",
    ja: "ブロックチェーン検証付きで定期的に自動的にセッションをバックアップ",
    zh: "使用区块链验证定期自动备份会话",
    ru: "Автоматическое резервное копирование сессий через равные промежутки времени с проверкой блокчейна",
    pt: "Faça backup automático de sessões em intervalos regulares com verificação blockchain",
    ar: "النسخ الاحتياطي التلقائي للجلسات على فترات منتظمة مع التحقق من سلسلة الكتل"
  }),
  
  // Resource tools
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
    en: "Track CPU/memory usage per plugin to identify performance bottlenecks",
    es: "Rastrea el uso de CPU/memoria por plugin para identificar cuellos de botella de rendimiento",
    fr: "Suivez l'utilisation du CPU/mémoire par plugin pour identifier les goulots d'étranglement de performance",
    de: "Verfolgen Sie die CPU-/Speichernutzung pro Plugin, um Leistungsengpässe zu identifizieren",
    sv: "Spåra CPU/minnesanvändning per plugin för att identifiera prestandaflaskhalsar",
    ja: "パフォーマンスのボトルネックを特定するために、プラグインごとのCPU/メモリ使用量を追跡",
    zh: "跟踪每个插件的CPU/内存使用情况，识别性能瓶颈",
    ru: "Отслеживайте использование ЦП/памяти для каждого плагина, чтобы выявить узкие места производительности",
    pt: "Rastreie o uso de CPU/memória por plugin para identificar gargalos de desempenho",
    ar: "تتبع استخدام وحدة المعالجة المركزية/الذاكرة لكل مكون إضافي لتحديد اختناقات الأداء"
  }),
  "ai.tools.equipmentScanner": ensureAllLanguages({
    en: "Equipment Scanner",
    es: "Escáner de Equipamiento",
    fr: "Scanner d'Équipement",
    de: "Geräte-Scanner",
    sv: "Utrustningsscanner",
    ja: "機器スキャナー",
    zh: "设备扫描仪",
    ru: "Сканер оборудования",
    pt: "Scanner de Equipamentos",
    ar: "ماسح المعدات"
  }),
  "ai.tools.equipmentScannerDesc": ensureAllLanguages({
    en: "Detect and catalog all connected hardware/peripherals for quick setup",
    es: "Detecta y cataloga todo el hardware/periféricos conectados para una configuración rápida",
    fr: "Détectez et cataloguez tout le matériel/périphériques connectés pour une configuration rapide",
    de: "Erkennen und katalogisieren Sie alle angeschlossenen Hardware/Peripheriegeräte für eine schnelle Einrichtung",
    sv: "Upptäck och katalogisera all ansluten hårdvara/kringutrustning för snabb installation",
    ja: "接続されているすべてのハードウェア/周辺機器を検出してカタログ化し、迅速なセットアップを実現",
    zh: "检测并记录所有连接的硬件/外设，实现快速设置",
    ru: "Обнаруживайте и каталогизируйте всё подключенное оборудование/периферию для быстрой настройки",
    pt: "Detecte e catalogue todo o hardware/periféricos conectados para configuração rápida",
    ar: "اكتشاف وفهرسة جميع الأجهزة/الملحقات المتصلة للإعداد السريع"
  }),
  "ai.tools.pluginAnalytics": ensureAllLanguages({
    en: "Plugin Analytics",
    es: "Analíticas de Plugins",
    fr: "Analytique de Plugins",
    de: "Plugin-Analytik",
    sv: "Plugin-analytik",
    ja: "プラグイン分析",
    zh: "插件分析",
    ru: "Аналитика плагинов",
    pt: "Análise de Plugins",
    ar: "تحليلات المكونات الإضافية"
  }),
  "ai.tools.pluginAnalyticsDesc": ensureAllLanguages({
    en: "Track which plugins you use most frequently across sessions",
    es: "Rastrea qué plugins usas con más frecuencia en las sesiones",
    fr: "Suivez quels plugins vous utilisez le plus fréquemment à travers les sessions",
    de: "Verfolgen Sie, welche Plugins Sie am häufigsten über Sitzungen hinweg verwenden",
    sv: "Spåra vilka plugins du använder oftast över sessioner",
    ja: "セッション全体で最も頻繁に使用するプラグインを追跡",
    zh: "跟踪您在会话中最常使用的插件",
    ru: "Отслеживайте, какие плагины вы используете наиболее часто во время сессий",
    pt: "Rastreie quais plugins você usa com mais frequência nas sessões",
    ar: "تتبع المكونات الإضافية التي تستخدمها بشكل متكرر عبر الجلسات"
  }),
  "ai.tools.bpmDetector": ensureAllLanguages({
    en: "BPM & Key Detector",
    es: "Detector de BPM y Tonalidad",
    fr: "Détecteur de BPM et Tonalité",
    de: "BPM- & Tonart-Detektor",
    sv: "BPM- och tonartsdetektor",
    ja: "BPMおよびキー検出器",
    zh: "BPM和调性检测器",
    ru: "Детектор BPM и тональности",
    pt: "Detector de BPM e Tonalidade",
    ar: "كاشف الإيقاع والمفتاح"
  }),
  "ai.tools.bpmDetectorDesc": ensureAllLanguages({
    en: "Analyze and tag files with tempo and key information for better organization",
    es: "Analiza y etiqueta archivos con información de tempo y tonalidad para una mejor organización",
    fr: "Analysez et étiquetez les fichiers avec des informations de tempo et de tonalité pour une meilleure organisation",
    de: "Analysieren und kennzeichnen Sie Dateien mit Tempo- und Tonartinformationen für eine bessere Organisation",
    sv: "Analysera och tagga filer med tempo- och tonal information för bättre organisation",
    ja: "より良い整理のために、テンポとキー情報でファイルを分析してタグ付け",
    zh: "分析文件并标记速度和调性信息，以便更好地组织",
    ru: "Анализируйте и маркируйте файлы информацией о темпе и тональности для лучшей организации",
    pt: "Analise e marque arquivos com informações de andamento e tonalidade para melhor organização",
    ar: "تحليل الملفات ووسمها بمعلومات الإيقاع والمفتاح لتنظيم أفضل"
  }),
  
  // Feature showcase descriptions
  "ai.features.deadlineTitle": ensureAllLanguages({
    en: "Deadline Tracker",
    es: "Rastreador de Plazos",
    fr: "Suivi des Échéances",
    de: "Deadline-Tracker",
    sv: "Deadline-spårare",
    ja: "締切トラッカー",
    zh: "截止日期跟踪器",
    ru: "Трекер сроков",
    pt: "Rastreador de Prazos",
    ar: "متتبع المواعيد النهائية"
  }),
  "ai.features.deadlineDesc": ensureAllLanguages({
    en: "Never miss a deadline with intelligent project management built for audio professionals.",
    es: "Nunca pierdas un plazo con la gestión inteligente de proyectos creada para profesionales de audio.",
    fr: "Ne manquez jamais une échéance avec une gestion de projet intelligente conçue pour les professionnels de l'audio.",
    de: "Verpassen Sie keine Deadline mehr mit intelligentem Projektmanagement für Audio-Profis.",
    sv: "Missa aldrig en deadline med intelligent projekthantering byggd för ljudproffs.",
    ja: "オーディオプロフェッショナル向けに構築されたインテリジェントなプロジェクト管理で、締め切りを見逃すことはありません。",
    zh: "借助为音频专业人士打造的智能项目管理，绝不会错过截止日期。",
    ru: "Никогда не пропустите срок с интеллектуальным управлением проектами, созданным для аудиопрофессионалов.",
    pt: "Nunca perca um prazo com gerenciamento de projeto inteligente criado para profissionais de áudio.",
    ar: "لا تفوت أبدًا موعدًا نهائيًا مع إدارة المشاريع الذكية المصممة لمحترفي الصوت."
  }),
  "ai.features.deadlineLongDesc": ensureAllLanguages({
    en: "The Deadline Tracker is designed specifically for music production workflows, helping you manage multiple project timelines with automated workload balancing and progress tracking:",
    es: "El Rastreador de Plazos está diseñado específicamente para flujos de trabajo de producción musical, ayudándote a gestionar múltiples líneas de tiempo de proyectos con equilibrio automatizado de carga de trabajo y seguimiento de progreso:",
    fr: "Le Suivi des Échéances est conçu spécifiquement pour les flux de travail de production musicale, vous aidant à gérer plusieurs calendriers de projets avec équilibrage automatisé de la charge de travail et suivi des progrès :",
    de: "Der Deadline-Tracker ist speziell für Musikproduktions-Workflows konzipiert und hilft Ihnen, mehrere Projekt-Timelines mit automatisierter Workload-Balancierung und Fortschrittsverfolgung zu verwalten:",
    sv: "Deadline-spåraren är speciellt utformad för musikproduktionsarbetsflöden, och hjälper dig att hantera flera projekttidslinjer med automatiserad arbetsbelastningsbalansering och framstegsspårning:",
    ja: "締切トラッカーは音楽制作ワークフロー専用に設計されており、自動ワークロードバランシングと進捗追跡により複数のプロジェクトタイムラインを管理するのに役立ちます：",
    zh: "截止日期跟踪器专为音乐制作工作流程设计，帮助您通过自动工作负载平衡和进度跟踪管理多个项目时间线：",
    ru: "Трекер сроков специально разработан для рабочих процессов музыкального производства, помогая вам управлять несколькими временными шкалами проектов с автоматическим балансированием рабочей нагрузки и отслеживанием прогресса:",
    pt: "O Rastreador de Prazos é projetado especificamente para fluxos de trabalho de produção musical, ajudando você a gerenciar várias linhas do tempo de projetos com balanceamento automatizado de carga de trabalho e rastreamento de progresso:",
    ar: "تم تصميم متتبع المواعيد النهائية خصيصًا لسير عمل إنتاج الموسيقى، مما يساعدك على إدارة جداول زمنية متعددة للمشاريع مع موازنة آلية لعبء العمل وتتبع التقدم:"
  }),
  "ai.features.deadlineFeature1": ensureAllLanguages({
    en: "Visual timeline of all projects with milestone tracking and smart reminders",
    es: "Línea de tiempo visual de todos los proyectos con seguimiento de hitos y recordatorios inteligentes",
    fr: "Chronologie visuelle de tous les projets avec suivi des jalons et rappels intelligents",
    de: "Visuelle Zeitleiste aller Projekte mit Meilenstein-Tracking und intelligenten Erinnerungen",
    sv: "Visuell tidslinje för alla projekt med milstolpspårning och smarta påminnelser",
    ja: "マイルストーン追跡とスマートリマインダーを備えたすべてのプロジェクトのビジュアルタイムライン",
    zh: "所有项目的可视化时间线，包括里程碑跟踪和智能提醒",
    ru: "Визуальная временная шкала всех проектов с отслеживанием этапов и умными напоминаниями",
    pt: "Linha do tempo visual de todos os projetos com rastreamento de marcos e lembretes inteligentes",
    ar: "الجدول الزمني المرئي لجميع المشاريع مع تتبع المعالم والتذكيرات الذكية"
  }),
  "ai.features.deadlineFeature2": ensureAllLanguages({
    en: "Automatic time estimation based on project complexity and your historical data",
    es: "Estimación automática de tiempo basada en la complejidad del proyecto y tus datos históricos",
    fr: "Estimation automatique du temps basée sur la complexité du projet et vos données historiques",
    de: "Automatische Zeitschätzung basierend auf Projektkomplexität und Ihren historischen Daten",
    sv: "Automatisk tidsuppskattning baserad på projektets komplexitet och din historiska data",
    ja: "プロジェクトの複雑さとあなたの過去のデータに基づく自動時間見積もり",
    zh: "基于项目复杂性和您的历史数据的自动时间估算",
    ru: "Автоматическая оценка времени на основе сложности проекта и ваших исторических данных",
    pt: "Estimativa automática de tempo com base na complexidade do projeto e seus dados históricos",
    ar: "تقدير الوقت التلقائي بناءً على تعقيد المشروع وبياناتك التاريخية"
  }),
  "ai.features.deadlineFeature3": ensureAllLanguages({
    en: "Client-facing progress reports with customizable sharing options",
    es: "Informes de progreso orientados al cliente con opciones de compartición personalizables",
    fr: "Rapports de progression destinés aux clients avec options de partage personnalisables",
    de: "Kundenorientierte Fortschrittsberichte mit anpassbaren Freigabeoptionen",
    sv: "Klientriktade framstegsrapporter med anpassningsbara delningsalternativ",
    ja: "カスタマイズ可能な共有オプションを備えたクライアント向け進捗レポート",
    zh: "面向客户的进度报告，具有可自定义的共享选项",
    ru: "Отчеты о прогрессе для клиентов с настраиваемыми параметрами общего доступа",
    pt: "Relatórios de progresso voltados para o cliente com opções de compartilhamento personalizáveis",
    ar: "تقارير التقدم الموجهة للعملاء مع خيارات مشاركة قابلة للتخصيص"
  }),
  
  // Feedback Feature
  "ai.features.feedbackTitle": ensureAllLanguages({
    en: "Client Feedback Portal",
    es: "Portal de Comentarios de Clientes",
    fr: "Portail de Retours Clients",
    de: "Kundenfeedback-Portal",
    sv: "Kundåterkopplingsportal",
    ja: "クライアントフィードバックポータル",
    zh: "客户反馈门户",
    ru: "Портал обратной связи клиентов",
    pt: "Portal de Feedback de Clientes",
    ar: "بوابة ملاحظات العملاء"
  }),
  "ai.features.feedbackDesc": ensureAllLanguages({
    en: "Streamline client communication with an intelligent feedback system built for audio.",
    es: "Agiliza la comunicación con el cliente con un sistema de comentarios inteligente diseñado para audio.",
    fr: "Simplifiez la communication client avec un système de retour intelligent conçu pour l'audio.",
    de: "Rationalisieren Sie die Kundenkommunikation mit einem intelligenten Feedback-System für Audio.",
    sv: "Effektivisera kundkommunikation med ett intelligent återkopplingssystem byggt för ljud.",
    ja: "オーディオ向けに構築されたインテリジェントなフィードバックシステムでクライアントとのコミュニケーションを合理化します。",
    zh: "使用为音频构建的智能反馈系统简化客户沟通。",
    ru: "Оптимизируйте общение с клиентами с помощью интеллектуальной системы обратной связи, созданной для аудио.",
    pt: "Simplifique a comunicação com o cliente com um sistema de feedback inteligente construído para áudio.",
    ar: "تبسيط التواصل مع العملاء باستخدام نظام ملاحظات ذكي مصمم للصوت."
  }),
  "ai.features.feedbackLongDesc": ensureAllLanguages({
    en: "The Client Feedback Portal transforms how you collect and implement feedback, with tools designed specifically for audio review workflows:",
    es: "El Portal de Comentarios de Clientes transforma la forma en que recopilas e implementas comentarios, con herramientas diseñadas específicamente para flujos de trabajo de revisión de audio:",
    fr: "Le Portail de Retours Clients transforme la façon dont vous collectez et mettez en œuvre les retours, avec des outils conçus spécifiquement pour les flux de travail de révision audio :",
    de: "Das Kundenfeedback-Portal transformiert die Art und Weise, wie Sie Feedback sammeln und umsetzen, mit Tools, die speziell für Audio-Review-Workflows entwickelt wurden:",
    sv: "Kundåterkopplingsportalen transformerar hur du samlar in och implementerar återkoppling, med verktyg speciellt designade för arbetsflöden för ljudgranskning:",
    ja: "クライアントフィードバックポータルは、オーディオレビューワークフロー専用に設計されたツールを使用して、フィードバックの収集と実装方法を変革します：",
    zh: "客户反馈门户改变了您收集和实施反馈的方式，使用专为音频审核工作流程设计的工具：",
    ru: "Портал обратной связи клиентов трансформирует способ сбора и внедрения отзывов с помощью инструментов, специально разработанных для рабочих процессов аудиорецензирования:",
    pt: "O Portal de Feedback de Clientes transforma a maneira como você coleta e implementa feedback, com ferramentas projetadas especificamente para fluxos de trabalho de revisão de áudio:",
    ar: "تحول بوابة ملاحظات العملاء الطريقة التي تجمع بها الملاحظات وتنفذها، مع أدوات مصممة خصيصًا لسير عمل مراجعة الصوت:"
  }),
  "ai.features.feedbackFeature1": ensureAllLanguages({
    en: "Secure sharing links with timestamped commenting directly on audio waveforms",
    es: "Enlaces de compartición seguros con comentarios con marca de tiempo directamente en las formas de onda de audio",
    fr: "Liens de partage sécurisés avec commentaires horodatés directement sur les formes d'onde audio",
    de: "Sichere Freigabelinks mit zeitgestempelten Kommentaren direkt auf Audio-Wellenformen",
    sv: "Säkra delningslänkar med tidsstämplade kommentarer direkt på ljudvågformer",
    ja: "オーディオ波形に直接タイムスタンプ付きコメントを付けられる安全な共有リンク",
    zh: "安全共享链接，可直接在音频波形上进行带时间戳的评论",
    ru: "Безопасные ссылки для обмена с комментариями с отметками времени непосредственно на аудиоволновых формах",
    pt: "Links de compartilhamento seguros com comentários marcados com hora diretamente nas formas de onda de áudio",
    ar: "روابط مشاركة آمنة مع تعليقات مختومة بالوقت مباشرة على الأشكال الموجية للصوت"
  }),
  "ai.features.feedbackFeature2": ensureAllLanguages({
    en: "Automatic feedback categorization and prioritization to streamline revisions",
    es: "Categorización y priorización automática de comentarios para agilizar las revisiones",
    fr: "Catégorisation et priorisation automatiques des retours pour rationaliser les révisions",
    de: "Automatische Feedback-Kategorisierung und -Priorisierung zur Rationalisierung von Überarbeitungen",
    sv: "Automatisk återkopplingsklassificering och prioritering för att effektivisera revideringar",
    ja: "リビジョンを合理化するための自動フィードバック分類と優先順位付け",
    zh: "自动反馈分类和优先级排序，以简化修订",
    ru: "Автоматическая категоризация и расстановка приоритетов отзывов для оптимизации поправок",
    pt: "Categorização e priorização automática de feedback para agilizar revisões",
    ar: "تصنيف تلقائي للملاحظات وتحديد أولوياتها لتبسيط المراجعات"
  }),
  "ai.features.feedbackFeature3": ensureAllLanguages({
    en: "Version tracking that links client comments to specific mix iterations",
    es: "Seguimiento de versiones que vincula los comentarios del cliente con iteraciones específicas de la mezcla",
    fr: "Suivi de version qui lie les commentaires des clients à des itérations de mix spécifiques",
    de: "Versionsverfolgung, die Kundenkommentare mit spezifischen Mix-Iterationen verknüpft",
    sv: "Versionshantering som kopplar kundkommentarer till specifika mixiterationer",
    ja: "クライアントのコメントを特定のミックスイテレーションにリンクするバージョン追跡",
    zh: "版本跟踪，将客户评论与特定混音迭代相关联",
    ru: "Отслеживание версий, которое связывает комментарии клиентов с конкретными итерациями микса",
    pt: "Rastreamento de versão que vincula comentários de clientes a iterações específicas de mix",
    ar: "تتبع الإصدار الذي يربط تعليقات العملاء بتكرارات خلط محددة"
  }),
  
  // Resource Features
  "ai.features.resourceTitle": ensureAllLanguages({
    en: "Resource Usage Monitor",
    es: "Monitor de Uso de Recursos",
    fr: "Moniteur d'Utilisation des Ressources",
    de: "Ressourcennutzungsmonitor",
    sv: "Resursanvändningsövervakare",
    ja: "リソース使用状況モニター",
    zh: "资源使用监视器",
    ru: "Монитор использования ресурсов",
    pt: "Monitor de Uso de Recursos",
    ar: "مراقب استخدام الموارد"
  }),
  "ai.features.resourceDesc": ensureAllLanguages({
    en: "Optimize your system performance with intelligent resource tracking and recommendations.",
    es: "Optimiza el rendimiento de tu sistema con seguimiento de recursos inteligente y recomendaciones.",
    fr: "Optimisez les performances de votre système avec un suivi intelligent des ressources et des recommandations.",
    de: "Optimieren Sie Ihre Systemleistung mit intelligentem Ressourcen-Tracking und Empfehlungen.",
    sv: "Optimera ditt systems prestanda med intelligent resursspårning och rekommendationer.",
    ja: "インテリジェントなリソーストラッキングと推奨事項でシステムパフォーマンスを最適化します。",
    zh: "通过智能资源跟踪和建议优化您的系统性能。",
    ru: "Оптимизируйте производительность вашей системы с помощью интеллектуального отслеживания ресурсов и рекомендаций.",
    pt: "Otimize o desempenho do seu sistema com rastreamento de recursos inteligente e recomendações.",
    ar: "تحسين أداء النظام الخاص بك مع تتبع الموارد الذكي والتوصيات."
  }),
  "ai.features.resourceLongDesc": ensureAllLanguages({
    en: "The Resource Usage Monitor helps identify performance bottlenecks in your sessions and provides actionable recommendations to improve stability:",
    es: "El Monitor de Uso de Recursos ayuda a identificar cuellos de botella de rendimiento en tus sesiones y proporciona recomendaciones accionables para mejorar la estabilidad:",
    fr: "Le Moniteur d'Utilisation des Ressources aide à identifier les goulots d'étranglement de performance dans vos sessions et fournit des recommandations exploitables pour améliorer la stabilité :",
    de: "Der Ressourcennutzungsmonitor hilft, Leistungsengpässe in Ihren Sitzungen zu identifizieren und bietet umsetzbare Empfehlungen zur Verbesserung der Stabilität:",
    sv: "Resursanvändningsövervakaren hjälper till att identifiera prestandaflaskhalsar i dina sessioner och ger åtgärdbara rekommendationer för att förbättra stabiliteten:",
    ja: "リソース使用状況モニターは、セッションのパフォーマンスのボトルネックを特定し、安定性を向上させるための実行可能な推奨事項を提供します：",
    zh: "资源使用监视器帮助识别会话中的性能瓶颈，并提供可操作的建议以改善稳定性：",
    ru: "Монитор использования ресурсов помогает выявить узкие места производительности в ваших сессиях и предоставляет действенные рекомендации для повышения стабильности:",
    pt: "O Monitor de Uso de Recursos ajuda a identificar gargalos de desempenho em suas sessões e fornece recomendações acionáveis para melhorar a estabilidade:",
    ar: "يساعد مراقب استخدام الموارد في تحديد اختناقات الأداء في جلساتك ويقدم توصيات قابلة للتنفيذ لتحسين الاستقرار:"
  }),
  "ai.features.resourceFeature1": ensureAllLanguages({
    en: "Per-plugin CPU, memory, and disk usage tracking to identify resource-heavy processors",
    es: "Seguimiento del uso de CPU, memoria y disco por plugin para identificar procesadores que consumen muchos recursos",
    fr: "Suivi de l'utilisation du CPU, de la mémoire et du disque par plugin pour identifier les processeurs gourmands en ressources",
    de: "Pro-Plugin CPU-, Speicher- und Festplattennutzungsverfolgung zur Identifizierung ressourcenintensiver Prozessoren",
    sv: "CPU-, minnes- och diskanvändningsspårning per plugin för att identifiera resurskrävande processorer",
    ja: "リソースを多く消費するプロセッサを特定するためのプラグインごとのCPU、メモリ、ディスク使用量の追跡",
    zh: "每个插件的CPU、内存和磁盘使用情况跟踪，以识别资源密集型处理器",
    ru: "Отслеживание использования ЦП, памяти и диска для каждого плагина для выявления ресурсоемких процессоров",
    pt: "Rastreamento de uso de CPU, memória e disco por plugin para identificar processadores que consomem muitos recursos",
    ar: "تتبع استخدام وحدة المعالجة المركزية والذاكرة والقرص لكل مكون إضافي لتحديد المعالجات كثيفة الموارد"
  }),
  "ai.features.resourceFeature2": ensureAllLanguages({
    en: "Intelligent freeze/bounce recommendations based on project complexity and system capacity",
    es: "Recomendaciones inteligentes de congelación/rebote basadas en la complejidad del proyecto y la capacidad del sistema",
    fr: "Recommandations intelligentes de gel/rebond basées sur la complexité du projet et la capacité du système",
    de: "Intelligente Freeze/Bounce-Empfehlungen basierend auf Projektkomplexität und Systemkapazität",
    sv: "Intelligenta rekommendationer för frysning/studsning baserade på projektkomplexitet och systemkapacitet",
    ja: "プロジェクトの複雑さとシステム容量に基づくインテリジェントなフリーズ/バウンス推奨事項",
    zh: "基于项目复杂性和系统容量的智能冻结/弹回建议",
    ru: "Интеллектуальные рекомендации по заморозке/объединению на основе сложности проекта и возможностей системы",
    pt: "Recomendações inteligentes de congelamento/renderização com base na complexidade do projeto e capacidade do sistema",
    ar: "توصيات ذكية للتجميد/التحويل بناءً على تعقيد المشروع وقدرة النظام"
  }),
  "ai.features.resourceFeature3": ensureAllLanguages({
    en: "Historical performance analysis with predictive warnings before system overloads",
    es: "Análisis de rendimiento histórico con advertencias predictivas antes de sobrecargas del sistema",
    fr: "Analyse des performances historiques avec avertissements prédictifs avant les surcharges du système",
    de: "Historische Leistungsanalyse mit prädiktiven Warnungen vor Systemüberlastungen",
    sv: "Historisk prestandaanalys med förutsägande varningar innan systemöverbelastningar",
    ja: "システム過負荷の前に予測警告を含む過去のパフォーマンス分析",
    zh: "历史性能分析，在系统过载前提供预测性警告",
    ru: "Исторический анализ производительности с прогностическими предупреждениями перед перегрузкой системы",
    pt: "Análise de desempenho histórico com avisos preditivos antes de sobrecargas do sistema",
    ar: "تحليل الأداء التاريخي مع تحذيرات تنبؤية قبل تحميل النظام الزائد"
  }),
  
  "ai.generator.title": ensureAllLanguages({
    en: "Intelligent Production Workflow",
    es: "Flujo de Trabajo de Producción Inteligente",
    fr: "Flux de Travail de Production Intelligent",
    de: "Intelligenter Produktions-Workflow",
    sv: "Intelligent produktionsarbetsflöde",
    ja: "インテリジェントな制作ワークフロー",
    zh: "智能生产工作流程",
    ru: "Интеллектуальный рабочий процесс производства",
    pt: "Fluxo de Trabalho de Produção Inteligente",
    ar: "سير عمل الإنتاج الذكي"
  }),
  
  // Add any other necessary translations below
  "ai.learnMore": ensureAllLanguages({
    en: "Learn More",
    es: "Más Información",
    fr: "En Savoir Plus",
    de: "Mehr Erfahren",
    sv: "Läs Mer",
    ja: "詳細を見る",
    zh: "了解更多",
    ru: "Узнать больше",
    pt: "Saiba Mais",
    ar: "معرفة المزيد"
  }),
  "ai.try": ensureAllLanguages({
    en: "Try Now",
    es: "Probar Ahora",
    fr: "Essayer Maintenant",
    de: "Jetzt Ausprobieren",
    sv: "Prova Nu",
    ja: "今すぐ試す",
    zh: "立即尝试",
    ru: "Попробовать сейчас",
    pt: "Experimentar Agora",
    ar: "جرب الآن"
  })
};

export default aiToolsTranslations;
