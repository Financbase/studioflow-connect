
/**
 * Audio Visualizer implementation
 */
export function initAudioVisualizer(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  // Set canvas dimensions
  const resizeCanvas = () => {
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  };
  
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Demo waveform animation
  let animationId: number;
  const points: { x: number; y: number; originalY: number; speed: number }[] = [];
  
  // Initialize points
  const initPoints = () => {
    points.length = 0;
    const width = canvas.width / window.devicePixelRatio;
    const height = canvas.height / window.devicePixelRatio;
    const centerY = height / 2;
    const segments = Math.max(50, Math.floor(width / 10));
    
    for (let i = 0; i <= segments; i++) {
      const x = (width * i) / segments;
      const variance = Math.random() * 15 - 7.5;
      const y = centerY + variance;
      points.push({
        x,
        y,
        originalY: y,
        speed: 0.1 + Math.random() * 0.2,
      });
    }
  };
  
  // Animation function
  const animate = () => {
    if (!ctx) return;
    
    const width = canvas.width / window.devicePixelRatio;
    const height = canvas.height / window.devicePixelRatio;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Update points
    points.forEach(point => {
      point.y = point.originalY + Math.sin(Date.now() * 0.001 * point.speed) * 15;
    });
    
    // Draw waveform
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    
    for (let i = 0; i < points.length; i++) {
      const current = points[i];
      const next = points[i + 1];
      
      if (next) {
        const xc = (current.x + next.x) / 2;
        const yc = (current.y + next.y) / 2;
        ctx.quadraticCurveTo(current.x, current.y, xc, yc);
      } else {
        ctx.lineTo(current.x, current.y);
        ctx.lineTo(width, height / 2);
      }
    }
    
    // Style for the primary line
    ctx.lineWidth = 2;
    ctx.strokeStyle = getComputedStyle(document.documentElement)
      .getPropertyValue('--primary')
      .trim() || '#3b82f6';
    ctx.stroke();
    
    // Draw reflection (more subtle)
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    
    for (let i = 0; i < points.length; i++) {
      const current = points[i];
      const next = points[i + 1];
      const reflectY = height - current.y + height / 2;
      
      if (next) {
        const xc = (current.x + next.x) / 2;
        const yc = height - ((current.y + next.y) / 2) + height / 2;
        ctx.quadraticCurveTo(current.x, reflectY, xc, yc);
      } else {
        ctx.lineTo(current.x, reflectY);
        ctx.lineTo(width, height / 2);
      }
    }
    
    ctx.lineWidth = 1;
    ctx.strokeStyle = getComputedStyle(document.documentElement)
      .getPropertyValue('--primary')
      .trim() || '#3b82f6';
    ctx.globalAlpha = 0.3;
    ctx.stroke();
    ctx.globalAlpha = 1;
    
    animationId = requestAnimationFrame(animate);
  };
  
  // Start animation
  initPoints();
  animate();
  
  // Cleanup function
  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', resizeCanvas);
  };
}
