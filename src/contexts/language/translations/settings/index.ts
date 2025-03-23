
import { Language } from "../../types";
import generalSettingsTranslations from "./general";
import appearanceSettingsTranslations from "./appearance";
import notificationsSettingsTranslations from "./notifications";
import privacySettingsTranslations from "./privacy";
import subscriptionSettingsTranslations from "./subscription";

// Combine all settings translations
const settingsTranslations: Record<string, Record<Language, string>> = {
  ...generalSettingsTranslations,
  ...appearanceSettingsTranslations,
  ...notificationsSettingsTranslations,
  ...privacySettingsTranslations,
  ...subscriptionSettingsTranslations
};

export default settingsTranslations;
