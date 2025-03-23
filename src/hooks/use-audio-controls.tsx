
import { useState, useEffect, useRef, RefObject } from 'react';

export function useAudioControls(audioRef: RefObject<HTMLAudioElement>) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const previousVolume = useRef(volume);
  
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleVolumeChange = () => setVolume(audio.volume * 100);
    const handleWaiting = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleError = () => {
      setError('An error occurred while playing the audio');
      setIsLoading(false);
    };
    
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('volumechange', handleVolumeChange);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);
    
    // Apply initial volume
    audio.volume = volume / 100;
    
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('volumechange', handleVolumeChange);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
    };
  }, [audioRef, volume]);
  
  // Update audio volume when volume state changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (!isMuted) {
      audio.volume = volume / 100;
    }
  }, [audioRef, volume, isMuted]);
  
  // Handle mute/unmute
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.muted = isMuted;
    
    if (isMuted) {
      previousVolume.current = volume;
    }
  }, [audioRef, isMuted, volume]);
  
  const play = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.play().catch(err => {
      console.error('Error playing audio:', err);
      setError('Could not play audio. Try clicking play again.');
    });
  };
  
  const pause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.pause();
  };
  
  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };
  
  const seek = (time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.currentTime = time;
    setCurrentTime(time);
  };
  
  const changeVolume = (newVolume: number) => {
    setVolume(newVolume);
    if (isMuted && newVolume > 0) {
      setIsMuted(false);
    }
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (isMuted && volume === 0) {
      // If we're unmuting but volume is 0, restore previous volume
      setVolume(previousVolume.current || 50);
    }
  };
  
  const stop = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.pause();
    audio.currentTime = 0;
    setCurrentTime(0);
  };
  
  const skipForward = (seconds = 10) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newTime = Math.min(audio.currentTime + seconds, duration);
    seek(newTime);
  };
  
  const skipBackward = (seconds = 10) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newTime = Math.max(audio.currentTime - seconds, 0);
    seek(newTime);
  };
  
  const clearError = () => {
    setError(null);
  };
  
  return {
    currentTime,
    duration,
    isPlaying,
    volume,
    isMuted,
    isLoading,
    error,
    play,
    pause,
    togglePlay,
    seek,
    setVolume: changeVolume,
    toggleMute,
    stop,
    skipForward,
    skipBackward,
    clearError
  };
}
