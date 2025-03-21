
import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Clock, BellOff, Bookmark } from "lucide-react";
import { ZenModeOptions } from "@/hooks/use-zen-mode";
import { toast } from "@/hooks/use-toast";

interface AdditionalFeaturesProps {
  enableTimers: boolean;
  hideNotifications: boolean;
  onToggleTimers: (checked: boolean) => void;
  onToggleNotifications: (checked: boolean) => void;
}

const AdditionalFeatures: React.FC<AdditionalFeaturesProps> = ({
  enableTimers,
  hideNotifications,
  onToggleTimers,
  onToggleNotifications
}) => {
  return (
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
          checked={enableTimers}
          onCheckedChange={onToggleTimers}
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
          checked={hideNotifications}
          onCheckedChange={onToggleNotifications}
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
  );
};

export default AdditionalFeatures;
