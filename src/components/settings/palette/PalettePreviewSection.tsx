import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useColorPalette } from "@/contexts/ColorPaletteContext";
import { useTheme } from "@/contexts/ThemeContext";
import PalettePreview from "../PalettePreview";
import ColorPaletteVisualizer from "./ColorPaletteVisualizer";
import ColorSchemeGenerator from "./ColorSchemeGenerator";
import ColorContrastChecker from "./ColorContrastChecker";

const PalettePreviewSection: React.FC = () => {
  const { currentPaletteId, colorPalettes, getCurrentPaletteColors } = useColorPalette();
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState("preview");
  const [generatedScheme, setGeneratedScheme] = useState<string[]>([]);
  
  // Get colors for the current palette
  const currentColors = getCurrentPaletteColors();
  const currentPalette = colorPalettes.find(p => p.id === currentPaletteId);
  
  // Handle when a color scheme is generated
  const handleSchemeGenerated = (colors: string[]) => {
    setGeneratedScheme(colors);
  };
  
  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="visualizer">Visualizer</TabsTrigger>
          <TabsTrigger value="generator">Scheme Generator</TabsTrigger>
          <TabsTrigger value="contrast">Contrast Check</TabsTrigger>
        </TabsList>
        
        <TabsContent value="preview" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Background</h3>
              <div 
                className="h-24 rounded-md p-4 flex items-end"
                style={{ backgroundColor: currentColors.background || '#FFFFFF' }}
              >
                <p style={{ color: currentColors.foreground || '#000000' }}>
                  Text Color
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Primary Button</h3>
              <div 
                className="h-24 rounded-md flex items-center justify-center"
                style={{ backgroundColor: currentColors.primary || '#000000' }}
              >
                <button 
                  className="px-4 py-2 rounded-md text-sm"
                  style={{ color: currentColors["primary-foreground"] || '#FFFFFF' }}
                >
                  Primary Button
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Secondary Button</h3>
              <div 
                className="h-24 rounded-md flex items-center justify-center"
                style={{ backgroundColor: currentColors.secondary || '#EEEEEE' }}
              >
                <button 
                  className="px-4 py-2 rounded-md text-sm"
                  style={{ color: currentColors["secondary-foreground"] || '#000000' }}
                >
                  Secondary Button
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Card</h3>
              <div 
                className="h-24 rounded-md p-4"
                style={{ backgroundColor: currentColors.card || '#FFFFFF' }}
              >
                <p style={{ color: currentColors["card-foreground"] || '#000000' }}>
                  Card Content
                </p>
                <p 
                  className="text-xs mt-2"
                  style={{ color: currentColors["muted-foreground"] || '#666666' }}
                >
                  Muted text in card
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Accent</h3>
              <div 
                className="h-24 rounded-md flex items-center justify-center"
                style={{ backgroundColor: currentColors.accent || '#F0F0FF' }}
              >
                <span 
                  className="px-3 py-1 rounded-sm text-sm"
                  style={{ color: currentColors["accent-foreground"] || '#0000DD' }}
                >
                  Accent Element
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Destructive</h3>
              <div 
                className="h-24 rounded-md flex items-center justify-center"
                style={{ backgroundColor: currentColors.destructive || '#FF0000' }}
              >
                <button 
                  className="px-4 py-2 rounded-md text-sm"
                  style={{ color: currentColors["destructive-foreground"] || '#FFFFFF' }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          
          {currentPaletteId && (
            <div className="pt-4 border-t">
              <h3 className="text-sm font-medium mb-2">Current Palette</h3>
              <div className="border rounded-md p-3">
                <PalettePreview 
                  colors={currentColors}
                  size="lg"
                  showLabels={true}
                  name={currentPalette?.name}
                  isActive={true}
                />
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="visualizer">
          <ColorPaletteVisualizer colors={currentColors} />
        </TabsContent>
        
        <TabsContent value="generator">
          <ColorSchemeGenerator 
            initialColor={currentColors.primary || '#4f46e5'}
            onSchemeGenerated={handleSchemeGenerated}
          />
          
          {generatedScheme.length > 0 && (
            <div className="mt-4 p-4 border rounded-md">
              <h3 className="text-sm font-medium mb-2">Application Preview</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {generatedScheme.map((color, index) => (
                  <div 
                    key={index}
                    className="p-3 rounded-md flex items-center justify-between"
                    style={{ backgroundColor: color }}
                  >
                    <span 
                      className="font-medium"
                      style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
                    >
                      Sample Text
                    </span>
                    <span 
                      className="text-xs px-2 py-1 rounded-sm"
                      style={{ 
                        backgroundColor: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                        color: isDarkMode ? '#FFFFFF' : '#000000'
                      }}
                    >
                      {color}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="contrast">
          <ColorContrastChecker colors={currentColors} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PalettePreviewSection;
