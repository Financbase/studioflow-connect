/**
 * Type definitions for dashboard layouts and widgets
 */

// Widget position and size in the layout
export interface WidgetPosition {
  x: number;
  y: number;
  w: number;
  h: number;
}

// Base widget configuration that all widgets extend
export interface BaseWidgetConfig {
  id: string;
  type: string;
  title: string;
  position: WidgetPosition;
  isVisible: boolean;
  isCollapsed?: boolean;
  settings?: Record<string, any>;
}

// Specific widget types with their unique configurations
export interface AudioWidgetConfig extends BaseWidgetConfig {
  type: 'audio';
  audioSettings: {
    visualization: 'waveform' | 'spectrum' | 'both';
    colorScheme: string;
    showControls: boolean;
  };
}

export interface SystemMonitorWidgetConfig extends BaseWidgetConfig {
  type: 'systemMonitor';
  monitorSettings: {
    showCpu: boolean;
    showMemory: boolean;
    showDisk: boolean;
    refreshRate: number;
  };
}

export interface ZenWidgetConfig extends BaseWidgetConfig {
  type: 'zen';
  zenSettings: {
    timerDuration: number;
    ambientSound: string | null;
    theme: string;
  };
}

// Union type of all possible widget configurations
export type WidgetConfig = 
  | BaseWidgetConfig 
  | AudioWidgetConfig 
  | SystemMonitorWidgetConfig 
  | ZenWidgetConfig;

// Layout definition with widgets and metadata
export interface SavedLayout {
  id: string;
  name: string;
  description?: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
  widgets: WidgetConfig[];
  settings: {
    columns: number;
    compactType: 'vertical' | 'horizontal' | null;
    preventCollision: boolean;
    backgroundColor?: string;
  };
}

// Dashboard state interface
export interface DashboardState {
  currentLayout: SavedLayout | null;
  layouts: SavedLayout[];
  isEditMode: boolean;
  isLoading: boolean;
  error: string | null;
} 