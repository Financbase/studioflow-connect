import { Language } from "../types";

// Import categories
import categoriesTranslations from './categories';
import commonTranslations from './common';
import dashboardTranslations from './dashboard';
import connectTranslations from './connect';
import designTranslations from './design';
import knowledgeTranslations from './knowledge';
import mobileTranslations from './mobile';
import navigationTranslations from './navigation';
import projectsTranslations from './projects';
import settingsTranslations from './settings';
import sidebarTranslations from './sidebar';
import supportTranslations from './support';
import toastTranslations from './toast';
import userTranslations from './user';
import widgetsTranslations from './widgets';
import libraryTranslations from './library';
import aiToolsTranslations from './aitools';
import colorPaletteTranslations from './colorPalette';
import adminTranslations from './admin';
import documentationTranslations from './documentation';
import designTokensTranslations from './designTokens';
import languagesTranslations from './languages';
import footerTranslations from './footer';
import headerTranslations from './header';

// Combine all translations
const translations: Record<string, Record<Language, string>> = {
  ...categoriesTranslations,
  ...commonTranslations,
  ...dashboardTranslations,
  ...connectTranslations,
  ...designTranslations,
  ...knowledgeTranslations,
  ...mobileTranslations,
  ...navigationTranslations,
  ...projectsTranslations,
  ...settingsTranslations,
  ...sidebarTranslations,
  ...supportTranslations,
  ...toastTranslations,
  ...userTranslations,
  ...widgetsTranslations,
  ...libraryTranslations,
  ...aiToolsTranslations,
  ...colorPaletteTranslations,
  ...adminTranslations,
  ...documentationTranslations,
  ...designTokensTranslations,
  ...languagesTranslations,
  ...footerTranslations,
  ...headerTranslations
};

export default translations;
