
import React from "react";
import { useLocation } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import SidebarItem from "./SidebarItem";
import { LucideIcon } from "lucide-react";

interface SidebarNavProps {
  isCollapsed: boolean;
  pricingTier?: string;
  className?: string;
  links?: {
    name: string;
    href: string;
    icon: LucideIcon;
    isPro?: boolean;
    isAdmin?: boolean;
  }[];
}

const SidebarNav: React.FC<SidebarNavProps> = ({ 
  isCollapsed, 
  pricingTier = "free",
  links = [],
  className = ""
}) => {
  const location = useLocation();
  
  return (
    <ScrollArea className={`flex-1 overflow-auto ${className}`}>
      <nav className="p-2">
        <ul className="space-y-1">
          {links.map((link, i) => {
            const isActive = location.pathname === link.href;
            
            return (
              <SidebarItem
                key={i}
                title={link.name}
                href={link.href}
                icon={<link.icon className="w-5 h-5" />}
                isActive={isActive}
                isCollapsed={isCollapsed}
                isPro={link.isPro}
                pricingTier={pricingTier}
              />
            );
          })}
        </ul>
      </nav>
    </ScrollArea>
  );
};

export default SidebarNav;
