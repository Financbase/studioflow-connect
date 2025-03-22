
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TabContent } from "./TabContent";
import { UIPreview } from "./UIPreview";
import { ColorPaletteVisualizerProps } from "./types";

const ColorPaletteVisualizer: React.FC<ColorPaletteVisualizerProps> = ({ colors }) => {
  const [activeTab, setActiveTab] = useState("all");
  
  // Group colors into logical categories
  const colorGroups = {
    Main: ["background", "foreground", "primary", "secondary", "accent", "muted"],
    Text: Object.keys(colors).filter(key => key.includes("foreground")),
    Surfaces: ["card", "popover", "muted"],
    Elements: ["border", "input", "ring"],
    States: ["destructive"]
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Color Palette Visualizer</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Colors</TabsTrigger>
            <TabsTrigger value="Main">Main</TabsTrigger>
            <TabsTrigger value="Text">Text</TabsTrigger>
            <TabsTrigger value="Surfaces">Surfaces</TabsTrigger>
            <TabsTrigger value="Elements">Elements</TabsTrigger>
            <TabsTrigger value="States">States</TabsTrigger>
          </TabsList>
          
          <TabContent
            tabValue={activeTab}
            activeTab={activeTab}
            colors={colors}
            colorGroups={colorGroups}
          />
        </Tabs>
        
        <Separator className="my-6" />
        
        <UIPreview colors={colors} />
      </CardContent>
    </Card>
  );
};

export default ColorPaletteVisualizer;
