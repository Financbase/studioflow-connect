
import { Language } from "../../types";
import generalAITranslations from "./general";
import featuresTranslations from "./features";
import analysisTranslations from "./analysis";
import workflowTranslations from "./workflow";

// Combine all AI tools translations
const aiToolsTranslations: Record<string, Record<Language, string>> = {
  ...generalAITranslations,
  ...featuresTranslations,
  ...analysisTranslations,
  ...workflowTranslations
};

export default aiToolsTranslations;
