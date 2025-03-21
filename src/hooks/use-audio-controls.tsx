
import { useState, useRef, useEffect } from 'react';

export interface AudioControlsState {
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  currentTime: number;
  duration: number;
  visualizationType: string;
}

export function useAudioControls(audioRef: React.RefObject<HTMLAudioElement>) {
  const [state, setState] = useState<AudioControlsState>({
    isPlaying: false,
    volume: 50,
    isMuted: false,
    currentTime: 0,
    duration: 0,
    visualizationType: 'waveform'
  });
  
  const previousVolumeRef = useRef<number>(50);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Initialize volume
    audio.volume = state.volume / 100;
    audio.muted = state.isMuted;

    const handlePlay = () => setState(prev => ({ ...prev, isPlaying: true }));
    const handlePause = () => setState(prev => ({ ...prev, isPlaying: false }));
    const handleTimeUpdate = () => setState(prev => ({ ...prev, currentTime: audio.currentTime }));
    const handleDurationChange = () => setState(prev => ({ ...prev, duration: audio.duration }));
    const handleEnded = () => setState(prev => ({ ...prev, isPlaying: false, currentTime: 0 }));
    
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleDurationChange);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);
    
    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleDurationChange);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioRef, state.volume, state.isMuted]);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .catch(error => console.error("Error playing audio:", error));
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setState(prev => ({ ...prev, currentTime: 0 }));
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setState(prev => ({ ...prev, currentTime: time }));
    }
  };

  const setVolume = (value: number) => {
    if (state.isMuted && value > 0) {
      toggleMute(); // Unmute if volume is increased while muted
    }
    
    if (audioRef.current) {
      audioRef.current.volume = value / 100;
    }
    
    setState(prev => ({ ...prev, volume: value }));
  };

  const toggleMute = () => {
    if (state.isMuted) {
      // Unmute
      if (audioRef.current) {
        audioRef.current.muted = false;
        audioRef.current.volume = previousVolumeRef.current / 100;
      }
      setState(prev => ({ ...prev, isMuted: false, volume: previousVolumeRef.current }));
    } else {
      // Mute
      previousVolumeRef.current = state.volume;
      if (audioRef.current) {
        audioRef.current.muted = true;
      }
      setState(prev => ({ ...prev, isMuted: true }));
    }
  };

  const setVisualizationType = (type: string) => {
    setState(prev => ({ ...prev, visualizationType: type }));
  };

  return {
    ...state,
    play,
    pause,
    stop,
    seek,
    setVolume,
    toggleMute,
    setVisualizationType,
  };
}
