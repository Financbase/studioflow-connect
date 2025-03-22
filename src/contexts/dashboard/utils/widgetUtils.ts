
import React from "react";
import { AudioAssetIcon, HeartPulse, MonitorX, Settings, Terminal, Video, Zap } from "lucide-react";
import { WidgetId } from "../types";

// Get icon for a widget by its ID
export const getWidgetIcon = (widgetId: WidgetId) => {
  const iconProps = { className: "h-4 w-4" };

  switch (widgetId) {
    case "audio":
      return <AudioAssetIcon {...iconProps} />;
    case "system":
      return <MonitorX {...iconProps} />;
    case "connect":
      return <Zap {...iconProps} />;
    case "tools":
      return <Terminal {...iconProps} />;
    case "monitor":
      return <HeartPulse {...iconProps} />;
    case "virtual":
      return <Video {...iconProps} />;
    default:
      return <Settings {...iconProps} />;
  }
};

// Get display label for a widget ID
export const getWidgetLabel = (widgetId: WidgetId): string => {
  switch (widgetId) {
    case "audio":
      return "Audio Controls";
    case "system":
      return "System Monitor";
    case "connect":
      return "Studio Flow";
    case "tools":
      return "AI Tools";
    case "monitor":
      return "Performance";
    case "virtual":
      return "VM Controller";
    default:
      return widgetId;
  }
};

// Get description for a widget ID
export const getWidgetDescription = (widgetId: WidgetId): string => {
  switch (widgetId) {
    case "audio":
      return "Audio player and waveform visualizer";
    case "system":
      return "System resource monitoring with CPU/RAM stats";
    case "connect":
      return "Connect with studio hardware and peripherals";
    case "tools":
      return "AI-powered audio enhancement tools";
    case "monitor":
      return "Real-time performance monitoring";
    case "virtual":
      return "Virtual machine resource management";
    default:
      return "Widget settings and configuration";
  }
};
