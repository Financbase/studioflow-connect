
import categoryTranslations, { languageNames } from './categories';
import aitoolsTranslations from './aitools';
import designTokensTranslations from './designTokens';
import colorPaletteTranslations from './colorPalette';
import dashboardTranslations from './dashboard';
import libraryTranslations from './library';
import settingsTranslations from './settings';

const translations = {
  ...categoryTranslations,
  ...aitoolsTranslations,
  ...designTokensTranslations,
  ...colorPaletteTranslations,
  ...dashboardTranslations,
  ...libraryTranslations,
  ...settingsTranslations,
};

export { languageNames };
export default translations;
