
import { Language } from "../types";
import { processTranslations } from "../utils";

const widgetTranslations = {
  "widgets.system": {
    en: "StudioFlow System Monitor",
    es: "Monitor del Sistema StudioFlow",
    fr: "Moniteur Système StudioFlow",
    de: "StudioFlow Systemmonitor",
    sv: "StudioFlow Systemövervakning",
    ja: "StudioFlow システムモニター",
    zh: "StudioFlow 系统监视器",
    ru: "Системный монитор StudioFlow",
    pt: "Monitor do Sistema StudioFlow",
    ar: "مراقب نظام StudioFlow"
  }
};

export default processTranslations(widgetTranslations);
