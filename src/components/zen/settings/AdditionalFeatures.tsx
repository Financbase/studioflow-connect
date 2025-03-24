
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

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
      <h3 className="text-sm font-medium mb-2">Additional Features</h3>
      
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="focus-timer" className="text-sm">Focus Timer</Label>
          <p className="text-xs text-muted-foreground">
            Enable Pomodoro-style focus timer
          </p>
        </div>
        <Switch 
          id="focus-timer" 
          checked={enableTimers}
          onCheckedChange={onToggleTimers}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="hide-notifications" className="text-sm">Hide Notifications</Label>
          <p className="text-xs text-muted-foreground">
            Suppress system notifications when in zen mode
          </p>
        </div>
        <Switch 
          id="hide-notifications" 
          checked={hideNotifications}
          onCheckedChange={onToggleNotifications}
        />
      </div>
    </div>
  );
};

export default AdditionalFeatures;
