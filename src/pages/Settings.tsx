
import React from "react";
import { SidebarLayout } from "@/components/layout/Sidebar";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GeneralSettings from "@/components/settings/GeneralSettings";
import AppearanceSettings from "@/components/settings/AppearanceSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import PrivacySettings from "@/components/settings/PrivacySettings";
import SubscriptionSettings from "@/components/settings/SubscriptionSettings";
import { useLanguage } from "@/contexts/language/LanguageProvider";

const Settings = () => {
  const { t } = useLanguage();

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

          <Tabs defaultValue="general" className="space-y-4">
            <TabsList>
              <TabsTrigger value="general">{t("settings.tabs.general")}</TabsTrigger>
              <TabsTrigger value="appearance">{t("settings.tabs.appearance")}</TabsTrigger>
              <TabsTrigger value="notifications">{t("settings.tabs.notifications")}</TabsTrigger>
              <TabsTrigger value="privacy">{t("settings.tabs.privacy")}</TabsTrigger>
              <TabsTrigger value="subscription">{t("settings.tabs.subscription")}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-4">
              <GeneralSettings />
            </TabsContent>
            
            <TabsContent value="appearance" className="space-y-4">
              <AppearanceSettings />
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-4">
              <NotificationSettings />
            </TabsContent>
            
            <TabsContent value="privacy" className="space-y-4">
              <PrivacySettings />
            </TabsContent>
            
            <TabsContent value="subscription" className="space-y-4">
              <SubscriptionSettings />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </SidebarLayout>
  );
};

export default Settings;
