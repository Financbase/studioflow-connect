
import { Language } from "../types";
import categoryTranslations, { languageNames } from "./categories";
import dashboardTranslations from "./dashboard";
import commonTranslations from "./common";
import headerTranslations from "./header";
import footerTranslations from "./footer";
import sidebarTranslations from "./sidebar";
import libraryTranslations from "./library";
import settingsTranslations from "./settings";
import aiToolsTranslations from "./aitools";
import designTranslations from "./design";
import navigationTranslations from "./navigation";
import projectsTranslations from "./projects";
import connectTranslations from "./connect";
import mobileTranslations from "./mobile";
import designTokensTranslations from "./designTokens";
import colorPaletteTranslations from "./colorPalette";
import widgetsTranslations from "./widgets";
import supportTranslations from "./support";
import toastTranslations from "./toast";
import languagesTranslations from "./languages";
import userTranslations from "./user";
import documentationTranslations from "./documentation";
import knowledgeTranslations from "./knowledge";

// Combine all translation categories
const translations: Record<string, Record<Language, string>> = {
  ...commonTranslations,
  ...categoryTranslations,
  ...headerTranslations,
  ...footerTranslations,
  ...sidebarTranslations,
  ...dashboardTranslations,
  ...libraryTranslations,
  ...settingsTranslations,
  ...aiToolsTranslations,
  ...designTranslations,
  ...navigationTranslations,
  ...projectsTranslations,
  ...connectTranslations,
  ...mobileTranslations,
  ...designTokensTranslations,
  ...colorPaletteTranslations,
  ...widgetsTranslations,
  ...supportTranslations,
  ...toastTranslations,
  ...languagesTranslations,
  ...userTranslations,
  ...documentationTranslations,
  ...knowledgeTranslations
};

export { languageNames };
export default translations;
