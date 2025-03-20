
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Play, Pause, SkipBack, Volume2, VolumeX } from "lucide-react";

interface AudioControlsProps {
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onVolumeChange: (volume: number) => void;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  onMuteToggle: () => void;
}

const AudioControls: React.FC<AudioControlsProps> = ({
  onPlay,
  onPause,
  onStop,
  onVolumeChange,
  isPlaying,
  volume,
  isMuted,
  onMuteToggle,
}) => {
  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={isPlaying ? onPause : onPlay}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={onStop}
                aria-label="Stop"
              >
                <SkipBack className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={onMuteToggle}
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
              
              <div className="w-32">
                <Slider
                  value={[isMuted ? 0 : volume]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => onVolumeChange(value[0])}
                  aria-label="Volume"
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="auto-gain" className="text-sm">Auto Gain</Label>
              <Switch id="auto-gain" />
            </div>
            
            <div>
              <Label className="text-sm mb-1 block">Visualization Type</Label>
              <ToggleGroup type="single" defaultValue="waveform">
                <ToggleGroupItem value="waveform" size="sm">Waveform</ToggleGroupItem>
                <ToggleGroupItem value="frequency" size="sm">Frequency</ToggleGroupItem>
                <ToggleGroupItem value="spectrogram" size="sm">Spectrogram</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AudioControls;
