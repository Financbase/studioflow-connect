
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
import { HelpCircle, AlertTriangle, Info, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

type HelpSeverity = "info" | "warning" | "critical";

interface HelpProps {
  title: string;
  content: string | React.ReactNode;
  size?: "small" | "large";
  severity?: HelpSeverity;
  className?: string;
  sectionId?: string;
}

export const HelpTip = ({ 
  title, 
  content, 
  size = "small", 
  severity = "info", 
  className,
  sectionId 
}: HelpProps) => {
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
        <HoverCardContent side="right" align="start" className="w-80 z-50 p-4">
          <div className="flex justify-between space-x-4">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">{title}</h4>
              <div className="text-sm text-muted-foreground">
                {content}
              </div>
              {sectionId && (
                <div className="mt-2 pt-2 border-t">
                  <Link 
                    to={`/docs#${sectionId}`} 
                    className="flex items-center text-xs text-primary hover:underline"
                  >
                    <BookOpen className="h-3 w-3 mr-1" />
                    Read full documentation
                  </Link>
                </div>
              )}
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
      <PopoverContent className="w-80 z-50 p-4">
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
          {sectionId && (
            <div className="mt-3 pt-2 border-t">
              <Link 
                to={`/docs#${sectionId}`} 
                className="flex items-center text-sm text-primary hover:underline"
              >
                <BookOpen className="h-4 w-4 mr-1" />
                View detailed documentation
              </Link>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default HelpTip;
