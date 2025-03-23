
import { Language } from "../../types";
import generalLibraryTranslations from "./general";
import tabsTranslations from "./tabs";
import interfaceTranslations from "./interface";
import storageTranslations from "./storage";
import emptyStateTranslations from "./emptyState";
import searchFilterTranslations from "./searchFilter";

// Combine all library translations
const libraryTranslations: Record<string, Record<Language, string>> = {
  ...generalLibraryTranslations,
  ...tabsTranslations,
  ...interfaceTranslations,
  ...storageTranslations,
  ...emptyStateTranslations,
  ...searchFilterTranslations
};

export default libraryTranslations;
