
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface SavePaletteFormProps {
  paletteName: string;
  setPaletteName: (name: string) => void;
  paletteDescription: string;
  setPaletteDescription: (description: string) => void;
  handleSavePalette: () => void;
  isValid: boolean;
}

export const SavePaletteForm: React.FC<SavePaletteFormProps> = ({
  paletteName,
  setPaletteName,
  paletteDescription,
  setPaletteDescription,
  handleSavePalette,
  isValid
}) => {
  const onSave = () => {
    if (!isValid) {
      toast({
        title: "Name Required",
        description: "Please provide a name for your color palette",
        variant: "destructive"
      });
      return;
    }
    
    handleSavePalette();
    
    toast({
      title: "Color Palette Saved",
      description: `"${paletteName}" has been saved to your palettes`
    });
  };
  
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
        onClick={onSave}
        disabled={!isValid}
        className="w-full"
      >
        <Save className="h-4 w-4 mr-2" />
        Save Current Palette
      </Button>
    </div>
  );
};

export default SavePaletteForm;
