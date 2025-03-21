
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { useTheme } from "@/contexts/ThemeContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import ThemeVersionControl from "./ThemeVersionControl";
import ColorPaletteEditor from "./ColorPaletteEditor";

const AppearanceSettings = () => {
  const { themeVariant, isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState("theme");
  
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
