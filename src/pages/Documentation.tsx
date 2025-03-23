
import React, { useState } from "react";
import { SidebarLayout } from "@/components/layout/Sidebar";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/contexts/ThemeContext";
import DocumentationGuides from "@/components/documentation/DocumentationGuides";
import DocumentationAPI from "@/components/documentation/DocumentationAPI";
import DocumentationExamples from "@/components/documentation/DocumentationExamples";
import { useLanguage } from "@/contexts/language/LanguageProvider";

const Documentation = () => {
  const { themeVariant } = useTheme();
  const [activeTab, setActiveTab] = useState("guides");
  const { t } = useLanguage();

  return (
    <SidebarLayout>
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 bg-background animate-fade-in">
        <div className="max-w-[1000px] mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">{t("docs.title")}</h1>
            <p className="text-muted-foreground">
              {t("docs.subtitle")}
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className={`grid grid-cols-3 w-full ${themeVariant === "windows" ? "bg-slate-200 dark:bg-slate-800" : ""}`}>
              <TabsTrigger value="guides">{t("docs.tabs.guides")}</TabsTrigger>
              <TabsTrigger value="api">{t("docs.tabs.api")}</TabsTrigger>
              <TabsTrigger value="examples">{t("docs.tabs.examples")}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="guides" className="p-1">
              <DocumentationGuides />
            </TabsContent>
            
            <TabsContent value="api" className="p-1">
              <DocumentationAPI />
            </TabsContent>
            
            <TabsContent value="examples" className="p-1">
              <DocumentationExamples />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </SidebarLayout>
  );
};

export default Documentation;
