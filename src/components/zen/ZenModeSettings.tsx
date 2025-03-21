
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Settings2, Sparkles, MusicIcon, Clock, BellOff, Bookmark, VolumeX, Volume, Volume2 } from "lucide-react";
import { ZenModeOptions } from "@/hooks/use-zen-mode";
import { toast } from "@/hooks/use-toast";

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
    
    // In a real implementation, we would adjust the actual audio volume
  };
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your Zen Mode preferences have been updated.",
    });
    setIsOpen(false);
  };
  
  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX className="h-4 w-4" />;
    if (volume < 50) return <Volume className="h-4 w-4" />;
    return <Volume2 className="h-4 w-4" />;
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
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Visual Theme</Label>
                <p className="text-sm text-muted-foreground">Choose the appearance of your zen environment</p>
              </div>
            </div>
            <RadioGroup 
              value={options.theme} 
              onValueChange={(value) => onChange({ theme: value as ZenModeOptions['theme'] })}
              className="grid grid-cols-3 gap-4"
            >
              <div>
                <RadioGroupItem value="minimal" id="minimal" className="sr-only peer" />
                <Label 
                  htmlFor="minimal" 
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-colors duration-200"
                >
                  <Sparkles className="h-6 w-6 mb-2" />
                  <span className="font-medium">Minimal</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="ambient" id="ambient" className="sr-only peer" />
                <Label 
                  htmlFor="ambient" 
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-colors duration-200"
                >
                  <MusicIcon className="h-6 w-6 mb-2" />
                  <span className="font-medium">Ambient</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="focus" id="focus" className="sr-only peer" />
                <Label 
                  htmlFor="focus" 
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-colors duration-200"
                >
                  <Clock className="h-6 w-6 mb-2" />
                  <span className="font-medium">Focus</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Audio Settings</Label>
                <p className="text-sm text-muted-foreground">Control background audio for your zen experience</p>
              </div>
            </div>
            
            <div className="px-1 pb-2">
              <div className="flex items-center justify-between mb-1">
                <Label htmlFor="volume" className="text-sm flex items-center gap-1.5">
                  {getVolumeIcon()}
                  <span>Volume</span>
                </Label>
                <span className="text-sm text-muted-foreground">{volume}%</span>
              </div>
              <Slider
                id="volume"
                value={[volume]}
                max={100}
                step={5}
                className="py-2"
                onValueChange={handleVolumeChange}
              />
            </div>
            
            {volume > 0 && (
              <RadioGroup 
                value={options.soundscape === 'silence' ? 'lofi' : options.soundscape} 
                onValueChange={(value) => onChange({ soundscape: value as ZenModeOptions['soundscape'] })}
                className="grid grid-cols-2 gap-4"
              >
                <div>
                  <RadioGroupItem value="lofi" id="lofi" className="sr-only peer" />
                  <Label 
                    htmlFor="lofi" 
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-colors duration-200"
                  >
                    <MusicIcon className="h-6 w-6 mb-2" />
                    <span className="font-medium">Lo-Fi</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="nature" id="nature" className="sr-only peer" />
                  <Label 
                    htmlFor="nature" 
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-colors duration-200"
                  >
                    <MusicIcon className="h-6 w-6 mb-2" />
                    <span className="font-medium">Nature</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="analog" id="analog" className="sr-only peer" />
                  <Label 
                    htmlFor="analog" 
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-colors duration-200"
                  >
                    <MusicIcon className="h-6 w-6 mb-2" />
                    <span className="font-medium">Analog</span>
                  </Label>
                </div>
              </RadioGroup>
            )}
          </div>
          
          <div className="space-y-4">
            <h3 className="text-base font-medium">Additional Features</h3>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enableTimers" className="text-sm flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  Focus Timers
                </Label>
                <p className="text-xs text-muted-foreground">Enable Pomodoro-style focus timers</p>
              </div>
              <Switch 
                id="enableTimers" 
                checked={options.enableTimers}
                onCheckedChange={(checked) => onChange({ enableTimers: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="hideNotifications" className="text-sm flex items-center gap-1.5">
                  <BellOff className="h-4 w-4" />
                  Hide Notifications
                </Label>
                <p className="text-xs text-muted-foreground">Suppress all notifications while in Zen Mode</p>
              </div>
              <Switch 
                id="hideNotifications" 
                checked={options.hideNotifications}
                onCheckedChange={(checked) => onChange({ hideNotifications: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="savePreset" className="text-sm flex items-center gap-1.5">
                  <Bookmark className="h-4 w-4" />
                  Save as Preset
                </Label>
                <p className="text-xs text-muted-foreground">Save these settings as your default</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // In a real app, this would save to local storage or server
                  toast({
                    title: "Preset saved",
                    description: "Your zen mode settings will be used by default.",
                  });
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button type="button" onClick={handleSaveSettings}>Apply Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ZenModeSettings;
