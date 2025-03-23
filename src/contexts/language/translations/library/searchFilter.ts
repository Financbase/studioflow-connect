
import { Language } from "../../types";
import { ensureAllLanguages } from "../../utils";

const searchFilterTranslations: Record<string, Record<Language, string>> = {
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
  })
};

export default searchFilterTranslations;
