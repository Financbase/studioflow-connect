
import React, { useState, useEffect } from "react";
import { SidebarLayout } from "@/components/layout/Sidebar";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Upload, GridIcon, ListIcon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "@/components/ui/use-toast";
import StoragePanel from "@/components/library/StoragePanel";
import SearchAndFilter from "@/components/library/SearchAndFilter";
import LibraryTabs from "@/components/library/LibraryTabs";
import { useAudioAssets } from "@/hooks/use-audio-assets";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/language/LanguageProvider";
import { AudioAsset } from "@/types/supabase";

// Define the AudioFile interface that's expected by the components
interface AudioFile {
  name: string;
  size: string;
  duration: string;
  type: string;
  id?: string;
  url?: string;
  created_at?: string;
}

const Library = () => {
  const { themeVariant } = useTheme();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"date" | "name" | "size">("date");
  const { t } = useLanguage();
  
  const { assets, loading, refreshAssets } = useAudioAssets(user);
  
  // Function to convert AudioAsset to AudioFile
  const mapAssetsToAudioFiles = (assets: AudioAsset[]): AudioFile[] => {
    return assets.map(asset => ({
      id: asset.id,
      name: asset.name,
      size: formatFileSize(asset.size),
      duration: "0:00", // Default duration since AudioAsset doesn't have this property
      type: asset.type,
      url: asset.storage_path,
      created_at: asset.created_at
    }));
  };

  // Helper function to format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };
  
  // Filter assets based on search query
  const filteredAssets = assets.filter(asset => 
    asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Convert filtered assets to AudioFile format
  const filteredAudioFiles = mapAssetsToAudioFiles(filteredAssets);

  // Mock library data as fallback
  const audioSamples: AudioFile[] = [
    { name: "Acoustic Guitar.wav", size: "24.5 MB", duration: "5:42", type: "Instrument" },
    { name: "Drum Loop 120BPM.wav", size: "8.2 MB", duration: "0:32", type: "Loop" },
    { name: "Strings Ensemble.mp3", size: "18.7 MB", duration: "3:15", type: "Instrument" },
    { name: "Vocal Stem.wav", size: "35.1 MB", duration: "4:12", type: "Vocal" },
    { name: "Bass Line.wav", size: "15.3 MB", duration: "1:45", type: "Bass" },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleUploadClick = () => {
    toast({
      title: "Upload Audio",
      description: "Select audio files to add to your library",
    });
  };

  useEffect(() => {
    if (user) {
      refreshAssets();
    }
  }, [user, refreshAssets]);

  return (
    <SidebarLayout>
      <Header />
      <main className="flex-1 px-4 py-6 md:px-6 lg:px-8 bg-background overflow-auto">
        <div className="max-w-[1200px] mx-auto space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{t("library.title") || "Audio Library"}</h1>
              <p className="text-muted-foreground">{t("library.description") || "Manage your samples, loops, and audio assets"}</p>
            </div>
            <Button className="gap-2" onClick={handleUploadClick}>
              <Upload className="w-4 h-4" />
              {t("library.upload") || "Upload Assets"}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
              <TabsList>
                <TabsTrigger value="all">{t("library.tabs.all") || "All Files"}</TabsTrigger>
                <TabsTrigger value="samples">{t("library.tabs.samples") || "Samples"}</TabsTrigger>
                <TabsTrigger value="loops">{t("library.tabs.loops") || "Loops"}</TabsTrigger>
                <TabsTrigger value="vocals">{t("library.tabs.vocals") || "Vocals"}</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="h-8 w-8"
              >
                <GridIcon className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="h-8 w-8"
              >
                <ListIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <SearchAndFilter 
            searchQuery={searchQuery} 
            onSearchChange={handleSearch} 
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StoragePanel />
            <div className="md:col-span-3">
              <LibraryTabs 
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                viewMode={viewMode}
                sortBy={sortBy}
                filteredSamples={filteredAudioFiles.length > 0 ? filteredAudioFiles : audioSamples}
                isLoading={loading}
              />
            </div>
          </div>
        </div>
      </main>
    </SidebarLayout>
  );
};

export default Library;
