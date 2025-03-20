
import React, { useState, useEffect } from "react";
import FrequencyVisualizer from "./FrequencyVisualizer";
import WaveformVisualizer from "./WaveformVisualizer";
import AudioControls from "./AudioControls";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface AudioAnalysisProps {
  audioFile?: File | null;
}

const AudioAnalysis: React.FC<AudioAnalysisProps> = ({ audioFile }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [visualizationType, setVisualizationType] = useState<"waveform" | "frequency">("waveform");
  const [audioData, setAudioData] = useState<Uint8Array | undefined>(undefined);

  useEffect(() => {
    // Initialize audio context
    const context = new (window.AudioContext || (window as any).webkitAudioContext)();
    setAudioContext(context);
    
    // Create demo data for visualizers
    const demoData = new Uint8Array(128);
    for (let i = 0; i < demoData.length; i++) {
      demoData[i] = 128 + Math.sin(i / 10) * 50;
    }
    setAudioData(demoData);
    
    return () => {
      context.close();
    };
  }, []);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleStop = () => {
    setIsPlaying(false);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (isMuted && newVolume > 0) {
      setIsMuted(false);
    }
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="space-y-4">
      <AudioControls
        onPlay={handlePlay}
        onPause={handlePause}
        onStop={handleStop}
        onVolumeChange={handleVolumeChange}
        isPlaying={isPlaying}
        volume={volume}
        isMuted={isMuted}
        onMuteToggle={handleMuteToggle}
      />
      
      <Tabs defaultValue="waveform" onValueChange={(value) => setVisualizationType(value as any)}>
        <TabsList className="grid w-full max-w-[400px] grid-cols-2 mb-4">
          <TabsTrigger value="waveform">Waveform</TabsTrigger>
          <TabsTrigger value="frequency">Frequency</TabsTrigger>
        </TabsList>
        
        <TabsContent value="waveform">
          <WaveformVisualizer audioData={audioData} />
        </TabsContent>
        
        <TabsContent value="frequency">
          <FrequencyVisualizer />
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Audio Statistics</CardTitle>
          <CardDescription>Detailed information about the selected audio file</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Peak amplitude</p>
              <p className="font-medium">-3.2 dB</p>
            </div>
            <div>
              <p className="text-muted-foreground">Dynamic range</p>
              <p className="font-medium">18.4 dB</p>
            </div>
            <div>
              <p className="text-muted-foreground">Sample rate</p>
              <p className="font-medium">44.1 kHz</p>
            </div>
            <div>
              <p className="text-muted-foreground">Channels</p>
              <p className="font-medium">Stereo</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AudioAnalysis;
