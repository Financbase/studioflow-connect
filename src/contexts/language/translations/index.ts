
import categoryTranslations from "./categories";
import commonTranslations from "./common";
import dashboardTranslations from "./dashboard";
import designTranslations from "./design";
import headerTranslations from "./header";
import navigationTranslations from "./navigation";
import sidebarTranslations from "./sidebar";
import settingsTranslations from "./settings";
import userTranslations from "./user";
import toastTranslations from "./toast";
import widgetsTranslations from "./widgets";
import colorPaletteTranslations from "./colorPalette";
import designTokensTranslations from "./designTokens";
import knowledgeTranslations from "./knowledge";
import footerTranslations from "./footer";
import mobileTranslations from "./mobile";
import languagesTranslations from "./languages";
import supportTranslations from "./support";
import aiToolsTranslations from "./aitools";
import libraryTranslations from "./library";
import documentationTranslations from "./documentation";
import connectTranslations from "./connect";
import { languageNames } from "./categories/languageNames";

// Combine all translations
const translations = {
  ...categoryTranslations,
  ...commonTranslations,
  ...dashboardTranslations,
  ...designTranslations,
  ...headerTranslations,
  ...navigationTranslations,
  ...sidebarTranslations,
  ...settingsTranslations,
  ...userTranslations,
  ...toastTranslations,
  ...widgetsTranslations,
  ...colorPaletteTranslations,
  ...designTokensTranslations,
  ...knowledgeTranslations,
  ...footerTranslations,
  ...mobileTranslations,
  ...languagesTranslations,
  ...supportTranslations,
  ...aiToolsTranslations,
  ...libraryTranslations,
  ...documentationTranslations,
  ...connectTranslations
};

export { languageNames };
export default translations;
