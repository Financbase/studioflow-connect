
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
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
      <TabsList 
        className={`bg-transparent ${themeVariant === "windows" ? "gap-0" : "gap-1"}`}
        aria-label="Library Navigation Tabs"
      >
        <TabsTrigger 
          value="all" 
          onClick={() => onTabChange("all")}
          className={activeTab === "all" ? "bg-background data-[state=active]:bg-background" : ""}
        >
          {t("library.tabs.all")}
        </TabsTrigger>
        <TabsTrigger 
          value="samples" 
          onClick={() => onTabChange("samples")}
          className={activeTab === "samples" ? "bg-background data-[state=active]:bg-background" : ""}
        >
          {t("library.tabs.samples")}
        </TabsTrigger>
        <TabsTrigger 
          value="loops" 
          onClick={() => onTabChange("loops")}
          className={activeTab === "loops" ? "bg-background data-[state=active]:bg-background" : ""}
        >
          {t("library.tabs.loops")}
        </TabsTrigger>
        <TabsTrigger 
          value="vocals" 
          onClick={() => onTabChange("vocals")}
          className={activeTab === "vocals" ? "bg-background data-[state=active]:bg-background" : ""}
        >
          {t("library.tabs.vocals")}
        </TabsTrigger>
      </TabsList>
    </div>
  );
};

export default LibraryNavTabs;
