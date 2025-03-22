
import React from "react";
import { WidgetId } from "@/contexts/dashboard/types";
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

// Get the appropriate icon for each widget
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
      // Explicitly cast widgetId to string to avoid 'never' type
      return <Activity className="h-4 w-4" />;
  }
};

// Get a user-friendly label for each widget
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
      // Cast to string to avoid the 'never' type issues
      return String(widgetId).charAt(0).toUpperCase() + String(widgetId).slice(1);
  }
};

// Get a description for each widget
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
