
/**
 * Initialize audio visualizer on a canvas element with enhanced features
 * for sample analysis and categorization
 */
export function initAudioVisualizer(canvas: HTMLCanvasElement, audioSource?: MediaElementAudioSourceNode) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  // Set canvas dimensions
  const setCanvasDimensions = () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };
  
  // Initialize canvas
  setCanvasDimensions();
  window.addEventListener('resize', setCanvasDimensions);
  
  // Animation variables
  let animationId: number;
  let dataArray: Uint8Array;
  let analyser: AnalyserNode;
  
  // Sample classification markers (for visualization purposes)
  const sampleMarkers = [
    { position: 0.2, label: "Low", color: "rgba(255, 100, 100, 0.8)" },
    { position: 0.4, label: "Mid", color: "rgba(100, 255, 100, 0.8)" },
    { position: 0.6, label: "High", color: "rgba(100, 100, 255, 0.8)" },
    { position: 0.8, label: "Ultra", color: "rgba(255, 255, 100, 0.8)" },
  ];
  
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    
    const bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
    
    // Connect to audio source if provided
    if (audioSource) {
      audioSource.connect(analyser);
    } else {
      // For demo: create an oscillator to generate audio data
      const oscillator = audioContext.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
      oscillator.connect(analyser);
      oscillator.start();
    }
    
    // Drawing function
    const draw = () => {
      animationId = requestAnimationFrame(draw);
      
      // Use frequency data for a frequency visualizer
      analyser.getByteFrequencyData(dataArray);
      
      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw frequency bars
      const barWidth = (canvas.width / bufferLength) * 2.5;
      let x = 0;
      
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height;
        
        // Create a gradient effect based on frequency
        const hue = i / bufferLength * 360;
        ctx.fillStyle = `hsla(${hue}, 100%, 50%, 0.8)`;
        
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        
        x += barWidth + 1;
        if (x > canvas.width) break;
      }
      
      // Draw sample classification markers
      sampleMarkers.forEach(marker => {
        const markerX = canvas.width * marker.position;
        
        // Draw vertical line
        ctx.beginPath();
        ctx.strokeStyle = marker.color;
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 3]);
        ctx.moveTo(markerX, 0);
        ctx.lineTo(markerX, canvas.height);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Draw label
        ctx.fillStyle = marker.color;
        ctx.font = '12px Arial';
        ctx.fillText(marker.label, markerX + 4, 16);
      });
      
      // If no audio source, add some randomness for visualization effect
      if (!audioSource) {
        for (let i = 0; i < dataArray.length; i++) {
          dataArray[i] = Math.random() * 50 + 90;
        }
      }
    };
    
    // Start animation
    draw();
  } catch (error) {
    console.error("Audio visualization failed to initialize:", error);
    // Fallback to a simple animation if WebAudio is not available
    const fallbackDraw = () => {
      animationId = requestAnimationFrame(fallbackDraw);
      
      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw a simple sine wave
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(65, 105, 225, 0.8)';
      ctx.beginPath();
      
      const amplitude = canvas.height / 4;
      const frequency = 0.01;
      const offset = Date.now() * 0.002;
      
      ctx.moveTo(0, canvas.height / 2 + Math.sin(offset) * amplitude);
      
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin(x * frequency + offset) * amplitude;
        ctx.lineTo(x, y);
      }
      
      ctx.stroke();
      
      // Even in fallback mode, show some sample markers
      sampleMarkers.forEach(marker => {
        const markerX = canvas.width * marker.position;
        ctx.fillStyle = marker.color;
        ctx.font = '12px Arial';
        ctx.fillText(marker.label, markerX + 4, 16);
      });
    };
    
    fallbackDraw();
  }
  
  // Cleanup function
  return () => {
    window.removeEventListener('resize', setCanvasDimensions);
    cancelAnimationFrame(animationId);
  };
}
