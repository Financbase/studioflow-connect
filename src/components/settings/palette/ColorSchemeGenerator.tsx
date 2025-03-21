
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { hexToRgb, rgbToHsl, hslToRgb } from '@/lib/colorUtils/colorConversion';
import { generateAnalogous, generateComplementary, generateTriadic } from '@/lib/colorUtils/colorPalette';

type SchemeType = 'monochromatic' | 'analogous' | 'complementary' | 'triadic' | 'custom';

interface ColorSchemeGeneratorProps {
  initialColor?: string;
  onSchemeGenerated?: (colors: string[]) => void;
}

const ColorSchemeGenerator: React.FC<ColorSchemeGeneratorProps> = ({
  initialColor = '#4f46e5',
  onSchemeGenerated
}) => {
  const [baseColor, setBaseColor] = useState(initialColor);
  const [schemeType, setSchemeType] = useState<SchemeType>('monochromatic');
  const [colorCount, setColorCount] = useState(5);
  const [saturation, setSaturation] = useState(100);
  const [generatedColors, setGeneratedColors] = useState<string[]>([]);
  
  // Generate color scheme whenever parameters change
  useEffect(() => {
    generateColorScheme();
  }, [baseColor, schemeType, colorCount, saturation]);
  
  const generateColorScheme = () => {
    let colors: string[] = [];
    
    switch (schemeType) {
      case 'monochromatic':
        colors = generateMonochromaticScheme(baseColor, colorCount, saturation / 100);
        break;
      case 'analogous':
        colors = generateAnalogous(baseColor, colorCount);
        break;
      case 'complementary':
        colors = generateComplementaryScheme(baseColor, colorCount, saturation / 100);
        break;
      case 'triadic':
        colors = generateTriadicScheme(baseColor, colorCount, saturation / 100);
        break;
      case 'custom':
        colors = generateCustomScheme(baseColor, colorCount, saturation / 100);
        break;
    }
    
    setGeneratedColors(colors);
    
    if (onSchemeGenerated) {
      onSchemeGenerated(colors);
    }
  };
  
  // Generate a monochromatic color scheme
  const generateMonochromaticScheme = (color: string, count: number, saturationMultiplier: number): string[] => {
    const { r, g, b } = hexToRgb(color);
    const { h, s, l } = rgbToHsl(r, g, b);
    
    const colors: string[] = [];
    const adjustedS = s * saturationMultiplier;
    
    // Generate variations with different lightness
    for (let i = 0; i < count; i++) {
      const newL = 0.1 + (i / (count - 1)) * 0.8; // Spread from 10% to 90% lightness
      const { r: rNew, g: gNew, b: bNew } = hslToRgb(h, adjustedS, newL);
      
      const hexColor = '#' + [rNew, gNew, bNew].map(c => {
        const hex = Math.round(c).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      }).join('');
      
      colors.push(hexColor);
    }
    
    return colors;
  };
  
  // Generate a complementary color scheme with variations
  const generateComplementaryScheme = (color: string, count: number, saturationMultiplier: number): string[] => {
    const [baseColor, complementColor] = generateComplementary(color);
    const { r: r1, g: g1, b: b1 } = hexToRgb(baseColor);
    const { r: r2, g: g2, b: b2 } = hexToRgb(complementColor);
    
    const { h: h1, s: s1, l: l1 } = rgbToHsl(r1, g1, b1);
    const { h: h2, s: s2, l: l2 } = rgbToHsl(r2, g2, b2);
    
    const colors: string[] = [];
    
    // Generate half the colors from base and half from complement
    const halfCount = Math.ceil(count / 2);
    const remainingCount = count - halfCount;
    
    // Base color variations
    const adjustedS1 = s1 * saturationMultiplier;
    for (let i = 0; i < halfCount; i++) {
      const newL = 0.2 + (i / (halfCount - 1)) * 0.6; // Spread lightness
      const { r, g, b } = hslToRgb(h1, adjustedS1, newL);
      
      const hexColor = '#' + [r, g, b].map(c => {
        const hex = Math.round(c).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      }).join('');
      
      colors.push(hexColor);
    }
    
    // Complementary color variations
    const adjustedS2 = s2 * saturationMultiplier;
    for (let i = 0; i < remainingCount; i++) {
      const newL = 0.2 + (i / (Math.max(remainingCount - 1, 1))) * 0.6; // Spread lightness
      const { r, g, b } = hslToRgb(h2, adjustedS2, newL);
      
      const hexColor = '#' + [r, g, b].map(c => {
        const hex = Math.round(c).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      }).join('');
      
      colors.push(hexColor);
    }
    
    return colors;
  };
  
  // Generate a triadic color scheme with variations
  const generateTriadicScheme = (color: string, count: number, saturationMultiplier: number): string[] => {
    const triadicColors = generateTriadic(color);
    const colors: string[] = [];
    
    // Determine how to distribute colors among the triadic hues
    const colorsPerHue = Math.ceil(count / 3);
    
    // Generate variations for each of the triadic colors
    triadicColors.forEach((triColor, index) => {
      const { r, g, b } = hexToRgb(triColor);
      const { h, s, l } = rgbToHsl(r, g, b);
      const adjustedS = s * saturationMultiplier;
      
      // Determine how many colors to generate for this hue
      const numColors = Math.min(colorsPerHue, count - colors.length);
      
      for (let i = 0; i < numColors; i++) {
        // Calculate evenly distributed lightness values
        const newL = 0.2 + (i / (Math.max(numColors - 1, 1))) * 0.6;
        const { r: rNew, g: gNew, b: bNew } = hslToRgb(h, adjustedS, newL);
        
        const hexColor = '#' + [rNew, gNew, bNew].map(c => {
          const hex = Math.round(c).toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        }).join('');
        
        colors.push(hexColor);
      }
    });
    
    return colors.slice(0, count); // Ensure we return exactly the requested number of colors
  };
  
  // Generate a custom color scheme with multiple hue shifts
  const generateCustomScheme = (color: string, count: number, saturationMultiplier: number): string[] => {
    const { r, g, b } = hexToRgb(color);
    const { h, s, l } = rgbToHsl(r, g, b);
    
    const colors: string[] = [];
    const adjustedS = s * saturationMultiplier;
    
    // Generate colors with varying hue shifts
    for (let i = 0; i < count; i++) {
      // Create a pleasing shift in hue around the color wheel
      const hueShift = (i / count) * 0.8; // Shift up to 80% around the wheel
      const newH = (h + hueShift) % 1;
      
      // Vary lightness as well for better diversity
      const lightnessFactor = 0.5 + Math.sin((i / count) * Math.PI) * 0.3;
      const newL = l * lightnessFactor;
      
      const { r: rNew, g: gNew, b: bNew } = hslToRgb(newH, adjustedS, newL);
      
      const hexColor = '#' + [rNew, gNew, bNew].map(c => {
        const hex = Math.round(c).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      }).join('');
      
      colors.push(hexColor);
    }
    
    return colors;
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Color Scheme Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="base-color">Base Color</Label>
          <div className="flex space-x-2">
            <Input
              type="color"
              id="base-color"
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              className="w-12 h-10 p-1"
            />
            <Input
              type="text"
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              className="font-mono"
              placeholder="#RRGGBB"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="scheme-type">Scheme Type</Label>
          <Select
            value={schemeType}
            onValueChange={(value) => setSchemeType(value as SchemeType)}
          >
            <SelectTrigger id="scheme-type">
              <SelectValue placeholder="Select scheme type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monochromatic">Monochromatic</SelectItem>
              <SelectItem value="analogous">Analogous</SelectItem>
              <SelectItem value="complementary">Complementary</SelectItem>
              <SelectItem value="triadic">Triadic</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="color-count">Number of Colors</Label>
            <span className="text-sm text-muted-foreground">{colorCount}</span>
          </div>
          <Slider
            id="color-count"
            min={3}
            max={12}
            step={1}
            value={[colorCount]}
            onValueChange={([value]) => setColorCount(value)}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="saturation">Saturation</Label>
            <span className="text-sm text-muted-foreground">{saturation}%</span>
          </div>
          <Slider
            id="saturation"
            min={0}
            max={150}
            step={1}
            value={[saturation]}
            onValueChange={([value]) => setSaturation(value)}
          />
        </div>
        
        <Button 
          className="w-full" 
          variant="secondary"
          onClick={generateColorScheme}
        >
          Generate Color Scheme
        </Button>
        
        {/* Color preview */}
        <div className="space-y-2 pt-2">
          <Label>Generated Color Scheme</Label>
          <div className="flex overflow-x-auto py-2 gap-2">
            {generatedColors.map((color, index) => (
              <div key={index} className="flex-shrink-0 space-y-1">
                <div 
                  className="w-12 h-12 rounded-md border shadow-sm"
                  style={{ backgroundColor: color }}
                  title={color}
                />
                <p className="text-xs font-mono text-center">{color}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ColorSchemeGenerator;
