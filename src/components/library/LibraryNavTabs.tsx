
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
    <div className="flex space-x-1">
      <button
        className={`px-3 py-1.5 text-sm font-medium rounded-md ${
          activeTab === "all" 
            ? "bg-primary text-primary-foreground" 
            : "text-muted-foreground hover:text-foreground hover:bg-accent"
        }`}
        onClick={() => onTabChange("all")}
      >
        {t("library.tabs.all")}
      </button>
      <button
        className={`px-3 py-1.5 text-sm font-medium rounded-md ${
          activeTab === "samples" 
            ? "bg-primary text-primary-foreground" 
            : "text-muted-foreground hover:text-foreground hover:bg-accent"
        }`}
        onClick={() => onTabChange("samples")}
      >
        {t("library.tabs.samples")}
      </button>
      <button
        className={`px-3 py-1.5 text-sm font-medium rounded-md ${
          activeTab === "loops" 
            ? "bg-primary text-primary-foreground" 
            : "text-muted-foreground hover:text-foreground hover:bg-accent"
        }`}
        onClick={() => onTabChange("loops")}
      >
        {t("library.tabs.loops")}
      </button>
      <button
        className={`px-3 py-1.5 text-sm font-medium rounded-md ${
          activeTab === "vocals" 
            ? "bg-primary text-primary-foreground" 
            : "text-muted-foreground hover:text-foreground hover:bg-accent"
        }`}
        onClick={() => onTabChange("vocals")}
      >
        {t("library.tabs.vocals")}
      </button>
    </div>
  );
};

export default LibraryNavTabs;
