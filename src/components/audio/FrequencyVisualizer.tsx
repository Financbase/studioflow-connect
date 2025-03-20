
import React, { useRef, useEffect } from "react";
import BaseVisualizer from "./BaseVisualizer";
import { initAudioVisualizer } from "@/lib/audioVisualizer";

interface FrequencyVisualizerProps {
  className?: string;
  audioSource?: MediaElementAudioSourceNode;
}

const FrequencyVisualizer: React.FC<FrequencyVisualizerProps> = ({ 
  className,
  audioSource
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const cleanup = initAudioVisualizer(canvasRef.current, audioSource);
    
    return () => {
      cleanup();
    };
  }, [audioSource]);

  return (
    <BaseVisualizer className={className} title="Frequency Analysis">
      <canvas
        ref={canvasRef}
        className="w-full h-full bg-black/10 dark:bg-white/5"
      />
    </BaseVisualizer>
  );
};

export default FrequencyVisualizer;
