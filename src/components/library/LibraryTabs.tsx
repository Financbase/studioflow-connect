
import React from "react";
import LibraryNavTabs from "@/components/library/LibraryNavTabs";
import AudioLibraryTab from "@/components/audio/AudioLibraryTab";
import { AudioFile } from "@/components/library/types";
import { useLanguage } from "@/contexts/language";

interface LibraryTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  viewMode?: "grid" | "list";
  sortBy?: "date" | "name" | "size";
  filteredSamples?: AudioFile[];
  isLoading?: boolean;
}

const LibraryTabs: React.FC<LibraryTabsProps> = ({ 
  activeTab, 
  onTabChange,
  viewMode,
  sortBy,
  filteredSamples,
  isLoading
}) => {
  const { t } = useLanguage();
  
  return (
    <div>
      <LibraryNavTabs activeTab={activeTab} onTabChange={onTabChange} />
      
      {activeTab === "all" && (
        <div className="mt-4">
          <AudioLibraryTab filterType="all" />
        </div>
      )}
      
      {activeTab === "samples" && (
        <div className="mt-4">
          <AudioLibraryTab filterType="sample" />
        </div>
      )}
      
      {activeTab === "loops" && (
        <div className="mt-4">
          <AudioLibraryTab filterType="loop" />
        </div>
      )}
      
      {activeTab === "vocals" && (
        <div className="mt-4">
          <AudioLibraryTab filterType="vocal" />
        </div>
      )}
    </div>
  );
};

export default LibraryTabs;
