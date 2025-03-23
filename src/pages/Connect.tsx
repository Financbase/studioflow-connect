
import React from "react";
import { SidebarLayout } from "@/components/layout/Sidebar";
import Header from "@/components/Header";
import StudioFlowConnect from "@/components/StudioFlowConnect";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language";

const Connect = () => {
  const { t } = useLanguage();
  
  return (
    <SidebarLayout>
      <Header />
      <main className="flex-1 px-4 py-6 md:px-6 lg:px-8 bg-background overflow-auto">
        <div className="max-w-[1200px] mx-auto space-y-6 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold">{t("connect.title")}</h1>
            <p className="text-muted-foreground">
              {t("connect.subtitle")}
            </p>
          </div>

          <Tabs defaultValue="connect" className="space-y-4">
            <TabsList>
              <TabsTrigger value="connect">{t("connect.tabs.connect")}</TabsTrigger>
              <TabsTrigger value="devices">{t("connect.tabs.devices")}</TabsTrigger>
              <TabsTrigger value="storage">{t("connect.tabs.storage")}</TabsTrigger>
              <TabsTrigger value="plugins">{t("connect.tabs.plugins")}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="connect" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t("connect.cards.connect.title")}</CardTitle>
                  <CardDescription>
                    {t("connect.cards.connect.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <StudioFlowConnect />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="devices" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t("connect.cards.devices.title")}</CardTitle>
                  <CardDescription>
                    {t("connect.cards.devices.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Device management content would go here</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="storage" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t("connect.cards.storage.title")}</CardTitle>
                  <CardDescription>
                    {t("connect.cards.storage.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Storage management content would go here</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="plugins" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t("connect.cards.plugins.title")}</CardTitle>
                  <CardDescription>
                    {t("connect.cards.plugins.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Plugin bridge management content would go here</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </SidebarLayout>
  );
};

export default Connect;
