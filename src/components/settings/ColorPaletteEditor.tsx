
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Plus, Save, EyeIcon, Trash2 } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "@/components/ui/use-toast";
import { rgbToHex, hexToRgb } from "@/lib/colorUtils";

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
  | "border";

interface ColorSetting {
  name: string;
  key: ColorKey;
  value: string;
  description: string;
}

const ColorPaletteEditor: React.FC = () => {
  const { theme, themeVariant, saveCurrentColorPalette, colorPalettes, applyColorPalette, deleteColorPalette } = useTheme();
  const [paletteName, setPaletteName] = useState("");
  const [paletteDescription, setPaletteDescription] = useState("");
  const [currentColors, setCurrentColors] = useState<ColorSetting[]>([]);
  
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
        }
      ];
      
      setCurrentColors(colors);
    };
    
    loadCurrentColors();
  }, [theme, themeVariant]);
  
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
    
    saveCurrentColorPalette(paletteName, colorData, paletteDescription);
    
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
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Color Palette Designer</CardTitle>
        <CardDescription>
          Customize colors and save them as reusable palettes
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Current Theme Colors</h3>
          <p className="text-sm text-muted-foreground">
            Edit colors for {themeVariant} theme ({theme} mode)
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentColors.map((color, index) => (
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
                <Input
                  id={`color-${color.key}`}
                  type="color"
                  value={color.value}
                  onChange={(e) => handleColorChange(index, e.target.value)}
                  className="h-10 w-full"
                />
                <Input
                  type="text"
                  value={color.value}
                  onChange={(e) => handleColorChange(index, e.target.value)}
                  className="font-mono text-sm"
                  placeholder="#RRGGBB"
                />
                <p className="text-xs text-muted-foreground">{color.description}</p>
              </div>
            ))}
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
                    >
                      <EyeIcon className="h-4 w-4" />
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          title="Delete this palette"
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
      </CardFooter>
    </Card>
  );
};

export default ColorPaletteEditor;
