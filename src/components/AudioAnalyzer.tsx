
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { initAudioVisualizer } from "@/lib/audioVisualizer";

const AudioAnalyzer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gain, setGain] = useState(50);
  const [pan, setPan] = useState(0);
  const [eq, setEq] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (canvasRef.current) {
      const cleanup = initAudioVisualizer(canvasRef.current);
      return cleanup;
    }
  }, []);

  const handleTogglePlayback = () => {
    setIsPlaying(!isPlaying);
    // In a real app, this would control actual audio playback
  };

  return (
    <section id="audio" className="py-6 w-full">
      <h2 className="text-2xl font-semibold mb-4">Audio Analysis</h2>
      <Card className="overflow-hidden">
        <CardHeader className="pb-0">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Advanced Audio Waveform</h3>
            <button
              onClick={handleTogglePlayback}
              className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              {isPlaying ? "Pause Visualization" : "Start Visualization"}
            </button>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="relative rounded-lg overflow-hidden bg-black/10 dark:bg-white/5 mb-6">
            <canvas
              ref={canvasRef}
              className="w-full h-[200px]"
              style={{ display: "block" }}
            />
            <div className="absolute inset-0 pointer-events-none waveform-gradient opacity-50" 
                 style={{ 
                   maskImage: "url(\"data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cmask id='mask' x='0' y='0' width='100%25' height='100%25'%3E%3Crect x='0' y='0' width='100%25' height='100%25' fill='white'/%3E%3C/mask%3E%3C/defs%3E%3Crect x='0' y='0' width='100%25' height='100%25' mask='url(%23mask)' fill-opacity='0.4'/%3E%3C/svg%3E\")",
                   WebkitMaskImage: "url(\"data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cmask id='mask' x='0' y='0' width='100%25' height='100%25'%3E%3Crect x='0' y='0' width='100%25' height='100%25' fill='white'/%3E%3C/mask%3E%3C/defs%3E%3Crect x='0' y='0' width='100%25' height='100%25' mask='url(%23mask)' fill-opacity='0.4'/%3E%3C/svg%3E\")"
                 }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="gain" className="text-sm font-medium">
                  Gain Control
                </label>
                <span className="text-xs text-muted-foreground">{gain}%</span>
              </div>
              <Slider
                id="gain"
                min={0}
                max={100}
                step={1}
                value={[gain]}
                onValueChange={(value) => setGain(value[0])}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="pan" className="text-sm font-medium">
                  Pan Control
                </label>
                <span className="text-xs text-muted-foreground">
                  {pan < 0 ? `${Math.abs(pan)}L` : pan > 0 ? `${pan}R` : "C"}
                </span>
              </div>
              <Slider
                id="pan"
                min={-100}
                max={100}
                step={1}
                value={[pan]}
                onValueChange={(value) => setPan(value[0])}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="eq" className="text-sm font-medium">
                  EQ Adjustment
                </label>
                <span className="text-xs text-muted-foreground">{eq}%</span>
              </div>
              <Slider
                id="eq"
                min={0}
                max={100}
                step={1}
                value={[eq]}
                onValueChange={(value) => setEq(value[0])}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default AudioAnalyzer;
