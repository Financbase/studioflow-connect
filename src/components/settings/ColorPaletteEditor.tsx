
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useTheme } from "@/contexts/ThemeContext";
import { useColorPalette } from "@/contexts/ColorPaletteContext";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import our custom hooks
import { useColorGrouping } from "@/hooks/useColorGrouping";
import { usePaletteGenerator } from "@/hooks/usePaletteGenerator";
import { getContrastColor } from "@/lib/colorContrastUtils";

// Import our components
import ManualEditorTab from "./palette/ManualEditorTab";
import AutoGeneratorTab from "./palette/AutoGeneratorTab";
import PalettePreviewSection from "./palette/PalettePreviewSection";
import SavePaletteForm from "./palette/SavePaletteForm";
import SavedPalettesList from "./palette/SavedPalettesList";

const ColorPaletteEditor: React.FC = () => {
  const { theme, themeVariant } = useTheme();
  const { saveCurrentColorPalette, colorPalettes, applyColorPalette, deleteColorPalette, currentPaletteId } = useColorPalette();
  const [paletteName, setPaletteName] = useState("");
  const [paletteDescription, setPaletteDescription] = useState("");
  const [activeTab, setActiveTab] = useState("manual");
  
  // Use our custom hooks
  const { 
    currentColors, 
    setCurrentColors, 
    primaryColor, 
    setPrimaryColor, 
    handleColorChange, 
    colorGroups 
  } = useColorGrouping(theme, themeVariant);
  
  const { 
    generatedPalettes, 
    selectedPalette, 
    setSelectedPalette, 
    generatePalettes, 
    applyTempPalette 
  } = usePaletteGenerator(theme);
  
  // Update currentColors when a palette is selected from the generator
  useEffect(() => {
    if (selectedPalette) {
      setCurrentColors(prev => 
        prev.map(colorSetting => ({
          ...colorSetting,
          value: selectedPalette[colorSetting.key] || colorSetting.value
        }))
      );
    }
  }, [selectedPalette, setCurrentColors]);

  const handleGeneratePalettes = () => {
    generatePalettes(primaryColor);
  };
  
  const handleSavePalette = () => {
    if (!paletteName.trim()) {
      toast({
        title: "Name Required",
        description: "Please provide a name for your color palette",
        variant: "destructive"
      });
      return;
    }
    
    const colorData: Record<string, string> = {};
    currentColors.forEach(color => {
      colorData[color.key] = color.value;
    });
    
    const description = activeTab === "auto" 
      ? `${paletteDescription} (custom generated)`
      : `${paletteDescription} (custom manual)`;
    
    saveCurrentColorPalette(paletteName, colorData, description);
    
    // Reset form
    setPaletteName("");
    setPaletteDescription("");
    
    toast({
      title: "Color Palette Saved",
      description: `"${paletteName}" has been saved to your palettes`
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Color Palette Designer</CardTitle>
        <CardDescription>
          Customize colors and save them as reusable palettes
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manual">Manual Editor</TabsTrigger>
            <TabsTrigger value="auto">AI Generator</TabsTrigger>
          </TabsList>
          
          <TabsContent value="manual">
            <ManualEditorTab 
              colorGroups={colorGroups}
              handleColorChange={handleColorChange}
              getContrastColor={getContrastColor}
              currentColors={currentColors}
            />
          </TabsContent>
          
          <TabsContent value="auto">
            <AutoGeneratorTab 
              primaryColor={primaryColor}
              setPrimaryColor={setPrimaryColor}
              generatePalettes={handleGeneratePalettes}
              generatedPalettes={generatedPalettes}
              selectedPalette={selectedPalette}
              setSelectedPalette={setSelectedPalette}
              applyTempPalette={applyTempPalette}
            />
          </TabsContent>
        </Tabs>
        
        <div className="border-t pt-6 space-y-4">
          <h3 className="text-lg font-medium">Preview</h3>
          <PalettePreviewSection />
        </div>
        
        <div className="border-t pt-6 space-y-4">
          <SavePaletteForm 
            paletteName={paletteName}
            setPaletteName={setPaletteName}
            paletteDescription={paletteDescription}
            setPaletteDescription={setPaletteDescription}
            handleSavePalette={handleSavePalette}
          />
        </div>
        
        {colorPalettes.length > 0 && (
          <div className="border-t pt-6">
            <SavedPalettesList 
              colorPalettes={colorPalettes}
              currentPaletteId={currentPaletteId}
              applyColorPalette={applyColorPalette}
              deleteColorPalette={deleteColorPalette}
            />
          </div>
        )}
      </CardContent>
      
      <CardFooter className="bg-muted/30 border-t text-xs text-muted-foreground flex flex-col items-start space-y-1 pt-3">
        <p>• Save your custom color palettes to reuse across themes</p>
        <p>• Use hex values for precise color control</p>
        <p>• Preview colors in real-time as you edit</p>
        <p>• Generate harmonious color schemes with the AI palette generator</p>
      </CardFooter>
    </Card>
  );
};

export default ColorPaletteEditor;
