
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { evaluateWCAGCompliance, getContrastRatio } from "@/lib/colorUtils/colorContrast";

interface ColorPaletteVisualizerProps {
  colors: Record<string, string>;
}

const ColorPaletteVisualizer: React.FC<ColorPaletteVisualizerProps> = ({ colors }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  
  // Group colors into logical categories
  const colorGroups = {
    Main: ["background", "foreground", "primary", "secondary", "accent", "muted"],
    Text: Object.keys(colors).filter(key => key.includes("foreground")),
    Surfaces: ["card", "popover", "muted"],
    Elements: ["border", "input", "ring"],
    States: ["destructive"]
  };
  
  // Filter colors based on the active tab
  const getFilteredColors = () => {
    if (activeTab === "all") {
      return Object.entries(colors);
    }
    
    const group = colorGroups[activeTab as keyof typeof colorGroups] || [];
    return Object.entries(colors).filter(([key]) => group.includes(key));
  };
  
  // Handle color copy to clipboard
  const handleCopyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    
    toast({
      title: "Color Copied",
      description: `${color} has been copied to your clipboard`
    });
    
    setTimeout(() => setCopiedColor(null), 2000);
  };
  
  // Calculate contrast with the background for each color
  const getColorContrast = (color: string) => {
    const background = colors.background || "#FFFFFF";
    const ratio = getContrastRatio(color, background);
    const compliance = evaluateWCAGCompliance(color, background);
    
    return {
      ratio,
      compliance,
      isAccessible: compliance.AA
    };
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
          
          <TabsContent value={activeTab} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getFilteredColors().map(([key, color]) => {
                const contrast = getColorContrast(color);
                
                return (
                  <div key={key} className="flex flex-col">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium text-sm">{key}</div>
                      <div className="text-xs text-muted-foreground">
                        {contrast.ratio.toFixed(2)}:1
                        {contrast.isAccessible ? (
                          <span className="text-green-500 ml-1">✓</span>
                        ) : (
                          <span className="text-red-500 ml-1">✗</span>
                        )}
                      </div>
                    </div>
                    
                    <div 
                      className="h-16 rounded-md flex items-center justify-between p-3"
                      style={{ backgroundColor: color }}
                    >
                      <div 
                        className="text-sm font-medium px-2 py-1 rounded"
                        style={{ 
                          backgroundColor: colors.background || "#FFFFFF",
                          color: colors.foreground || "#000000"
                        }}
                      >
                        {color}
                      </div>
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleCopyColor(color)}
                        className="h-8 bg-background/60 backdrop-blur-sm hover:bg-background/80"
                      >
                        {copiedColor === color ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                    
                    {/* Show usage examples for certain colors */}
                    {key === "primary" && (
                      <div className="mt-2 p-2 border rounded-md">
                        <div className="text-xs text-muted-foreground mb-1">Example usage:</div>
                        <div 
                          className="px-3 py-1.5 rounded text-center text-xs"
                          style={{ 
                            backgroundColor: color,
                            color: colors["primary-foreground"] || "#FFFFFF"
                          }}
                        >
                          Primary Button
                        </div>
                      </div>
                    )}
                    
                    {key === "secondary" && (
                      <div className="mt-2 p-2 border rounded-md">
                        <div className="text-xs text-muted-foreground mb-1">Example usage:</div>
                        <div 
                          className="px-3 py-1.5 rounded text-center text-xs"
                          style={{ 
                            backgroundColor: color,
                            color: colors["secondary-foreground"] || "#000000"
                          }}
                        >
                          Secondary Button
                        </div>
                      </div>
                    )}
                    
                    {key === "card" && (
                      <div className="mt-2 p-2 border rounded-md">
                        <div className="text-xs text-muted-foreground mb-1">Example usage:</div>
                        <div 
                          className="p-2 rounded text-xs"
                          style={{ 
                            backgroundColor: color,
                            color: colors["card-foreground"] || "#000000"
                          }}
                        >
                          <div className="font-medium">Card Title</div>
                          <div 
                            className="text-xs"
                            style={{ 
                              color: colors["muted-foreground"] || "#666666" 
                            }}
                          >
                            Card content text
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
        
        <Separator className="my-6" />
        
        <div className="space-y-4">
          <h3 className="text-md font-medium">UI Preview</h3>
          
          <div className="p-4 rounded-lg border"
            style={{ backgroundColor: colors.background || "#FFFFFF" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div 
                className="p-4 rounded-md"
                style={{ 
                  backgroundColor: colors.card || "#FFFFFF",
                  color: colors["card-foreground"] || "#000000",
                  border: `1px solid ${colors.border || "#E2E8F0"}`
                }}
              >
                <div className="font-medium mb-2">Card Title</div>
                <div 
                  className="text-sm"
                  style={{ color: colors["muted-foreground"] || "#64748B" }}
                >
                  This is a card component with some muted text content.
                </div>
                <div className="flex gap-2 mt-4">
                  <button 
                    className="px-3 py-1 rounded-md text-xs font-medium"
                    style={{ 
                      backgroundColor: colors.primary || "#3B82F6",
                      color: colors["primary-foreground"] || "#FFFFFF"
                    }}
                  >
                    Primary
                  </button>
                  <button 
                    className="px-3 py-1 rounded-md text-xs font-medium"
                    style={{ 
                      backgroundColor: colors.secondary || "#E2E8F0",
                      color: colors["secondary-foreground"] || "#1E293B"
                    }}
                  >
                    Secondary
                  </button>
                </div>
              </div>
              
              <div 
                className="p-4 rounded-md"
                style={{ 
                  backgroundColor: colors.card || "#FFFFFF",
                  color: colors["card-foreground"] || "#000000",
                  border: `1px solid ${colors.border || "#E2E8F0"}`
                }}
              >
                <div className="font-medium mb-2">Form Example</div>
                <div className="space-y-2">
                  <div 
                    className="text-xs font-medium"
                    style={{ color: colors.foreground || "#000000" }}
                  >
                    Input Label
                  </div>
                  <div 
                    className="flex h-8 w-full rounded-md px-3 py-1 text-sm"
                    style={{ 
                      border: `1px solid ${colors.input || "#E2E8F0"}`,
                      backgroundColor: colors.background || "#FFFFFF"
                    }}
                  >
                    Input text
                  </div>
                  <div 
                    className="flex items-center mt-2"
                  >
                    <div 
                      className="h-4 w-4 rounded mr-2"
                      style={{ 
                        backgroundColor: colors.muted || "#F1F5F9",
                        border: `1px solid ${colors.border || "#E2E8F0"}`
                      }}
                    ></div>
                    <span 
                      className="text-xs"
                      style={{ color: colors.foreground || "#000000" }}
                    >
                      Checkbox label
                    </span>
                  </div>
                </div>
              </div>
              
              <div 
                className="p-4 rounded-md"
                style={{ 
                  backgroundColor: colors.card || "#FFFFFF",
                  color: colors["card-foreground"] || "#000000",
                  border: `1px solid ${colors.border || "#E2E8F0"}`
                }}
              >
                <div className="font-medium mb-2">Alert Example</div>
                <div
                  className="p-3 rounded-md mb-2 text-xs"
                  style={{ 
                    backgroundColor: colors.accent || "#F1F5F9",
                    color: colors["accent-foreground"] || "#1E293B"
                  }}
                >
                  This is an accent/info alert
                </div>
                <div
                  className="p-3 rounded-md text-xs"
                  style={{ 
                    backgroundColor: colors.destructive || "#EF4444",
                    color: colors["destructive-foreground"] || "#FFFFFF"
                  }}
                >
                  This is a destructive/error alert
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ColorPaletteVisualizer;
