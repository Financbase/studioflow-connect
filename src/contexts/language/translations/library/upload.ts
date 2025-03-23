
import { Language } from "../../types";
import { ensureAllLanguages } from "../../utils";

const uploadTranslations: Record<string, Record<Language, string>> = {
  "library.upload": ensureAllLanguages({
    en: "Upload",
    es: "Subir",
    fr: "Télécharger",
    de: "Hochladen",
    sv: "Ladda upp",
    ja: "アップロード",
    zh: "上传",
    ru: "Загрузить",
    pt: "Carregar",
    ar: "تحميل"
  }),
  "library.uploadStarted": ensureAllLanguages({
    en: "Upload Started",
    es: "Carga Iniciada",
    fr: "Téléchargement Commencé",
    de: "Upload Gestartet",
    sv: "Uppladdning Startad",
    ja: "アップロード開始",
    zh: "上传已开始",
    ru: "Загрузка Начата",
    pt: "Upload Iniciado",
    ar: "بدأ التحميل"
  }),
  "library.uploadDescription": ensureAllLanguages({
    en: "Your files are being uploaded. This may take a moment.",
    es: "Tus archivos se están subiendo. Esto puede tomar un momento.",
    fr: "Vos fichiers sont en cours de téléchargement. Cela peut prendre un moment.",
    de: "Ihre Dateien werden hochgeladen. Dies kann einen Moment dauern.",
    sv: "Dina filer laddas upp. Detta kan ta en stund.",
    ja: "ファイルをアップロード中です。少々お待ちください。",
    zh: "您的文件正在上传。这可能需要一点时间。",
    ru: "Ваши файлы загружаются. Это может занять некоторое время.",
    pt: "Seus arquivos estão sendo carregados. Isso pode levar um momento.",
    ar: "يتم تحميل ملفاتك. قد يستغرق هذا لحظة."
  }),
  "library.uploadResources": ensureAllLanguages({
    en: "Upload Resources",
    es: "Subir Recursos",
    fr: "Télécharger des Ressources",
    de: "Ressourcen Hochladen",
    sv: "Ladda upp Resurser",
    ja: "リソースをアップロード",
    zh: "上传资源",
    ru: "Загрузить Ресурсы",
    pt: "Carregar Recursos",
    ar: "تحميل الموارد"
  }),
  "library.noFiles": ensureAllLanguages({
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
  "library.getStarted": ensureAllLanguages({
    en: "Upload your first audio file to get started",
    es: "Sube tu primer archivo de audio para comenzar",
    fr: "Téléchargez votre premier fichier audio pour commencer",
    de: "Laden Sie Ihre erste Audiodatei hoch, um zu beginnen",
    sv: "Ladda upp din första ljudfil för att komma igång",
    ja: "最初のオーディオファイルをアップロードして始める",
    zh: "上传您的第一个音频文件以开始使用",
    ru: "Загрузите свой первый аудиофайл, чтобы начать",
    pt: "Carregue seu primeiro arquivo de áudio para começar",
    ar: "قم بتحميل أول ملف صوتي للبدء"
  }),
  "library.audioFiles": ensureAllLanguages({
    en: "audio files",
    es: "archivos de audio",
    fr: "fichiers audio",
    de: "Audiodateien",
    sv: "ljudfiler",
    ja: "オーディオファイル",
    zh: "音频文件",
    ru: "аудиофайлы",
    pt: "arquivos de áudio",
    ar: "ملفات صوتية"
  })
};

export default uploadTranslations;
