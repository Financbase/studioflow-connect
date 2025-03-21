
import headerTranslations from "./header";
import dashboardTranslations from "./dashboard";
import footerTranslations from "./footer";
import widgetTranslations from "./widgets";
import languageTranslations, { languageNames } from "./languages";

// Combine all translations
const translations = {
  ...headerTranslations,
  ...dashboardTranslations,
  ...footerTranslations,
  ...widgetTranslations,
  ...languageTranslations,
};

export { languageNames };
export default translations;
