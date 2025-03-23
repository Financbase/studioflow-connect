
import { useState, useEffect, useRef } from 'react';
import { AudioAsset } from '@/types/supabase';
import { toast } from '@/hooks/use-toast';

export const useAudioContext = (audioRef: React.RefObject<HTMLAudioElement>) => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [audioSource, setAudioSource] = useState<MediaElementAudioSourceNode | null>(null);
  const [analyzer, setAnalyzer] = useState<AnalyserNode | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
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
      toast({
        title: "Audio Error",
        description: "Could not initialize audio analysis. Please try refreshing the page.",
        variant: "destructive"
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
  
  // Clean up when component unmounts
  useEffect(() => {
    return () => {
      cleanupAudioContext();
    };
  }, []);
  
  return {
    audioContext,
    audioSource,
    analyzer,
    isInitialized,
    initializeAudioContext,
    cleanupAudioContext
  };
};
