
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { useTheme } from "@/contexts/ThemeContext";
import { useColorPalette } from "@/contexts/ColorPaletteContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import ThemeVersionControl from "./ThemeVersionControl";
import ColorPaletteEditor from "./ColorPaletteEditor";
import PalettePreview from "./PalettePreview";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const AppearanceSettings = () => {
  const { themeVariant, isDarkMode } = useTheme();
  const { colorPalettes, currentPaletteId, applyColorPalette } = useColorPalette();
  const [activeTab, setActiveTab] = useState("theme");
  
  // Get predefined palettes for quick selection
  const predefinedPalettes = colorPalettes.filter(p => !p.description?.includes("custom"));
  const customPalettes = colorPalettes.filter(p => p.description?.includes("custom"));
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="theme">Theme Options</TabsTrigger>
          <TabsTrigger value="colors">Color Palette</TabsTrigger>
        </TabsList>
        
        <TabsContent value="theme" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize how StudioFlow looks and feels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Theme</h3>
                <ThemeSwitcher />
                <p className="text-sm text-muted-foreground mt-2">
                  Currently using {themeVariant.charAt(0).toUpperCase() + themeVariant.slice(1)} theme in {isDarkMode ? "dark" : "light"} mode
                </p>
              </div>
              
              {colorPalettes.length > 0 && (
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium mb-4">Color Palettes</h3>
                  <div className="space-y-4">
                    {predefinedPalettes.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-3 text-muted-foreground">System Palettes</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                          {predefinedPalettes.map(palette => (
                            <PalettePreview
                              key={palette.id}
                              colors={palette.colors}
                              onClick={() => applyColorPalette(palette.id)}
                              isActive={currentPaletteId === palette.id}
                              name={palette.name}
                              size="sm"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {customPalettes.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-3 text-muted-foreground">Your Custom Palettes</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                          {customPalettes.map(palette => (
                            <PalettePreview
                              key={palette.id}
                              colors={palette.colors}
                              onClick={() => applyColorPalette(palette.id)}
                              isActive={currentPaletteId === palette.id}
                              name={palette.name}
                              size="sm"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => setActiveTab("colors")}
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Create New Color Palette
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-4">UI Density</h3>
                <Tabs defaultValue="comfortable">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="compact">Compact</TabsTrigger>
                    <TabsTrigger value="comfortable">Comfortable</TabsTrigger>
                    <TabsTrigger value="spacious">Spacious</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-4">Font Size</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="font-size">Interface Text</Label>
                    <Slider
                      id="font-size"
                      defaultValue={[16]}
                      max={20}
                      min={12}
                      step={1}
                      className="col-span-2"
                    />
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-4">Sidebar Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sidebar-collapsed">Start with collapsed sidebar</Label>
                    <Switch id="sidebar-collapsed" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sidebar-locked">Lock sidebar position</Label>
                    <Switch id="sidebar-locked" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <ThemeVersionControl />
        </TabsContent>
        
        <TabsContent value="colors" className="space-y-4">
          <ColorPaletteEditor />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AppearanceSettings;
