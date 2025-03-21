
import React, { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AudioAsset } from "@/types/supabase";
import FrequencyVisualizer from "./FrequencyVisualizer";
import WaveformVisualizer from "./WaveformVisualizer";
import AudioControls from "./AudioControls";
import AudioPlayer from "./AudioPlayer";
import { supabase } from "@/integrations/supabase/client";
import { useAudioControls } from "@/hooks/use-audio-controls";
import { formatFileSize, formatFileType } from "@/lib/audioUtils";

interface AudioAnalysisProps {
  audioFile: AudioAsset;
}

const AudioAnalysis: React.FC<AudioAnalysisProps> = ({ audioFile }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [audioData, setAudioData] = useState<Uint8Array | null>(null);
  const [audioSource, setAudioSource] = useState<MediaElementAudioSourceNode | null>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  
  const {
    isPlaying,
    volume,
    isMuted,
    currentTime,
    duration,
    visualizationType,
    play,
    pause,
    stop,
    seek,
    setVolume,
    toggleMute,
    setVisualizationType
  } = useAudioControls(audioRef);

  // Get signed URL from Supabase
  useEffect(() => {
    const getSignedUrl = async () => {
      try {
        const { data, error } = await supabase.storage
          .from('audio_assets')
          .createSignedUrl(audioFile.storage_path, 60); // 60 seconds expiry
          
        if (error) {
          console.error("Error getting signed URL:", error);
          return;
        }
        
        setAudioUrl(data.signedUrl);
      } catch (error) {
        console.error("Error in getSignedUrl:", error);
      }
    };
    
    getSignedUrl();
  }, [audioFile]);

  // Set up audio context and source node when audio element is available and playing state changes
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      // Create AudioContext if it doesn't exist
      if (!audioContext) {
        const newAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        setAudioContext(newAudioContext);
      }
      
      // Create source node from audio element
      if (audioContext && !audioSource && audioRef.current) {
        const newSource = audioContext.createMediaElementSource(audioRef.current);
        newSource.connect(audioContext.destination);
        setAudioSource(newSource);
      }
    }
    
    // Clean up when component unmounts
    return () => {
      if (audioContext) {
        audioContext.close().catch(err => console.error("Error closing audio context:", err));
      }
    };
  }, [audioRef.current, isPlaying, audioContext, audioSource]);

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
            src={audioUrl}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visualizationType === "frequency" ? (
              <FrequencyVisualizer className="col-span-full" audioSource={isPlaying ? audioSource : undefined} />
            ) : (
              <WaveformVisualizer audioData={audioData} className="col-span-full" />
            )}
          </div>
          
          <Separator />
          
          <AudioControls
            isPlaying={isPlaying}
            onPlay={play}
            onPause={pause}
            onStop={stop}
            audioName={audioFile.name}
            volume={volume}
            isMuted={isMuted}
            onVolumeChange={setVolume}
            onMuteToggle={toggleMute}
            onVisualizationTypeChange={setVisualizationType}
            currentVisualizationType={visualizationType}
            duration={duration}
            currentTime={currentTime}
            onSeek={seek}
          />
        </CardContent>
        
        <CardFooter>
          <div className="flex justify-between w-full text-sm text-muted-foreground">
            <div>Format: {formatFileType(audioFile.type)}</div>
            <div>Size: {formatFileSize(audioFile.size)}</div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AudioAnalysis;
