
import { Language } from "../types";
import { ensureAllLanguages } from "../utils";

const connectTranslations: Record<string, Record<Language, string>> = {
  "connect.title": ensureAllLanguages({
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
  "connect.subtitle": ensureAllLanguages({
    en: "Open-source cross-platform storage access for audio production",
    es: "Acceso de almacenamiento multiplataforma de código abierto para producción de audio",
    fr: "Accès de stockage multiplateforme open-source pour la production audio",
    de: "Open-Source plattformübergreifender Speicherzugriff für Audioproduktion",
    sv: "Öppen källkod multiplattforms lagringsåtkomst för ljudproduktion",
    ja: "オーディオ制作のためのオープンソースのクロスプラットフォームストレージアクセス",
    zh: "用于音频制作的开源跨平台存储访问",
    ru: "Кроссплатформенный доступ к хранилищу с открытым исходным кодом для аудиопроизводства",
    pt: "Acesso de armazenamento multiplataforma de código aberto para produção de áudio",
    ar: "وصول تخزين مفتوح المصدر متعدد المنصات لإنتاج الصوت"
  }),
  
  "connect.tabs.connect": ensureAllLanguages({
    en: "Connect",
    es: "Conectar",
    fr: "Connecter",
    de: "Verbinden",
    sv: "Anslut",
    ja: "接続",
    zh: "连接",
    ru: "Подключение",
    pt: "Conectar",
    ar: "ربط"
  }),
  "connect.tabs.devices": ensureAllLanguages({
    en: "Devices",
    es: "Dispositivos",
    fr: "Appareils",
    de: "Geräte",
    sv: "Enheter",
    ja: "デバイス",
    zh: "设备",
    ru: "Устройства",
    pt: "Dispositivos",
    ar: "الأجهزة"
  }),
  "connect.tabs.storage": ensureAllLanguages({
    en: "Storage",
    es: "Almacenamiento",
    fr: "Stockage",
    de: "Speicher",
    sv: "Lagring",
    ja: "ストレージ",
    zh: "存储",
    ru: "Хранилище",
    pt: "Armazenamento",
    ar: "التخزين"
  }),
  "connect.tabs.plugins": ensureAllLanguages({
    en: "Plugins",
    es: "Complementos",
    fr: "Plugins",
    de: "Plugins",
    sv: "Plugins",
    ja: "プラグイン",
    zh: "插件",
    ru: "Плагины",
    pt: "Plugins",
    ar: "الإضافات"
  }),
  
  "connect.cards.connect.title": ensureAllLanguages({
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
  "connect.cards.connect.description": ensureAllLanguages({
    en: "The Foundation of the VR Mixing Project",
    es: "La Fundación del Proyecto de Mezcla VR",
    fr: "La Fondation du Projet de Mixage VR",
    de: "Die Grundlage des VR-Mixing-Projekts",
    sv: "Grunden för VR-mixningsprojektet",
    ja: "VRミキシングプロジェクトの基盤",
    zh: "VR混音项目的基础",
    ru: "Основа проекта VR-микширования",
    pt: "A Fundação do Projeto de Mixagem VR",
    ar: "أساس مشروع المزج بالواقع الافتراضي"
  }),
  
  "connect.cards.devices.title": ensureAllLanguages({
    en: "Device Management",
    es: "Gestión de Dispositivos",
    fr: "Gestion des Appareils",
    de: "Geräteverwaltung",
    sv: "Enhetshantering",
    ja: "デバイス管理",
    zh: "设备管理",
    ru: "Управление устройствами",
    pt: "Gerenciamento de Dispositivos",
    ar: "إدارة الأجهزة"
  }),
  "connect.cards.devices.description": ensureAllLanguages({
    en: "Connect and manage your audio hardware",
    es: "Conecte y administre su hardware de audio",
    fr: "Connectez et gérez votre matériel audio",
    de: "Verbinden und verwalten Sie Ihre Audio-Hardware",
    sv: "Anslut och hantera din ljudhårdvara",
    ja: "オーディオハードウェアを接続および管理する",
    zh: "连接和管理您的音频硬件",
    ru: "Подключайте и управляйте своим аудиооборудованием",
    pt: "Conecte e gerencie seu hardware de áudio",
    ar: "توصيل وإدارة أجهزة الصوت الخاصة بك"
  }),
  
  "connect.cards.storage.title": ensureAllLanguages({
    en: "Storage Management",
    es: "Gestión de Almacenamiento",
    fr: "Gestion du Stockage",
    de: "Speicherverwaltung",
    sv: "Lagringshantering",
    ja: "ストレージ管理",
    zh: "存储管理",
    ru: "Управление хранилищем",
    pt: "Gerenciamento de Armazenamento",
    ar: "إدارة التخزين"
  }),
  "connect.cards.storage.description": ensureAllLanguages({
    en: "Configure your storage drives and backups",
    es: "Configure sus unidades de almacenamiento y copias de seguridad",
    fr: "Configurez vos lecteurs de stockage et sauvegardes",
    de: "Konfigurieren Sie Ihre Speicherlaufwerke und Backups",
    sv: "Konfigurera dina lagringsenheter och säkerhetskopior",
    ja: "ストレージドライブとバックアップを構成する",
    zh: "配置您的存储驱动器和备份",
    ru: "Настройте ваши накопители и резервные копии",
    pt: "Configure seus drives de armazenamento e backups",
    ar: "تكوين محركات التخزين والنسخ الاحتياطية"
  }),
  
  "connect.cards.plugins.title": ensureAllLanguages({
    en: "Plugin Bridge",
    es: "Puente de Complementos",
    fr: "Pont de Plugins",
    de: "Plugin-Brücke",
    sv: "Plugin-brygga",
    ja: "プラグインブリッジ",
    zh: "插件桥",
    ru: "Мост для плагинов",
    pt: "Ponte de Plugins",
    ar: "جسر الإضافات"
  }),
  "connect.cards.plugins.description": ensureAllLanguages({
    en: "Manage cross-platform plugin compatibility",
    es: "Gestione la compatibilidad de complementos multiplataforma",
    fr: "Gérez la compatibilité des plugins multiplateforme",
    de: "Verwalten Sie die plattformübergreifende Plugin-Kompatibilität",
    sv: "Hantera plattformsoberoende plugin-kompatibilitet",
    ja: "クロスプラットフォームのプラグイン互換性を管理する",
    zh: "管理跨平台插件兼容性",
    ru: "Управляйте кроссплатформенной совместимостью плагинов",
    pt: "Gerencie a compatibilidade de plugins multiplataforma",
    ar: "إدارة توافق المكونات الإضافية عبر المنصات"
  }),
  
  // StudioFlow Connect specific translations
  "studioflow.driveManager": ensureAllLanguages({
    en: "Universal Drive Manager",
    es: "Administrador de Unidades Universal",
    fr: "Gestionnaire de Disques Universel",
    de: "Universeller Laufwerksmanager",
    sv: "Universell Enhetshanterare",
    ja: "ユニバーサルドライブマネージャー",
    zh: "通用驱动器管理器",
    ru: "Универсальный менеджер дисков",
    pt: "Gerenciador de Unidades Universal",
    ar: "مدير محركات الأقراص العالمي"
  }),
  "studioflow.storageUsage": ensureAllLanguages({
    en: "Storage Usage",
    es: "Uso de Almacenamiento",
    fr: "Utilisation du Stockage",
    de: "Speichernutzung",
    sv: "Lagringsanvändning",
    ja: "ストレージ使用量",
    zh: "存储使用情况",
    ru: "Использование хранилища",
    pt: "Uso de Armazenamento",
    ar: "استخدام التخزين"
  }),
  "studioflow.syncingProgress": ensureAllLanguages({
    en: "Syncing progress",
    es: "Progreso de sincronización",
    fr: "Progression de la synchronisation",
    de: "Synchronisierungsfortschritt",
    sv: "Synkroniseringsförlopp",
    ja: "同期の進行状況",
    zh: "同步进度",
    ru: "Прогресс синхронизации",
    pt: "Progresso de sincronização",
    ar: "تقدم المزامنة"
  }),
  "studioflow.timeRemaining": ensureAllLanguages({
    en: "Estimated time remaining",
    es: "Tiempo estimado restante",
    fr: "Temps restant estimé",
    de: "Geschätzte verbleibende Zeit",
    sv: "Beräknad återstående tid",
    ja: "推定残り時間",
    zh: "预计剩余时间",
    ru: "Расчетное оставшееся время",
    pt: "Tempo restante estimado",
    ar: "الوقت المقدر المتبقي"
  }),
  "studioflow.projectVersions": ensureAllLanguages({
    en: "Project versions",
    es: "Versiones del proyecto",
    fr: "Versions du projet",
    de: "Projektversionen",
    sv: "Projektversioner",
    ja: "プロジェクトバージョン",
    zh: "项目版本",
    ru: "Версии проекта",
    pt: "Versões do projeto",
    ar: "إصدارات المشروع"
  }),
  "studioflow.currentVersion": ensureAllLanguages({
    en: "Current version",
    es: "Versión actual",
    fr: "Version actuelle",
    de: "Aktuelle Version",
    sv: "Aktuell version",
    ja: "現在のバージョン",
    zh: "当前版本",
    ru: "Текущая версия",
    pt: "Versão atual",
    ar: "الإصدار الحالي"
  }),
  "studioflow.totalVersions": ensureAllLanguages({
    en: "Total versions",
    es: "Versiones totales",
    fr: "Versions totales",
    de: "Gesamtversionen",
    sv: "Totala versioner",
    ja: "合計バージョン",
    zh: "总版本数",
    ru: "Всего версий",
    pt: "Versões totais",
    ar: "إجمالي الإصدارات"
  }),
  "studioflow.convertToUniversal": ensureAllLanguages({
    en: "Convert to Universal",
    es: "Convertir a Universal",
    fr: "Convertir en Universal",
    de: "In Universal konvertieren",
    sv: "Konvertera till Universal",
    ja: "ユニバーサルに変換",
    zh: "转换为通用格式",
    ru: "Преобразовать в универсальный",
    pt: "Converter para Universal",
    ar: "التحويل إلى عالمي"
  }),
  "studioflow.connectDrive": ensureAllLanguages({
    en: "Connect Drive",
    es: "Conectar Unidad",
    fr: "Connecter le Disque",
    de: "Laufwerk verbinden",
    sv: "Anslut enhet",
    ja: "ドライブを接続",
    zh: "连接驱动器",
    ru: "Подключить диск",
    pt: "Conectar Unidade",
    ar: "توصيل محرك الأقراص"
  }),
  "studioflow.coreFeatures": ensureAllLanguages({
    en: "Core Features",
    es: "Características Principales",
    fr: "Fonctionnalités Principales",
    de: "Kernfunktionen",
    sv: "Kärnfunktioner",
    ja: "コア機能",
    zh: "核心功能",
    ru: "Основные функции",
    pt: "Recursos Principais",
    ar: "الميزات الأساسية"
  }),
  "studioflow.universalBridge": ensureAllLanguages({
    en: "Universal Bridge",
    es: "Puente Universal",
    fr: "Pont Universel",
    de: "Universal-Brücke",
    sv: "Universell Brygga",
    ja: "ユニバーサルブリッジ",
    zh: "通用桥接",
    ru: "Универсальный мост",
    pt: "Ponte Universal",
    ar: "جسر عالمي"
  }),
  "studioflow.universalBridgeDesc": ensureAllLanguages({
    en: "Provides seamless access to any drive format across macOS, Windows, and Linux platforms.",
    es: "Proporciona acceso sin problemas a cualquier formato de unidad en plataformas macOS, Windows y Linux.",
    fr: "Fournit un accès transparent à tout format de disque sur les plateformes macOS, Windows et Linux.",
    de: "Bietet nahtlosen Zugriff auf jedes Laufwerksformat über macOS-, Windows- und Linux-Plattformen hinweg.",
    sv: "Ger sömlös åtkomst till alla enhetsformat över macOS-, Windows- och Linux-plattformar.",
    ja: "macOS、Windows、およびLinuxプラットフォーム間で、あらゆるドライブ形式へのシームレスなアクセスを提供します。",
    zh: "提供跨macOS、Windows和Linux平台对任何驱动器格式的无缝访问。",
    ru: "Обеспечивает беспрепятственный доступ к любому формату диска на платформах macOS, Windows и Linux.",
    pt: "Fornece acesso perfeito a qualquer formato de unidade nas plataformas macOS, Windows e Linux.",
    ar: "يوفر وصولاً سلسًا إلى أي تنسيق محرك أقراص عبر منصات macOS وWindows وLinux."
  }),
  "studioflow.autoVersioning": ensureAllLanguages({
    en: "Auto-Versioning",
    es: "Versionado Automático",
    fr: "Versionnage Automatique",
    de: "Auto-Versionierung",
    sv: "Automatisk Versionshantering",
    ja: "自動バージョン管理",
    zh: "自动版本控制",
    ru: "Авто-версионирование",
    pt: "Versionamento Automático",
    ar: "إصدار تلقائي"
  }),
  "studioflow.autoVersioningDesc": ensureAllLanguages({
    en: "Automatically creates versions of all project files without manual saving.",
    es: "Crea automáticamente versiones de todos los archivos del proyecto sin guardar manualmente.",
    fr: "Crée automatiquement des versions de tous les fichiers du projet sans enregistrement manuel.",
    de: "Erstellt automatisch Versionen aller Projektdateien ohne manuelles Speichern.",
    sv: "Skapar automatiskt versioner av alla projektfiler utan manuell sparande.",
    ja: "手動で保存せずに、すべてのプロジェクトファイルのバージョンを自動的に作成します。",
    zh: "自动创建所有项目文件的版本，无需手动保存。",
    ru: "Автоматически создает версии всех файлов проекта без ручного сохранения.",
    pt: "Cria automaticamente versões de todos os arquivos do projeto sem salvamento manual.",
    ar: "ينشئ تلقائيًا إصدارات من جميع ملفات المشروع دون الحفظ اليدوي."
  }),
  "studioflow.hardwareAcceleration": ensureAllLanguages({
    en: "Hardware Acceleration",
    es: "Aceleración de Hardware",
    fr: "Accélération Matérielle",
    de: "Hardware-Beschleunigung",
    sv: "Hårdvaruacceleration",
    ja: "ハードウェアアクセラレーション",
    zh: "硬件加速",
    ru: "Аппаратное ускорение",
    pt: "Aceleração de Hardware",
    ar: "تسريع الأجهزة"
  }),
  "studioflow.hardwareAccelerationDesc": ensureAllLanguages({
    en: "Utilizes GPU acceleration for faster file transfers and audio streaming.",
    es: "Utiliza aceleración GPU para transferencias de archivos más rápidas y transmisión de audio.",
    fr: "Utilise l'accélération GPU pour des transferts de fichiers plus rapides et le streaming audio.",
    de: "Nutzt GPU-Beschleunigung für schnellere Dateiübertragungen und Audio-Streaming.",
    sv: "Använder GPU-acceleration för snabbare filöverföringar och ljudstreaming.",
    ja: "より高速なファイル転送とオーディオストリーミングのためにGPUアクセラレーションを活用します。",
    zh: "利用GPU加速实现更快的文件传输和音频流传输。",
    ru: "Использует ускорение GPU для более быстрой передачи файлов и потоковой передачи аудио.",
    pt: "Utiliza aceleração GPU para transferências de arquivos mais rápidas e streaming de áudio.",
    ar: "يستخدم تسريع وحدة معالجة الرسومات لنقل الملفات بشكل أسرع وبث الصوت."
  }),
  "studioflow.legacyIntegration": ensureAllLanguages({
    en: "Legacy Integration",
    es: "Integración de Legacy",
    fr: "Intégration Legacy",
    de: "Legacy-Integration",
    sv: "Legacy-integration",
    ja: "レガシー統合",
    zh: "旧版集成",
    ru: "Интеграция с устаревшими системами",
    pt: "Integração com Legacy",
    ar: "تكامل الإرث"
  }),
  "studioflow.pluginBridge": ensureAllLanguages({
    en: "Plugin Bridge Connected",
    es: "Puente de Complementos Conectado",
    fr: "Pont de Plugins Connecté",
    de: "Plugin-Brücke Verbunden",
    sv: "Plugin-brygga Ansluten",
    ja: "プラグインブリッジ接続済み",
    zh: "插件桥已连接",
    ru: "Мост для плагинов подключен",
    pt: "Ponte de Plugins Conectada",
    ar: "تم توصيل جسر المكونات الإضافية"
  }),
  "studioflow.pluginBridgeDesc": ensureAllLanguages({
    en: "StudioFlow Connect provides seamless support for legacy plugins and hardware through our universal plugin bridge.",
    es: "StudioFlow Connect proporciona soporte perfecto para complementos y hardware heredados a través de nuestro puente de complementos universal.",
    fr: "StudioFlow Connect fournit un support transparent pour les plugins et le matériel existants grâce à notre pont de plugins universel.",
    de: "StudioFlow Connect bietet nahtlose Unterstützung für Legacy-Plugins und -Hardware über unsere universelle Plugin-Brücke.",
    sv: "StudioFlow Connect ger sömlöst stöd för äldre plugins och hårdvara genom vår universella plugin-brygga.",
    ja: "StudioFlow Connectは、当社のユニバーサルプラグインブリッジを通じて、レガシープラグインとハードウェアのシームレスなサポートを提供します。",
    zh: "StudioFlow Connect通过我们的通用插件桥为旧版插件和硬件提供无缝支持。",
    ru: "StudioFlow Connect обеспечивает беспрепятственную поддержку устаревших плагинов и оборудования через наш универсальный мост для плагинов.",
    pt: "StudioFlow Connect fornece suporte perfeito para plugins e hardware legados através de nossa ponte de plugins universal.",
    ar: "يوفر StudioFlow Connect دعمًا سلسًا للمكونات الإضافية والأجهزة القديمة من خلال جسر المكونات الإضافية العالمي."
  }),
  "studioflow.configureBridge": ensureAllLanguages({
    en: "Configure Bridge",
    es: "Configurar Puente",
    fr: "Configurer le Pont",
    de: "Brücke Konfigurieren",
    sv: "Konfigurera Brygga",
    ja: "ブリッジを構成",
    zh: "配置桥接",
    ru: "Настроить мост",
    pt: "Configurar Ponte",
    ar: "تكوين الجسر"
  }),
  "studioflow.enabled": ensureAllLanguages({
    en: "Enabled",
    es: "Habilitado",
    fr: "Activé",
    de: "Aktiviert",
    sv: "Aktiverad",
    ja: "有効",
    zh: "已启用",
    ru: "Включено",
    pt: "Habilitado",
    ar: "مُمكّن"
  }),
  "studioflow.active": ensureAllLanguages({
    en: "Active",
    es: "Activo",
    fr: "Actif",
    de: "Aktiv",
    sv: "Aktiv",
    ja: "アクティブ",
    zh: "活动",
    ru: "Активно",
    pt: "Ativo",
    ar: "نشط"
  }),
  "studioflow.universalFormat": ensureAllLanguages({
    en: "Universal Format",
    es: "Formato Universal",
    fr: "Format Universel",
    de: "Universelles Format",
    sv: "Universellt Format",
    ja: "ユニバーサルフォーマット",
    zh: "通用格式",
    ru: "Универсальный формат",
    pt: "Formato Universal",
    ar: "تنسيق عالمي"
  })
};

export default connectTranslations;
