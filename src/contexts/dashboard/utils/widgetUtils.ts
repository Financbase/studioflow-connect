
import { WidgetId } from '../types';
import { 
  Activity, 
  Cpu, 
  Database, 
  Headphones, 
  LayoutGrid, 
  Merge, 
  ShoppingBag, 
  Sparkles
} from 'lucide-react';

/**
 * Get the icon component for a widget
 */
export const getWidgetIcon = (widgetId: WidgetId) => {
  switch (widgetId) {
    case 'system':
      return <Cpu className="h-4 w-4" />;
    case 'audio':
      return <Headphones className="h-4 w-4" />;
    case 'ai':
      return <Sparkles className="h-4 w-4" />;
    case 'vm':
      return <Database className="h-4 w-4" />;
    case 'daw':
      return <LayoutGrid className="h-4 w-4" />;
    case 'marketplace':
      return <ShoppingBag className="h-4 w-4" />;
    case 'connect':
      return <Merge className="h-4 w-4" />;
    default:
      return <Activity className="h-4 w-4" />;
  }
};

/**
 * Get a human-readable label for a widget
 */
export const getWidgetLabel = (widgetId: WidgetId) => {
  switch (widgetId) {
    case 'system':
      return 'System Monitor';
    case 'audio':
      return 'Audio Analysis';
    case 'ai':
      return 'AI Tools';
    case 'vm':
      return 'Virtual Machine';
    case 'daw':
      return 'DAW Integration';
    case 'marketplace':
      return 'Marketplace';
    case 'connect':
      return 'StudioFlow Connect';
    default:
      return widgetId.charAt(0).toUpperCase() + widgetId.slice(1);
  }
};

/**
 * Get a description for a widget
 */
export const getWidgetDescription = (widgetId: WidgetId) => {
  switch (widgetId) {
    case 'system':
      return 'Monitor CPU, memory, and disk usage';
    case 'audio':
      return 'Analyze audio files and frequencies';
    case 'ai':
      return 'AI-powered creative tools and assistance';
    case 'vm':
      return 'Manage virtual machines and environments';
    case 'daw':
      return 'Integrate with your DAW software';
    case 'marketplace':
      return 'Discover plugins, samples, and presets';
    case 'connect':
      return 'Connect across operating systems and formats';
    default:
      return 'Widget functionality';
  }
};

/**
 * Get the order priority for a widget (for sorting)
 */
export const getWidgetPriority = (widgetId: WidgetId): number => {
  switch (widgetId) {
    case 'connect':
      return 1; // Highest priority
    case 'system':
      return 2;
    case 'audio':
      return 3;
    case 'ai':
      return 4;
    case 'daw':
      return 5;
    case 'vm':
      return 6;
    case 'marketplace':
      return 7;
    default:
      return 99; // Lowest priority
  }
};

/**
 * Sort widgets by priority
 */
export const sortWidgetsByPriority = (widgets: WidgetId[]): WidgetId[] => {
  return [...widgets].sort((a, b) => getWidgetPriority(a) - getWidgetPriority(b));
};
