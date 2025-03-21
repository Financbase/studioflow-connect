
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { X, Clock, Timer, Volume2, VolumeX, Settings2, Pause, Play } from "lucide-react";
import ZenModeSettings from "./ZenModeSettings";
import ZenModeContent from "./ZenModeContent";
import { ZenModeOptions } from "@/hooks/use-zen-mode";
import { toast } from "@/hooks/use-toast";

interface ZenModeProps {
  isActive: boolean;
  onToggle: () => void;
  options?: ZenModeOptions;
  onOptionsChange?: (options: Partial<ZenModeOptions>) => void;
}

const ZenMode: React.FC<ZenModeProps> = ({ 
  isActive, 
  onToggle, 
  options = {
    theme: 'minimal',
    soundscape: 'silence',
    enableTimers: false,
    hideNotifications: true,
    enableBrainstorming: true
  },
  onOptionsChange = () => {}
}) => {
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerActive, setTimerActive] = useState(false);
  const [timerRemaining, setTimerRemaining] = useState(25 * 60); // in seconds
  const [soundMuted, setSoundMuted] = useState(options.soundscape === 'silence');
  const [showControls, setShowControls] = useState(true);
  
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
  
  // Toggle controls visibility after inactivity
  useEffect(() => {
    if (!isActive) return;
    
    const hideTimeout = setTimeout(() => {
      if (isActive && !timerActive) {
        setShowControls(false);
      }
    }, 5000);
    
    // Show controls on mouse movement
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(hideTimeout);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearTimeout(hideTimeout);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isActive, timerActive]);
  
  // Return nothing if not active
  if (!isActive) return null;
  
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
  
  const toggleSoundMute = () => {
    setSoundMuted(!soundMuted);
    if (soundMuted) {
      // If currently muted, unmute and set to default soundscape
      onOptionsChange({ soundscape: 'lofi' });
      toast({
        title: "Sound enabled",
        description: "Lo-fi background audio is now playing.",
        duration: 3000,
      });
    } else {
      // If currently unmuted, mute by setting to silence
      onOptionsChange({ soundscape: 'silence' });
      toast({
        title: "Sound disabled",
        description: "Background audio is now muted.",
        duration: 3000,
      });
    }
  };
  
  const getBackgroundClass = () => {
    switch(options.theme) {
      case 'ambient':
        return 'bg-gradient-to-br from-[#1C1C2E]/90 to-[#2A2A4E]/90 ambient-background';
      case 'focus':
        return 'bg-gradient-to-br from-[#1C1C2E]/95 to-[#2D2D3A]/95';
      case 'minimal':
      default:
        return 'bg-[#1C1C2E]/95';
    }
  };
  
  return (
    <div className={`fixed inset-0 z-50 backdrop-blur-xl ${getBackgroundClass()} flex flex-col items-center justify-center transition-opacity duration-500`}>
      <div className={`absolute top-4 right-4 flex items-center gap-2 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        {options.enableTimers && (
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
        )}
        
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSoundMute}
          className="text-white hover:bg-white/10 rounded-full"
        >
          {soundMuted ? (
            <VolumeX className="h-5 w-5" />
          ) : (
            <Volume2 className="h-5 w-5" />
          )}
        </Button>
        
        {onOptionsChange && (
          <ZenModeSettings options={options} onChange={onOptionsChange} />
        )}
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggle} 
          className="text-white hover:bg-white/10 rounded-full"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>
      
      <div className="w-full max-w-4xl p-6">
        {options.theme === 'minimal' && (
          <div className="text-center mb-8">
            <h2 className="text-2xl font-light mb-6">Zen Studio Mode</h2>
            <p className="text-muted-foreground">Focus on your creativity. All distractions eliminated.</p>
          </div>
        )}
        
        <div className="relative">
          <ZenModeContent themeMode={options.theme} />
        </div>
      </div>
      
      {/* Overlay that shows controls on hover/click when they're hidden */}
      {!showControls && (
        <div 
          className="fixed inset-0 z-10 cursor-pointer" 
          onClick={() => setShowControls(true)}
        />
      )}
    </div>
  );
};

export default ZenMode;
