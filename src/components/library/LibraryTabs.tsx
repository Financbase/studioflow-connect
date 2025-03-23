
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AudioFileList from "./AudioFileList";
import ContentPlaceholder from "./ContentPlaceholder";
import RecentlyAdded from "./RecentlyAdded";
import { useLanguage } from "@/contexts/language/LanguageProvider";
import { Skeleton } from "@/components/ui/skeleton";

interface AudioFile {
  name: string;
  size: string;
  duration: string;
  type: string;
  id?: string;
  url?: string;
  created_at?: string;
}

interface LibraryTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  viewMode: "grid" | "list";
  sortBy: "date" | "name" | "size";
  filteredSamples: AudioFile[];
  isLoading?: boolean;
}

const LibraryTabs = ({ 
  activeTab, 
  setActiveTab, 
  viewMode,
  sortBy,
  filteredSamples,
  isLoading = false
}: LibraryTabsProps) => {
  const { t } = useLanguage();
  
  // Sort samples based on the selected sort option
  const sortedSamples = [...filteredSamples].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "size") {
      // Convert size string to number for comparison
      const aSize = parseFloat(a.size);
      const bSize = parseFloat(b.size);
      return bSize - aSize;
    } else {
      // Default sort by date (newest first)
      if (a.created_at && b.created_at) {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      return 0;
    }
  });
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-[40px] w-full" />
        <div className={viewMode === "grid" ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4" : "space-y-2"}>
          {Array(8).fill(0).map((_, i) => (
            viewMode === "grid" ? (
              <Skeleton key={i} className="aspect-square" />
            ) : (
              <Skeleton key={i} className="h-[60px] w-full" />
            )
          ))}
        </div>
      </div>
    );
  }

  const categoryContent = (category: string) => {
    if (category === "all") {
      return sortedSamples;
    }
    
    // Filter based on category
    return sortedSamples.filter(file => 
      file.type.toLowerCase() === category.slice(0, -1).toLowerCase()
    );
  };

  return (
    <div className="space-y-6">
      <AudioFileList 
        files={categoryContent(activeTab)} 
        viewMode={viewMode}
        emptyMessage={
          <ContentPlaceholder 
            title={t(`library.empty.${activeTab}.title`) || `No ${activeTab} found`}
            description={t(`library.empty.${activeTab}.description`) || `Upload or create ${activeTab} to see them here`}
          />
        }
      />
      
      <RecentlyAdded 
        files={sortedSamples.slice(0, 5)} 
        viewMode={viewMode} 
      />
    </div>
  );
};

export default LibraryTabs;
