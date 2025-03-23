
import { Language } from "../../types";
import { ensureAllLanguages } from "../../utils";

const tabsTranslations: Record<string, Record<Language, string>> = {
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
  })
};

export default tabsTranslations;
