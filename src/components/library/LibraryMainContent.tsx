
import React from "react";
import { Tabs } from "@/components/ui/tabs";
import ViewModeToggle from "./ViewModeToggle";
import SearchAndFilter from "./SearchAndFilter";
import LibraryTabs from "./LibraryTabs";
import { AudioFile } from "./types";

interface LibraryMainContentProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sortBy: "date" | "name" | "size";
  onSortChange: (value: "date" | "name" | "size") => void;
  filteredSamples: AudioFile[];
  isLoading: boolean;
}

const LibraryMainContent: React.FC<LibraryMainContentProps> = ({
  activeTab,
  setActiveTab,
  viewMode,
  setViewMode,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  filteredSamples,
  isLoading
}) => {
  const handleViewModeChange = (mode: "grid" | "list") => {
    setViewMode(mode);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="lg:col-span-3 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="w-full sm:w-auto">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <LibraryTabs
              activeTab={activeTab}
              onTabChange={handleTabChange}
              viewMode={viewMode}
              sortBy={sortBy}
              filteredSamples={filteredSamples}
              isLoading={isLoading}
            />
          </Tabs>
        </div>
        
        <ViewModeToggle 
          viewMode={viewMode} 
          onViewModeChange={handleViewModeChange} 
        />
      </div>
      
      <SearchAndFilter
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        sortBy={sortBy}
        onSortChange={onSortChange}
      />
    </div>
  );
};

export default LibraryMainContent;
