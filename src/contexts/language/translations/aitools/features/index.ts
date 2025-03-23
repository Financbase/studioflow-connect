
import { Language } from "../../../types";
import resourceManagementTranslations from "./resourceManagement";
import feedbackAnalysisTranslations from "./feedbackAnalysis";

// Combine all features translations
const featuresTranslations: Record<string, Record<Language, string>> = {
  ...resourceManagementTranslations,
  ...feedbackAnalysisTranslations
};

export default featuresTranslations;
