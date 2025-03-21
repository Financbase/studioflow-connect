
import headerTranslations from "./header";
import dashboardTranslations from "./dashboard";
import footerTranslations from "./footer";
import widgetTranslations from "./widgets";
import languageTranslations, { languageNames } from "./languages";
import knowledgeBaseTranslations from "./knowledge";
import supportTranslations from "./support";

// Combine all translations
const translations = {
  ...headerTranslations,
  ...dashboardTranslations,
  ...footerTranslations,
  ...widgetTranslations,
  ...languageTranslations,
  ...knowledgeBaseTranslations,
  ...supportTranslations,
};

export { languageNames };
export default translations;
