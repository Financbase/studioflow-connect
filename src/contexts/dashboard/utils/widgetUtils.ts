
import { WidgetId, PricingTier } from '../types';

// Maps widget IDs to human-readable names
export const widgetNames: Record<WidgetId, string> = {
  'analytics': 'Analytics',
  'audio_player': 'Audio Player',
  'calendar': 'Calendar',
  'file_browser': 'File Browser',
  'marketplace': 'Marketplace',
  'performance': 'Performance',
  'projects': 'Projects',
  'quick_actions': 'Quick Actions',
  'recent_files': 'Recent Files',
  'settings': 'Settings',
  'system_status': 'System Status',
  'todo': 'Todo',
  'usage_stats': 'Usage Stats',
  'weather': 'Weather',
  'system': 'System Monitor',
  'audio': 'Audio Control Panel',
  'ai': 'AI Tools',
  'vm': 'Virtual Machine',
  'daw': 'DAW Integration',
  'connect': 'StudioFlow Connect'
};

// Default widget ordering for new users
export const defaultWidgetOrder: WidgetId[] = [
  WidgetId.system,
  WidgetId.audio,
  WidgetId.ai,
  WidgetId.vm,
  WidgetId.daw,
  WidgetId.connect,
  WidgetId.marketplace
];

// Get widgets available for the user's pricing tier
export const getAvailableWidgets = (pricingTier: PricingTier): WidgetId[] => {
  const basicWidgets: WidgetId[] = [WidgetId.audio, WidgetId.connect];
  const proWidgets: WidgetId[] = [WidgetId.ai, WidgetId.daw];
  const premiumWidgets: WidgetId[] = [WidgetId.marketplace, WidgetId.system, WidgetId.vm];
  
  switch (pricingTier) {
    case 'free':
      return basicWidgets;
    case 'standard':
      return [...basicWidgets, ...proWidgets];
    case 'pro':
    case 'enterprise':
      return [...basicWidgets, ...proWidgets, ...premiumWidgets];
    default:
      return basicWidgets;
  }
};

// Get all widgets regardless of tier
export const getAllWidgets = (): WidgetId[] => {
  return defaultWidgetOrder;
};

// Get widget details including name and tier requirements
export const getWidgetDetails = (widgetId: WidgetId): { name: string; minTier: PricingTier } => {
  const widgetTiers: Record<WidgetId, PricingTier> = {
    'analytics': 'free',
    'audio_player': 'free',
    'calendar': 'free',
    'file_browser': 'free',
    'marketplace': 'standard',
    'performance': 'standard',
    'projects': 'free',
    'quick_actions': 'free',
    'recent_files': 'free',
    'settings': 'free',
    'system_status': 'standard',
    'todo': 'free',
    'usage_stats': 'standard',
    'weather': 'free',
    'system': 'standard',
    'audio': 'free',
    'ai': 'standard',
    'vm': 'pro',
    'daw': 'standard',
    'connect': 'free'
  };
  
  return {
    name: widgetNames[widgetId] || String(widgetId),
    minTier: widgetTiers[widgetId] || 'free'
  };
};

// Get recommended widgets based on user activity and preferences
export const getRecommendedWidgets = (
  userActivity: Record<string, number>, 
  currentWidgets: WidgetId[]
): WidgetId[] => {
  // Don't recommend widgets the user already has
  const availableWidgets = defaultWidgetOrder.filter(
    widget => !currentWidgets.includes(widget)
  );
  
  // If we have no available widgets to recommend, return empty array
  if (availableWidgets.length === 0) {
    return [];
  }
  
  // Simple algorithm: recommend up to 2 widgets the user doesn't have yet
  return availableWidgets.slice(0, 2);
};

// Check if a widget should be highlighted (e.g., new feature)
export const isWidgetHighlighted = (widgetId: WidgetId): boolean => {
  // Example: highlight the AI and marketplace widgets as new features
  const highlightedWidgets: WidgetId[] = [WidgetId.ai, WidgetId.marketplace];
  return highlightedWidgets.includes(widgetId);
};
