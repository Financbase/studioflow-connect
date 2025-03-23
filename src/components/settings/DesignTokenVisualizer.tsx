
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useLanguage } from "@/contexts/language/LanguageProvider";
import { hexToRgb } from "@/lib/colorUtils";

const DesignTokenVisualizer = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("colors");
  const [showValues, setShowValues] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Utility function to convert color variables to actual values
  const getComputedColor = (variable: string) => {
    const rawValue = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
    // If it's an HSL value in the format of "H S% L%"
    if (rawValue.includes(" ")) {
      const [h, s, l] = rawValue.split(" ");
      return `hsl(${h}, ${s}, ${l})`;
    }
    return rawValue.startsWith("#") ? rawValue : `#${rawValue}`;
  };
  
  // Get the CSS variable value from the DOM
  const getCssVariableValue = (variableName: string) => {
    return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
  };
  
  // Collect all CSS variables from the root
  const collectCssVariables = () => {
    const styleSheets = document.styleSheets;
    const cssVars: Record<string, string[]> = {
      colors: [],
      spacing: [],
      typography: [],
      other: []
    };
    
    try {
      for (const sheet of styleSheets) {
        try {
          for (const rule of sheet.cssRules) {
            if (rule instanceof CSSStyleRule && rule.selectorText === ":root") {
              const styleText = rule.style.cssText;
              const matches = styleText.match(/--[^:]+:[^;]+;/g);
              
              if (matches) {
                matches.forEach(match => {
                  const [name] = match.split(":");
                  const varName = name.trim();
                  
                  if (varName.includes("background") || 
                      varName.includes("foreground") || 
                      varName.includes("card") || 
                      varName.includes("border") || 
                      varName.includes("primary") || 
                      varName.includes("secondary") ||
                      varName.includes("accent") ||
                      varName.includes("muted") ||
                      varName.includes("destructive")) {
                    cssVars.colors.push(varName);
                  } else if (varName.includes("spacing") || 
                            varName.includes("size") || 
                            varName.includes("gap") || 
                            varName.includes("padding") || 
                            varName.includes("margin") ||
                            varName.includes("radius")) {
                    cssVars.spacing.push(varName);
                  } else if (varName.includes("font") || 
                            varName.includes("text") || 
                            varName.includes("line")) {
                    cssVars.typography.push(varName);
                  } else {
                    cssVars.other.push(varName);
                  }
                });
              }
            }
          }
        } catch (e) {
          // Some style sheets may not be accessible due to CORS
          console.log("Could not access style sheet:", e);
        }
      }
    } catch (e) {
      console.error("Error collecting CSS variables:", e);
    }
    
    // Sort the variables
    for (const key in cssVars) {
      cssVars[key as keyof typeof cssVars].sort();
    }
    
    return cssVars;
  };
  
  const cssVars = collectCssVariables();
  
  // Filter variables based on search term
  const filterVariables = (variables: string[]) => {
    if (!searchTerm) return variables;
    return variables.filter(v => v.toLowerCase().includes(searchTerm.toLowerCase()));
  };

  const renderColorTokens = () => {
    const colorVars = filterVariables(cssVars.colors);
    
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {colorVars.map(variable => {
          const colorValue = getCssVariableValue(variable);
          const displayColor = colorValue.includes(" ") 
            ? `hsl(${colorValue})` 
            : colorValue;
          
          return (
            <div 
              key={variable} 
              className="border rounded-md overflow-hidden"
              onClick={() => {
                navigator.clipboard.writeText(`var(${variable})`);
                alert(`Copied ${variable} to clipboard`);
              }}
            >
              <div 
                className="h-20 w-full"
                style={{ 
                  backgroundColor: displayColor.startsWith("hsl") 
                    ? displayColor 
                    : `hsl(${colorValue})` 
                }}
              />
              <div className="p-2 bg-card">
                <p className="text-xs font-mono truncate">{variable}</p>
                {showValues && (
                  <p className="text-xs text-muted-foreground mt-1 font-mono">
                    {colorValue}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  
  const renderSpacingTokens = () => {
    const spacingVars = filterVariables(cssVars.spacing);
    
    return (
      <div className="space-y-4">
        {spacingVars.map(variable => {
          const value = getCssVariableValue(variable);
          
          return (
            <div 
              key={variable} 
              className="flex items-center space-x-4 p-2 border rounded-md hover:bg-muted/30 cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(`var(${variable})`);
                alert(`Copied ${variable} to clipboard`);
              }}
            >
              {!variable.includes("radius") && (
                <div className="bg-primary/20 border border-primary/30" style={{ width: value, height: '20px' }} />
              )}
              {variable.includes("radius") && (
                <div className="bg-primary/20 border border-primary/30 h-10 w-10" style={{ borderRadius: value }} />
              )}
              <div>
                <p className="text-sm font-mono">{variable}</p>
                {showValues && <p className="text-xs text-muted-foreground font-mono">{value}</p>}
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  
  const renderTypographyTokens = () => {
    const typographyVars = filterVariables(cssVars.typography);
    
    return (
      <div className="space-y-4">
        {typographyVars.map(variable => {
          const value = getCssVariableValue(variable);
          
          return (
            <div 
              key={variable} 
              className="p-2 border rounded-md hover:bg-muted/30 cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(`var(${variable})`);
                alert(`Copied ${variable} to clipboard`);
              }}
            >
              <p className="text-sm font-mono">{variable}</p>
              {showValues && <p className="text-xs text-muted-foreground font-mono">{value}</p>}
              {variable.includes("font-size") && (
                <p style={{ fontSize: value }}>Example Text</p>
              )}
              {variable.includes("line-height") && (
                <p style={{ lineHeight: value }}>
                  This is an example of text with the specified line height. 
                  It demonstrates how lines of text are spaced vertically.
                </p>
              )}
            </div>
          );
        })}
      </div>
    );
  };
  
  const renderOtherTokens = () => {
    const otherVars = filterVariables(cssVars.other);
    
    return (
      <div className="space-y-2">
        {otherVars.map(variable => {
          const value = getCssVariableValue(variable);
          
          return (
            <div 
              key={variable} 
              className="flex justify-between p-2 border rounded-md hover:bg-muted/30 cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(`var(${variable})`);
                alert(`Copied ${variable} to clipboard`);
              }}
            >
              <p className="text-sm font-mono">{variable}</p>
              {showValues && <p className="text-xs text-muted-foreground font-mono">{value}</p>}
            </div>
          );
        })}
      </div>
    );
  };
  
  const totalTokens = Object.values(cssVars).reduce((total, vars) => total + vars.length, 0);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("design.tokens.title") || "Design Token Visualizer"}</CardTitle>
        <CardDescription>
          {t("design.tokens.description") || "View and audit all design tokens used in the application"}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <Input
            placeholder={t("design.tokens.search") || "Search tokens..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="show-values" 
              checked={showValues} 
              onCheckedChange={(checked) => setShowValues(checked as boolean)}
            />
            <Label htmlFor="show-values">
              {t("design.tokens.show_values") || "Show values"}
            </Label>
          </div>
        </div>
        
        <Alert className="bg-muted/50">
          <AlertTitle>{t("design.tokens.tip.title") || "Usage Tip"}</AlertTitle>
          <AlertDescription>
            {t("design.tokens.tip.description") || "Click on any token to copy its CSS variable to your clipboard."}
          </AlertDescription>
        </Alert>
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">
            {t("design.tokens.total") || "Total tokens"}: {totalTokens}
          </Badge>
          <Badge variant="outline">
            {t("design.tokens.colors") || "Colors"}: {cssVars.colors.length}
          </Badge>
          <Badge variant="outline">
            {t("design.tokens.spacing") || "Spacing"}: {cssVars.spacing.length}
          </Badge>
          <Badge variant="outline">
            {t("design.tokens.typography") || "Typography"}: {cssVars.typography.length}
          </Badge>
          <Badge variant="outline">
            {t("design.tokens.other") || "Other"}: {cssVars.other.length}
          </Badge>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="colors">{t("design.tokens.tab.colors") || "Colors"}</TabsTrigger>
            <TabsTrigger value="spacing">{t("design.tokens.tab.spacing") || "Spacing"}</TabsTrigger>
            <TabsTrigger value="typography">{t("design.tokens.tab.typography") || "Typography"}</TabsTrigger>
            <TabsTrigger value="other">{t("design.tokens.tab.other") || "Other"}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="colors" className="space-y-4">
            {renderColorTokens()}
          </TabsContent>
          
          <TabsContent value="spacing" className="space-y-4">
            {renderSpacingTokens()}
          </TabsContent>
          
          <TabsContent value="typography" className="space-y-4">
            {renderTypographyTokens()}
          </TabsContent>
          
          <TabsContent value="other" className="space-y-4">
            {renderOtherTokens()}
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t pt-6">
        <Button variant="outline" onClick={() => window.print()}>
          {t("design.tokens.export") || "Export Report"}
        </Button>
        <Button
          onClick={() => {
            const data = {
              tokens: cssVars,
              timestamp: new Date().toISOString(),
              theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light'
            };
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'design-tokens-audit.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }}
        >
          {t("design.tokens.download") || "Download JSON"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DesignTokenVisualizer;
