
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AudioAsset } from "@/types/supabase";
import FrequencyVisualizer from "./FrequencyVisualizer";
import WaveformVisualizer from "./WaveformVisualizer";
import AudioControls from "./AudioControls";
import AudioPlayer from "./AudioPlayer";
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
  
  const [visualizationType, setVisualizationType] = useState<string>("waveform");
  const audioRef = useRef<HTMLAudioElement>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      const updateTime = () => setCurrentTime(audioRef.current?.currentTime || 0);
      const updateDuration = () => setDuration(audioRef.current?.duration || 0);
      
      audioRef.current.addEventListener('timeupdate', updateTime);
      audioRef.current.addEventListener('loadedmetadata', updateDuration);
      
      return () => {
        audioRef.current?.removeEventListener('timeupdate', updateTime);
        audioRef.current?.removeEventListener('loadedmetadata', updateDuration);
      };
    }
  }, [audioRef]);

  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

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
          <AudioPlayer 
            audioRef={audioRef} 
            src={audioFile.url}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visualizationType === "frequency" ? (
              <FrequencyVisualizer className="col-span-full" />
            ) : (
              <WaveformVisualizer audioData={audioData} className="col-span-full" />
            )}
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
            onVisualizationTypeChange={setVisualizationType}
            currentVisualizationType={visualizationType}
            duration={duration}
            currentTime={currentTime}
            onSeek={handleSeek}
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
