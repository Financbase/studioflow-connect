
import React from "react";
import { SidebarLayout } from "@/components/layout/Sidebar";
import Header from "@/components/Header";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import StoragePanel from "@/components/library/StoragePanel";
import LibraryHeader from "@/components/library/LibraryHeader";
import LibraryMainContent from "@/components/library/LibraryMainContent";
import { useLibrary } from "@/hooks/use-library";

const Library = () => {
  const {
    activeTab,
    setActiveTab,
    searchQuery,
    viewMode,
    setViewMode,
    sortBy,
    setSortBy,
    isLoading,
    filteredAudioFiles,
    handleSearchChange
  } = useLibrary();

  return (
    <SidebarLayout>
      <Header />
      
      <main className="flex-1 container mx-auto p-4 md:p-6 lg:p-8 bg-background animate-fade-in">
        <div className="space-y-6">
          <LibraryHeader />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <LibraryMainContent
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              viewMode={viewMode}
              setViewMode={setViewMode}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              sortBy={sortBy}
              onSortChange={setSortBy}
              filteredSamples={filteredAudioFiles}
              isLoading={isLoading}
            />
            
            <div className="space-y-6">
              <StoragePanel />
            </div>
          </div>
        </div>
      </main>
    </SidebarLayout>
  );
};

export default Library;
