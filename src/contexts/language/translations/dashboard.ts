
import { Language } from "../types";

type TranslationRecord = Record<Language, string>;

const dashboardTranslations: Record<string, TranslationRecord> = {
  // Dashboard quick overview
  "dashboard.quickOverview": {
    en: "Quick Overview",
    es: "Resumen Rápido",
    fr: "Aperçu Rapide",
    de: "Schnellübersicht",
    sv: "Snabb Översikt",
    ja: "クイック概要",
    zh: "快速概览",
    ru: "Быстрый обзор",
    pt: "Visão Rápida",
    ar: "نظرة سريعة"
  },
  
  // Dashboard stats
  "dashboard.stats.audioProjects": {
    en: "Audio Projects",
    es: "Proyectos de Audio",
    fr: "Projets Audio",
    de: "Audio-Projekte",
    sv: "Ljudprojekt",
    ja: "オーディオプロジェクト",
    zh: "音频项目",
    ru: "Аудио проекты",
    pt: "Projetos de Áudio",
    ar: "مشاريع صوتية"
  },
  "dashboard.stats.activeProjects": {
    en: "Active projects",
    es: "Proyectos activos",
    fr: "Projets actifs",
    de: "Aktive Projekte",
    sv: "Aktiva projekt",
    ja: "アクティブなプロジェクト",
    zh: "活跃项目",
    ru: "Активные проекты",
    pt: "Projetos ativos",
    ar: "مشاريع نشطة"
  },
  "dashboard.stats.connectedDevices": {
    en: "Connected Devices",
    es: "Dispositivos Conectados",
    fr: "Appareils Connectés",
    de: "Verbundene Geräte",
    sv: "Anslutna Enheter",
    ja: "接続されたデバイス",
    zh: "已连接设备",
    ru: "Подключенные устройства",
    pt: "Dispositivos Conectados",
    ar: "الأجهزة المتصلة"
  },
  "dashboard.stats.availableDevices": {
    en: "Available devices",
    es: "Dispositivos disponibles",
    fr: "Appareils disponibles",
    de: "Verfügbare Geräte",
    sv: "Tillgängliga enheter",
    ja: "利用可能なデバイス",
    zh: "可用设备",
    ru: "Доступные устройства",
    pt: "Dispositivos disponíveis",
    ar: "الأجهزة المتاحة"
  },
  "dashboard.stats.storageUsed": {
    en: "Storage Used",
    es: "Almacenamiento Usado",
    fr: "Stockage Utilisé",
    de: "Speichernutzung",
    sv: "Använt Lagringsutrymme",
    ja: "使用ストレージ",
    zh: "已用存储",
    ru: "Использовано хранилища",
    pt: "Armazenamento Utilizado",
    ar: "التخزين المستخدم"
  },
  "dashboard.stats.storageDetails": {
    en: "15GB of 30GB",
    es: "15GB de 30GB",
    fr: "15Go sur 30Go",
    de: "15GB von 30GB",
    sv: "15GB av 30GB",
    ja: "30GBの内15GB",
    zh: "15GB/30GB",
    ru: "15ГБ из 30ГБ",
    pt: "15GB de 30GB",
    ar: "15 جيجابايت من 30 جيجابايت"
  },
  "dashboard.stats.recentActivity": {
    en: "Recent Activity",
    es: "Actividad Reciente",
    fr: "Activité Récente",
    de: "Neueste Aktivitäten",
    sv: "Senaste Aktivitet",
    ja: "最近のアクティビティ",
    zh: "最近活动",
    ru: "Недавняя активность",
    pt: "Atividade Recente",
    ar: "النشاط الأخير"
  },
  "dashboard.stats.actionsThisWeek": {
    en: "Actions this week",
    es: "Acciones esta semana",
    fr: "Actions cette semaine",
    de: "Aktionen diese Woche",
    sv: "Åtgärder denna vecka",
    ja: "今週のアクション",
    zh: "本周操作",
    ru: "Действия за эту неделю",
    pt: "Ações desta semana",
    ar: "الإجراءات هذا الأسبوع"
  },
  // Greetings
  "dashboard.greeting.morning": {
    en: "Good morning",
    es: "Buenos días",
    fr: "Bonjour",
    de: "Guten Morgen",
    sv: "God morgon",
    ja: "おはようございます",
    zh: "早上好",
    ru: "Доброе утро",
    pt: "Bom dia",
    ar: "صباح الخير"
  },
  "dashboard.greeting.afternoon": {
    en: "Good afternoon",
    es: "Buenas tardes",
    fr: "Bon après-midi",
    de: "Guten Tag",
    sv: "God eftermiddag",
    ja: "こんにちは",
    zh: "下午好",
    ru: "Добрый день",
    pt: "Boa tarde",
    ar: "مساء الخير"
  },
  "dashboard.greeting.evening": {
    en: "Good evening",
    es: "Buenas noches",
    fr: "Bonsoir",
    de: "Guten Abend",
    sv: "God kväll",
    ja: "こんばんは",
    zh: "晚上好",
    ru: "Добрый вечер",
    pt: "Boa noite",
    ar: "مساء الخير"
  },
  "dashboard.user": {
    en: "User",
    es: "Usuario",
    fr: "Utilisateur",
    de: "Benutzer",
    sv: "Användare",
    ja: "ユーザー",
    zh: "用户",
    ru: "Пользователь",
    pt: "Usuário",
    ar: "مستخدم"
  },
  
  // Activity actions
  "dashboard.activity.created": {
    en: "created",
    es: "creó",
    fr: "a créé",
    de: "erstellte",
    sv: "skapade",
    ja: "作成しました",
    zh: "创建了",
    ru: "создал(а)",
    pt: "criou",
    ar: "أنشأ"
  },
  "dashboard.activity.commented": {
    en: "commented on",
    es: "comentó en",
    fr: "a commenté",
    de: "kommentierte",
    sv: "kommenterade",
    ja: "コメントしました",
    zh: "评论了",
    ru: "прокомментировал(а)",
    pt: "comentou em",
    ar: "علق على"
  },
  "dashboard.activity.shared": {
    en: "shared",
    es: "compartió",
    fr: "a partagé",
    de: "teilte",
    sv: "delade",
    ja: "共有しました",
    zh: "分享了",
    ru: "поделился(ась)",
    pt: "compartilhou",
    ar: "شارك"
  },
  "dashboard.activity.uploaded": {
    en: "uploaded",
    es: "subió",
    fr: "a téléchargé",
    de: "lud hoch",
    sv: "laddade upp",
    ja: "アップロードしました",
    zh: "上传了",
    ru: "загрузил(а)",
    pt: "carregou",
    ar: "رفع"
  },
  "dashboard.activity.edited": {
    en: "edited",
    es: "editó",
    fr: "a édité",
    de: "bearbeitete",
    sv: "redigerade",
    ja: "編集しました",
    zh: "编辑了",
    ru: "отредактировал(а)",
    pt: "editou",
    ar: "حرر"
  },
  
  // Dashboard sections
  "dashboard.recentActivity": {
    en: "Recent Activity",
    es: "Actividad Reciente",
    fr: "Activité Récente",
    de: "Neueste Aktivitäten",
    sv: "Senaste Aktivitet",
    ja: "最近のアクティビティ",
    zh: "最近活动",
    ru: "Недавняя активность",
    pt: "Atividade Recente",
    ar: "النشاط الأخير"
  },
  
  // View all button
  "dashboard.viewAll": {
    en: "View All",
    es: "Ver Todo",
    fr: "Voir Tout",
    de: "Alle Anzeigen",
    sv: "Visa Alla",
    ja: "すべて表示",
    zh: "查看全部",
    ru: "Показать все",
    pt: "Ver Tudo",
    ar: "عرض الكل"
  },
  
  // Knowledge base
  "dashboard.knowledgeBase": {
    en: "Knowledge Base",
    es: "Base de Conocimiento",
    fr: "Base de Connaissances",
    de: "Wissensdatenbank",
    sv: "Kunskapsbas",
    ja: "ナレッジベース",
    zh: "知识库",
    ru: "База знаний",
    pt: "Base de Conhecimento",
    ar: "قاعدة المعرفة"
  },
  "dashboard.knowledgeBaseDescription": {
    en: "Expert resources and guides",
    es: "Recursos y guías de expertos",
    fr: "Ressources et guides d'experts",
    de: "Expertenressourcen und Anleitungen",
    sv: "Expertresurser och guider",
    ja: "専門家のリソースとガイド",
    zh: "专家资源和指南",
    ru: "Ресурсы и руководства экспертов",
    pt: "Recursos e guias especializados",
    ar: "موارد وأدلة الخبراء"
  },
  "dashboard.studioTechniques": {
    en: "Studio Techniques",
    es: "Técnicas de Estudio",
    fr: "Techniques de Studio",
    de: "Studiotechniken",
    sv: "Studiotekniker",
    ja: "スタジオテクニック",
    zh: "工作室技巧",
    ru: "Студийные техники",
    pt: "Técnicas de Estúdio",
    ar: "تقنيات الاستوديو"
  },
  "dashboard.studioTechniquesDescription": {
    en: "Professional mixing and mastering workflows",
    es: "Flujos de trabajo profesionales de mezcla y masterización",
    fr: "Flux de travail professionnels de mixage et de mastering",
    de: "Professionelle Mixing- und Mastering-Workflows",
    sv: "Professionella arbetsflöden för mixning och mastering",
    ja: "プロフェッショナルなミキシングとマスタリングのワークフロー",
    zh: "专业混音和母带制作工作流程",
    ru: "Профессиональные рабочие процессы сведения и мастеринга",
    pt: "Fluxos de trabalho profissionais de mixagem e masterização",
    ar: "سير عمل المزج والماسترينج الاحترافي"
  },
  "dashboard.audioTroubleshooting": {
    en: "Audio Troubleshooting",
    es: "Solución de Problemas de Audio",
    fr: "Dépannage Audio",
    de: "Audio-Fehlerbehebung",
    sv: "Felsökning av Ljud",
    ja: "オーディオトラブルシューティング",
    zh: "音频故障排除",
    ru: "Устранение неполадок со звуком",
    pt: "Solução de Problemas de Áudio",
    ar: "استكشاف أخطاء الصوت وإصلاحها"
  },
  "dashboard.audioTroubleshootingDescription": {
    en: "Common issues and solutions",
    es: "Problemas comunes y soluciones",
    fr: "Problèmes courants et solutions",
    de: "Häufige Probleme und Lösungen",
    sv: "Vanliga problem och lösningar",
    ja: "一般的な問題と解決策",
    zh: "常见问题和解决方案",
    ru: "Распространенные проблемы и решения",
    pt: "Problemas comuns e soluções",
    ar: "المشكلات الشائعة والحلول"
  },
  "dashboard.exploreKnowledge": {
    en: "Explore Knowledge",
    es: "Explorar Conocimiento",
    fr: "Explorer les Connaissances",
    de: "Wissen Erkunden",
    sv: "Utforska Kunskap",
    ja: "知識を探索する",
    zh: "探索知识",
    ru: "Исследовать знания",
    pt: "Explorar Conhecimento",
    ar: "استكشاف المعرفة"
  },
  
  // Community and contribution
  "community.joinHeading": {
    en: "Join the StudioFlow Connect Community",
    es: "Únete a la Comunidad StudioFlow Connect",
    fr: "Rejoignez la Communauté StudioFlow Connect",
    de: "Treten Sie der StudioFlow Connect Community bei",
    sv: "Gå med i StudioFlow Connect Community",
    ja: "StudioFlow Connectコミュニティに参加する",
    zh: "加入StudioFlow Connect社区",
    ru: "Присоединяйтесь к сообществу StudioFlow Connect",
    pt: "Junte-se à Comunidade StudioFlow Connect",
    ar: "انضم إلى مجتمع StudioFlow Connect"
  },
  "community.description": {
    en: "StudioFlow Connect is an open-source project driving innovation in audio production. Join our growing community of developers, audio engineers, and music producers.",
    es: "StudioFlow Connect es un proyecto de código abierto que impulsa la innovación en la producción de audio. Únete a nuestra creciente comunidad de desarrolladores, ingenieros de audio y productores musicales.",
    fr: "StudioFlow Connect est un projet open-source qui stimule l'innovation dans la production audio. Rejoignez notre communauté croissante de développeurs, d'ingénieurs du son et de producteurs de musique.",
    de: "StudioFlow Connect ist ein Open-Source-Projekt, das Innovation in der Audioproduktion vorantreibt. Treten Sie unserer wachsenden Gemeinschaft von Entwicklern, Toningenieuren und Musikproduzenten bei.",
    sv: "StudioFlow Connect är ett projekt med öppen källkod som driver innovation inom ljudproduktion. Gå med i vår växande gemenskap av utvecklare, ljudtekniker och musikproducenter.",
    ja: "StudioFlow Connectは、オーディオ制作における革新を推進するオープンソースプロジェクトです。開発者、オーディオエンジニア、音楽プロデューサーからなる成長中のコミュニティにご参加ください。",
    zh: "StudioFlow Connect是一个推动音频制作创新的开源项目。加入我们不断壮大的开发人员、音频工程师和音乐制作人社区。",
    ru: "StudioFlow Connect — это проект с открытым исходным кодом, который стимулирует инновации в области аудиопроизводства. Присоединяйтесь к нашему растущему сообществу разработчиков, звукорежиссеров и музыкальных продюсеров.",
    pt: "StudioFlow Connect é um projeto de código aberto que impulsiona a inovação na produção de áudio. Junte-se à nossa crescente comunidade de desenvolvedores, engenheiros de áudio e produtores musicais.",
    ar: "StudioFlow Connect هو مشروع مفتوح المصدر يدفع الابتكار في إنتاج الصوت. انضم إلى مجتمعنا المتنامي من المطورين ومهندسي الصوت ومنتجي الموسيقى."
  },
  "community.github": {
    en: "GitHub",
    es: "GitHub",
    fr: "GitHub",
    de: "GitHub",
    sv: "GitHub",
    ja: "GitHub",
    zh: "GitHub",
    ru: "GitHub",
    pt: "GitHub",
    ar: "GitHub"
  },
  "community.githubDesc": {
    en: "Contribute code, report issues, and help build the future",
    es: "Contribuye con código, reporta problemas y ayuda a construir el futuro",
    fr: "Contribuez au code, signalez des problèmes et aidez à construire l'avenir",
    de: "Tragen Sie Code bei, melden Sie Probleme und helfen Sie, die Zukunft zu gestalten",
    sv: "Bidra med kod, rapportera problem och hjälp till att bygga framtiden",
    ja: "コードを貢献し、問題を報告し、未来の構築を手伝う",
    zh: "贡献代码、报告问题并帮助构建未来",
    ru: "Вносите код, сообщайте о проблемах и помогайте строить будущее",
    pt: "Contribua com código, relate problemas e ajude a construir o futuro",
    ar: "ساهم بالكود، وأبلغ عن المشكلات، وساعد في بناء المستقبل"
  },
  "community.viewRepo": {
    en: "View Repository",
    es: "Ver Repositorio",
    fr: "Voir le Dépôt",
    de: "Repository Anzeigen",
    sv: "Visa Förvaret",
    ja: "リポジトリを見る",
    zh: "查看仓库",
    ru: "Просмотреть репозиторий",
    pt: "Ver Repositório",
    ar: "عرض المستودع"
  },
  "community.forum": {
    en: "Forum",
    es: "Foro",
    fr: "Forum",
    de: "Forum",
    sv: "Forum",
    ja: "フォーラム",
    zh: "论坛",
    ru: "Форум",
    pt: "Fórum",
    ar: "منتدى"
  },
  "community.forumDesc": {
    en: "Discuss ideas, share workflows, and get community support",
    es: "Discute ideas, comparte flujos de trabajo y obtén apoyo de la comunidad",
    fr: "Discutez des idées, partagez des flux de travail et obtenez le soutien de la communauté",
    de: "Diskutieren Sie Ideen, teilen Sie Workflows und erhalten Sie Community-Unterstützung",
    sv: "Diskutera idéer, dela arbetsflöden och få gemenskapssupport",
    ja: "アイデアを議論し、ワークフローを共有し、コミュニティサポートを得る",
    zh: "讨论想法、分享工作流程并获得社区支持",
    ru: "Обсуждайте идеи, делитесь рабочими процессами и получайте поддержку сообщества",
    pt: "Discuta ideias, compartilhe fluxos de trabalho e obtenha suporte da comunidade",
    ar: "ناقش الأفكار، وشارك سير العمل، واحصل على دعم المجتمع"
  },
  "community.joinDiscussion": {
    en: "Join Discussion",
    es: "Unirse a la Discusión",
    fr: "Rejoindre la Discussion",
    de: "Diskussion Beitreten",
    sv: "Delta i Diskussionen",
    ja: "ディスカッションに参加",
    zh: "加入讨论",
    ru: "Присоединиться к обсуждению",
    pt: "Participar da Discussão",
    ar: "الانضمام إلى النقاش"
  },
  "community.support": {
    en: "Support",
    es: "Soporte",
    fr: "Support",
    de: "Unterstützung",
    sv: "Support",
    ja: "サポート",
    zh: "支持",
    ru: "Поддержка",
    pt: "Suporte",
    ar: "الدعم"
  },
  "community.supportDesc": {
    en: "Back the VR Mixing Project and StudioFlow Connect development",
    es: "Respalda el Proyecto de Mezcla VR y el desarrollo de StudioFlow Connect",
    fr: "Soutenez le projet de mixage VR et le développement de StudioFlow Connect",
    de: "Unterstützen Sie das VR-Mixing-Projekt und die Entwicklung von StudioFlow Connect",
    sv: "Stöd VR Mixing Project och utvecklingen av StudioFlow Connect",
    ja: "VRミキシングプロジェクトとStudioFlow Connectの開発をサポート",
    zh: "支持VR混音项目和StudioFlow Connect开发",
    ru: "Поддержите проект VR-микширования и разработку StudioFlow Connect",
    pt: "Apoie o Projeto de Mixagem VR e o desenvolvimento do StudioFlow Connect",
    ar: "ادعم مشروع المزج بالواقع الافتراضي وتطوير StudioFlow Connect"
  },
  "community.supportProject": {
    en: "Support the Project",
    es: "Apoyar el Proyecto",
    fr: "Soutenir le Projet",
    de: "Projekt Unterstützen",
    sv: "Stöd Projektet",
    ja: "プロジェクトをサポート",
    zh: "支持项目",
    ru: "Поддержать проект",
    pt: "Apoiar o Projeto",
    ar: "دعم المشروع"
  },
  "community.roadmapTitle": {
    en: "Open Source Roadmap",
    es: "Hoja de Ruta de Código Abierto",
    fr: "Feuille de Route Open Source",
    de: "Open-Source-Roadmap",
    sv: "Färdplan för Öppen Källkod",
    ja: "オープンソースロードマップ",
    zh: "开源路线图",
    ru: "План развития с открытым исходным кодом",
    pt: "Roteiro de Código Aberto",
    ar: "خارطة طريق المصدر المفتوح"
  },
  "community.viewFullRoadmap": {
    en: "View Full Development Roadmap",
    es: "Ver Hoja de Ruta de Desarrollo Completa",
    fr: "Voir la Feuille de Route Complète de Développement",
    de: "Vollständige Entwicklungs-Roadmap Anzeigen",
    sv: "Visa Fullständig Utvecklingsfärdplan",
    ja: "完全な開発ロードマップを見る",
    zh: "查看完整开发路线图",
    ru: "Посмотреть полный план развития",
    pt: "Ver Roteiro de Desenvolvimento Completo",
    ar: "عرض خارطة طريق التطوير الكاملة"
  },
  
  // Development Roadmap
  "roadmap.title": {
    en: "Development Roadmap",
    es: "Hoja de Ruta de Desarrollo",
    fr: "Feuille de Route de Développement",
    de: "Entwicklungs-Roadmap",
    sv: "Utvecklingsfärdplan",
    ja: "開発ロードマップ",
    zh: "开发路线图",
    ru: "План разработки",
    pt: "Roteiro de Desenvolvimento",
    ar: "خارطة طريق التطوير"
  },
  "roadmap.description": {
    en: "Upcoming features and improvements",
    es: "Próximas características y mejoras",
    fr: "Fonctionnalités et améliorations à venir",
    de: "Kommende Funktionen und Verbesserungen",
    sv: "Kommande funktioner och förbättringar",
    ja: "今後の機能と改善",
    zh: "即将推出的功能和改进",
    ru: "Предстоящие функции и улучшения",
    pt: "Próximas funcionalidades e melhorias",
    ar: "الميزات والتحسينات القادمة"
  },
  "roadmap.phases": {
    en: "Development Phases",
    es: "Fases de Desarrollo",
    fr: "Phases de Développement",
    de: "Entwicklungsphasen",
    sv: "Utvecklingsfaser",
    ja: "開発フェーズ",
    zh: "开发阶段",
    ru: "Фазы разработки",
    pt: "Fases de Desenvolvimento",
    ar: "مراحل التطوير"
  },
  "roadmap.timeline": {
    en: "Timeline",
    es: "Cronología",
    fr: "Chronologie",
    de: "Zeitplan",
    sv: "Tidslinje",
    ja: "タイムライン",
    zh: "时间线",
    ru: "Временная шкала",
    pt: "Linha do Tempo",
    ar: "الجدول الزمني"
  },
  "roadmap.viewOnGithub": {
    en: "View Full Roadmap on GitHub",
    es: "Ver la Hoja de Ruta Completa en GitHub",
    fr: "Voir la Feuille de Route Complète sur GitHub",
    de: "Vollständige Roadmap auf GitHub Anzeigen",
    sv: "Visa Fullständig Färdplan på GitHub",
    ja: "GitHubで完全なロードマップを見る",
    zh: "在GitHub上查看完整路线图",
    ru: "Посмотреть полный план на GitHub",
    pt: "Ver Roteiro Completo no GitHub",
    ar: "عرض خارطة الطريق الكاملة على GitHub"
  },
  
  // Plan names for translation
  "plan.free": {
    en: "Free",
    es: "Gratis",
    fr: "Gratuit",
    de: "Kostenlos",
    sv: "Gratis",
    ja: "無料",
    zh: "免费",
    ru: "Бесплатный",
    pt: "Gratuito",
    ar: "مجاني"
  },
  "plan.standard": {
    en: "Standard",
    es: "Estándar",
    fr: "Standard",
    de: "Standard",
    sv: "Standard",
    ja: "スタンダード",
    zh: "标准",
    ru: "Стандарт",
    pt: "Padrão",
    ar: "قياسي"
  },
  "plan.pro": {
    en: "Pro",
    es: "Pro",
    fr: "Pro",
    de: "Pro",
    sv: "Pro",
    ja: "プロ",
    zh: "专业",
    ru: "Про",
    pt: "Pro",
    ar: "احترافي"
  },
  "plan.enterprise": {
    en: "Enterprise",
    es: "Empresa",
    fr: "Entreprise",
    de: "Unternehmen",
    sv: "Företag",
    ja: "エンタープライズ",
    zh: "企业版",
    ru: "Корпоративный",
    pt: "Empresarial",
    ar: "المؤسسة"
  }
};

export default dashboardTranslations;
