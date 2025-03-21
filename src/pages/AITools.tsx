
import React from "react";
import { SidebarLayout } from "@/components/layout/Sidebar";
import Header from "@/components/Header";
import AITools from "@/components/AITools";

const AIToolsPage: React.FC = () => {
  return (
    <SidebarLayout>
      <Header />
      <main className="flex-1 px-4 py-6 md:px-6 lg:px-8 bg-background overflow-auto">
        <div className="max-w-5xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold">AI Tools</h1>
            <p className="text-muted-foreground">
              Powerful AI tools to enhance your workflow
            </p>
          </div>
          
          <AITools />
        </div>
      </main>
    </SidebarLayout>
  );
};

export default AIToolsPage;
