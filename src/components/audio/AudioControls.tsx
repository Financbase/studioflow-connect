
import React from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";

interface AudioControlsProps {
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  isPlaying: boolean;
  audioName?: string;
  volume: number;
  isMuted: boolean;
  onVolumeChange: (volume: number) => void;
  onMuteToggle: () => void;
  onVisualizationTypeChange?: (type: string) => void;
  currentVisualizationType?: string;
  duration?: number;
  currentTime?: number;
  onSeek?: (time: number) => void;
}

const AudioControls: React.FC<AudioControlsProps> = ({
  onPlay,
  onPause,
  onStop,
  isPlaying,
  audioName,
  volume,
  isMuted,
  onVolumeChange,
  onMuteToggle,
  onVisualizationTypeChange,
  currentVisualizationType = "waveform",
  duration = 0,
  currentTime = 0,
  onSeek,
}) => {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleSeek = (value: number[]) => {
    if (onSeek) {
      onSeek(value[0]);
    }
  };

  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex flex-col space-y-4">
          {/* Playback Controls */}
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
              {audioName && <span className="text-sm ml-2">{audioName}</span>}
            </div>
            
            {/* Volume Control */}
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
          
          {/* Time Scrubber */}
          {duration > 0 && onSeek && (
            <div className="space-y-1">
              <Slider
                value={[currentTime]}
                min={0}
                max={duration}
                step={0.1}
                onValueChange={handleSeek}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          )}
          
          {/* Settings Controls */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="auto-gain" className="text-sm">Auto Gain</Label>
              <Switch id="auto-gain" />
            </div>
            
            {onVisualizationTypeChange && (
              <div>
                <Label className="text-sm mb-1 block">Visualization Type</Label>
                <ToggleGroup 
                  type="single" 
                  value={currentVisualizationType}
                  onValueChange={(value) => {
                    if (value) onVisualizationTypeChange(value);
                  }}
                >
                  <ToggleGroupItem value="waveform" size="sm">Waveform</ToggleGroupItem>
                  <ToggleGroupItem value="frequency" size="sm">Frequency</ToggleGroupItem>
                  <ToggleGroupItem value="spectrogram" size="sm">Spectrogram</ToggleGroupItem>
                </ToggleGroup>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AudioControls;
