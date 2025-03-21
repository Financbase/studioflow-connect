
import React from "react";
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
import { Settings2, Sparkles, MusicIcon, Clock, BellOff } from "lucide-react";
import { ZenModeOptions } from "@/hooks/use-zen-mode";

interface ZenModeSettingsProps {
  options: ZenModeOptions;
  onChange: (options: Partial<ZenModeOptions>) => void;
}

const ZenModeSettings: React.FC<ZenModeSettingsProps> = ({ options, onChange }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Settings2 className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent-primary" />
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
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Sparkles className="h-6 w-6 mb-2" />
                  <span className="font-medium">Minimal</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="ambient" id="ambient" className="sr-only peer" />
                <Label 
                  htmlFor="ambient" 
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <MusicIcon className="h-6 w-6 mb-2" />
                  <span className="font-medium">Ambient</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="focus" id="focus" className="sr-only peer" />
                <Label 
                  htmlFor="focus" 
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
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
                <Label className="text-base">Ambient Soundscape</Label>
                <p className="text-sm text-muted-foreground">Background audio to enhance your creative flow</p>
              </div>
            </div>
            <RadioGroup 
              value={options.soundscape} 
              onValueChange={(value) => onChange({ soundscape: value as ZenModeOptions['soundscape'] })}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem value="silence" id="silence" className="sr-only peer" />
                <Label 
                  htmlFor="silence" 
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <BellOff className="h-6 w-6 mb-2" />
                  <span className="font-medium">Silence</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="lofi" id="lofi" className="sr-only peer" />
                <Label 
                  htmlFor="lofi" 
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <MusicIcon className="h-6 w-6 mb-2" />
                  <span className="font-medium">Lo-Fi</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="nature" id="nature" className="sr-only peer" />
                <Label 
                  htmlFor="nature" 
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <MusicIcon className="h-6 w-6 mb-2" />
                  <span className="font-medium">Nature</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="analog" id="analog" className="sr-only peer" />
                <Label 
                  htmlFor="analog" 
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <MusicIcon className="h-6 w-6 mb-2" />
                  <span className="font-medium">Analog</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-base font-medium">Additional Features</h3>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enableTimers" className="text-sm">Focus Timers</Label>
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
                <Label htmlFor="hideNotifications" className="text-sm">Hide Notifications</Label>
                <p className="text-xs text-muted-foreground">Suppress all notifications while in Zen Mode</p>
              </div>
              <Switch 
                id="hideNotifications" 
                checked={options.hideNotifications}
                onCheckedChange={(checked) => onChange({ hideNotifications: checked })}
              />
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button type="submit">Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ZenModeSettings;
