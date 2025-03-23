
import React from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import LibraryNavTabs from "@/components/library/LibraryNavTabs";
import AudioLibraryTab from "@/components/audio/AudioLibraryTab";
import { AudioFile } from "@/components/library/types";

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
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <LibraryNavTabs activeTab={activeTab} onTabChange={onTabChange} />
      
      <TabsContent value="all">
        <AudioLibraryTab filterType="all" />
      </TabsContent>
      
      <TabsContent value="samples">
        <AudioLibraryTab filterType="sample" />
      </TabsContent>
      
      <TabsContent value="loops">
        <AudioLibraryTab filterType="loop" />
      </TabsContent>
      
      <TabsContent value="vocals">
        <AudioLibraryTab filterType="vocal" />
      </TabsContent>
    </Tabs>
  );
};

export default LibraryTabs;
