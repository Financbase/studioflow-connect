
import React from "react";
import { Settings2, Layout, Layers, BookmarkPlus, FileOutput, Cpu, AudioLines, FileAudio } from "lucide-react";
import { WidgetId } from "@/contexts/dashboard/types";

export const getWidgetLabel = (widgetId: WidgetId): string => {
  const widgetLabelMap: Record<WidgetId, string> = {
    'system': 'System Monitor',
    'vm': 'VM Controller',
    'daw': 'DAW Workflow',
    'audio': 'Audio Analyzer',
    'ai': 'AI Tools',
    'marketplace': 'Marketplace',
    'connect': 'StudioFlow Connect'
  };
  
  return widgetLabelMap[widgetId];
};

export const getWidgetDescription = (widgetId: WidgetId): string => {
  const widgetDescMap: Record<WidgetId, string> = {
    'system': 'Monitor CPU, RAM and disk metrics',
    'vm': 'Create and manage virtual machines',
    'daw': 'Connect with digital audio workstations',
    'audio': 'Analyze audio files and recordings',
    'ai': 'AI-assisted music production',
    'marketplace': 'Browse and purchase plugins and samples',
    'connect': 'Cross-platform storage access'
  };
  
  return widgetDescMap[widgetId];
};

export const getWidgetIcon = (widgetId: WidgetId): React.ReactNode => {
  switch (widgetId) {
    case 'system':
      return <Cpu className="h-4 w-4 mr-2" />;
    case 'audio':
      return <AudioLines className="h-4 w-4 mr-2" />;
    case 'ai':
      return <FileAudio className="h-4 w-4 mr-2" />;
    case 'vm':
      return <Layout className="h-4 w-4 mr-2" />;
    case 'daw':
      return <Layers className="h-4 w-4 mr-2" />;
    case 'marketplace':
      return <FileOutput className="h-4 w-4 mr-2" />;
    case 'connect':
      return <BookmarkPlus className="h-4 w-4 mr-2" />;
    default:
      return <Settings2 className="h-4 w-4 mr-2" />;
  }
};
