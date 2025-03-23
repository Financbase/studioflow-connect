
// Re-export the useColorVersionManager hook from its implementation
export { useColorVersionManager } from './colorVersions/useColorVersionManager';

// Re-export types from our types file
export type { 
  ColorVersion,
  VersionFilter,
  VersionUpdateData,
  ThemeMode,
  ThemeVariant
} from './colorVersions/types';
