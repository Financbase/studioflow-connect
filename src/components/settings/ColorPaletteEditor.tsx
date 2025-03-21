
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "@/components/ui/use-toast";
import { rgbToHex, hexToRgb, generateThemePalette, generateAnalogous, generateComplementary, generateTriadic } from "@/lib/colorUtils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ColorSetting } from "./types/colorSettings";

// Import our new components
import ColorGroupEditor from "./palette/ColorGroupEditor";
import PaletteGenerator from "./palette/PaletteGenerator";
import PalettePreviewSection from "./palette/PalettePreviewSection";
import SavePaletteForm from "./palette/SavePaletteForm";
import SavedPalettesList from "./palette/SavedPalettesList";

const ColorPaletteEditor: React.FC = () => {
  const { theme, themeVariant, saveCurrentColorPalette, colorPalettes, applyColorPalette, deleteColorPalette, currentPaletteId } = useTheme();
  const [paletteName, setPaletteName] = useState("");
  const [paletteDescription, setPaletteDescription] = useState("");
  const [currentColors, setCurrentColors] = useState<ColorSetting[]>([]);
  const [activeTab, setActiveTab] = useState("manual");
  const [primaryColor, setPrimaryColor] = useState("#4f46e5");
  const [generatedPalettes, setGeneratedPalettes] = useState<Record<string, string>[]>([]);
  const [selectedPalette, setSelectedPalette] = useState<Record<string, string> | null>(null);
  
  // Load current CSS variables as hex colors when component mounts or theme changes
  useEffect(() => {
    const loadCurrentColors = () => {
      const colors: ColorSetting[] = [
        {
          name: "Background",
          key: "background",
          value: rgbToHex(getComputedStyle(document.documentElement).getPropertyValue('--background').trim()),
          description: "Main background color of the app"
        },
        {
          name: "Foreground",
          key: "foreground",
          value: rgbToHex(getComputedStyle(document.documentElement).getPropertyValue('--foreground').trim()),
          description: "Primary text color"
        },
        {
          name: "Card",
          key: "card",
          value: rgbToHex(getComputedStyle(document.documentElement).getPropertyValue('--card').trim()),
          description: "Card component background"
        },
        {
          name: "Card Foreground",
          key: "card-foreground",
          value: rgbToHex(getComputedStyle(document.documentElement).getPropertyValue('--card-foreground').trim()),
          description: "Text color inside cards"
        },
        {
          name: "Primary",
          key: "primary",
          value: rgbToHex(getComputedStyle(document.documentElement).getPropertyValue('--primary').trim()),
          description: "Primary action color"
        },
        {
          name: "Primary Foreground",
          key: "primary-foreground",
          value: rgbToHex(getComputedStyle(document.documentElement).getPropertyValue('--primary-foreground').trim()),
          description: "Text on primary color background"
        },
        {
          name: "Secondary",
          key: "secondary",
          value: rgbToHex(getComputedStyle(document.documentElement).getPropertyValue('--secondary').trim()),
          description: "Secondary action color"
        },
        {
          name: "Secondary Foreground",
          key: "secondary-foreground",
          value: rgbToHex(getComputedStyle(document.documentElement).getPropertyValue('--secondary-foreground').trim()),
          description: "Text on secondary color background"
        },
        {
          name: "Muted",
          key: "muted",
          value: rgbToHex(getComputedStyle(document.documentElement).getPropertyValue('--muted').trim()),
          description: "Muted background color"
        },
        {
          name: "Muted Foreground",
          key: "muted-foreground",
          value: rgbToHex(getComputedStyle(document.documentElement).getPropertyValue('--muted-foreground').trim()),
          description: "Muted text color"
        },
        {
          name: "Accent",
          key: "accent",
          value: rgbToHex(getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()),
          description: "Accent highlight color"
        },
        {
          name: "Accent Foreground",
          key: "accent-foreground",
          value: rgbToHex(getComputedStyle(document.documentElement).getPropertyValue('--accent-foreground').trim()),
          description: "Text on accent color background"
        },
        {
          name: "Border",
          key: "border",
          value: rgbToHex(getComputedStyle(document.documentElement).getPropertyValue('--border').trim()),
          description: "Border color for elements"
        },
        {
          name: "Input",
          key: "input",
          value: rgbToHex(getComputedStyle(document.documentElement).getPropertyValue('--input').trim()),
          description: "Input border color"
        },
        {
          name: "Ring",
          key: "ring",
          value: rgbToHex(getComputedStyle(document.documentElement).getPropertyValue('--ring').trim()),
          description: "Focus ring color"
        },
        {
          name: "Destructive",
          key: "destructive",
          value: rgbToHex(getComputedStyle(document.documentElement).getPropertyValue('--destructive').trim()),
          description: "Destructive action color"
        },
        {
          name: "Destructive Foreground",
          key: "destructive-foreground",
          value: rgbToHex(getComputedStyle(document.documentElement).getPropertyValue('--destructive-foreground').trim()),
          description: "Text on destructive color background"
        }
      ];
      
      setCurrentColors(colors);
      
      // Set primary color default value from current theme
      const primary = colors.find(c => c.key === "primary");
      if (primary) {
        setPrimaryColor(primary.value);
      }
    };
    
    loadCurrentColors();
  }, [theme, themeVariant]);
  
  // Function to generate theme palettes based on primary color
  const generatePalettes = () => {
    const isDark = theme === "dark";
    
    // Create various versions of the palette
    const mainPalette = generateThemePalette(primaryColor, isDark);
    
    // Create complementary palette
    const [_, complementaryColor] = generateComplementary(primaryColor);
    const complementaryPalette = generateThemePalette(complementaryColor, isDark);
    
    // Create triadic palettes
    const [__, triadicColor1, triadicColor2] = generateTriadic(primaryColor);
    const triadicPalette1 = generateThemePalette(triadicColor1, isDark);
    const triadicPalette2 = generateThemePalette(triadicColor2, isDark);
    
    // Create analogous palettes
    const analogousColors = generateAnalogous(primaryColor, 5);
    const analogousPalette1 = generateThemePalette(analogousColors[1], isDark);
    const analogousPalette2 = generateThemePalette(analogousColors[3], isDark);
    
    // Save the generated palettes
    setGeneratedPalettes([
      mainPalette, 
      complementaryPalette, 
      triadicPalette1, 
      triadicPalette2,
      analogousPalette1,
      analogousPalette2
    ]);
    
    // Select the first palette by default
    setSelectedPalette(mainPalette);
    
    // Preview the first palette
    applyTempPalette(mainPalette);
  };
  
  // Apply a temporary palette without saving
  const applyTempPalette = (palette: Record<string, string>) => {
    Object.entries(palette).forEach(([key, hexValue]) => {
      const { r, g, b } = hexToRgb(hexValue);
      document.documentElement.style.setProperty(`--${key}`, `${r} ${g} ${b}`);
    });
    
    // Update currentColors state to reflect the new colors
    setCurrentColors(prev => 
      prev.map(colorSetting => ({
        ...colorSetting,
        value: palette[colorSetting.key] || colorSetting.value
      }))
    );
  };
  
  const handleColorChange = (index: number, value: string) => {
    const newColors = [...currentColors];
    newColors[index].value = value;
    setCurrentColors(newColors);
    
    // Preview the color change in real-time
    const colorKey = newColors[index].key;
    const { r, g, b } = hexToRgb(value);
    document.documentElement.style.setProperty(`--${colorKey}`, `${r} ${g} ${b}`);
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
  
  const getContrastColor = (hexColor: string) => {
    // Convert hex to RGB
    const { r, g, b } = hexToRgb(hexColor);
    
    // Calculate luminance - simplified formula
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Return black for bright colors, white for dark ones
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  };
  
  // Group colors by category for better organization
  const colorGroups = {
    "Base Colors": currentColors.filter(c => ["background", "foreground", "border", "input", "ring"].includes(c.key)),
    "Primary Colors": currentColors.filter(c => c.key.includes("primary")),
    "Secondary Colors": currentColors.filter(c => c.key.includes("secondary")),
    "Accent Colors": currentColors.filter(c => c.key.includes("accent")),
    "Card Colors": currentColors.filter(c => c.key.includes("card")),
    "Muted Colors": currentColors.filter(c => c.key.includes("muted")),
    "Destructive Colors": currentColors.filter(c => c.key.includes("destructive"))
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
          
          <TabsContent value="manual" className="space-y-6 pt-4">
            <ColorGroupEditor 
              colorGroups={colorGroups}
              onColorChange={handleColorChange}
              getContrastColor={getContrastColor}
              currentColors={currentColors}
            />
          </TabsContent>
          
          <TabsContent value="auto" className="space-y-6 pt-4">
            <PaletteGenerator 
              primaryColor={primaryColor}
              setPrimaryColor={setPrimaryColor}
              generatePalettes={generatePalettes}
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
