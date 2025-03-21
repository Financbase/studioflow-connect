
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sparkles, MusicIcon, Clock } from "lucide-react";
import { ZenModeOptions } from "@/hooks/use-zen-mode";

interface ThemeSelectorProps {
  value: ZenModeOptions['theme'];
  onChange: (value: ZenModeOptions['theme']) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label className="text-base">Visual Theme</Label>
          <p className="text-sm text-muted-foreground">Choose the appearance of your zen environment</p>
        </div>
      </div>
      <RadioGroup 
        value={value} 
        onValueChange={(value) => onChange(value as ZenModeOptions['theme'])}
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
  );
};

export default ThemeSelector;
