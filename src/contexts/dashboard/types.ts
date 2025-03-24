
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
  weather = "weather",
  // Add these to match the referenced widgets in other files
  connect = "connect",
  system = "system",
  audio = "audio",
  ai = "ai",
  vm = "vm",
  daw = "daw"
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
  
  // Added properties referenced elsewhere but missing from interface
  isWidgetVisible: (widgetId: WidgetId) => boolean;
  isWidgetCollapsed: (widgetId: WidgetId) => boolean;
  toggleWidgetCollapse: (widgetId: WidgetId) => void;
  resetDashboard: () => void;
  isPricingTierChanging?: boolean;
}
