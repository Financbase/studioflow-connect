
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AudioFileList from "./AudioFileList";
import ContentPlaceholder from "./ContentPlaceholder";
import RecentlyAdded from "./RecentlyAdded";

interface LibraryTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  filteredSamples: Array<{
    name: string;
    size: string;
    duration: string;
    type: string;
  }>;
}

const LibraryTabs = ({ activeTab, setActiveTab, filteredSamples }: LibraryTabsProps) => {
  return (
    <div className="md:col-span-3 space-y-6">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Files</TabsTrigger>
          <TabsTrigger value="samples">Samples</TabsTrigger>
          <TabsTrigger value="loops">Loops</TabsTrigger>
          <TabsTrigger value="presets">Presets</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4 mt-4">
          <AudioFileList files={filteredSamples} />
        </TabsContent>
        
        <TabsContent value="samples" className="mt-4">
          <ContentPlaceholder 
            title="Samples" 
            description="One-shot samples and instrument sounds" 
          />
        </TabsContent>
        
        <TabsContent value="loops" className="mt-4">
          <ContentPlaceholder 
            title="Loops" 
            description="Drum and melody loops" 
          />
        </TabsContent>
        
        <TabsContent value="presets" className="mt-4">
          <ContentPlaceholder 
            title="Presets" 
            description="Synth and effect presets" 
          />
        </TabsContent>
      </Tabs>
      
      <RecentlyAdded />
    </div>
  );
};

export default LibraryTabs;
