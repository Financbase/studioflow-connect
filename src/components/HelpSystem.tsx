
import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { HelpCircle, AlertTriangle, Info } from "lucide-react";

type HelpSeverity = "info" | "warning" | "critical";

interface HelpProps {
  title: string;
  content: string | React.ReactNode;
  size?: "small" | "large";
  severity?: HelpSeverity;
  className?: string;
}

export const HelpTip = ({ title, content, size = "small", severity = "info", className }: HelpProps) => {
  const getIcon = () => {
    switch (severity) {
      case "warning": return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "critical": return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default: return <Info className="h-4 w-4 text-muted-foreground" />;
    }
  };

  if (size === "small") {
    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-6 w-6 rounded-full ${className}`}
          >
            <HelpCircle className="h-4 w-4" />
            <span className="sr-only">Help</span>
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="flex justify-between space-x-4">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">{title}</h4>
              <div className="text-sm text-muted-foreground">
                {content}
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={`gap-2 ${className}`}
        >
          {getIcon()}
          <span>{title}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h3 className="font-medium leading-none">{title}</h3>
          <div className="text-sm text-muted-foreground">
            {content}
          </div>
          {severity !== "info" && (
            <Alert variant={severity === "critical" ? "destructive" : "default"} className="mt-2">
              <AlertTitle>
                {severity === "critical" ? "Important" : "Note"}
              </AlertTitle>
              <AlertDescription>
                {severity === "critical" 
                  ? "This setting can significantly impact system performance."
                  : "Consider reviewing documentation before changing this setting."
                }
              </AlertDescription>
            </Alert>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default HelpTip;
