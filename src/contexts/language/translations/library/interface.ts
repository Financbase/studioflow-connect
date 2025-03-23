
import { Language } from "../../types";
import { ensureAllLanguages } from "../../utils";

const interfaceTranslations: Record<string, Record<Language, string>> = {
  "library.viewMode.grid": ensureAllLanguages({
    en: "Grid View",
    es: "Vista de Cuadrícula",
    fr: "Vue en Grille",
    de: "Rasteransicht",
    sv: "Rutnätsvy",
    ja: "グリッド表示",
    zh: "网格视图",
    ru: "Сетка",
    pt: "Visualização em Grade",
    ar: "عرض الشبكة"
  }),
  "library.viewMode.list": ensureAllLanguages({
    en: "List View",
    es: "Vista de Lista",
    fr: "Vue en Liste",
    de: "Listenansicht",
    sv: "Listvy",
    ja: "リスト表示",
    zh: "列表视图",
    ru: "Список",
    pt: "Visualização em Lista",
    ar: "عرض القائمة"
  })
};

export default interfaceTranslations;
