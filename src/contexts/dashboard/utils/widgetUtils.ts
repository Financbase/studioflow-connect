
import { WidgetId } from '../types';

/**
 * Utility functions for widget management
 */

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
export const getAvailableWidgets = (pricingTier: string): WidgetId[] => {
  const basicWidgets: WidgetId[] = ['audio', 'connect'];
  const proWidgets: WidgetId[] = ['ai', 'daw'];
  const premiumWidgets: WidgetId[] = ['marketplace', 'system', 'vm'];
  
  switch (pricingTier) {
    case 'free':
      return basicWidgets;
    case 'pro':
      return [...basicWidgets, ...proWidgets];
    case 'premium':
      return [...basicWidgets, ...proWidgets, ...premiumWidgets];
    default:
      return basicWidgets;
  }
};

// Check if a widget is available for a specific pricing tier
export const isWidgetAvailable = (widgetId: WidgetId, pricingTier: string): boolean => {
  return getAvailableWidgets(pricingTier).includes(widgetId);
};

// Get widget details including name and tier requirements
export const getWidgetDetails = (widgetId: WidgetId): { name: string; minTier: string } => {
  const widgetTiers: Record<WidgetId, string> = {
    'system': 'premium',
    'audio': 'free',
    'ai': 'pro',
    'vm': 'premium',
    'daw': 'pro',
    'connect': 'free',
    'marketplace': 'premium'
  };
  
  return {
    name: widgetNames[widgetId],
    minTier: widgetTiers[widgetId]
  };
};
