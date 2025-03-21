import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Shield } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SidebarItemProps {
  title: string;
  href: string;
  icon: React.ReactNode;
  isActive: boolean;
  isCollapsed: boolean;
  isPro?: boolean;
  isLocked?: boolean;
  pricingTier?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  title,
  href,
  icon,
  isActive,
  isCollapsed,
  isPro = false,
  isLocked = false,
  pricingTier = "free"
}) => {
  // Check if feature is locked by pricing tier
  const isFeatureLocked = isPro && pricingTier !== 'pro' && pricingTier !== 'enterprise';
  
  const itemContent = (
    <>
      <span className="flex-shrink-0">{icon}</span>
      {!isCollapsed && (
        <span className="truncate">{title}</span>
      )}
      {!isCollapsed && isFeatureLocked && (
        <Shield className="ml-auto h-4 w-4 text-muted-foreground" />
      )}
    </>
  );
  
  // Base styles for the item
  const itemStyles = cn(
    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors relative overflow-hidden",
    isActive
      ? "bg-sidebar-highlight text-sidebar-highlight-foreground font-medium before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-primary"
      : "text-muted-foreground hover:bg-sidebar-highlight/50 hover:text-foreground",
    isFeatureLocked && "opacity-70"
  );
  
  // If the sidebar is collapsed, wrap the item in a tooltip
  if (isCollapsed) {
    return (
      <li data-sidebar="item" className={isActive ? 'active' : ''}>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to={href}
                className={itemStyles}
                onClick={(e) => isFeatureLocked && e.preventDefault()}
              >
                {itemContent}
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-2">
              {title}
              {isFeatureLocked && <Shield className="h-3 w-3 text-muted-foreground" />}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </li>
    );
  }
  
  // Otherwise, just render the item
  return (
    <li data-sidebar="item" className={isActive ? 'active' : ''}>
      <Link
        to={href}
        className={itemStyles}
        onClick={(e) => isFeatureLocked && e.preventDefault()}
      >
        {itemContent}
      </Link>
    </li>
  );
};

export default SidebarItem;
