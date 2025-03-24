
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Settings2, Sparkles } from "lucide-react";
import { ZenModeOptions } from "@/hooks/use-zen-mode";
import { toast } from "@/hooks/use-toast";

// Import the new component files
import ThemeSelector from "./settings/ThemeSelector";
import AudioSettings from "./settings/AudioSettings";
import AdditionalFeatures from "./settings/AdditionalFeatures";

interface ZenModeSettingsProps {
  options: ZenModeOptions;
  onChange: (options: Partial<ZenModeOptions>) => void;
}

const ZenModeSettings: React.FC<ZenModeSettingsProps> = ({ options, onChange }) => {
  const [volume, setVolume] = useState(options.soundscape === 'silence' ? 0 : 50);
  const [isOpen, setIsOpen] = useState(false);
  
  const handleVolumeChange = (newVolume: number[]) => {
    const volumeValue = newVolume[0];
    setVolume(volumeValue);
    
    if (volumeValue === 0 && options.soundscape !== 'silence') {
      onChange({ soundscape: 'silence' });
    } else if (volumeValue > 0 && options.soundscape === 'silence') {
      onChange({ soundscape: 'lofi' });
    }
  };
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your Zen Mode preferences have been updated.",
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full">
          <Settings2 className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-background/95 backdrop-blur-xl border-white/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Zen Mode Settings
          </DialogTitle>
          <DialogDescription>
            Customize your distraction-free creative environment.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <ThemeSelector 
            value={options.theme} 
            onChange={(theme) => onChange({ theme })}
          />
          
          <AudioSettings 
            volume={volume}
            soundscape={options.soundscape || 'silence'}
            onVolumeChange={handleVolumeChange}
            onSoundscapeChange={(soundscape) => onChange({ soundscape })}
          />
          
          <AdditionalFeatures
            enableTimers={options.enableTimers || false}
            hideNotifications={options.hideNotifications || false}
            onToggleTimers={(checked) => onChange({ enableTimers: checked })}
            onToggleNotifications={(checked) => onChange({ hideNotifications: checked })}
          />
        </div>
        
        <DialogFooter>
          <Button type="button" onClick={handleSaveSettings}>Apply Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ZenModeSettings;
