
// Export the language provider, hook, types and utilities
export * from "./LanguageProvider";
export * from "./types";
export { flagEmojis } from "./utils";
export { languageNames } from "./translations/categories/languageNames";

// Default export of the provider for simpler imports
export { LanguageProvider as default } from "./LanguageProvider";
