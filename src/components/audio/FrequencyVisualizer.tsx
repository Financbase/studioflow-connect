
import React, { useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { initAudioVisualizer } from "@/lib/audioVisualizer";

interface FrequencyVisualizerProps {
  className?: string;
}

const FrequencyVisualizer: React.FC<FrequencyVisualizerProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const cleanup = initAudioVisualizer(canvasRef.current);
    
    return () => {
      cleanup();
    };
  }, []);

  return (
    <Card className={className}>
      <CardContent className="p-0 overflow-hidden">
        <div className="relative w-full h-64">
          <canvas
            ref={canvasRef}
            className="w-full h-full bg-black/10 dark:bg-white/5"
          />
          <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-black/20 dark:bg-black/40 px-2 py-1 rounded">
            Frequency Analysis
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FrequencyVisualizer;
