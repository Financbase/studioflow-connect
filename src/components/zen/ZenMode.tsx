
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Clock, Timer, Volume2, VolumeX, Settings2 } from "lucide-react";
import ZenModeSettings from "./ZenModeSettings";
import ZenModeContent from "./ZenModeContent";
import { ZenModeOptions } from "@/hooks/use-zen-mode";

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
    hideNotifications: true
  },
  onOptionsChange = () => {}
}) => {
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerActive, setTimerActive] = useState(false);
  const [timerRemaining, setTimerRemaining] = useState(25 * 60); // in seconds
  const [soundMuted, setSoundMuted] = useState(options.soundscape === 'silence');
  
  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (timerActive && timerRemaining > 0) {
      interval = setInterval(() => {
        setTimerRemaining(prev => prev - 1);
      }, 1000);
    } else if (timerRemaining === 0) {
      setTimerActive(false);
      // Could trigger a notification here
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, timerRemaining]);
  
  // Return nothing if not active
  if (!isActive) return null;
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleStartTimer = () => {
    setTimerRemaining(timerMinutes * 60);
    setTimerActive(true);
  };
  
  const handleStopTimer = () => {
    setTimerActive(false);
  };
  
  const toggleSoundMute = () => {
    setSoundMuted(!soundMuted);
    if (soundMuted) {
      // If currently muted, unmute and set to default soundscape
      onOptionsChange({ soundscape: 'lofi' });
    } else {
      // If currently unmuted, mute by setting to silence
      onOptionsChange({ soundscape: 'silence' });
    }
  };
  
  const getBackgroundClass = () => {
    switch(options.theme) {
      case 'ambient':
        return 'bg-gradient-to-br from-[#1C1C2E]/90 to-[#2A2A4E]/90';
      case 'focus':
        return 'bg-gradient-to-br from-[#1C1C2E]/95 to-[#2D2D3A]/95';
      case 'minimal':
      default:
        return 'bg-[#1C1C2E]/95';
    }
  };
  
  return (
    <div className={`fixed inset-0 z-50 backdrop-blur-xl ${getBackgroundClass()} flex flex-col items-center justify-center transition-opacity duration-500`}>
      <div className="absolute top-4 right-4 flex items-center gap-2">
        {options.enableTimers && (
          <div className="flex items-center mr-4 bg-background/20 rounded-full px-4 py-2">
            <Clock className="h-4 w-4 mr-2" />
            <span className="text-lg font-mono">{formatTime(timerRemaining)}</span>
            {timerActive ? (
              <Button 
                variant="ghost" 
                size="icon" 
                className="ml-2 h-6 w-6 rounded-full" 
                onClick={handleStopTimer}
              >
                <span className="h-2 w-2 bg-white rounded-sm"></span>
              </Button>
            ) : (
              <Button 
                variant="ghost" 
                size="icon" 
                className="ml-2 h-6 w-6 rounded-full" 
                onClick={handleStartTimer}
              >
                <Timer className="h-4 w-4" />
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
    </div>
  );
};

export default ZenMode;
