
import { Language } from "../../../types";
import workflowBasicsTranslations from "./basics";
import workflowTabsTranslations from "./tabs";
import workflowToolsTranslations from "./tools";
import workflowTemplatesTranslations from "./templates";
import workflowPhilosophyTranslations from "./philosophy";

// Combine all workflow translations
const workflowTranslations: Record<string, Record<Language, string>> = {
  ...workflowBasicsTranslations,
  ...workflowTabsTranslations,
  ...workflowToolsTranslations,
  ...workflowTemplatesTranslations,
  ...workflowPhilosophyTranslations
};

export default workflowTranslations;
