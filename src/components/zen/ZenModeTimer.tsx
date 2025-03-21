
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Clock, Pause, Play } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ZenModeTimerProps {
  enabled: boolean;
  showControls: boolean;
}

const ZenModeTimer: React.FC<ZenModeTimerProps> = ({ 
  enabled, 
  showControls 
}) => {
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerActive, setTimerActive] = useState(false);
  const [timerRemaining, setTimerRemaining] = useState(25 * 60); // in seconds
  
  // Reset timer when changing time
  useEffect(() => {
    if (!timerActive) {
      setTimerRemaining(timerMinutes * 60);
    }
  }, [timerMinutes, timerActive]);
  
  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (timerActive && timerRemaining > 0) {
      interval = setInterval(() => {
        setTimerRemaining(prev => prev - 1);
      }, 1000);
    } else if (timerRemaining === 0 && timerActive) {
      setTimerActive(false);
      // Show notification when timer completes
      toast({
        title: "Focus session complete",
        description: `You've completed a ${timerMinutes} minute focus session.`,
        duration: 5000,
      });
      
      // Play a subtle sound to indicate timer completion
      const audio = new Audio();
      audio.volume = 0.3;
      audio.play().catch(err => console.error('Error playing completion sound:', err));
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, timerRemaining, timerMinutes]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleTimerAdjust = (minutes: number) => {
    if (!timerActive) {
      setTimerMinutes((prev) => {
        const newValue = prev + minutes;
        return newValue > 0 ? newValue : 1; // Ensure minimum of 1 minute
      });
    }
  };
  
  const handleStartTimer = () => {
    setTimerActive(true);
    toast({
      title: "Focus timer started",
      description: `${timerMinutes} minute focus session started.`,
      duration: 3000,
    });
  };
  
  const handleStopTimer = () => {
    setTimerActive(false);
  };

  if (!enabled) return null;

  return (
    <div className={`flex items-center bg-background/20 rounded-full px-4 py-2 ${timerActive ? 'timer-active' : ''}`}>
      <Clock className="h-4 w-4 mr-2" />
      <span className="text-lg font-mono">{formatTime(timerRemaining)}</span>
      
      {!timerActive && (
        <>
          <Button 
            variant="ghost" 
            size="icon" 
            className="ml-2 h-6 w-6 text-white/70 hover:text-white"
            onClick={() => handleTimerAdjust(-5)}
          >
            -
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 text-white/70 hover:text-white"
            onClick={() => handleTimerAdjust(5)}
          >
            +
          </Button>
        </>
      )}
      
      {timerActive ? (
        <Button 
          variant="ghost" 
          size="icon" 
          className="ml-2 h-6 w-6 hover:bg-white/10 rounded-full" 
          onClick={handleStopTimer}
        >
          <Pause className="h-4 w-4" />
        </Button>
      ) : (
        <Button 
          variant="ghost" 
          size="icon" 
          className="ml-2 h-6 w-6 hover:bg-white/10 rounded-full" 
          onClick={handleStartTimer}
        >
          <Play className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default ZenModeTimer;
