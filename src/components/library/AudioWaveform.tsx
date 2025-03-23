
import React from "react";

interface AudioWaveformProps {
  height?: number;
  color?: string;
  backgroundColor?: string;
}

const AudioWaveform: React.FC<AudioWaveformProps> = ({ 
  height = 50, 
  color = "currentColor",
  backgroundColor = "transparent"
}) => {
  // Generate a stable random pattern for the waveform
  const generateWaveformData = (length: number, seed: number = 1) => {
    const result = [];
    let value = seed;
    
    for (let i = 0; i < length; i++) {
      // Pseudo-random number generator using a simple linear congruential generator
      value = (value * 1664525 + 1013904223) % 4294967296;
      const normalizedValue = value / 4294967296;
      
      // Create a more natural waveform pattern by using a sine function
      const amplitude = 0.3 + 0.7 * Math.pow(Math.sin(i * 0.2), 2);
      result.push(0.2 + amplitude * normalizedValue);
    }
    
    return result;
  };

  const waveformData = React.useMemo(() => generateWaveformData(40), []);
  
  return (
    <svg
      width="100%"
      height={height}
      viewBox={`0 0 ${waveformData.length} 1`}
      preserveAspectRatio="none"
      style={{ backgroundColor }}
    >
      {waveformData.map((value, index) => (
        <rect
          key={index}
          x={index}
          y={0.5 - value / 2}
          width={0.6}
          height={value}
          fill={color}
          fillOpacity={0.7}
          rx={0.1}
        />
      ))}
    </svg>
  );
};

export default AudioWaveform;
