
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Plus, Save, EyeIcon, Trash2, Sparkles, RefreshCw, Check } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "@/components/ui/use-toast";
import { rgbToHex, hexToRgb, generateThemePalette, generateAnalogous, generateComplementary, generateTriadic } from "@/lib/colorUtils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import PalettePreview from "./PalettePreview";

type ColorKey = 
  | "background" 
  | "foreground" 
  | "card" 
  | "card-foreground" 
  | "primary" 
  | "primary-foreground" 
  | "secondary" 
  | "secondary-foreground" 
  | "muted" 
  | "muted-foreground" 
  | "accent" 
  | "accent-foreground" 
  | "border" 
  | "input" 
  | "ring" 
  | "destructive" 
  | "destructive-foreground";

interface ColorSetting {
  name: string;
  key: ColorKey;
  value: string;
  description: string;
}

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
            {Object.entries(colorGroups).map(([groupName, colors]) => (
              <div key={groupName} className="space-y-4">
                <h3 className="text-md font-medium">{groupName}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {colors.map((color, index) => {
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
                            onChange={(e) => handleColorChange(fullIndex, e.target.value)}
                            className="h-10 w-14"
                          />
                          <Input
                            type="text"
                            value={color.value}
                            onChange={(e) => handleColorChange(fullIndex, e.target.value)}
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
          </TabsContent>
          
          <TabsContent value="auto" className="space-y-6 pt-4">
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
          </TabsContent>
        </Tabs>
        
        <div className="border-t pt-6 space-y-4">
          <h3 className="text-lg font-medium">Preview</h3>
          <div className="p-4 border rounded-lg bg-background text-foreground">
            <div className="space-y-4">
              <h4 className="font-medium">Color Palette Preview</h4>
              <div className="flex flex-wrap gap-2">
                <div className="px-3 py-1.5 bg-primary text-primary-foreground rounded">Primary</div>
                <div className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded">Secondary</div>
                <div className="px-3 py-1.5 bg-accent text-accent-foreground rounded">Accent</div>
                <div className="px-3 py-1.5 bg-muted text-muted-foreground rounded">Muted</div>
                <div className="px-3 py-1.5 bg-destructive text-destructive-foreground rounded">Destructive</div>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <div className="p-3 bg-card text-card-foreground border-b">
                  Card Header
                </div>
                <div className="p-3 bg-card text-muted-foreground">
                  Card content with <span className="text-card-foreground">normal</span> and muted text
                </div>
              </div>
              
              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded bg-primary text-primary-foreground hover:opacity-90">
                  Button
                </button>
                <button className="px-3 py-1.5 rounded bg-secondary text-secondary-foreground hover:opacity-90">
                  Button
                </button>
                <button className="px-3 py-1.5 rounded border hover:bg-muted">
                  Button
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-6 space-y-4">
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
        
        {colorPalettes.length > 0 && (
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium mb-4">Saved Palettes</h3>
            <div className="space-y-3">
              {colorPalettes.map((palette) => (
                <div 
                  key={palette.id}
                  className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/40 transition-colors"
                >
                  <div>
                    <h4 className="font-medium">{palette.name}</h4>
                    {palette.description && (
                      <p className="text-xs text-muted-foreground">{palette.description}</p>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => applyColorPalette(palette.id)}
                      title="Apply this palette"
                      className={currentPaletteId === palette.id ? "bg-primary text-primary-foreground" : ""}
                    >
                      <EyeIcon className="h-4 w-4" />
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          title="Delete this palette"
                          disabled={currentPaletteId === palette.id}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Color Palette</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{palette.name}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteColorPalette(palette.id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
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
