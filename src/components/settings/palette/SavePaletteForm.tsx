
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";

interface SavePaletteFormProps {
  paletteName: string;
  setPaletteName: (name: string) => void;
  paletteDescription: string;
  setPaletteDescription: (description: string) => void;
  handleSavePalette: () => void;
}

const SavePaletteForm: React.FC<SavePaletteFormProps> = ({
  paletteName,
  setPaletteName,
  paletteDescription,
  setPaletteDescription,
  handleSavePalette
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Save Current Palette</h3>
      
      <div className="space-y-2">
        <Label htmlFor="palette-name">Palette Name</Label>
        <Input
          id="palette-name"
          placeholder="e.g., Dark Blue Theme"
          value={paletteName}
          onChange={(e) => setPaletteName(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="palette-description">Description (optional)</Label>
        <Input
          id="palette-description"
          placeholder="Describe your color palette"
          value={paletteDescription}
          onChange={(e) => setPaletteDescription(e.target.value)}
        />
      </div>
      
      <Button 
        onClick={handleSavePalette}
        disabled={!paletteName.trim()}
        className="w-full"
      >
        <Save className="h-4 w-4 mr-2" />
        Save Current Palette
      </Button>
    </div>
  );
};

export default SavePaletteForm;
