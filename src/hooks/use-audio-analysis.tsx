
import { useState, useRef } from 'react';
import { AudioAsset } from '@/types/supabase';
import { useAudioControls } from './use-audio-controls';

export const useAudioAnalysis = (audioFile: AudioAsset, audioRef: React.RefObject<HTMLAudioElement>) => {
  const [audioData, setAudioData] = useState<Uint8Array | null>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [audioSource, setAudioSource] = useState<MediaElementAudioSourceNode | null>(null);
  
  const controls = useAudioControls(audioRef);
  
  const initializeAudioContext = () => {
    if (!audioContext && audioRef.current) {
      try {
        const context = new (window.AudioContext || (window as any).webkitAudioContext)();
        const source = context.createMediaElementSource(audioRef.current);
        source.connect(context.destination);
        
        setAudioContext(context);
        setAudioSource(source);
        
        // Create an analyzer for visualizations
        const analyzer = context.createAnalyser();
        analyzer.fftSize = 2048;
        source.connect(analyzer);
        
        const bufferLength = analyzer.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        // Update audio data periodically
        const updateData = () => {
          if (controls.isPlaying) {
            analyzer.getByteTimeDomainData(dataArray);
            setAudioData(new Uint8Array(dataArray));
          }
          requestAnimationFrame(updateData);
        };
        
        updateData();
      } catch (error) {
        console.error("Error initializing audio context:", error);
      }
    }
  };
  
  const cleanupAudioContext = () => {
    if (audioContext) {
      audioContext.close().catch(err => console.error("Error closing audio context:", err));
      setAudioContext(null);
      setAudioSource(null);
    }
  };

  return {
    ...controls,
    audioData,
    initializeAudioContext,
    cleanupAudioContext,
    audioSource
  };
};
