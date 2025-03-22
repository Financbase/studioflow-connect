
import { WidgetId, PricingTier, featureAccessMap } from '../types';

interface WidgetMetadata {
  id: WidgetId;
  label: string;
  description: string;
  minPlanRequired: PricingTier;
  iconName: string;
}

// Widget metadata with labels, descriptions, and min plan requirements
export const widgetMetadata: Record<WidgetId, WidgetMetadata> = {
  'system': {
    id: 'system',
    label: 'System Monitor',
    description: 'Monitor CPU, RAM and disk metrics',
    minPlanRequired: 'standard',
    iconName: 'Cpu'
  },
  'audio': {
    id: 'audio',
    label: 'Audio Analyzer',
    description: 'Analyze audio files and recordings',
    minPlanRequired: 'free',
    iconName: 'AudioLines'
  },
  'ai': {
    id: 'ai',
    label: 'AI Tools',
    description: 'AI-assisted music production',
    minPlanRequired: 'standard',
    iconName: 'FileAudio'
  },
  'vm': {
    id: 'vm',
    label: 'VM Controller',
    description: 'Create and manage virtual machines',
    minPlanRequired: 'pro',
    iconName: 'Layout'
  },
  'daw': {
    id: 'daw',
    label: 'DAW Workflow',
    description: 'Connect with digital audio workstations',
    minPlanRequired: 'standard',
    iconName: 'Layers'
  },
  'marketplace': {
    id: 'marketplace',
    label: 'Marketplace',
    description: 'Browse and purchase plugins and samples',
    minPlanRequired: 'standard',
    iconName: 'FileOutput'
  },
  'connect': {
    id: 'connect',
    label: 'StudioFlow Connect',
    description: 'Cross-platform storage access',
    minPlanRequired: 'free',
    iconName: 'BookmarkPlus'
  }
};

/**
 * Get widget information by ID
 */
export const getWidgetInfo = (widgetId: WidgetId): WidgetMetadata => {
  return widgetMetadata[widgetId];
};

/**
 * Check if a user has access to a specific widget based on their plan
 */
export const hasWidgetAccess = (widgetId: WidgetId, userPlan: PricingTier): boolean => {
  return featureAccessMap[userPlan][widgetId];
};

/**
 * Get all widgets accessible to a user based on their plan
 */
export const getAccessibleWidgets = (userPlan: PricingTier): WidgetId[] => {
  return Object.entries(featureAccessMap[userPlan])
    .filter(([_, hasAccess]) => hasAccess)
    .map(([widgetId]) => widgetId as WidgetId);
};

/**
 * Get recommended widgets for a user based on their plan and current widgets
 */
export const getRecommendedWidgets = (
  currentWidgets: WidgetId[], 
  userPlan: PricingTier
): WidgetId[] => {
  const accessibleWidgets = getAccessibleWidgets(userPlan);
  return accessibleWidgets.filter(widget => !currentWidgets.includes(widget));
};
