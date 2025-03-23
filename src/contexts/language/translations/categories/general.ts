
import { Language } from "../../types";
import { processTranslations } from "../../utils";

// UI labels for language selection
const generalTranslations = {
  "label.language": {
    en: "Language",
    es: "Idioma",
    fr: "Langue",
    de: "Sprache",
    sv: "Språk",
    ja: "言語",
    zh: "语言",
    ru: "Язык",
    pt: "Idioma",
    ar: "اللغة"
  },
  "label.dashboardview": {
    en: "View",
    es: "Vista",
    fr: "Affichage",
    de: "Ansicht",
    sv: "Vy",
    ja: "表示",
    zh: "视图",
    ru: "Вид",
    pt: "Visualização",
    ar: "عرض"
  }
};

export default processTranslations(generalTranslations);
