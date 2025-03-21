
export type ThemeMode = 'light' | 'dark';
export type ThemeVariant = 'modern' | 'legacy' | 'classic' | 'windows' | 'default' | 'retro' | string;

export type ColorVersion = {
  id: string;
  timestamp: number;
  name: string;
  themeData: Record<string, string>;
  description?: string;
  previewColors?: string[]; // Array of hex colors for preview
  tags?: string[]; // Optional tags for categorization
  isFavorite?: boolean; // Mark as favorite for quick access
};

export interface VersionFilter {
  search?: string;
  tags?: string[];
  sortBy?: 'name' | 'date' | 'favorites';
  sortDirection?: 'asc' | 'desc';
}
