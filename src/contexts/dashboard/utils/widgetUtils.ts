
import { WidgetId } from '../types';

/**
 * Utility functions for widget management
 */

// Maps widget IDs to human-readable names
export const widgetNames: Record<WidgetId, string> = {
  'analytics': 'Analytics Dashboard',
  'performance': 'Performance Metrics',
  'audio': 'Audio Control Panel',
  'library': 'Audio Library',
  'recommendations': 'Recommendations',
  'connect': 'StudioFlow Connect',
  'marketplace': 'Marketplace',
  'monitor': 'System Monitor'
};

// Default widget ordering for new users
export const defaultWidgetOrder: WidgetId[] = [
  'analytics',
  'performance',
  'audio',
  'library',
  'recommendations',
  'connect',
  'marketplace',
  'monitor'
];

// Get widgets available for the user's pricing tier
export const getAvailableWidgets = (pricingTier: string): WidgetId[] => {
  const basicWidgets: WidgetId[] = ['analytics', 'audio', 'library'];
  const proWidgets: WidgetId[] = ['recommendations', 'connect'];
  const premiumWidgets: WidgetId[] = ['marketplace', 'monitor', 'performance'];
  
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
    'analytics': 'free',
    'audio': 'free',
    'library': 'free',
    'recommendations': 'pro',
    'connect': 'pro',
    'marketplace': 'premium',
    'monitor': 'premium',
    'performance': 'premium'
  };
  
  return {
    name: widgetNames[widgetId],
    minTier: widgetTiers[widgetId]
  };
};
