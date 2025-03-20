
import React, { useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface WaveformVisualizerProps {
  className?: string;
  audioData?: Uint8Array;
}

const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({ 
  className,
  audioData,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !audioData) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Clear canvas
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw waveform
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(65, 105, 225, 0.8)";
    ctx.beginPath();
    
    const sliceWidth = canvas.width / audioData.length;
    let x = 0;
    
    for (let i = 0; i < audioData.length; i++) {
      const v = audioData[i] / 128.0;
      const y = v * canvas.height / 2;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      
      x += sliceWidth;
    }
    
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
    
  }, [audioData]);

  return (
    <Card className={className}>
      <CardContent className="p-0 overflow-hidden">
        <div className="relative w-full h-64">
          <canvas
            ref={canvasRef}
            className="w-full h-full bg-black/10 dark:bg-white/5"
          />
          <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-black/20 dark:bg-black/40 px-2 py-1 rounded">
            Waveform
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WaveformVisualizer;
