
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
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
    <>
      <LibraryNavTabs activeTab={activeTab} onTabChange={onTabChange} />
      
      {activeTab === "all" && (
        <AudioLibraryTab filterType="all" />
      )}
      
      {activeTab === "samples" && (
        <AudioLibraryTab filterType="sample" />
      )}
      
      {activeTab === "loops" && (
        <AudioLibraryTab filterType="loop" />
      )}
      
      {activeTab === "vocals" && (
        <AudioLibraryTab filterType="vocal" />
      )}
    </>
  );
};

export default LibraryTabs;
