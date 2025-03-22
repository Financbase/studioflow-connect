
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import PaletteGenerator from "./PaletteGenerator";

interface AutoGeneratorTabProps {
  isActive: boolean;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  generatePalettes: () => void;
  generatedPalettes: Record<string, string>[];
  selectedPalette: Record<string, string> | null;
  setSelectedPalette: (palette: Record<string, string>) => void;
  applyTempPalette: (palette: Record<string, string>) => void;
}

export const AutoGeneratorTab: React.FC<AutoGeneratorTabProps> = ({
  isActive,
  primaryColor,
  setPrimaryColor,
  generatePalettes,
  generatedPalettes,
  selectedPalette,
  setSelectedPalette,
  applyTempPalette
}) => {
  return (
    <TabsContent value="auto" className={isActive ? "block" : "hidden"}>
      <div className="space-y-6 pt-4">
        <PaletteGenerator 
          primaryColor={primaryColor}
          setPrimaryColor={setPrimaryColor}
          generatePalettes={generatePalettes}
          generatedPalettes={generatedPalettes}
          selectedPalette={selectedPalette}
          setSelectedPalette={setSelectedPalette}
          applyTempPalette={applyTempPalette}
        />
      </div>
    </TabsContent>
  );
};

export default AutoGeneratorTab;
