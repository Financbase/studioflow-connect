
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AudioAssetLibrary from "./AudioAssetLibrary";
import AudioAnalysis from "./audio/AudioAnalysis";
import { AudioAsset } from "@/types/supabase";

const AudioAnalyzer = () => {
  const [selectedAudioFile, setSelectedAudioFile] = useState<AudioAsset | null>(null);
  
  // Handle selecting an audio file from the library
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
        <AudioAssetLibrary onSelectAudio={handleSelectAudioFile} />
      </TabsContent>
      
      <TabsContent value="analysis" className="mt-4">
        {selectedAudioFile ? (
          <AudioAnalysis audioFile={selectedAudioFile} />
        ) : (
          <div className="p-4 border rounded-md">
            <h3 className="text-lg font-medium mb-2">Audio Analysis</h3>
            <p className="text-muted-foreground">
              Select an audio file from your library to analyze its frequency spectrum, 
              dynamics, and other audio characteristics.
            </p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default AudioAnalyzer;
