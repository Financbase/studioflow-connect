
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/language";

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
    <TabsList 
      className={`${themeVariant === "windows" ? "gap-0" : "gap-1"} w-full`}
      aria-label="Library Navigation Tabs"
    >
      <TabsTrigger value="all" onClick={() => onTabChange("all")}>
        {t("library.tabs.all")}
      </TabsTrigger>
      <TabsTrigger value="samples" onClick={() => onTabChange("samples")}>
        {t("library.tabs.samples")}
      </TabsTrigger>
      <TabsTrigger value="loops" onClick={() => onTabChange("loops")}>
        {t("library.tabs.loops")}
      </TabsTrigger>
      <TabsTrigger value="vocals" onClick={() => onTabChange("vocals")}>
        {t("library.tabs.vocals")}
      </TabsTrigger>
    </TabsList>
  );
};

export default LibraryNavTabs;
