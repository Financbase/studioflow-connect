
import React, { useEffect } from "react";
import { SidebarLayout } from "@/components/layout/Sidebar";
import Header from "@/components/Header";
import AITools from "@/components/AITools";
import { useLanguage } from "@/contexts/language";

const AIToolsPage: React.FC = () => {
  const { t, isInitialized } = useLanguage();
  
  useEffect(() => {
    // Debug language provider initialization
    console.log("AITools page - language provider initialized:", isInitialized);
    
    if (isInitialized) {
      console.log("AI tools translations:", {
        title: t("ai.title"),
        subtitle: t("ai.subtitle")
      });
    }
  }, [isInitialized, t]);

  return (
    <SidebarLayout>
      <Header />
      <main className="flex-1 px-4 py-6 md:px-6 lg:px-8 bg-background overflow-auto">
        <div className="max-w-5xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{isInitialized ? t("ai.title") : "AI Tools"}</h1>
            <p className="text-muted-foreground">
              {isInitialized ? t("ai.subtitle") : "Intelligent automation for your workflow"}
            </p>
          </div>
          
          <AITools />
        </div>
      </main>
    </SidebarLayout>
  );
};

export default AIToolsPage;
