
import React, { useState } from "react";
import { SidebarLayout } from "@/components/layout/Sidebar";
import Header from "@/components/Header";
import LibraryHeader from "@/components/library/LibraryHeader";
import LibraryMainContent from "@/components/library/LibraryMainContent";
import { useLanguage } from "@/contexts/language/LanguageProvider";
import { useLibrary } from "@/hooks/use-library";

const Library = () => {
  const { t } = useLanguage();
  const { 
    activeTab, 
    setActiveTab,
    searchQuery,
    handleSearchChange,
    viewMode,
    setViewMode,
    sortBy,
    setSortBy,
    isLoading,
    filteredAudioFiles
  } = useLibrary();

  const handleSortChange = (value: "date" | "name" | "size") => {
    setSortBy(value);
  };

  return (
    <SidebarLayout>
      <Header />
      <main className="flex-1 px-4 py-6 md:px-6 lg:px-8 bg-background overflow-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          <LibraryHeader />
          
          <LibraryMainContent 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            viewMode={viewMode}
            setViewMode={setViewMode}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            filteredSamples={filteredAudioFiles}
            isLoading={isLoading}
          />
        </div>
      </main>
    </SidebarLayout>
  );
};

export default Library;
