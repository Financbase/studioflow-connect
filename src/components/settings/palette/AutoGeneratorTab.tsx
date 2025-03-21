
import React from "react";
import PaletteGenerator from "./PaletteGenerator";

interface AutoGeneratorTabProps {
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  generatePalettes: () => void;
  generatedPalettes: Record<string, string>[];
  selectedPalette: Record<string, string> | null;
  setSelectedPalette: (palette: Record<string, string>) => void;
  applyTempPalette: (palette: Record<string, string>) => void;
}

const AutoGeneratorTab: React.FC<AutoGeneratorTabProps> = ({
  primaryColor,
  setPrimaryColor,
  generatePalettes,
  generatedPalettes,
  selectedPalette,
  setSelectedPalette,
  applyTempPalette
}) => {
  return (
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
  );
};

export default AutoGeneratorTab;
