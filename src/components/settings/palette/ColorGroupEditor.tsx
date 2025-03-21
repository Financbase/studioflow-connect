
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ColorSetting } from "../types/colorSettings";

interface ColorGroupEditorProps {
  colorGroups: Record<string, ColorSetting[]>;
  onColorChange: (index: number, value: string) => void;
  getContrastColor: (hexColor: string) => string;
  currentColors: ColorSetting[];
}

const ColorGroupEditor: React.FC<ColorGroupEditorProps> = ({ 
  colorGroups, 
  onColorChange, 
  getContrastColor,
  currentColors
}) => {
  return (
    <div className="space-y-6">
      {Object.entries(colorGroups).map(([groupName, colors]) => (
        <div key={groupName} className="space-y-4">
          <h3 className="text-md font-medium">{groupName}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {colors.map((color) => {
              const fullIndex = currentColors.findIndex(c => c.key === color.key);
              return (
                <div key={color.key} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-6 h-6 rounded border" 
                      style={{ 
                        backgroundColor: color.value,
                        borderColor: getContrastColor(color.value)
                      }} 
                    />
                    <Label htmlFor={`color-${color.key}`}>{color.name}</Label>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      id={`color-${color.key}`}
                      type="color"
                      value={color.value}
                      onChange={(e) => onColorChange(fullIndex, e.target.value)}
                      className="h-10 w-14"
                    />
                    <Input
                      type="text"
                      value={color.value}
                      onChange={(e) => onColorChange(fullIndex, e.target.value)}
                      className="font-mono text-sm"
                      placeholder="#RRGGBB"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{color.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ColorGroupEditor;
