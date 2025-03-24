
import categoryTranslations, { languageNames } from "./categories";
import adminTranslations from "./admin";
import widgetsTranslations from "./widgets";
import navigationTranslations from "./navigation";
import dashboardTranslations from "./dashboard";
import supportTranslations from "./support";
import designTranslations from "./design";
import designTokenTranslations from "./designTokens";
import commonTranslations from "./common";
import footerTranslations from "./footer";
import headerTranslations from "./header";
import mobileTranslations from "./mobile";
import projectTranslations from "./projects";
import toastTranslations from "./toast";
import userTranslations from "./user";
import aiToolsTranslations from "./aitools";
import documentationTranslations from "./documentation";
import libraryTranslations from "./library";
import settingsTranslations from "./settings";
import colorPaletteTranslations from "./colorPalette";
import knowledgeTranslations from "./knowledge";
import connectTranslations from "./connect";
import languagesTranslations from "./languages";
import sidebarTranslations from "./sidebar";

// Combine all translations
const translations = {
  ...categoryTranslations,
  ...adminTranslations,
  ...widgetsTranslations,
  ...navigationTranslations,
  ...dashboardTranslations,
  ...supportTranslations,
  ...designTranslations,
  ...designTokenTranslations,
  ...commonTranslations,
  ...footerTranslations,
  ...headerTranslations,
  ...mobileTranslations,
  ...projectTranslations,
  ...toastTranslations,
  ...userTranslations,
  ...aiToolsTranslations,
  ...documentationTranslations,
  ...libraryTranslations,
  ...settingsTranslations,
  ...colorPaletteTranslations,
  ...knowledgeTranslations,
  ...connectTranslations,
  ...languagesTranslations,
  ...sidebarTranslations
};

export { languageNames };
export default translations;
