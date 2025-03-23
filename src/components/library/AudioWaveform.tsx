
import React, { useEffect, useRef } from 'react';

interface AudioWaveformProps {
  fileUrl?: string;
  isPlaying?: boolean;
  height?: number;
  barWidth?: number;
  barGap?: number;
}

const AudioWaveform: React.FC<AudioWaveformProps> = ({
  fileUrl,
  isPlaying = false,
  height = 40,
  barWidth = 2,
  barGap = 1
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = height * dpr;
    
    // Scale the context
    ctx.scale(dpr, dpr);
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Generate waveform data (in a real implementation, this would come from the audio file)
    // For now, we'll generate random data to simulate a waveform
    const totalBars = Math.floor(canvas.offsetWidth / (barWidth + barGap));
    const waveformData = Array.from({ length: totalBars }, () => Math.random());
    
    // Draw waveform
    const drawWaveform = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Set color based on playing state
      ctx.fillStyle = isPlaying ? '#3b82f6' : '#64748b';
      
      // Draw bars
      waveformData.forEach((amplitude, index) => {
        const x = index * (barWidth + barGap);
        const barHeight = Math.max(2, amplitude * (height * 0.8)); // Ensure minimum height
        const y = (height - barHeight) / 2;
        
        ctx.fillRect(x, y, barWidth, barHeight);
      });
    };
    
    drawWaveform();
    
    // If playing, animate the waveform
    let animationId: number;
    if (isPlaying) {
      let offset = 0;
      const animate = () => {
        offset += 0.05;
        
        // Update waveform data with a "moving" effect
        waveformData.forEach((_, index) => {
          const sinValue = Math.sin(index * 0.2 + offset);
          waveformData[index] = 0.3 + (Math.abs(sinValue) * 0.7);
        });
        
        drawWaveform();
        animationId = requestAnimationFrame(animate);
      };
      
      animate();
    }
    
    // Cleanup
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [fileUrl, isPlaying, height, barWidth, barGap]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full" 
      style={{ height: `${height}px` }} 
    />
  );
};

export default AudioWaveform;
