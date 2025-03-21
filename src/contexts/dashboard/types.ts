
// Types for dashboard functionality

export type WidgetId = 'system' | 'audio' | 'ai' | 'vm' | 'daw' | 'marketplace' | 'connect';
export type PricingTier = 'free' | 'standard' | 'pro' | 'enterprise';
export type ViewMode = 'simple' | 'advanced' | 'custom' | 'mobile';

// Feature access mapping based on pricing tier
export const featureAccessMap: Record<PricingTier, Record<WidgetId, boolean>> = {
  free: {
    system: false,
    audio: true,
    ai: false,
    vm: false,
    daw: false,
    marketplace: false,
    connect: true // StudioFlow Connect is the open-source MVP
  },
  standard: {
    system: true,
    audio: true,
    ai: true,
    vm: false,
    daw: true,
    marketplace: true,
    connect: true
  },
  pro: {
    system: true,
    audio: true,
    ai: true,
    vm: true,
    daw: true,
    marketplace: true,
    connect: true
  },
  enterprise: {
    system: true,
    audio: true,
    ai: true,
    vm: true,
    daw: true,
    marketplace: true,
    connect: true
  }
};

// Default visible widgets based on view mode
export const defaultVisibleWidgets: Record<ViewMode, WidgetId[]> = {
  simple: ['connect', 'audio'], // MVP core features
  advanced: ['connect', 'system', 'audio', 'ai', 'daw', 'marketplace', 'vm'],
  custom: [], // Will be set by user preference
  mobile: ['connect'] // Mobile view focuses on the core MVP
};

export interface DashboardContextType {
  // Widget visibility management
  collapsedWidgets: WidgetId[];
  toggleWidget: (widgetId: WidgetId) => void;
  isWidgetCollapsed: (widgetId: WidgetId) => boolean;
  
  // Properties for widget management
  isWidgetVisible: (widgetId: WidgetId) => boolean;
  hasFeatureAccess: (widgetId: WidgetId) => boolean;
  toggleWidgetCollapse: (widgetId: WidgetId) => void;
  
  // View mode management
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  
  // Pricing tier management
  pricingTier: PricingTier;
  setPricingTier: (tier: PricingTier) => void;
  
  // Custom layout management
  customLayout: WidgetId[];
  updateCustomLayout: (widgets: WidgetId[]) => void;
  
  // Feature access
  featureAccess: Record<WidgetId, boolean>;
  
  // Mobile specific
  isMobileView: boolean;
}
