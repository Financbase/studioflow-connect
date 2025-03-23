
import headerTranslations from "./header";
import dashboardTranslations from "./dashboard";
import footerTranslations from "./footer";
import widgetTranslations from "./widgets";
import categoryTranslations, { languageNames } from "./categories";
import knowledgeBaseTranslations from "./knowledge";
import supportTranslations from "./support";

// Combine all translations
const translations = {
  ...headerTranslations,
  ...dashboardTranslations,
  ...footerTranslations,
  ...widgetTranslations,
  ...categoryTranslations,
  ...knowledgeBaseTranslations,
  ...supportTranslations,
};

export { languageNames };
export default translations;
