
import { Language } from "../../../types";
import { ensureAllLanguages } from "../../../utils";

const deadlineManagementTranslations: Record<string, Record<Language, string>> = {
  "ai.features.deadlineTitle": ensureAllLanguages({
    en: "Smart Deadline Tracker",
    es: "Gestor Inteligente de Plazos",
    fr: "Suivi Intelligent des Délais",
    de: "Intelligente Terminverfolgung",
    sv: "Smart Deadlinehantering",
    ja: "スマート期限管理",
    zh: "智能截止日期跟踪器",
    ru: "Умный трекер сроков",
    pt: "Gerenciador Inteligente de Prazos",
    ar: "متتبع المواعيد النهائية الذكي"
  }),
  "ai.features.deadlineDesc": ensureAllLanguages({
    en: "Never miss a project deadline with AI-powered scheduling",
    es: "Nunca pierdas un plazo de proyecto con programación potenciada por IA",
    fr: "Ne manquez jamais un délai de projet grâce à la planification alimentée par l'IA",
    de: "Verpassen Sie nie einen Projekttermin mit KI-gestützter Planung",
    sv: "Missa aldrig en projektdeadline med AI-driven schemaläggning",
    ja: "AI搭載のスケジューリングでプロジェクトの期限を逃しません",
    zh: "借助AI驱动的调度功能，不会错过任何项目截止日期",
    ru: "Никогда не пропустите срок проекта благодаря планированию на базе ИИ",
    pt: "Nunca perca um prazo de projeto com agendamento baseado em IA",
    ar: "لا تفوت أي موعد نهائي للمشروع مع الجدولة المدعومة بالذكاء الاصطناعي"
  }),
  "ai.features.deadlineLongDesc": ensureAllLanguages({
    en: "Our AI-powered deadline tracker learns from your work patterns and project history to provide intelligent scheduling assistance. It analyzes your commitments, resource availability, and delivers realistic timeline estimates.",
    es: "Nuestro rastreador de plazos con IA aprende de tus patrones de trabajo e historial de proyectos para brindarte asistencia inteligente en la programación. Analiza tus compromisos, disponibilidad de recursos y proporciona estimaciones realistas de los plazos.",
    fr: "Notre suivi des délais alimenté par l'IA apprend de vos modèles de travail et de l'historique des projets pour fournir une assistance intelligente à la planification. Il analyse vos engagements, la disponibilité des ressources et fournit des estimations réalistes de calendrier.",
    de: "Unser KI-gesteuerter Termin-Tracker lernt aus Ihren Arbeitsmustern und Ihrer Projekthistorie, um intelligente Planungsunterstützung zu bieten. Er analysiert Ihre Verpflichtungen, Ressourcenverfügbarkeit und liefert realistische Zeitplanschätzungen.",
    sv: "Vår AI-drivna deadline-spårare lär sig från dina arbetsmönster och projekthistorik för att ge intelligent schemaläggningshjälp. Den analyserar dina åtaganden, resurstillgänglighet och levererar realistiska tidsuppskattningar.",
    ja: "AI搭載の期限トラッカーは、あなたの作業パターンやプロジェクト履歴から学習し、インテリジェントなスケジューリング支援を提供します。コミットメント、リソースの可用性を分析し、現実的なタイムライン見積もりを提供します。",
    zh: "我们的AI驱动的截止日期跟踪器从您的工作模式和项目历史中学习，提供智能调度帮助。它分析您的承诺、资源可用性，并提供实际的时间表估计。",
    ru: "Наш ИИ-трекер сроков учится на ваших рабочих шаблонах и истории проектов, чтобы обеспечить интеллектуальную помощь в планировании. Он анализирует ваши обязательства, доступность ресурсов и предоставляет реалистичные оценки сроков.",
    pt: "Nosso rastreador de prazos com IA aprende com seus padrões de trabalho e histórico de projetos para fornecer assistência inteligente de agendamento. Ele analisa seus compromissos, disponibilidade de recursos e fornece estimativas realistas de cronograma.",
    ar: "يتعلم متتبع المواعيد النهائية المدعوم بالذكاء الاصطناعي من أنماط عملك وتاريخ المشروع لتقديم مساعدة ذكية في الجدولة. يحلل التزاماتك وتوافر الموارد ويقدم تقديرات واقعية للجدول الزمني."
  }),
  "ai.features.deadlineFeature1": ensureAllLanguages({
    en: "Smart timeline predictions based on your working patterns",
    es: "Predicciones inteligentes de cronogramas basadas en tus patrones de trabajo",
    fr: "Prédictions intelligentes de calendrier basées sur vos habitudes de travail",
    de: "Intelligente Zeitplanvorhersagen basierend auf Ihren Arbeitsmustern",
    sv: "Smarta tidslinjeförutsägelser baserade på dina arbetsmönster",
    ja: "あなたの作業パターンに基づくスマートなタイムライン予測",
    zh: "基于您的工作模式的智能时间线预测",
    ru: "Умные прогнозы сроков на основе ваших рабочих шаблонов",
    pt: "Previsões inteligentes de cronograma com base em seus padrões de trabalho",
    ar: "تنبؤات ذكية للجدول الزمني بناءً على أنماط عملك"
  }),
  "ai.features.deadlineFeature2": ensureAllLanguages({
    en: "Automated resource allocation to meet critical deadlines",
    es: "Asignación automatizada de recursos para cumplir con plazos críticos",
    fr: "Allocation automatisée des ressources pour respecter les délais critiques",
    de: "Automatisierte Ressourcenzuweisung zur Einhaltung kritischer Fristen",
    sv: "Automatiserad resursallokering för att möta kritiska deadlines",
    ja: "重要な期限を守るための自動リソース割り当て",
    zh: "自动资源分配以满足关键截止日期",
    ru: "Автоматическое распределение ресурсов для соблюдения критических сроков",
    pt: "Alocação automatizada de recursos para cumprir prazos críticos",
    ar: "تخصيص الموارد آليًا لتلبية المواعيد النهائية الحرجة"
  }),
  "ai.features.deadlineFeature3": ensureAllLanguages({
    en: "Collaborative scheduling with team availability synchronization",
    es: "Programación colaborativa con sincronización de disponibilidad del equipo",
    fr: "Planification collaborative avec synchronisation de la disponibilité de l'équipe",
    de: "Kollaborative Planung mit Synchronisation der Teamverfügbarkeit",
    sv: "Samverkande schemaläggning med synkronisering av teamtillgänglighet",
    ja: "チームの可用性同期による協調スケジューリング",
    zh: "具有团队可用性同步的协作调度",
    ru: "Совместное планирование с синхронизацией доступности команды",
    pt: "Agendamento colaborativo com sincronização de disponibilidade da equipe",
    ar: "جدولة تعاونية مع مزامنة توافر الفريق"
  }),
  "ai.viewProjects": ensureAllLanguages({
    en: "View Projects",
    es: "Ver Proyectos",
    fr: "Voir les Projets",
    de: "Projekte Anzeigen",
    sv: "Visa Projekt",
    ja: "プロジェクトを表示",
    zh: "查看项目",
    ru: "Просмотр проектов",
    pt: "Ver Projetos",
    ar: "عرض المشاريع"
  })
};

export default deadlineManagementTranslations;
