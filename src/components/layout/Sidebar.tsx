
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useDashboard } from "@/contexts/dashboard/useDashboard";
import SidebarHeader from "./SidebarHeader";
import SidebarNav from "./SidebarNav";

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  links?: {
    title: string;
    href: string;
    icon: React.ReactNode;
    pro?: boolean;
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

  const sidebarClass = cn(
    "bg-sidebar-background border-r border-border flex flex-col transition-all duration-300 z-30 h-screen",
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
      <SidebarHeader
        isCollapsed={isCollapsed}
        isLocked={isLocked}
        toggleSidebar={toggleSidebar}
        toggleLock={toggleLock}
      />
      <SidebarNav
        isCollapsed={isCollapsed}
        pricingTier={dashboard?.pricingTier}
        links={links}
      />
    </aside>
  );
};
