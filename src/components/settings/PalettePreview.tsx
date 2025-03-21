
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface PalettePreviewProps {
  colors: Record<string, string>;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  isActive?: boolean;
}

const PalettePreview: React.FC<PalettePreviewProps> = ({
  colors,
  size = "md",
  onClick,
  isActive = false
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8"
  };
  
  // Get the main colors for preview
  const previewColors = [
    colors.background || "#ffffff",
    colors.primary || "#000000",
    colors.secondary || "#cccccc",
    colors.accent || "#999999",
    colors.destructive || "#ff0000"
  ];
  
  return (
    <Card 
      className={`overflow-hidden cursor-pointer transition-all duration-200 ${
        isActive ? 'ring-2 ring-primary' : 'hover:ring-1 hover:ring-primary/40'
      }`}
      onClick={onClick}
    >
      <CardContent className="p-2">
        <div className="flex space-x-1">
          {previewColors.map((color, index) => (
            <div
              key={index}
              className={`${sizeClasses[size]} rounded-sm border`}
              style={{ backgroundColor: color }}
              title={Object.keys(colors)[index] || "Color"}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PalettePreview;
