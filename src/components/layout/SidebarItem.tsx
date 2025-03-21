
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

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
  
  return (
    <li>
      <Link
        to={href}
        className={cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
          isActive
            ? "bg-sidebar-highlight text-foreground font-medium"
            : "text-muted-foreground hover:bg-sidebar-highlight/50 hover:text-foreground",
          isFeatureLocked && "opacity-50"
        )}
        onClick={(e) => isFeatureLocked && e.preventDefault()}
      >
        {icon}
        {!isCollapsed && (
          <span>{title}</span>
        )}
        {!isCollapsed && isFeatureLocked && (
          <svg
            className="ml-auto h-4 w-4 opacity-70"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
          </svg>
        )}
      </Link>
    </li>
  );
};

export default SidebarItem;
