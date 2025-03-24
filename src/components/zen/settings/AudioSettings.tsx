
import React from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface AudioSettingsProps {
  volume: number;
  soundscape: string;
  onVolumeChange: (value: number[]) => void;
  onSoundscapeChange: (value: string) => void;
}

const AudioSettings: React.FC<AudioSettingsProps> = ({ 
  volume, 
  soundscape, 
  onVolumeChange, 
  onSoundscapeChange 
}) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Audio</h3>
        <Label htmlFor="volume" className="text-xs mb-1 text-muted-foreground">
          Volume: {volume}%
        </Label>
        <Slider
          id="volume"
          min={0}
          max={100}
          step={1}
          value={[volume]}
          onValueChange={onVolumeChange}
          className="mt-1"
        />
      </div>

      {volume > 0 && (
        <div className="pt-2">
          <Label htmlFor="soundscape" className="text-xs mb-2 text-muted-foreground">
            Sound Type
          </Label>
          <RadioGroup
            value={soundscape}
            onValueChange={onSoundscapeChange}
            className="flex flex-col space-y-1 mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="lofi" id="lofi" />
              <Label htmlFor="lofi" className="text-sm cursor-pointer">Lo-Fi Music</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ambient" id="ambient" />
              <Label htmlFor="ambient" className="text-sm cursor-pointer">Ambient Sounds</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="whitenoise" id="whitenoise" />
              <Label htmlFor="whitenoise" className="text-sm cursor-pointer">White Noise</Label>
            </div>
          </RadioGroup>
        </div>
      )}
    </div>
  );
};

export default AudioSettings;
