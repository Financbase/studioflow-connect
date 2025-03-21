
import React, { useState } from "react";
import { SidebarLayout } from "@/components/layout/Sidebar";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "@/components/ui/use-toast";
import StoragePanel from "@/components/library/StoragePanel";
import SearchAndFilter from "@/components/library/SearchAndFilter";
import LibraryTabs from "@/components/library/LibraryTabs";
import { useAudioAssets } from "@/hooks/use-audio-assets";

const Library = () => {
  const { themeVariant } = useTheme();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // In a real application, we would use the imported hook
  // const { assets, loading } = useAudioAssets(user);
  
  // Mock library data
  const audioSamples = [
    { name: "Acoustic Guitar.wav", size: "24.5 MB", duration: "5:42", type: "Instrument" },
    { name: "Drum Loop 120BPM.wav", size: "8.2 MB", duration: "0:32", type: "Loop" },
    { name: "Strings Ensemble.mp3", size: "18.7 MB", duration: "3:15", type: "Instrument" },
    { name: "Vocal Stem.wav", size: "35.1 MB", duration: "4:12", type: "Vocal" },
    { name: "Bass Line.wav", size: "15.3 MB", duration: "1:45", type: "Bass" },
  ];

  // Filter samples based on search query
  const filteredSamples = audioSamples.filter(sample => 
    sample.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sample.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleUploadClick = () => {
    toast({
      title: "Upload feature",
      description: "Upload functionality will be implemented soon",
    });
  };

  return (
    <SidebarLayout>
      <Header />
      <main className="flex-1 px-4 py-6 md:px-6 lg:px-8 bg-background overflow-auto">
        <div className="max-w-[1200px] mx-auto space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Audio Library</h1>
              <p className="text-muted-foreground">Manage your samples, loops, and audio assets</p>
            </div>
            <Button className="gap-2" onClick={handleUploadClick}>
              <Upload className="w-4 h-4" />
              Upload Assets
            </Button>
          </div>

          <SearchAndFilter searchQuery={searchQuery} onSearchChange={handleSearch} />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StoragePanel />
            <LibraryTabs 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              filteredSamples={filteredSamples}
            />
          </div>
        </div>
      </main>
    </SidebarLayout>
  );
};

export default Library;
