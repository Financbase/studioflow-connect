
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { ColorSetting } from "../types/colorSettings";
import ColorGroupEditor from "./ColorGroupEditor";
import { getContrastColor } from "@/lib/colorContrastUtils";

interface ManualEditorTabProps {
  isActive: boolean;
  colorGroups: Record<string, ColorSetting[]>;
  handleColorChange: (index: number, value: string) => void;
  currentColors: ColorSetting[];
}

export const ManualEditorTab: React.FC<ManualEditorTabProps> = ({
  isActive,
  colorGroups,
  handleColorChange,
  currentColors
}) => {
  return (
    <TabsContent value="manual" className={isActive ? "block" : "hidden"}>
      <div className="space-y-6 pt-4">
        <ColorGroupEditor 
          colorGroups={colorGroups}
          onColorChange={handleColorChange}
          getContrastColor={getContrastColor}
          currentColors={currentColors}
        />
      </div>
    </TabsContent>
  );
};

export default ManualEditorTab;
