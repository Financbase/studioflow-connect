
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PalettePreviewProps {
  colors: Record<string, string>;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  isActive?: boolean;
  name?: string;
  showLabels?: boolean;
}

const PalettePreview: React.FC<PalettePreviewProps> = ({
  colors,
  size = "md",
  onClick,
  isActive = false,
  name,
  showLabels = false
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8"
  };
  
  // Create a more structured representation of colors for preview
  const colorGroups = {
    primary: [
      { key: "primary", label: "Primary" },
      { key: "primary-foreground", label: "Text" }
    ],
    secondary: [
      { key: "secondary", label: "Secondary" },
      { key: "secondary-foreground", label: "Text" }
    ],
    accent: [
      { key: "accent", label: "Accent" },
      { key: "accent-foreground", label: "Text" }
    ],
    background: [
      { key: "background", label: "Background" },
      { key: "foreground", label: "Text" }
    ],
    destructive: [
      { key: "destructive", label: "Destructive" },
      { key: "destructive-foreground", label: "Text" }
    ]
  };
  
  // Build an array of colors for ordered preview
  const getContrastColor = (hexColor: string) => {
    // Simple function to determine if text should be dark or light
    // Remove the # if it exists
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Calculate brightness
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
    // Return black for bright colors, white for dark ones
    return brightness > 125 ? '#000000' : '#FFFFFF';
  };
  
  return (
    <Card 
      className={`overflow-hidden cursor-pointer transition-all duration-200 ${
        isActive ? 'ring-2 ring-primary' : 'hover:ring-1 hover:ring-primary/40'
      }`}
      onClick={onClick}
    >
      <CardContent className={`p-2 ${name ? 'pb-1' : ''}`}>
        {/* Main color groups display */}
        <div className="space-y-2">
          {Object.entries(colorGroups).map(([group, colorItems]) => (
            <div key={group} className="flex space-x-1">
              {colorItems.map(item => {
                const colorKey = item.key;
                const colorValue = colors[colorKey] || '#cccccc';
                return (
                  <div 
                    key={colorKey} 
                    className="relative flex-1"
                    title={`${item.label}: ${colorValue}`}
                  >
                    <div
                      className={`${sizeClasses[size]} w-full rounded-sm border`}
                      style={{ 
                        backgroundColor: colorValue,
                        borderColor: getContrastColor(colorValue)
                      }}
                    />
                    {showLabels && (
                      <span className="text-[8px] opacity-70 truncate block mt-0.5">
                        {item.label}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        
        {/* Show a complete color strip at the bottom */}
        <div className="flex h-2 mt-2 rounded-sm overflow-hidden">
          {Object.entries(colors)
            .filter(([key]) => !key.includes('foreground'))
            .slice(0, 8)
            .map(([key, color]) => (
              <div
                key={key}
                className="flex-1 h-full"
                style={{ backgroundColor: color }}
                title={`${key}: ${color}`}
              />
            ))}
        </div>
        
        {name && (
          <div className="mt-2 text-xs text-center font-medium text-muted-foreground">
            {name}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PalettePreview;
