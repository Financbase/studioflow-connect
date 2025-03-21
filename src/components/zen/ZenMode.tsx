
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Clock, Timer } from "lucide-react";
import ZenModeSettings from "./ZenModeSettings";
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
        
        {onOptionsChange && (
          <ZenModeSettings options={options} onChange={onOptionsChange} />
        )}
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggle} 
          className="text-white hover:bg-white/10"
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
        
        <div className="relative rounded-xl bg-background/10 backdrop-blur-sm border border-white/5 shadow-lg overflow-hidden">
          {/* Your focused content would be rendered here */}
          <div className="p-6">
            {/* Content placeholder */}
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <div className="text-center space-y-4">
                <div className="inline-block p-3 rounded-full bg-accent-primary/20 mb-4">
                  <svg className="w-12 h-12 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-white">Your focused workspace</h3>
                <p className="text-sm text-white/70 max-w-md">
                  This is your distraction-free environment for deep work and creativity. 
                  Essential tools remain accessible while the noise fades away.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZenMode;
