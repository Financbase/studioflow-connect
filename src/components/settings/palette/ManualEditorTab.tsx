
import React from "react";
import { ColorSetting } from "../types/colorSettings";
import ColorGroupEditor from "./ColorGroupEditor";

interface ManualEditorTabProps {
  colorGroups: Record<string, ColorSetting[]>;
  handleColorChange: (index: number, value: string) => void;
  getContrastColor: (hexColor: string) => string;
  currentColors: ColorSetting[];
}

const ManualEditorTab: React.FC<ManualEditorTabProps> = ({
  colorGroups,
  handleColorChange,
  getContrastColor,
  currentColors
}) => {
  return (
    <div className="space-y-6 pt-4">
      <ColorGroupEditor 
        colorGroups={colorGroups}
        onColorChange={handleColorChange}
        getContrastColor={getContrastColor}
        currentColors={currentColors}
      />
    </div>
  );
};

export default ManualEditorTab;
