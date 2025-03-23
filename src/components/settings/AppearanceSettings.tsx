
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ColorPaletteEditor from "./ColorPaletteEditor";
import ThemeVersionControl from "./ThemeVersionControl";
import { useLanguage } from "@/contexts/language/LanguageProvider";
import DesignTokenVisualizer from "./DesignTokenVisualizer";

const AppearanceSettings: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("themes");

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="themes">{t("settings.appearance.tabs.themes")}</TabsTrigger>
          <TabsTrigger value="palettes">{t("settings.appearance.tabs.palettes")}</TabsTrigger>
          <TabsTrigger value="tokens">{t("settings.appearance.tabs.tokens")}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="themes" className="space-y-6">
          <ThemeVersionControl />
        </TabsContent>
        
        <TabsContent value="palettes" className="space-y-6">
          <ColorPaletteEditor />
        </TabsContent>
        
        <TabsContent value="tokens" className="space-y-6">
          <DesignTokenVisualizer />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AppearanceSettings;
