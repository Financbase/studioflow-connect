
import React, { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AudioAsset } from "@/types/supabase";
import FrequencyVisualizer from "./FrequencyVisualizer";
import WaveformVisualizer from "./WaveformVisualizer";
import AudioControls from "./AudioControls";
import AudioPlayer from "./AudioPlayer";
import { supabase } from "@/integrations/supabase/client";
import { useAudioAnalysis } from "@/hooks/use-audio-analysis";
import { formatFileSize, formatFileType } from "@/lib/audioUtils";
import { toast } from "@/hooks/use-toast";

interface AudioAnalysisProps {
  audioFile: AudioAsset;
}

const AudioAnalysis: React.FC<AudioAnalysisProps> = ({ audioFile }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [isInitialized, setIsInitialized] = useState(false);
  
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
    setVisualizationType,
    audioData,
    audioContext,
    audioSource,
    initializeAudioContext,
    cleanupAudioContext
  } = useAudioAnalysis(audioFile, audioRef);

  // Get signed URL from Supabase
  useEffect(() => {
    const getSignedUrl = async () => {
      try {
        const { data, error } = await supabase.storage
          .from('audio_assets')
          .createSignedUrl(audioFile.storage_path, 3600); // 1 hour expiry for better user experience
          
        if (error) {
          console.error("Error getting signed URL:", error);
          toast.error({
            title: "Error loading audio file",
            description: "Could not load the audio file. Please try again later."
          });
          return;
        }
        
        setAudioUrl(data.signedUrl);
      } catch (error) {
        console.error("Error in getSignedUrl:", error);
        toast.error({
          title: "Error loading audio file",
          description: "An unexpected error occurred while loading the audio file."
        });
      }
    };
    
    getSignedUrl();
    
    // Clean up audio context when component unmounts
    return () => {
      cleanupAudioContext();
    };
  }, [audioFile, cleanupAudioContext]);

  // Initialize audio context when audio starts playing
  useEffect(() => {
    if (isPlaying && !isInitialized && audioRef.current) {
      initializeAudioContext();
      setIsInitialized(true);
    }
  }, [isPlaying, isInitialized, initializeAudioContext]);

  // Handle audio loading errors
  const handleAudioError = () => {
    toast.error({
      title: "Audio Error",
      description: "Failed to load audio file. Please check the file format and try again."
    });
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
            src={audioUrl}
            onEnded={() => {
              // Auto-stop on end
              stop();
            }}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visualizationType === "frequency" ? (
              <FrequencyVisualizer className="col-span-full" audioSource={audioSource} />
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
      
      {/* Hidden audio element */}
      <audio 
        ref={audioRef} 
        src={audioUrl} 
        className="hidden" 
        onError={handleAudioError}
      />
    </div>
  );
};

export default AudioAnalysis;
