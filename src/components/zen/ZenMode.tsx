
import React, { useState, useEffect } from "react";
import { ZenModeOptions } from "@/hooks/use-zen-mode";
import { toast } from "@/hooks/use-toast";
import ZenModeContent from "./ZenModeContent";
import ZenModeControls from "./ZenModeControls";
import ZenModeContainer from "./ZenModeContainer";

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
  const [soundMuted, setSoundMuted] = useState(options.soundscape === 'silence');
  const [showControls, setShowControls] = useState(true);
  
  // Toggle controls visibility after inactivity
  useEffect(() => {
    if (!isActive) return;
    
    const hideTimeout = setTimeout(() => {
      if (isActive) {
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
  }, [isActive]);
  
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
  
  return (
    <ZenModeContainer isActive={isActive} options={options}>
      <ZenModeControls 
        isVisible={showControls}
        options={options}
        soundMuted={soundMuted}
        onToggleMute={toggleSoundMute}
        onToggleZenMode={onToggle}
        onOptionsChange={onOptionsChange}
      />
      
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
    </ZenModeContainer>
  );
};

export default ZenMode;
