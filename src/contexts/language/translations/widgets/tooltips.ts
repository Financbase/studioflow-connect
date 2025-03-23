
import { Language } from "../../types";
import { processTranslations } from "../../utils";

const tooltipWidgetTranslations = {
  "tooltips.featureNotAvailable": {
    en: "Feature not available",
    es: "Función no disponible",
    fr: "Fonctionnalité non disponible",
    de: "Funktion nicht verfügbar",
    sv: "Funktion inte tillgänglig",
    ja: "機能は利用できません",
    zh: "功能不可用",
    ru: "Функция недоступна",
    pt: "Recurso não disponível",
    ar: "الميزة غير متوفرة"
  }
};

export default processTranslations(tooltipWidgetTranslations);
