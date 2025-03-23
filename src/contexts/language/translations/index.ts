
import headerTranslations from "./header";
import dashboardTranslations from "./dashboard";
import footerTranslations from "./footer";
import widgetTranslations from "./widgets";
import categoryTranslations, { languageNames } from "./categories";
import knowledgeBaseTranslations from "./knowledge";
import supportTranslations from "./support";
import mobileTranslations from "./mobile";
import commonTranslations from "./common";
import toastTranslations from "./toast";
import designTranslations from "./design";

// Combine all translations
const translations = {
  ...headerTranslations,
  ...dashboardTranslations,
  ...footerTranslations,
  ...widgetTranslations,
  ...categoryTranslations,
  ...knowledgeBaseTranslations,
  ...supportTranslations,
  ...mobileTranslations,
  ...commonTranslations,
  ...toastTranslations,
  ...designTranslations
};

export { languageNames };
export default translations;
