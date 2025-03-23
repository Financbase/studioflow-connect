
import React from "react";
import LibraryNavTabs from "./LibraryNavTabs";
import ViewModeToggle from "./ViewModeToggle";
import SearchAndFilter from "./SearchAndFilter";
import LibraryTabs from "./LibraryTabs";

interface AudioFile {
  name: string;
  size: string;
  duration: string;
  type: string;
  id?: string;
  url?: string;
  created_at?: string;
}

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

  return (
    <div className="lg:col-span-3 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <LibraryNavTabs 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
        
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
      
      <LibraryTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        viewMode={viewMode}
        sortBy={sortBy}
        filteredSamples={filteredSamples}
        isLoading={isLoading}
      />
    </div>
  );
};

export default LibraryMainContent;
