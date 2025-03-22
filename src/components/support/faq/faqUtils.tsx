
import React, { ReactNode } from "react";
import { FileText, Headphones, Wifi, HelpCircle, Database, Music, LayoutGrid, Zap, Settings } from "lucide-react";

export const getCategoryIcon = (category: string): ReactNode => {
  switch (category.toLowerCase()) {
    case "all":
      return <LayoutGrid className="h-4 w-4" />;
    case "general":
      return <HelpCircle className="h-4 w-4" />;
    case "account":
      return <FileText className="h-4 w-4" />;
    case "technical":
      return <Settings className="h-4 w-4" />;
    case "audio":
      return <Headphones className="h-4 w-4" />;
    case "connectivity":
      return <Wifi className="h-4 w-4" />;
    case "database":
      return <Database className="h-4 w-4" />;
    case "music":
      return <Music className="h-4 w-4" />;
    case "performance":
      return <Zap className="h-4 w-4" />;
    default:
      return <HelpCircle className="h-4 w-4" />;
  }
};

export const getCategories = (items: any[]) => {
  // Return unique categories from items
  return Array.from(new Set(items.map(item => item.category)));
};
