
import { useRef } from 'react';
import { AudioAsset } from '@/types/supabase';
import { useAudioControls } from '@/hooks/use-audio-controls';
import { useAudioContext } from './use-audio-context';
import { useAudioVisualization } from './use-audio-visualization';

export const useAudioAnalysis = (audioFile: AudioAsset, audioRef: React.RefObject<HTMLAudioElement>) => {
  const controls = useAudioControls(audioRef);
  
  const {
    audioContext,
    audioSource,
    analyzer,
    isInitialized,
    initializeAudioContext,
    cleanupAudioContext
  } = useAudioContext(audioRef);
  
  const {
    audioData,
    visualizationType,
    setVisualizationType
  } = useAudioVisualization(analyzer, controls.isPlaying);
  
  return {
    ...controls,
    audioData,
    visualizationType,
    setVisualizationType,
    initializeAudioContext,
    cleanupAudioContext,
    audioSource,
    audioContext,
    isInitialized
  };
};
