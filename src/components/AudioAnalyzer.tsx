
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AudioAsset } from "@/types/supabase";
import AudioLibraryTab from "./audio/AudioLibraryTab";
import AudioAnalysisTab from "./audio/AudioAnalysisTab";

const AudioAnalyzer: React.FC = () => {
  const [selectedAudioFile, setSelectedAudioFile] = useState<AudioAsset | null>(null);
  
  const handleSelectAudioFile = (audioAsset: AudioAsset) => {
    setSelectedAudioFile(audioAsset);
  };
  
  return (
    <Tabs defaultValue="library" className="w-full">
      <TabsList className="grid w-full max-w-[400px] grid-cols-2">
        <TabsTrigger value="library">Audio Library</TabsTrigger>
        <TabsTrigger value="analysis">Analysis</TabsTrigger>
      </TabsList>
      
      <TabsContent value="library" className="mt-4">
        <AudioLibraryTab onSelectAudio={handleSelectAudioFile} />
      </TabsContent>
      
      <TabsContent value="analysis" className="mt-4">
        <AudioAnalysisTab selectedAudioFile={selectedAudioFile} />
      </TabsContent>
    </Tabs>
  );
};

export default AudioAnalyzer;
