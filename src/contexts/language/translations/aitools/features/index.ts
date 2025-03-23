
import { Language } from "../../../types";
import resourceManagementTranslations from "./resourceManagement";
import feedbackAnalysisTranslations from "./feedbackAnalysis";
import contentInsightTranslations from "./contentInsight";

// Combine all features translations
const featuresTranslations: Record<string, Record<Language, string>> = {
  ...resourceManagementTranslations,
  ...feedbackAnalysisTranslations,
  ...contentInsightTranslations
};

export default featuresTranslations;
