
import React, { useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAudioControls } from '@/hooks/use-audio-controls';
import { formatTime } from '@/lib/audioUtils';

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
      audioRef.current.src = src;
      if (autoPlay) audioRef.current.play().catch(err => console.error("Error playing audio:", err));
    }
  }, [src, audioRef, autoPlay]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const handleAudioEnded = () => {
      onEnded();
    };
    
    audio.addEventListener('ended', handleAudioEnded);
    
    return () => {
      audio.removeEventListener('ended', handleAudioEnded);
    };
  }, [audioRef, onEnded]);

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  const handleSeek = (value: number[]) => {
    seek(value[0]);
  };

  return (
    <div className="flex flex-col space-y-2 w-full">
      <audio 
        ref={audioRef} 
        className="hidden" 
        src={src}
      />
      
      {duration > 0 && (
        <div className="space-y-1 w-full">
          <Slider 
            value={[currentTime]} 
            min={0} 
            max={duration} 
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
      )}
    </div>
  );
};

export default AudioPlayer;
