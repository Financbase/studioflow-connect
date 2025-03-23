
import React, { useState } from "react";
import { SidebarLayout } from "@/components/layout/Sidebar";
import Header from "@/components/Header";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import GeneralSettings from "@/components/settings/GeneralSettings";
import AppearanceSettings from "@/components/settings/AppearanceSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import PrivacySettings from "@/components/settings/PrivacySettings";
import SubscriptionSettings from "@/components/settings/SubscriptionSettings";
import SettingsNavTabs from "@/components/settings/SettingsNavTabs";
import { useLanguage } from "@/contexts/language/LanguageProvider";

const Settings = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("general");

  return (
    <SidebarLayout>
      <Header />
      <main className="flex-1 px-4 py-6 md:px-6 lg:px-8 bg-background overflow-auto">
        <div className="max-w-5xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{t("settings.title")}</h1>
            <p className="text-muted-foreground">
              {t("settings.description")}
            </p>
          </div>

          <div className="space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <SettingsNavTabs activeTab={activeTab} onTabChange={setActiveTab} />
              
              <TabsContent value="general">
                <GeneralSettings />
              </TabsContent>
              
              <TabsContent value="appearance">
                <AppearanceSettings />
              </TabsContent>
              
              <TabsContent value="notifications">
                <NotificationSettings />
              </TabsContent>
              
              <TabsContent value="privacy">
                <PrivacySettings />
              </TabsContent>
              
              <TabsContent value="subscription">
                <SubscriptionSettings />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </SidebarLayout>
  );
};

export default Settings;
