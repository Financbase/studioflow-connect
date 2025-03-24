
import { Language } from "../types";
import systemTranslations from "./system";
import authTranslations from "./auth";
import navigationTranslations from "./navigation";
import errorTranslations from "./errors";
import aiToolsTranslations from "./aitools";
import libraryTranslations from "./library";
import categoryTranslations, { languageNames } from "./categories";
import dashboardTranslations from "./dashboard";

// Combine all translations
const translations: Record<string, Record<Language, string>> = {
  ...systemTranslations,
  ...authTranslations,
  ...navigationTranslations,
  ...errorTranslations,
  ...aiToolsTranslations,
  ...libraryTranslations,
  ...categoryTranslations,
  ...dashboardTranslations
};

export { languageNames };
export default translations;
