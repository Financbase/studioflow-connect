
import { useState, useEffect } from "react";
import { AudioFile } from "@/components/library/types";

export function useLibrary() {
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
  
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setAudioFiles(sampleAudioFiles);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const filteredAudioFiles = audioFiles.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    sortBy,
    setSortBy,
    isLoading,
    audioFiles,
    filteredAudioFiles,
    handleSearchChange
  };
}
