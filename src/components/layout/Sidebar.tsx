import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "@/contexts/ThemeContext";
import { useDashboard } from "@/contexts/dashboard/useDashboard";
import { 
  LayoutDashboard, PlugZap, Headphones, 
  Settings, Package, MessageSquare, HelpCircle,
  ChevronLeft, ChevronRight, CreditCard,
  Lightbulb, Home, Component
} from "lucide-react";

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  links?: {
    title: string;
    href: string;
    icon: React.ReactNode;
    submenu?: { title: string; href: string }[];
  }[];
  children?: React.ReactNode;
}

export const SidebarLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
};

export const Sidebar = ({ className, links, ...props }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const location = useLocation();
  const { themeVariant } = useTheme();
  const dashboard = useDashboard();
  
  // Load sidebar state from localStorage on component mount
  useEffect(() => {
    const savedCollapsed = localStorage.getItem("sidebar_collapsed");
    const savedLocked = localStorage.getItem("sidebar_locked");
    
    if (savedCollapsed !== null) {
      setIsCollapsed(savedCollapsed === "true");
    }
    
    if (savedLocked !== null) {
      setIsLocked(savedLocked === "true");
    }
  }, []);
  
  // Update localStorage when sidebar state changes
  useEffect(() => {
    localStorage.setItem("sidebar_collapsed", isCollapsed.toString());
    localStorage.setItem("sidebar_locked", isLocked.toString());
  }, [isCollapsed, isLocked]);
  
  const toggleSidebar = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    localStorage.setItem("sidebar_collapsed", newCollapsedState.toString());
  };
  
  const toggleLock = () => {
    const newLockedState = !isLocked;
    setIsLocked(newLockedState);
    localStorage.setItem("sidebar_locked", newLockedState.toString());
  };

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
  
  const sidebarClass = cn(
    "bg-background border-r border-border flex flex-col transition-all duration-300 z-30 h-screen",
    {
      "w-64": !isCollapsed,
      "w-16": isCollapsed,
      "fixed md:relative top-0 left-0": isLocked,
      "fixed top-0 left-0 transform transition-transform": !isLocked,
      "-translate-x-full": !isLocked && isCollapsed,
      "translate-x-0": !isLocked && !isCollapsed
    },
    className
  );

  return (
    <aside className={sidebarClass} {...props}>
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
            <span className={`w-2 h-2 rounded-full ${isLocked ? 'bg-green-500' : 'bg-muted-foreground'}`}></span>
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
      <ScrollArea className="flex-1 overflow-auto">
        <nav className="p-2">
          <ul className="space-y-1">
            {sidebarLinks.map((link, i) => {
              const isActive = location.pathname === link.href;
              
              // Check if feature is locked by pricing tier
              const isLocked = link.pro && dashboard?.pricingTier !== 'pro' && dashboard?.pricingTier !== 'enterprise';
              
              return (
                <li key={i}>
                  <Link
                    to={link.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                      isActive
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground",
                      isLocked && "opacity-50"
                    )}
                    onClick={(e) => isLocked && e.preventDefault()}
                  >
                    {link.icon}
                    {!isCollapsed && (
                      <span>{link.title}</span>
                    )}
                    {!isCollapsed && isLocked && link.pro && dashboard?.pricingTier !== 'pro' && dashboard?.pricingTier !== 'enterprise' && (
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
            })}
          </ul>
        </nav>
      </ScrollArea>
    </aside>
  );
};
