
import React, { useState } from "react";
import { SidebarLayout } from "@/components/layout/Sidebar";
import Header from "@/components/Header";
import LibraryHeader from "@/components/library/LibraryHeader";
import LibraryMainContent from "@/components/library/LibraryMainContent";
import { useLanguage } from "@/contexts/language/LanguageProvider";

const Library = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <SidebarLayout>
      <Header />
      <main className="flex-1 px-4 py-6 md:px-6 lg:px-8 bg-background overflow-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          <LibraryHeader 
            searchQuery={searchQuery} 
            onSearchChange={setSearchQuery}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
          
          <LibraryMainContent 
            activeTab={activeTab}
            onTabChange={setActiveTab}
            searchQuery={searchQuery}
            viewMode={viewMode}
          />
        </div>
      </main>
    </SidebarLayout>
  );
};

export default Library;
