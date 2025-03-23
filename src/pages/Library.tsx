
import React, { useState, useEffect } from "react";
import { SidebarLayout } from "@/components/layout/Sidebar";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Upload, GridIcon, ListIcon, Tabs, TabsContent, TabsList, TabsTrigger } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "@/hooks/use-toast";
import StoragePanel from "@/components/library/StoragePanel";
import SearchAndFilter from "@/components/library/SearchAndFilter";
import LibraryTabs from "@/components/library/LibraryTabs";
import { useLanguage } from "@/contexts/language/LanguageProvider";

// Define AudioFile interface to match what LibraryTabs expects
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
  const { t } = useLanguage();
  
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"date" | "name" | "size">("date");
  const [isLoading, setIsLoading] = useState(false);
  
  // Sample data (in a real app, this would come from an API)
  const sampleAudioFiles: AudioFile[] = [
    {
      name: "Deep Bass Loop.wav",
      size: "2.4 MB",
      duration: "0:32",
      type: "loop",
      id: "loop-1",
      created_at: "2023-04-15T09:23:00Z"
    },
    {
      name: "Drum Sample Pack.zip",
      size: "45.2 MB",
      duration: "4:10",
      type: "sample",
      id: "sample-1",
      created_at: "2023-04-12T15:47:00Z"
    },
    {
      name: "Vocal Performance.mp3",
      size: "8.7 MB",
      duration: "3:27",
      type: "vocal",
      id: "vocal-1",
      created_at: "2023-04-10T18:32:00Z"
    },
    {
      name: "Synth Melody.wav",
      size: "4.1 MB",
      duration: "0:45",
      type: "loop",
      id: "loop-2",
      created_at: "2023-04-08T11:19:00Z"
    }
  ];
  
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>(sampleAudioFiles);
  
  // Simulate loading from API
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call delay
    const timer = setTimeout(() => {
      setAudioFiles(sampleAudioFiles);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Filter audio files based on search query
  const filteredAudioFiles = audioFiles.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleViewModeChange = (mode: "grid" | "list") => {
    setViewMode(mode);
  };

  const handleUpload = () => {
    // In a real app, this would trigger a file upload dialog
    toast({
      title: t("library.uploadStarted"),
      description: t("library.uploadDescription"),
    });
  };

  return (
    <SidebarLayout>
      <Header />
      
      <main className="flex-1 container mx-auto p-4 md:p-6 lg:p-8 bg-background animate-fade-in">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">{t("library.title")}</h1>
              <p className="text-muted-foreground">{t("library.description")}</p>
            </div>
            
            <Button onClick={handleUpload} className="gap-2">
              <Upload className="h-4 w-4" />
              {t("library.upload")}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main content - 3/4 width on desktop */}
            <div className="lg:col-span-3 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex space-x-1 p-1 bg-muted rounded-lg">
                  <TabsList 
                    className={`bg-transparent ${themeVariant === "windows" ? "gap-0" : "gap-1"}`}
                    aria-label="Library Navigation Tabs"
                  >
                    <TabsTrigger 
                      value="all" 
                      onClick={() => setActiveTab("all")}
                      className={activeTab === "all" ? "bg-background data-[state=active]:bg-background" : ""}
                    >
                      {t("library.tabs.all")}
                    </TabsTrigger>
                    <TabsTrigger 
                      value="samples" 
                      onClick={() => setActiveTab("samples")}
                      className={activeTab === "samples" ? "bg-background data-[state=active]:bg-background" : ""}
                    >
                      {t("library.tabs.samples")}
                    </TabsTrigger>
                    <TabsTrigger 
                      value="loops" 
                      onClick={() => setActiveTab("loops")}
                      className={activeTab === "loops" ? "bg-background data-[state=active]:bg-background" : ""}
                    >
                      {t("library.tabs.loops")}
                    </TabsTrigger>
                    <TabsTrigger 
                      value="vocals" 
                      onClick={() => setActiveTab("vocals")}
                      className={activeTab === "vocals" ? "bg-background data-[state=active]:bg-background" : ""}
                    >
                      {t("library.tabs.vocals")}
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="icon"
                    onClick={() => handleViewModeChange("grid")}
                    className="h-8 w-8"
                  >
                    <GridIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="icon"
                    onClick={() => handleViewModeChange("list")}
                    className="h-8 w-8"
                  >
                    <ListIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <SearchAndFilter
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                sortBy={sortBy}
                onSortChange={(value) => setSortBy(value)}
              />
              
              <LibraryTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                viewMode={viewMode}
                sortBy={sortBy}
                filteredSamples={filteredAudioFiles}
                isLoading={isLoading}
              />
            </div>
            
            {/* Sidebar - 1/4 width on desktop */}
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
