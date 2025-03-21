
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarHeaderProps {
  isCollapsed: boolean;
  isLocked: boolean;
  toggleSidebar: () => void;
  toggleLock: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  isCollapsed,
  isLocked,
  toggleSidebar,
  toggleLock,
}) => {
  return (
    <div className="p-4 border-b border-border flex items-center justify-between h-14">
      {!isCollapsed && (
        <Link to="/" className="font-semibold text-lg tracking-tight">
          StudioFlow
        </Link>
      )}
      <div className="flex items-center gap-1 ml-auto">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleLock}
          className="h-8 w-8"
          title={isLocked ? "Unlock Sidebar" : "Lock Sidebar"}
        >
          <span className={cn(
            "w-2 h-2 rounded-full", 
            isLocked ? "bg-green-500" : "bg-muted-foreground"
          )}></span>
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="h-8 w-8"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default SidebarHeader;
