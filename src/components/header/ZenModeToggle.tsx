
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
              ? "bg-primary hover:bg-primary/90 text-primary-foreground relative overflow-hidden transition-all duration-300" 
              : "text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-300"
            }
            aria-label={isActive ? "Exit Zen Mode" : "Enter Zen Mode"}
          >
            {isActive ? (
              <>
                <Sparkles className="h-5 w-5 relative z-10 animate-pulse-soft text-primary-foreground" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-accent/50 to-primary/80 opacity-80 animate-pulse"></div>
              </>
            ) : (
              <MoonStar className="h-5 w-5 transition-transform duration-300 hover:rotate-12" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="font-medium">
          <p>{isActive ? "Exit Zen Mode" : "Enter Zen Mode"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ZenModeToggle;
