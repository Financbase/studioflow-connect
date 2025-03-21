
import React from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MoonStar, Sparkles } from "lucide-react";

interface ZenModeToggleProps {
  onClick: () => void;
  isActive?: boolean;
}

const ZenModeToggle: React.FC<ZenModeToggleProps> = ({ onClick, isActive = false }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant={isActive ? "default" : "ghost"} 
            size="icon" 
            onClick={onClick} 
            className={isActive 
              ? "bg-accent-primary hover:bg-accent-primary/90 text-background" 
              : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            }
            aria-label={isActive ? "Exit Zen Mode" : "Enter Zen Mode"}
          >
            {isActive ? <Sparkles className="h-5 w-5" /> : <MoonStar className="h-5 w-5" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{isActive ? "Exit Zen Mode" : "Enter Zen Mode"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ZenModeToggle;
