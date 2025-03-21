
import { useState, useRef, useEffect } from 'react';
import { AudioAsset } from '@/types/supabase';
import { useAudioControls } from './use-audio-controls';
import { toast } from '@/hooks/use-toast';

export const useAudioAnalysis = (audioFile: AudioAsset, audioRef: React.RefObject<HTMLAudioElement>) => {
  const [audioData, setAudioData] = useState<Uint8Array | null>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [audioSource, setAudioSource] = useState<MediaElementAudioSourceNode | null>(null);
  const [analyzer, setAnalyzer] = useState<AnalyserNode | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const controls = useAudioControls(audioRef);
  
  // Safe initialization of audio context
  const initializeAudioContext = () => {
    if (!audioRef.current || isInitialized) return;
    
    try {
      // Create audio context
      const context = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Create analyzer
      const newAnalyzer = context.createAnalyser();
      newAnalyzer.fftSize = 2048;
      
      // Create source from audio element
      const source = context.createMediaElementSource(audioRef.current);
      
      // Connect nodes
      source.connect(newAnalyzer);
      newAnalyzer.connect(context.destination);
      
      // Update state
      setAudioContext(context);
      setAudioSource(source);
      setAnalyzer(newAnalyzer);
      setIsInitialized(true);
      
      console.log("Audio context initialized successfully");
    } catch (error) {
      console.error("Failed to initialize audio context:", error);
      toast.error({
        title: "Audio Error",
        description: "Could not initialize audio analysis. Please try refreshing the page."
      });
    }
  };
  
  // Clean up audio context
  const cleanupAudioContext = () => {
    if (audioContext) {
      try {
        audioContext.close();
        setAudioContext(null);
        setAudioSource(null);
        setAnalyzer(null);
        setIsInitialized(false);
        console.log("Audio context cleaned up");
      } catch (err) {
        console.error("Error closing audio context:", err);
      }
    }
  };

  // Initialize audio context when component mounts or when audio reference changes
  useEffect(() => {
    return () => {
      cleanupAudioContext();
    };
  }, []);
  
  // Set up an animation frame to continuously update audio data when playing
  useEffect(() => {
    if (!analyzer || !controls.isPlaying) return;
    
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

  return {
    ...controls,
    audioData,
    initializeAudioContext,
    cleanupAudioContext,
    audioSource,
    audioContext,
    isInitialized
  };
};
