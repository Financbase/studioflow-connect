
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { MusicIcon, VolumeX, Volume, Volume2 } from "lucide-react";
import { ZenModeOptions } from "@/hooks/use-zen-mode";

interface AudioSettingsProps {
  volume: number;
  soundscape: ZenModeOptions['soundscape'];
  onVolumeChange: (value: number[]) => void;
  onSoundscapeChange: (value: ZenModeOptions['soundscape']) => void;
}

const AudioSettings: React.FC<AudioSettingsProps> = ({ 
  volume, 
  soundscape, 
  onVolumeChange, 
  onSoundscapeChange 
}) => {
  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX className="h-4 w-4" />;
    if (volume < 50) return <Volume className="h-4 w-4" />;
    return <Volume2 className="h-4 w-4" />;
  };

  return (
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
          onValueChange={onVolumeChange}
        />
      </div>
      
      {volume > 0 && (
        <RadioGroup 
          value={soundscape === 'silence' ? 'lofi' : soundscape} 
          onValueChange={(value) => onSoundscapeChange(value as ZenModeOptions['soundscape'])}
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
  );
};

export default AudioSettings;
