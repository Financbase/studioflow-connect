
export type PricingTier = "free" | "standard" | "pro" | "enterprise";

export enum WidgetId {
  analytics = "analytics",
  audio_player = "audio_player",
  calendar = "calendar",
  file_browser = "file_browser",
  marketplace = "marketplace",
  performance = "performance",
  projects = "projects",
  quick_actions = "quick_actions",
  recent_files = "recent_files",
  settings = "settings",
  system_status = "system_status",
  todo = "todo",
  usage_stats = "usage_stats",
  weather = "weather"
}

export type ViewMode = "simple" | "advanced" | "custom";

export interface DashboardContextType {
  // Core dashboard properties
  widgets: WidgetId[];
  visibleWidgets: WidgetId[];
  viewMode: ViewMode;
  pricingTier: PricingTier;

  // Layout management
  setWidgetLayout: (widgets: WidgetId[]) => void;
  setViewMode: (mode: ViewMode) => void;
  toggleWidgetVisibility: (widgetId: WidgetId) => void;
  reorderWidgets: (startIndex: number, endIndex: number) => void;
  hasFeatureAccess: (widgetId: WidgetId) => boolean;
  featureAccess: Record<WidgetId, boolean>;
  isLoading: boolean;
}
