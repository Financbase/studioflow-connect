
export interface ColorVersion {
  id: string;
  name: string;
  description?: string;
  themeData: Record<string, string>;
  timestamp: number;
  previewColors: string[];
  tags: string[];
  isFavorite: boolean;
  lastUsed?: number; // Timestamp when the version was last used
}

export interface VersionFilter {
  search: string;
  tags: string[];
  onlyFavorites: boolean;
}

export interface VersionUpdateData {
  name?: string;
  description?: string;
  tags?: string[];
  isFavorite?: boolean;
}

// Add the missing ThemeMode and ThemeVariant types to prevent import errors
export type ThemeMode = "dark" | "light";
export type ThemeVariant = "modern" | "legacy" | "classic" | "windows" | "default" | "retro";
