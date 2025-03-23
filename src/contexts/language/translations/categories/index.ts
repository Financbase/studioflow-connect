
import generalTranslations from "./general";
import viewTranslations from "./views";
import tooltipTranslations from "./tooltips";
import planTranslations from "./plans";
import featureTranslations from "./features";
import { languageNames } from "./languageNames";

// Combine all category translations
const categoryTranslations = {
  ...generalTranslations,
  ...viewTranslations,
  ...tooltipTranslations,
  ...planTranslations,
  ...featureTranslations
};

export { languageNames };
export default categoryTranslations;
