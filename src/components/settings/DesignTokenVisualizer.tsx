
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/contexts/language/LanguageProvider";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const DesignTokenVisualizer = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("colors");
  const [showValues, setShowValues] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Dummy data for token counts - in a real app would come from theme tokens
  const tokenCounts = {
    total: 22,
    colors: 16,
    spacing: 3,
    typography: 0,
    other: 3
  };

  // Sample color tokens - in a real app would come from the theme system
  const colorTokens = [
    { name: "--accent", value: "#8B5CF6" },
    { name: "--accent-foreground", value: "#FFFFFF" },
    { name: "--background", value: "#09090B" },
    { name: "--border", value: "#27272A" },
    { name: "--card", value: "#09090B" },
    { name: "--card-foreground", value: "#FFFFFF" },
    { name: "--destructive", value: "#EF4444" },
    { name: "--destructive-foreground", value: "#FFFFFF" },
    { name: "--foreground", value: "#FFFFFF" },
    { name: "--muted", value: "#27272A" },
    { name: "--muted-foreground", value: "#A1A1AA" },
    { name: "--popover", value: "#09090B" },
    { name: "--popover-foreground", value: "#FFFFFF" },
    { name: "--primary", value: "#6366F1" },
    { name: "--primary-foreground", value: "#FFFFFF" },
    { name: "--secondary", value: "#1E293B" }
  ];

  // Filter tokens based on search query
  const filteredTokens = colorTokens.filter(token => 
    token.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("design.tokens.title")}</CardTitle>
        <CardDescription>{t("design.tokens.description")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <Input 
            placeholder={t("design.tokens.search")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
          <div className="flex items-center space-x-2">
            <Switch 
              checked={showValues} 
              onCheckedChange={setShowValues} 
              id="show-values" 
            />
            <label htmlFor="show-values">{t("design.tokens.show_values")}</label>
          </div>
        </div>

        <Card className="bg-muted/50 border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{t("design.tokens.tip.title")}</CardTitle>
            <CardDescription>{t("design.tokens.tip.description")}</CardDescription>
          </CardHeader>
        </Card>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{`${t("design.tokens.total")}: ${tokenCounts.total}`}</Badge>
          <Badge variant="outline">{`${t("design.tokens.colors")}: ${tokenCounts.colors}`}</Badge>
          <Badge variant="outline">{`${t("design.tokens.spacing")}: ${tokenCounts.spacing}`}</Badge>
          <Badge variant="outline">{`${t("design.tokens.typography")}: ${tokenCounts.typography}`}</Badge>
          <Badge variant="outline">{`${t("design.tokens.other")}: ${tokenCounts.other}`}</Badge>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="colors">{t("design.tokens.tab.colors")}</TabsTrigger>
            <TabsTrigger value="spacing">{t("design.tokens.tab.spacing")}</TabsTrigger>
            <TabsTrigger value="typography">{t("design.tokens.tab.typography")}</TabsTrigger>
            <TabsTrigger value="other">{t("design.tokens.tab.other")}</TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="mt-4">
            <ScrollArea className="h-[400px]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {filteredTokens.map((token) => (
                  <div 
                    key={token.name} 
                    className="overflow-hidden rounded-lg border"
                  >
                    <div 
                      className="h-16" 
                      style={{ backgroundColor: token.value }}
                    ></div>
                    <div className="p-2 bg-card">
                      <div className="text-xs font-mono">{token.name}</div>
                      {showValues && (
                        <div className="text-xs text-muted-foreground mt-1">{token.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="spacing" className="mt-4">
            <div className="flex items-center justify-center h-40">
              <p className="text-muted-foreground">{t("design.tokens.tab.spacing")} tokens</p>
            </div>
          </TabsContent>

          <TabsContent value="typography" className="mt-4">
            <div className="flex items-center justify-center h-40">
              <p className="text-muted-foreground">{t("design.tokens.tab.typography")} tokens</p>
            </div>
          </TabsContent>

          <TabsContent value="other" className="mt-4">
            <div className="flex items-center justify-center h-40">
              <p className="text-muted-foreground">{t("design.tokens.tab.other")} tokens</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DesignTokenVisualizer;
