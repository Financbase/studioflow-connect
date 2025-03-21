
import React from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MoonStar } from "lucide-react";

interface ZenModeToggleProps {
  onClick: () => void;
}

const ZenModeToggle: React.FC<ZenModeToggleProps> = ({ onClick }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={onClick} className="text-muted-foreground hover:text-foreground">
            <MoonStar className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Zen Mode</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ZenModeToggle;
