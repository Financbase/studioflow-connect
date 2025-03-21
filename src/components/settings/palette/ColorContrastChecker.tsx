
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  getContrastRatio, 
  evaluateWCAGCompliance, 
  getContrastDescription, 
  suggestAccessibleColors 
} from "@/lib/colorUtils/colorContrast";

interface ColorContrastCheckerProps {
  colors: Record<string, string>;
}

const ColorContrastChecker: React.FC<ColorContrastCheckerProps> = ({ colors }) => {
  const [contrastPairs, setContrastPairs] = useState<Array<{
    name: string;
    background: string;
    foreground: string;
    ratio: number;
    compliance: ReturnType<typeof evaluateWCAGCompliance>;
    description: string;
  }>>([]);
  
  // Calculate contrast ratios for main component color pairs
  useEffect(() => {
    const pairs = [
      {
        name: "Primary Button",
        background: colors.primary || "#000000",
        foreground: colors["primary-foreground"] || "#FFFFFF",
      },
      {
        name: "Secondary Button",
        background: colors.secondary || "#EEEEEE",
        foreground: colors["secondary-foreground"] || "#000000",
      },
      {
        name: "Page Background",
        background: colors.background || "#FFFFFF",
        foreground: colors.foreground || "#000000",
      },
      {
        name: "Card",
        background: colors.card || "#FFFFFF",
        foreground: colors["card-foreground"] || "#000000",
      },
      {
        name: "Accent",
        background: colors.accent || "#F0F0FF",
        foreground: colors["accent-foreground"] || "#0000DD",
      },
      {
        name: "Destructive",
        background: colors.destructive || "#FF0000",
        foreground: colors["destructive-foreground"] || "#FFFFFF",
      },
      {
        name: "Muted",
        background: colors.muted || "#F6F6F6",
        foreground: colors["muted-foreground"] || "#666666",
      },
    ];
    
    const calculatedPairs = pairs.map(pair => {
      const ratio = getContrastRatio(pair.background, pair.foreground);
      const compliance = evaluateWCAGCompliance(pair.background, pair.foreground);
      const description = getContrastDescription(ratio);
      
      return {
        ...pair,
        ratio,
        compliance,
        description
      };
    });
    
    setContrastPairs(calculatedPairs);
  }, [colors]);
  
  const getComplianceBadge = (compliance: ReturnType<typeof evaluateWCAGCompliance>) => {
    if (compliance.AAA) {
      return <Badge className="bg-green-500 text-white">AAA</Badge>;
    } else if (compliance.AA) {
      return <Badge className="bg-blue-500 text-white">AA</Badge>;
    } else if (compliance.AALarge) {
      return <Badge className="bg-yellow-500 text-white">AA Large</Badge>;
    } else {
      return <Badge className="bg-red-500 text-white">Fails</Badge>;
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Color Contrast Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground mb-2">
            WCAG 2.1 guidelines recommend a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text.
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {contrastPairs.map((pair, index) => (
              <div key={index} className="p-3 border rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">{pair.name}</div>
                  <div className="flex space-x-2">
                    {getComplianceBadge(pair.compliance)}
                    <Badge variant="outline">
                      {pair.ratio.toFixed(2)}:1
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div 
                    className="h-12 rounded flex items-center justify-center"
                    style={{ 
                      backgroundColor: pair.background,
                      color: pair.foreground,
                      border: '1px solid var(--border)'
                    }}
                  >
                    Sample Text
                  </div>
                  
                  <div className="flex flex-col text-xs space-y-1">
                    <div className="flex items-center">
                      <div 
                        className="w-4 h-4 mr-2 rounded-sm"
                        style={{ backgroundColor: pair.background }}
                      ></div>
                      <span>Background: {pair.background}</span>
                    </div>
                    <div className="flex items-center">
                      <div 
                        className="w-4 h-4 mr-2 rounded-sm"
                        style={{ backgroundColor: pair.foreground }}
                      ></div>
                      <span>Foreground: {pair.foreground}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  {pair.compliance.AA ? (
                    <span className="text-green-500">✓ Meets WCAG AA standards</span>
                  ) : (
                    <>
                      <span className="text-red-500">✗ Doesn't meet WCAG AA standards</span>
                      <div className="mt-1">
                        Suggestion: Consider using{' '}
                        {suggestAccessibleColors(pair.background, pair.foreground).suggested.color}{' '}
                        for better contrast
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ColorContrastChecker;
