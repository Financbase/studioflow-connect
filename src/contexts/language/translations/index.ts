
import categoryTranslations, { languageNames } from './categories';
import aitoolsTranslations from './aitools';
import designTokensTranslations from './designTokens';
import colorPaletteTranslations from './colorPalette';
import dashboardTranslations from './dashboard';
import libraryTranslations from './library';
import settingsTranslations from './settings';
import navigationTranslations from './navigation';
import userTranslations from './user';
import sidebarTranslations from './sidebar';
import documentationTranslations from './documentation';

const translations = {
  ...categoryTranslations,
  ...aitoolsTranslations,
  ...designTokensTranslations,
  ...colorPaletteTranslations,
  ...dashboardTranslations,
  ...libraryTranslations,
  ...settingsTranslations,
  ...navigationTranslations,
  ...userTranslations,
  ...sidebarTranslations,
  ...documentationTranslations
};

export { languageNames };
export default translations;
