
import React from "react";
import { 
  Sliders, 
  Activity, 
  Mic, 
  Music, 
  Database, 
  Headphones, 
  FileText, 
  AudioWaveform, 
  TagIcon 
} from "lucide-react";

export const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'mixing':
      return <Sliders className="h-3 w-3" />;
    case 'mastering':
      return <Activity className="h-3 w-3" />;
    case 'recording':
      return <Mic className="h-3 w-3" />;
    case 'composition':
      return <Music className="h-3 w-3" />;
    case 'technical':
      return <Database className="h-3 w-3" />;
    case 'hardware':
      return <Headphones className="h-3 w-3" />;
    case 'software':
      return <FileText className="h-3 w-3" />;
    case 'theory':
      return <AudioWaveform className="h-3 w-3" />;
    default:
      return <TagIcon className="h-3 w-3" />;
  }
};
