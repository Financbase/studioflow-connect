
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

  const tabs = [
    { id: "all", label: t("library.tabs.all") },
    { id: "samples", label: t("library.tabs.samples") },
    { id: "loops", label: t("library.tabs.loops") },
    { id: "vocals", label: t("library.tabs.vocals") }
  ];

  return (
    <div className="flex space-x-1">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`px-3 py-1.5 text-sm font-medium rounded-md ${
            activeTab === tab.id 
              ? "bg-primary text-primary-foreground" 
              : "text-muted-foreground hover:text-foreground hover:bg-accent"
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default LibraryNavTabs;
