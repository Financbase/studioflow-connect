
import React, { useEffect } from "react";
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
  const { t, isInitialized } = useLanguage();

  useEffect(() => {
    // Debug translations
    if (isInitialized) {
      console.log("Library tab translations:", {
        all: t("library.tabs.all"),
        samples: t("library.tabs.samples"),
        loops: t("library.tabs.loops"),
        vocals: t("library.tabs.vocals")
      });
    }
  }, [isInitialized, t]);

  // Fallback labels to use while translations load
  const fallbackLabels = {
    all: "All",
    samples: "Samples",
    loops: "Loops",
    vocals: "Vocals"
  };

  const getTabs = () => {
    if (!isInitialized) {
      return [
        { id: "all", label: fallbackLabels.all },
        { id: "samples", label: fallbackLabels.samples },
        { id: "loops", label: fallbackLabels.loops },
        { id: "vocals", label: fallbackLabels.vocals }
      ];
    }
    
    return [
      { id: "all", label: t("library.tabs.all") },
      { id: "samples", label: t("library.tabs.samples") },
      { id: "loops", label: t("library.tabs.loops") },
      { id: "vocals", label: t("library.tabs.vocals") }
    ];
  };

  const tabs = getTabs();

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
