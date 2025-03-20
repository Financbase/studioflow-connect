
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AudioAsset } from "@/types/supabase";
import FrequencyVisualizer from "./FrequencyVisualizer";
import WaveformVisualizer from "./WaveformVisualizer";
import AudioControls from "./AudioControls";
import { useAudioAnalysis } from "@/hooks/use-audio-analysis";

interface AudioAnalysisProps {
  audioFile: AudioAsset;
}

const AudioAnalysis: React.FC<AudioAnalysisProps> = ({ audioFile }) => {
  const {
    audioData,
    isPlaying,
    volume,
    isMuted,
    handlePlay,
    handlePause,
    handleStop,
    handleVolumeChange,
    handleMuteToggle
  } = useAudioAnalysis(audioFile);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Audio Analysis: {audioFile.name}</CardTitle>
          <CardDescription>
            Visualize and analyze frequency spectrum, waveform, and audio characteristics
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FrequencyVisualizer />
            <WaveformVisualizer audioData={audioData} />
          </div>
          
          <Separator />
          
          <AudioControls
            isPlaying={isPlaying}
            onPlay={handlePlay}
            onPause={handlePause}
            onStop={handleStop}
            audioName={audioFile.name}
            volume={volume}
            isMuted={isMuted}
            onVolumeChange={handleVolumeChange}
            onMuteToggle={handleMuteToggle}
          />
        </CardContent>
        
        <CardFooter>
          <div className="flex justify-between w-full text-sm text-muted-foreground">
            <div>Format: {audioFile.type.split('/')[1].toUpperCase()}</div>
            <div>Size: {(audioFile.size / 1024 / 1024).toFixed(2)} MB</div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AudioAnalysis;
