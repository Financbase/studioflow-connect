
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/language";

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
    <TabsList 
      className={`${themeVariant === "windows" ? "gap-0" : "gap-1"} w-full`}
      aria-label="Settings Navigation Tabs"
    >
      <TabsTrigger 
        value="general" 
        onClick={() => onTabChange("general")}
      >
        {t("settings.tabs.general")}
      </TabsTrigger>
      <TabsTrigger 
        value="appearance" 
        onClick={() => onTabChange("appearance")}
      >
        {t("settings.tabs.appearance")}
      </TabsTrigger>
      <TabsTrigger 
        value="notifications" 
        onClick={() => onTabChange("notifications")}
      >
        {t("settings.tabs.notifications")}
      </TabsTrigger>
      <TabsTrigger 
        value="privacy" 
        onClick={() => onTabChange("privacy")}
      >
        {t("settings.tabs.privacy")}
      </TabsTrigger>
      <TabsTrigger 
        value="subscription" 
        onClick={() => onTabChange("subscription")}
      >
        {t("settings.tabs.subscription")}
      </TabsTrigger>
    </TabsList>
  );
};

export default SettingsNavTabs;
