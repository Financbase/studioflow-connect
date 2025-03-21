
import { useState, useRef, useEffect } from 'react';
import { AudioAsset } from '@/types/supabase';
import { useAudioControls } from './use-audio-controls';

export const useAudioAnalysis = (audioFile: AudioAsset, audioRef: React.RefObject<HTMLAudioElement>) => {
  const [audioData, setAudioData] = useState<Uint8Array | null>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [audioSource, setAudioSource] = useState<MediaElementAudioSourceNode | null>(null);
  const [analyzer, setAnalyzer] = useState<AnalyserNode | null>(null);
  
  const controls = useAudioControls(audioRef);
  
  // Initialize audio context when component mounts or when audio reference changes
  useEffect(() => {
    const initContext = () => {
      if (!audioContext && audioRef.current) {
        try {
          const context = new (window.AudioContext || (window as any).webkitAudioContext)();
          setAudioContext(context);
          
          // Create an analyzer for visualizations
          const newAnalyzer = context.createAnalyser();
          newAnalyzer.fftSize = 2048;
          setAnalyzer(newAnalyzer);
          
          // Only create the source if the audio element exists
          if (audioRef.current) {
            const source = context.createMediaElementSource(audioRef.current);
            source.connect(newAnalyzer);
            newAnalyzer.connect(context.destination);
            setAudioSource(source);
          }
        } catch (error) {
          console.error("Error initializing audio context:", error);
        }
      }
    };
    
    if (audioRef.current && !audioContext) {
      // Only initialize when the audio element is available and loaded
      audioRef.current.addEventListener('loadeddata', initContext);
    }
    
    return () => {
      // Clean up event listener
      if (audioRef.current) {
        audioRef.current.removeEventListener('loadeddata', initContext);
      }
    };
  }, [audioRef, audioContext]);
  
  // Set up an animation frame to continuously update audio data when playing
  useEffect(() => {
    if (!analyzer) return;
    
    let animationFrameId: number;
    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const updateData = () => {
      if (controls.isPlaying) {
        analyzer.getByteTimeDomainData(dataArray);
        setAudioData(new Uint8Array(dataArray));
      }
      animationFrameId = requestAnimationFrame(updateData);
    };
    
    updateData();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [analyzer, controls.isPlaying]);
  
  // Clean up audio context and connections when component unmounts
  useEffect(() => {
    return () => {
      if (audioContext) {
        audioContext.close().catch(err => console.error("Error closing audio context:", err));
      }
    };
  }, [audioContext]);

  const initializeAudioContext = () => {
    if (audioRef.current && !audioContext) {
      try {
        const context = new (window.AudioContext || (window as any).webkitAudioContext)();
        const newAnalyzer = context.createAnalyser();
        newAnalyzer.fftSize = 2048;
        
        const source = context.createMediaElementSource(audioRef.current);
        source.connect(newAnalyzer);
        newAnalyzer.connect(context.destination);
        
        setAudioContext(context);
        setAudioSource(source);
        setAnalyzer(newAnalyzer);
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
      setAnalyzer(null);
    }
  };

  return {
    ...controls,
    audioData,
    initializeAudioContext,
    cleanupAudioContext,
    audioSource,
    audioContext
  };
};
