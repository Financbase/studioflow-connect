
import { Language } from "../../types";
import generalLibraryTranslations from "./general";
import interfaceTranslations from "./interface";
import searchFilterTranslations from "./searchFilter";
import tabsTranslations from "./tabs";
import storageTranslations from "./storage";
import emptyStateTranslations from "./emptyState";
import uploadTranslations from "./upload";

// Combine all library translations
const libraryTranslations: Record<string, Record<Language, string>> = {
  ...generalLibraryTranslations,
  ...interfaceTranslations,
  ...searchFilterTranslations,
  ...tabsTranslations,
  ...storageTranslations,
  ...emptyStateTranslations,
  ...uploadTranslations
};

export default libraryTranslations;
