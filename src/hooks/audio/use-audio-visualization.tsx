
import { useState, useEffect } from 'react';
import { useAudioControls } from '@/hooks/use-audio-controls';

export const useAudioVisualization = (
  analyzer: AnalyserNode | null,
  isPlaying: boolean
) => {
  const [audioData, setAudioData] = useState<Uint8Array | null>(null);
  const [visualizationType, setVisualizationType] = useState<string>("waveform");
  
  // Set up an animation frame to continuously update audio data when playing
  useEffect(() => {
    if (!analyzer || !isPlaying) return;
    
    let animationFrameId: number;
    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const updateData = () => {
      if (isPlaying) {
        analyzer.getByteTimeDomainData(dataArray);
        setAudioData(new Uint8Array(dataArray));
      }
      animationFrameId = requestAnimationFrame(updateData);
    };
    
    updateData();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [analyzer, isPlaying]);
  
  return {
    audioData,
    visualizationType,
    setVisualizationType
  };
};
