
import React from "react";
import { useLocation } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import SidebarItem from "./SidebarItem";
import { 
  LayoutDashboard, PlugZap, Headphones, 
  Settings, Package, MessageSquare, HelpCircle,
  CreditCard, Lightbulb, Home, Component
} from "lucide-react";

interface SidebarNavProps {
  isCollapsed: boolean;
  pricingTier?: string;
  links?: {
    title: string;
    href: string;
    icon: React.ReactNode;
    pro?: boolean;
    submenu?: { title: string; href: string }[];
  }[];
}

const SidebarNav: React.FC<SidebarNavProps> = ({ 
  isCollapsed, 
  pricingTier = "free",
  links 
}) => {
  const location = useLocation();
  
  const defaultLinks = [
    {
      title: "Home",
      href: "/",
      icon: <Home className="w-5 h-5" />,
    },
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      title: "StudioFlow Connect",
      href: "/connect",
      icon: <PlugZap className="w-5 h-5" />,
    },
    {
      title: "Library",
      href: "/library",
      icon: <Headphones className="w-5 h-5" />,
    },
    {
      title: "AI Tools",
      href: "/ai-tools",
      icon: <Lightbulb className="w-5 h-5" />,
      pro: true,
    },
    {
      title: "Subscription",
      href: "/subscription",
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      title: "Recommendations",
      href: "/recommendations",
      icon: <MessageSquare className="w-5 h-5" />,
    },
    {
      title: "Contribution",
      href: "/contribution",
      icon: <Package className="w-5 h-5" />,
    },
    {
      title: "Documentation",
      href: "/docs",
      icon: <HelpCircle className="w-5 h-5" />,
    },
    {
      title: "Support",
      href: "/support",
      icon: <Component className="w-5 h-5" />,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  const sidebarLinks = links || defaultLinks;

  return (
    <ScrollArea className="flex-1 overflow-auto">
      <nav className="p-2">
        <ul className="space-y-1">
          {sidebarLinks.map((link, i) => {
            const isActive = location.pathname === link.href;
            
            return (
              <SidebarItem
                key={i}
                title={link.title}
                href={link.href}
                icon={link.icon}
                isActive={isActive}
                isCollapsed={isCollapsed}
                isPro={link.pro}
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
