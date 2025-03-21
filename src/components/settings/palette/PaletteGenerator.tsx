
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, RefreshCw, Check } from "lucide-react";
import PalettePreview from "../PalettePreview";

interface PaletteGeneratorProps {
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  generatePalettes: () => void;
  generatedPalettes: Record<string, string>[];
  selectedPalette: Record<string, string> | null;
  setSelectedPalette: (palette: Record<string, string>) => void;
  applyTempPalette: (palette: Record<string, string>) => void;
}

const PaletteGenerator: React.FC<PaletteGeneratorProps> = ({
  primaryColor,
  setPrimaryColor,
  generatePalettes,
  generatedPalettes,
  selectedPalette,
  setSelectedPalette,
  applyTempPalette
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="primary-color">Primary Brand Color</Label>
        <div className="flex gap-2">
          <Input
            id="primary-color"
            type="color"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            className="h-10 w-14"
          />
          <Input
            type="text"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            className="font-mono text-sm"
            placeholder="#RRGGBB"
          />
          <Button 
            variant="outline"
            onClick={generatePalettes}
            className="flex-shrink-0"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Generate
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Select a primary brand color and the AI will generate a complete color palette that works well together
        </p>
      </div>
      
      {generatedPalettes.length > 0 && (
        <div className="space-y-4 pt-4">
          <h3 className="text-md font-medium">Generated Palettes</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {generatedPalettes.map((palette, index) => (
              <div key={index} className="relative">
                <PalettePreview 
                  colors={palette}
                  onClick={() => {
                    setSelectedPalette(palette);
                    applyTempPalette(palette);
                  }}
                  isActive={selectedPalette === palette}
                  size="sm"
                  showLabels={false}
                />
                {selectedPalette === palette && (
                  <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-0.5">
                    <Check className="h-3 w-3" />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <Button 
            variant="outline"
            onClick={generatePalettes}
            className="w-full"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Regenerate Palettes
          </Button>
        </div>
      )}
    </div>
  );
};

export default PaletteGenerator;
