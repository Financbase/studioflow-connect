
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AudioAssetLibrary from "./AudioAssetLibrary";

const AudioAnalyzer = () => {
  return (
    <Tabs defaultValue="library" className="w-full">
      <TabsList className="grid w-full max-w-[400px] grid-cols-2">
        <TabsTrigger value="library">Audio Library</TabsTrigger>
        <TabsTrigger value="analysis">Analysis</TabsTrigger>
      </TabsList>
      
      <TabsContent value="library" className="mt-4">
        <AudioAssetLibrary />
      </TabsContent>
      
      <TabsContent value="analysis" className="mt-4">
        <div className="p-4 border rounded-md">
          <h3 className="text-lg font-medium mb-2">Audio Analysis</h3>
          <p className="text-muted-foreground">
            Select an audio file from your library to analyze its frequency spectrum, 
            dynamics, and other audio characteristics.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default AudioAnalyzer;
