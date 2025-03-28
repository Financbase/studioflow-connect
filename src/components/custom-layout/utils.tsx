
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
      // Properly cast widgetId to string to prevent TypeScript errors
      const widgetIdString = String(widgetId);
      return <Activity className="h-4 w-4" />;
  }
};

// Get a user-friendly label for each widget
export const getWidgetLabel = (widgetId: WidgetId, t?: (key: string) => string) => {
  // Use translations if available
  if (t) {
    const translationKey = `widgets.${widgetId}`;
    const translation = t(translationKey);
    
    // If translation exists and isn't just returning the key (fallback behavior)
    if (translation && translation !== translationKey) {
      return translation;
    }
  }
  
  // Fallback to hardcoded English labels
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
      // Properly cast widgetId to string to prevent TypeScript errors
      const widgetIdString = String(widgetId);
      return widgetIdString.charAt(0).toUpperCase() + widgetIdString.slice(1);
  }
};

// Get a description for each widget
export const getWidgetDescription = (widgetId: WidgetId, t?: (key: string) => string) => {
  // Use translations if available
  if (t) {
    const translationKey = `widgets.${widgetId}Description`;
    const translation = t(translationKey);
    
    // If translation exists and isn't just returning the key (fallback behavior)
    if (translation && translation !== translationKey) {
      return translation;
    }
  }
  
  // Fallback to hardcoded English descriptions
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
