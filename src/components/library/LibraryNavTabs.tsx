
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/language/LanguageProvider";

interface LibraryNavTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const LibraryNavTabs: React.FC<LibraryNavTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  const { themeVariant } = useTheme();
  const { t } = useLanguage();

  return (
    <div className="flex space-x-1 p-1 bg-muted rounded-lg">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList 
          className={`${themeVariant === "windows" ? "gap-0" : "gap-1"} w-full`}
          aria-label="Library Navigation Tabs"
        >
          <TabsTrigger value="all">
            {t("library.tabs.all")}
          </TabsTrigger>
          <TabsTrigger value="samples">
            {t("library.tabs.samples")}
          </TabsTrigger>
          <TabsTrigger value="loops">
            {t("library.tabs.loops")}
          </TabsTrigger>
          <TabsTrigger value="vocals">
            {t("library.tabs.vocals")}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default LibraryNavTabs;
