
import React from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, X } from "lucide-react";
import ZenModeSettings from "./ZenModeSettings";
import ZenModeTimer from "./ZenModeTimer";
import { ZenModeOptions } from "@/hooks/use-zen-mode";
import { toast } from "@/hooks/use-toast";

interface ZenModeControlsProps {
  isVisible: boolean;
  options: ZenModeOptions;
  soundMuted: boolean;
  onToggleMute: () => void;
  onToggleZenMode: () => void;
  onOptionsChange: (options: Partial<ZenModeOptions>) => void;
}

const ZenModeControls: React.FC<ZenModeControlsProps> = ({
  isVisible,
  options,
  soundMuted,
  onToggleMute,
  onToggleZenMode,
  onOptionsChange
}) => {
  if (!isVisible) return null;

  return (
    <div className={`absolute top-4 right-4 flex items-center gap-2 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {options.enableTimers && (
        <ZenModeTimer enabled={true} showControls={isVisible} />
      )}
      
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleMute}
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
        onClick={onToggleZenMode} 
        className="text-white hover:bg-white/10 rounded-full"
      >
        <X className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default ZenModeControls;
