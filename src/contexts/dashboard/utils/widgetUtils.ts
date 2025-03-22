
import { WidgetId, PricingTier } from '../types';

// Maps widget IDs to human-readable names
export const widgetNames: Record<WidgetId, string> = {
  'system': 'System Monitor',
  'audio': 'Audio Control Panel',
  'ai': 'AI Tools',
  'vm': 'Virtual Machine',
  'daw': 'DAW Integration',
  'connect': 'StudioFlow Connect',
  'marketplace': 'Marketplace'
};

// Default widget ordering for new users
export const defaultWidgetOrder: WidgetId[] = [
  'system',
  'audio',
  'ai',
  'vm',
  'daw',
  'connect',
  'marketplace'
];

// Get widgets available for the user's pricing tier
export const getAvailableWidgets = (pricingTier: PricingTier): WidgetId[] => {
  const basicWidgets: WidgetId[] = ['audio', 'connect'];
  const proWidgets: WidgetId[] = ['ai', 'daw'];
  const premiumWidgets: WidgetId[] = ['marketplace', 'system', 'vm'];
  
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
    'system': 'standard',
    'audio': 'free',
    'ai': 'standard',
    'vm': 'pro',
    'daw': 'standard',
    'connect': 'free',
    'marketplace': 'standard'
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
  const highlightedWidgets: WidgetId[] = ['ai', 'marketplace'];
  return highlightedWidgets.includes(widgetId);
};
