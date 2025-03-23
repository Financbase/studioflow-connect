
import { Language } from "../../types";
import { ensureAllLanguages } from "../../utils";

const generalLibraryTranslations: Record<string, Record<Language, string>> = {
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
  "library.uploadStarted": ensureAllLanguages({
    en: "Upload Started",
    es: "Carga Iniciada",
    fr: "Téléchargement Commencé",
    de: "Upload Gestartet",
    sv: "Uppladdning Startad",
    ja: "アップロード開始",
    zh: "上传已开始",
    ru: "Загрузка начата",
    pt: "Upload Iniciado",
    ar: "بدأ التحميل"
  }),
  "library.uploadDescription": ensureAllLanguages({
    en: "Your files are being uploaded to the library",
    es: "Tus archivos se están subiendo a la biblioteca",
    fr: "Vos fichiers sont en cours de téléchargement vers la bibliothèque",
    de: "Ihre Dateien werden in die Bibliothek hochgeladen",
    sv: "Dina filer laddas upp till biblioteket",
    ja: "ファイルがライブラリにアップロードされています",
    zh: "您的文件正在上传到库中",
    ru: "Ваши файлы загружаются в библиотеку",
    pt: "Seus arquivos estão sendo enviados para a biblioteca",
    ar: "يتم تحميل ملفاتك إلى المكتبة"
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
  })
};

export default generalLibraryTranslations;
