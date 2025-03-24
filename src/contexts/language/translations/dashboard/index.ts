
import { Language } from "../../types";
import { ensureAllLanguages } from "../../utils";

const dashboardTranslations: Record<string, Record<Language, string>> = {
  "dashboard.title": ensureAllLanguages({
    en: "Dashboard",
    es: "Panel de control",
    fr: "Tableau de bord",
    de: "Dashboard",
    sv: "Instrumentpanel",
    ja: "ダッシュボード",
    zh: "仪表板",
    ru: "Панель управления",
    pt: "Painel de controle",
    ar: "لوحة التحكم"
  }),
  "dashboard.subtitle": ensureAllLanguages({
    en: "Monitor and manage your audio production environment",
    es: "Monitorea y administra tu entorno de producción de audio",
    fr: "Surveillez et gérez votre environnement de production audio",
    de: "Überwachen und verwalten Sie Ihre Audioproduktionsumgebung",
    sv: "Övervaka och hantera din ljudproduktionsmiljö",
    ja: "オーディオ制作環境を監視および管理する",
    zh: "监控和管理您的音频制作环境",
    ru: "Мониторинг и управление средой аудиопроизводства",
    pt: "Monitore e gerencie seu ambiente de produção de áudio",
    ar: "مراقبة وإدارة بيئة إنتاج الصوت الخاصة بك"
  }),
  "dashboard.loading": ensureAllLanguages({
    en: "Loading dashboard...",
    es: "Cargando panel de control...",
    fr: "Chargement du tableau de bord...",
    de: "Dashboard wird geladen...",
    sv: "Laddar instrumentpanel...",
    ja: "ダッシュボードを読み込んでいます...",
    zh: "加载仪表板...",
    ru: "Загрузка панели управления...",
    pt: "Carregando painel de controle...",
    ar: "جار تحميل لوحة التحكم..."
  }),
  "dashboard.exploreKnowledge": ensureAllLanguages({
    en: "Explore Knowledge Base",
    es: "Explorar base de conocimientos",
    fr: "Explorer la base de connaissances",
    de: "Wissensdatenbank erkunden",
    sv: "Utforska kunskapsbasen",
    ja: "ナレッジベースを探索",
    zh: "探索知识库",
    ru: "Изучить базу знаний",
    pt: "Explorar base de conhecimento",
    ar: "استكشاف قاعدة المعرفة"
  }),
  "dashboard.studioTechniques": ensureAllLanguages({
    en: "Studio Techniques",
    es: "Técnicas de estudio",
    fr: "Techniques de studio",
    de: "Studio-Techniken",
    sv: "Studiotekniker",
    ja: "スタジオテクニック",
    zh: "录音室技术",
    ru: "Студийные техники",
    pt: "Técnicas de estúdio",
    ar: "تقنيات الاستوديو"
  }),
  "dashboard.studioTechniquesDescription": ensureAllLanguages({
    en: "Learn professional recording and mixing techniques",
    es: "Aprende técnicas profesionales de grabación y mezcla",
    fr: "Apprenez les techniques professionnelles d'enregistrement et de mixage",
    de: "Lernen Sie professionelle Aufnahme- und Mischtechniken",
    sv: "Lär dig professionella inspelnings- och mixningstekniker",
    ja: "プロのレコーディングとミキシングのテクニックを学ぶ",
    zh: "学习专业录音和混音技术",
    ru: "Изучите профессиональные техники записи и сведения",
    pt: "Aprenda técnicas profissionais de gravação e mixagem",
    ar: "تعلم تقنيات التسجيل والمزج الاحترافية"
  }),
  "dashboard.audioTroubleshooting": ensureAllLanguages({
    en: "Audio Troubleshooting",
    es: "Solución de problemas de audio",
    fr: "Dépannage audio",
    de: "Audio-Fehlerbehebung",
    sv: "Felsökning av ljud",
    ja: "オーディオトラブルシューティング",
    zh: "音频故障排除",
    ru: "Устранение проблем со звуком",
    pt: "Solução de problemas de áudio",
    ar: "استكشاف أخطاء الصوت وإصلاحها"
  }),
  "dashboard.audioTroubleshootingDescription": ensureAllLanguages({
    en: "Resolve common audio issues and optimize your setup",
    es: "Resuelve problemas comunes de audio y optimiza tu configuración",
    fr: "Résolvez les problèmes audio courants et optimisez votre configuration",
    de: "Beheben Sie häufige Audioprobleme und optimieren Sie Ihre Einrichtung",
    sv: "Lös vanliga ljudproblem och optimera din konfiguration",
    ja: "一般的なオーディオの問題を解決し、セットアップを最適化する",
    zh: "解决常见的音频问题并优化您的设置",
    ru: "Устраните распространенные проблемы со звуком и оптимизируйте настройки",
    pt: "Resolva problemas comuns de áudio e otimize sua configuração",
    ar: "حل مشكلات الصوت الشائعة وتحسين الإعداد الخاص بك"
  }),
  "dashboard.activity.created": ensureAllLanguages({
    en: "Created",
    es: "Creado",
    fr: "Créé",
    de: "Erstellt",
    sv: "Skapad",
    ja: "作成済み",
    zh: "已创建",
    ru: "Создано",
    pt: "Criado",
    ar: "تم الإنشاء"
  }),
  "dashboard.activity.lastModified": ensureAllLanguages({
    en: "Last modified",
    es: "Última modificación",
    fr: "Dernière modification",
    de: "Zuletzt geändert",
    sv: "Senast ändrad",
    ja: "最終更新",
    zh: "最后修改",
    ru: "Последнее изменение",
    pt: "Última modificação",
    ar: "آخر تعديل"
  }),
  "widgets.connect": ensureAllLanguages({
    en: "StudioFlow Connect",
    es: "StudioFlow Connect",
    fr: "StudioFlow Connect",
    de: "StudioFlow Connect",
    sv: "StudioFlow Connect",
    ja: "StudioFlow Connect",
    zh: "StudioFlow Connect",
    ru: "StudioFlow Connect",
    pt: "StudioFlow Connect",
    ar: "StudioFlow Connect"
  }),
  "widgets.system": ensureAllLanguages({
    en: "System Monitor",
    es: "Monitor del sistema",
    fr: "Moniteur système",
    de: "Systemmonitor",
    sv: "Systemövervakare",
    ja: "システムモニター",
    zh: "系统监视器",
    ru: "Системный монитор",
    pt: "Monitor do sistema",
    ar: "مراقب النظام"
  }),
  "widgets.vm": ensureAllLanguages({
    en: "VM Controller",
    es: "Controlador de VM",
    fr: "Contrôleur VM",
    de: "VM-Controller",
    sv: "VM-kontroller",
    ja: "VM コントローラー",
    zh: "虚拟机控制器",
    ru: "Контроллер VM",
    pt: "Controlador de VM",
    ar: "وحدة تحكم VM"
  }),
  "widgets.daw": ensureAllLanguages({
    en: "DAW Integration",
    es: "Integración DAW",
    fr: "Intégration DAW",
    de: "DAW-Integration",
    sv: "DAW-integration",
    ja: "DAW 統合",
    zh: "DAW 集成",
    ru: "Интеграция DAW",
    pt: "Integração DAW",
    ar: "تكامل DAW"
  }),
  "widgets.audio": ensureAllLanguages({
    en: "Audio Analyzer",
    es: "Analizador de audio",
    fr: "Analyseur audio",
    de: "Audio-Analyzer",
    sv: "Ljudanalysator",
    ja: "オーディオアナライザー",
    zh: "音频分析器",
    ru: "Анализатор звука",
    pt: "Analisador de áudio",
    ar: "محلل الصوت"
  }),
  "widgets.ai": ensureAllLanguages({
    en: "AI Assistant",
    es: "Asistente IA",
    fr: "Assistant IA",
    de: "KI-Assistent",
    sv: "AI-assistent",
    ja: "AI アシスタント",
    zh: "AI 助手",
    ru: "ИИ-ассистент",
    pt: "Assistente de IA",
    ar: "مساعد الذكاء الاصطناعي"
  }),
  "widgets.marketplace": ensureAllLanguages({
    en: "Marketplace",
    es: "Mercado",
    fr: "Marché",
    de: "Marktplatz",
    sv: "Marknadsplats",
    ja: "マーケットプレイス",
    zh: "市场",
    ru: "Маркетплейс",
    pt: "Mercado",
    ar: "السوق"
  })
};

export default dashboardTranslations;
