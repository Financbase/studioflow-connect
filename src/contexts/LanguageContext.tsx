
// Re-export language context and types from the implementation
export * from "./language";

// Default export for backward compatibility
import { LanguageProvider } from "./language";
export default LanguageProvider;
