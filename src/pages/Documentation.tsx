
import React, { useState } from "react";
import { SidebarLayout } from "@/components/layout/Sidebar";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/contexts/ThemeContext";
import DocumentationGuides from "@/components/documentation/DocumentationGuides";
import DocumentationAPI from "@/components/documentation/DocumentationAPI";
import DocumentationExamples from "@/components/documentation/DocumentationExamples";

const Documentation = () => {
  const { themeVariant } = useTheme();
  const [activeTab, setActiveTab] = useState("guides");

  return (
    <SidebarLayout>
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 bg-background animate-fade-in">
        <div className="max-w-[1000px] mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Documentation</h1>
            <p className="text-muted-foreground">
              Explore guides, API references, and examples to help you get the most out of StudioFlow
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className={`grid grid-cols-3 w-full ${themeVariant === "windows" ? "bg-slate-200 dark:bg-slate-800" : ""}`}>
              <TabsTrigger value="guides">Guides</TabsTrigger>
              <TabsTrigger value="api">API Reference</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
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
