
import { Language } from "../types";
import { ensureAllLanguages } from "../utils";

const libraryTranslations: Record<string, Record<Language, string>> = {
  "library.title": ensureAllLanguages({
    en: "Audio Library",
    es: "Biblioteca de Audio",
    fr: "Bibliothèque Audio",
    de: "Audio-Bibliothek",
    sv: "Ljudbibliotek",
    ja: "オーディオライブラリ",
    zh: "音频库",
    ru: "Аудиотека",
    pt: "Biblioteca de Áudio",
    ar: "مكتبة الصوت"
  }),
  "library.description": ensureAllLanguages({
    en: "Manage your samples, loops, and audio assets",
    es: "Gestiona tus muestras, loops y recursos de audio",
    fr: "Gérez vos échantillons, boucles et ressources audio",
    de: "Verwalten Sie Ihre Samples, Loops und Audio-Assets",
    sv: "Hantera dina samples, loopar och ljudresurser",
    ja: "サンプル、ループ、オーディオアセットの管理",
    zh: "管理您的样本、循环和音频资产",
    ru: "Управляйте сэмплами, лупами и аудиофайлами",
    pt: "Gerencie suas amostras, loops e recursos de áudio",
    ar: "إدارة العينات والحلقات وملفات الصوت الخاصة بك"
  }),
  "library.upload": ensureAllLanguages({
    en: "Upload Assets",
    es: "Subir Recursos",
    fr: "Télécharger des Ressources",
    de: "Assets hochladen",
    sv: "Ladda upp resurser",
    ja: "アセットをアップロード",
    zh: "上传资源",
    ru: "Загрузить ресурсы",
    pt: "Enviar Recursos",
    ar: "تحميل الملفات"
  }),
  "library.tabs.all": ensureAllLanguages({
    en: "All Files",
    es: "Todos los Archivos",
    fr: "Tous les Fichiers",
    de: "Alle Dateien",
    sv: "Alla Filer",
    ja: "すべてのファイル",
    zh: "所有文件",
    ru: "Все файлы",
    pt: "Todos os Arquivos",
    ar: "جميع الملفات"
  }),
  "library.tabs.samples": ensureAllLanguages({
    en: "Samples",
    es: "Muestras",
    fr: "Échantillons",
    de: "Samples",
    sv: "Samplingar",
    ja: "サンプル",
    zh: "样本",
    ru: "Сэмплы",
    pt: "Amostras",
    ar: "عينات"
  }),
  "library.tabs.loops": ensureAllLanguages({
    en: "Loops",
    es: "Loops",
    fr: "Boucles",
    de: "Loops",
    sv: "Loopar",
    ja: "ループ",
    zh: "循环",
    ru: "Лупы",
    pt: "Loops",
    ar: "حلقات"
  }),
  "library.tabs.vocals": ensureAllLanguages({
    en: "Vocals",
    es: "Vocales",
    fr: "Voix",
    de: "Gesang",
    sv: "Sång",
    ja: "ボーカル",
    zh: "人声",
    ru: "Вокал",
    pt: "Vocais",
    ar: "الأصوات"
  }),
  "library.recentlyAdded": ensureAllLanguages({
    en: "Recently Added",
    es: "Añadido Recientemente",
    fr: "Ajouté Récemment",
    de: "Kürzlich Hinzugefügt",
    sv: "Nyligen Tillagd",
    ja: "最近追加",
    zh: "最近添加",
    ru: "Недавно добавленные",
    pt: "Adicionado Recentemente",
    ar: "أضيف مؤخرًا"
  }),
  "library.recentlyAddedDescription": ensureAllLanguages({
    en: "Your most recent audio files",
    es: "Tus archivos de audio más recientes",
    fr: "Vos fichiers audio les plus récents",
    de: "Ihre neuesten Audiodateien",
    sv: "Dina senaste ljudfiler",
    ja: "最近のオーディオファイル",
    zh: "您最近的音频文件",
    ru: "Ваши недавние аудиофайлы",
    pt: "Seus arquivos de áudio mais recentes",
    ar: "ملفات الصوت الأخيرة الخاصة بك"
  }),
  "library.empty.all.title": ensureAllLanguages({
    en: "No audio files found",
    es: "No se encontraron archivos de audio",
    fr: "Aucun fichier audio trouvé",
    de: "Keine Audiodateien gefunden",
    sv: "Inga ljudfiler hittades",
    ja: "オーディオファイルが見つかりません",
    zh: "未找到音频文件",
    ru: "Аудиофайлы не найдены",
    pt: "Nenhum arquivo de áudio encontrado",
    ar: "لم يتم العثور على ملفات صوتية"
  }),
  "library.empty.all.description": ensureAllLanguages({
    en: "Upload or create audio files to see them here",
    es: "Sube o crea archivos de audio para verlos aquí",
    fr: "Téléchargez ou créez des fichiers audio pour les voir ici",
    de: "Laden Sie Audiodateien hoch oder erstellen Sie sie, um sie hier zu sehen",
    sv: "Ladda upp eller skapa ljudfiler för att se dem här",
    ja: "オーディオファイルをアップロードまたは作成して表示します",
    zh: "上传或创建音频文件以在此处查看",
    ru: "Загрузите или создайте аудиофайлы, чтобы увидеть их здесь",
    pt: "Faça upload ou crie arquivos de áudio para vê-los aqui",
    ar: "قم بتحميل أو إنشاء ملفات صوتية لرؤيتها هنا"
  }),
  "library.empty.samples.title": ensureAllLanguages({
    en: "No samples found",
    es: "No se encontraron muestras",
    fr: "Aucun échantillon trouvé",
    de: "Keine Samples gefunden",
    sv: "Inga samplingar hittades",
    ja: "サンプルが見つかりません",
    zh: "未找到样本",
    ru: "Сэмплы не найдены",
    pt: "Nenhuma amostra encontrada",
    ar: "لم يتم العثور على عينات"
  }),
  "library.empty.samples.description": ensureAllLanguages({
    en: "Upload or create samples to see them here",
    es: "Sube o crea muestras para verlas aquí",
    fr: "Téléchargez ou créez des échantillons pour les voir ici",
    de: "Laden Sie Samples hoch oder erstellen Sie sie, um sie hier zu sehen",
    sv: "Ladda upp eller skapa samplingar för att se dem här",
    ja: "サンプルをアップロードまたは作成して表示します",
    zh: "上传或创建样本以在此处查看",
    ru: "Загрузите или создайте сэмплы, чтобы увидеть их здесь",
    pt: "Faça upload ou crie amostras para vê-las aqui",
    ar: "قم بتحميل أو إنشاء عينات لرؤيتها هنا"
  }),
  "library.empty.loops.title": ensureAllLanguages({
    en: "No loops found",
    es: "No se encontraron loops",
    fr: "Aucune boucle trouvée",
    de: "Keine Loops gefunden",
    sv: "Inga loopar hittades",
    ja: "ループが見つかりません",
    zh: "未找到循环",
    ru: "Лупы не найдены",
    pt: "Nenhum loop encontrado",
    ar: "لم يتم العثور على حلقات"
  }),
  "library.empty.loops.description": ensureAllLanguages({
    en: "Upload or create loops to see them here",
    es: "Sube o crea loops para verlos aquí",
    fr: "Téléchargez ou créez des boucles pour les voir ici",
    de: "Laden Sie Loops hoch oder erstellen Sie sie, um sie hier zu sehen",
    sv: "Ladda upp eller skapa loopar för att se dem här",
    ja: "ループをアップロードまたは作成して表示します",
    zh: "上传或创建循环以在此处查看",
    ru: "Загрузите или создайте лупы, чтобы увидеть их здесь",
    pt: "Faça upload ou crie loops para vê-los aqui",
    ar: "قم بتحميل أو إنشاء حلقات لرؤيتها هنا"
  }),
  "library.empty.vocals.title": ensureAllLanguages({
    en: "No vocals found",
    es: "No se encontraron vocales",
    fr: "Aucune voix trouvée",
    de: "Kein Gesang gefunden",
    sv: "Ingen sång hittades",
    ja: "ボーカルが見つかりません",
    zh: "未找到人声",
    ru: "Вокал не найден",
    pt: "Nenhum vocal encontrado",
    ar: "لم يتم العثور على أصوات"
  }),
  "library.empty.vocals.description": ensureAllLanguages({
    en: "Upload or create vocals to see them here",
    es: "Sube o crea vocales para verlos aquí",
    fr: "Téléchargez ou créez des voix pour les voir ici",
    de: "Laden Sie Gesang hoch oder erstellen Sie ihn, um ihn hier zu sehen",
    sv: "Ladda upp eller skapa sång för att se dem här",
    ja: "ボーカルをアップロードまたは作成して表示します",
    zh: "上传或创建人声以在此处查看",
    ru: "Загрузите или создайте вокал, чтобы увидеть его здесь",
    pt: "Faça upload ou crie vocais para vê-los aqui",
    ar: "قم بتحميل أو إنشاء أصوات لرؤيتها هنا"
  }),
  "library.searchFilter.search": ensureAllLanguages({
    en: "Search files...",
    es: "Buscar archivos...",
    fr: "Rechercher des fichiers...",
    de: "Dateien suchen...",
    sv: "Sök filer...",
    ja: "ファイルを検索...",
    zh: "搜索文件...",
    ru: "Поиск файлов...",
    pt: "Pesquisar arquivos...",
    ar: "البحث عن الملفات..."
  }),
  "library.searchFilter.sortBy": ensureAllLanguages({
    en: "Sort by",
    es: "Ordenar por",
    fr: "Trier par",
    de: "Sortieren nach",
    sv: "Sortera efter",
    ja: "並び替え",
    zh: "排序方式",
    ru: "Сортировать по",
    pt: "Ordenar por",
    ar: "ترتيب حسب"
  }),
  "library.searchFilter.date": ensureAllLanguages({
    en: "Date",
    es: "Fecha",
    fr: "Date",
    de: "Datum",
    sv: "Datum",
    ja: "日付",
    zh: "日期",
    ru: "Дата",
    pt: "Data",
    ar: "التاريخ"
  }),
  "library.searchFilter.name": ensureAllLanguages({
    en: "Name",
    es: "Nombre",
    fr: "Nom",
    de: "Name",
    sv: "Namn",
    ja: "名前",
    zh: "名称",
    ru: "Имя",
    pt: "Nome",
    ar: "الاسم"
  }),
  "library.searchFilter.size": ensureAllLanguages({
    en: "Size",
    es: "Tamaño",
    fr: "Taille",
    de: "Größe",
    sv: "Storlek",
    ja: "サイズ",
    zh: "大小",
    ru: "Размер",
    pt: "Tamanho",
    ar: "الحجم"
  }),
  "library.storagePanel.title": ensureAllLanguages({
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
  "library.storagePanel.used": ensureAllLanguages({
    en: "Used",
    es: "Usado",
    fr: "Utilisé",
    de: "Verwendet",
    sv: "Använt",
    ja: "使用中",
    zh: "已使用",
    ru: "Использовано",
    pt: "Usado",
    ar: "مستخدم"
  }),
  "library.storagePanel.free": ensureAllLanguages({
    en: "Free",
    es: "Libre",
    fr: "Libre",
    de: "Frei",
    sv: "Ledigt",
    ja: "空き",
    zh: "可用",
    ru: "Свободно",
    pt: "Livre",
    ar: "متاح"
  }),
  "library.storagePanel.upgrade": ensureAllLanguages({
    en: "Upgrade Storage",
    es: "Actualizar Almacenamiento",
    fr: "Augmenter le Stockage",
    de: "Speicher Erweitern",
    sv: "Uppgradera Lagring",
    ja: "ストレージをアップグレード",
    zh: "升级存储",
    ru: "Расширить хранилище",
    pt: "Aumentar Armazenamento",
    ar: "ترقية التخزين"
  })
};

export default libraryTranslations;
