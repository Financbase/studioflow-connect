
import { Language } from "../../types";
import { ensureAllLanguages } from "../../utils";

const emptyStateTranslations: Record<string, Record<Language, string>> = {
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
  })
};

export default emptyStateTranslations;
