
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
    en: "Cross-platform storage access and audio device connectivity",
    es: "Acceso a almacenamiento multiplataforma y conectividad de dispositivos de audio",
    fr: "Accès au stockage multiplateforme et connectivité des périphériques audio",
    de: "Plattformübergreifender Speicherzugriff und Audio-Geräteverbindung",
    sv: "Plattformsoberoende lagringsåtkomst och ljudenhetsanslutning",
    ja: "クロスプラットフォームストレージアクセスとオーディオデバイス接続",
    zh: "跨平台存储访问和音频设备连接",
    ru: "Кросс-платформенный доступ к хранилищу и подключение аудиоустройств",
    pt: "Acesso de armazenamento multiplataforma e conectividade de dispositivos de áudio",
    ar: "وصول التخزين عبر المنصات واتصال أجهزة الصوت"
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
    ar: "توصيل"
  }),
  "connect.tabs.devices": ensureAllLanguages({
    en: "Devices",
    es: "Dispositivos",
    fr: "Périphériques",
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
    en: "Connect your storage devices, plugins, and hardware",
    es: "Conecta tus dispositivos de almacenamiento, complementos y hardware",
    fr: "Connectez vos périphériques de stockage, plugins et matériel",
    de: "Verbinden Sie Ihre Speichergeräte, Plugins und Hardware",
    sv: "Anslut dina lagringsenheter, plugins och hårdvara",
    ja: "ストレージデバイス、プラグイン、ハードウェアを接続する",
    zh: "连接您的存储设备、插件和硬件",
    ru: "Подключите ваши устройства хранения, плагины и оборудование",
    pt: "Conecte seus dispositivos de armazenamento, plugins e hardware",
    ar: "قم بتوصيل أجهزة التخزين والإضافات والأجهزة"
  }),
  "connect.cards.devices.title": ensureAllLanguages({
    en: "Connected Devices",
    es: "Dispositivos conectados",
    fr: "Périphériques connectés",
    de: "Verbundene Geräte",
    sv: "Anslutna enheter",
    ja: "接続されたデバイス",
    zh: "已连接设备",
    ru: "Подключенные устройства",
    pt: "Dispositivos conectados",
    ar: "الأجهزة المتصلة"
  }),
  "connect.cards.devices.description": ensureAllLanguages({
    en: "Manage your audio interfaces and MIDI controllers",
    es: "Administra tus interfaces de audio y controladores MIDI",
    fr: "Gérez vos interfaces audio et contrôleurs MIDI",
    de: "Verwalten Sie Ihre Audio-Interfaces und MIDI-Controller",
    sv: "Hantera dina ljudgränssnitt och MIDI-kontroller",
    ja: "オーディオインターフェイスとMIDIコントローラーを管理する",
    zh: "管理您的音频接口和MIDI控制器",
    ru: "Управляйте аудиоинтерфейсами и MIDI-контроллерами",
    pt: "Gerencie suas interfaces de áudio e controladores MIDI",
    ar: "إدارة واجهات الصوت ووحدات تحكم MIDI"
  }),
  "connect.cards.storage.title": ensureAllLanguages({
    en: "Storage Management",
    es: "Gestión de almacenamiento",
    fr: "Gestion du stockage",
    de: "Speicherverwaltung",
    sv: "Lagringshantering",
    ja: "ストレージ管理",
    zh: "存储管理",
    ru: "Управление хранилищем",
    pt: "Gerenciamento de armazenamento",
    ar: "إدارة التخزين"
  }),
  "connect.cards.storage.description": ensureAllLanguages({
    en: "Manage your connected storage devices",
    es: "Administra tus dispositivos de almacenamiento conectados",
    fr: "Gérez vos périphériques de stockage connectés",
    de: "Verwalten Sie Ihre verbundenen Speichergeräte",
    sv: "Hantera dina anslutna lagringsenheter",
    ja: "接続されたストレージデバイスを管理する",
    zh: "管理您连接的存储设备",
    ru: "Управляйте подключенными устройствами хранения",
    pt: "Gerencie seus dispositivos de armazenamento conectados",
    ar: "إدارة أجهزة التخزين المتصلة"
  }),
  "connect.cards.plugins.title": ensureAllLanguages({
    en: "Plugin Bridge",
    es: "Puente de complementos",
    fr: "Pont de plugins",
    de: "Plugin-Brücke",
    sv: "Plugin-brygga",
    ja: "プラグインブリッジ",
    zh: "插件桥",
    ru: "Мост для плагинов",
    pt: "Ponte de plugins",
    ar: "جسر الإضافات"
  }),
  "connect.cards.plugins.description": ensureAllLanguages({
    en: "Manage cross-platform plugin compatibility",
    es: "Administra la compatibilidad de complementos multiplataforma",
    fr: "Gérez la compatibilité des plugins multiplateforme",
    de: "Verwalten Sie die plattformübergreifende Plugin-Kompatibilität",
    sv: "Hantera plattformsoberoende plugin-kompatibilitet",
    ja: "クロスプラットフォームプラグイン互換性を管理する",
    zh: "管理跨平台插件兼容性",
    ru: "Управляйте кросс-платформенной совместимостью плагинов",
    pt: "Gerencie a compatibilidade de plugins multiplataforma",
    ar: "إدارة توافق الإضافات عبر المنصات"
  })
};

export default connectTranslations;
