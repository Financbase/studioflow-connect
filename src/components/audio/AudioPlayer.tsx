
import React, { useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAudioControls } from '@/hooks/use-audio-controls';
import { formatTime } from '@/lib/audioUtils';
import { toast } from '@/hooks/use-toast';

interface AudioPlayerProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  onEnded?: () => void;
  src?: string;
  autoPlay?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ 
  audioRef, 
  onEnded = () => {}, 
  src,
  autoPlay = false
}) => {
  const {
    currentTime,
    duration,
    volume,
    isMuted,
    seek,
    setVolume,
    toggleMute
  } = useAudioControls(audioRef);

  useEffect(() => {
    if (src && audioRef.current) {
      try {
        audioRef.current.src = src;
        
        if (autoPlay) {
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch(err => {
              console.error("Error playing audio:", err);
              toast.error({
                title: "Playback Error",
                description: "Could not auto-play the audio. Try playing it manually."
              });
            });
          }
        }
      } catch (error) {
        console.error("Error setting audio source:", error);
      }
    }
  }, [src, audioRef, autoPlay]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const handleAudioEnded = () => {
      onEnded();
    };
    
    const handleAudioError = (e: Event) => {
      console.error("Audio error:", e);
      toast.error({
        title: "Audio Error",
        description: "There was a problem with the audio file."
      });
    };
    
    audio.addEventListener('ended', handleAudioEnded);
    audio.addEventListener('error', handleAudioError);
    
    return () => {
      audio.removeEventListener('ended', handleAudioEnded);
      audio.removeEventListener('error', handleAudioError);
    };
  }, [audioRef, onEnded]);

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  const handleSeek = (value: number[]) => {
    seek(value[0]);
  };

  // Only render controls if we have audio loaded
  if (!audioRef.current || duration <= 0) {
    return null;
  }

  return (
    <div className="flex flex-col space-y-2 w-full">
      <div className="space-y-1 w-full">
        <Slider 
          value={[currentTime]} 
          min={0} 
          max={duration || 1} 
          step={0.1} 
          onValueChange={handleSeek}
          className="w-full"
        />
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
          
          <Slider
            value={[isMuted ? 0 : volume]}
            min={0}
            max={100}
            step={1}
            onValueChange={handleVolumeChange}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
