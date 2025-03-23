
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/language/LanguageProvider";

interface SettingsNavTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const SettingsNavTabs: React.FC<SettingsNavTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  const { themeVariant } = useTheme();
  const { t } = useLanguage();

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList 
        className={`${themeVariant === "windows" ? "gap-0" : "gap-1"} w-full`}
        aria-label="Settings Navigation Tabs"
      >
        <TabsTrigger value="general">
          {t("settings.tabs.general")}
        </TabsTrigger>
        <TabsTrigger value="appearance">
          {t("settings.tabs.appearance")}
        </TabsTrigger>
        <TabsTrigger value="notifications">
          {t("settings.tabs.notifications")}
        </TabsTrigger>
        <TabsTrigger value="privacy">
          {t("settings.tabs.privacy")}
        </TabsTrigger>
        <TabsTrigger value="subscription">
          {t("settings.tabs.subscription")}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default SettingsNavTabs;
