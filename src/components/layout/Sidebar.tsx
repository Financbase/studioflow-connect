
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import SidebarHeader from "./SidebarHeader";
import SidebarNav from "./SidebarNav";
import { useIsMobile } from "@/hooks/use-mobile";
import { X, Menu, Home, Music, Book, Users, Settings, BarChart2, Headphones, Share2, Sparkles } from "lucide-react";
import { useDashboard } from "@/contexts/dashboard/useDashboard";
import { Button } from "@/components/ui/button";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const { pricingTier } = useDashboard();

  // Force sidebar to be open on desktop and closed on mobile by default
  useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);

  // Close sidebar when navigating on mobile
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [location.pathname, isMobile]);

  // Toggle sidebar open/closed
  const toggleSidebar = () => {
    if (!isLocked || isMobile) {
      setIsOpen(!isOpen);
    }
  };

  // Toggle sidebar lock state
  const toggleLock = () => {
    setIsLocked(!isLocked);
  };

  const sidebarItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Projects", href: "/projects", icon: Music },
    { name: "Library", href: "/library", icon: Headphones },
    { name: "Connect", href: "/connect", icon: Share2 },
    { name: "AI Tools", href: "/ai-tools", icon: Sparkles, isPro: true },
    { name: "Documentation", href: "/docs", icon: Book },
    { name: "Support", href: "/support", icon: Users },
  ];

  const bottomItems = [
    { name: "Admin", href: "/admin", icon: BarChart2, isAdmin: true },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  // Filter pro items if user doesn't have pro
  const filteredSidebarItems = sidebarItems.filter(
    item => !item.isPro || (pricingTier === "pro" || pricingTier === "enterprise")
  );

  // Only show admin link if user is admin
  const filteredBottomItems = bottomItems.filter(
    item => !item.isAdmin || (pricingTier === "pro" || pricingTier === "enterprise")
  );

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar Overlay */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed z-40 flex h-full flex-col overflow-y-auto border-r bg-card pb-4 transition-all duration-300 dark:bg-card",
          isOpen ? "w-64" : "w-0 md:w-16",
          isMobile && !isOpen ? "-translate-x-full" : "translate-x-0"
        )}
      >
        <SidebarHeader 
          isCollapsed={!isOpen} 
          isLocked={isLocked}
          toggleSidebar={toggleSidebar}
          toggleLock={toggleLock}
        />

        <div className="flex flex-col justify-between h-full">
          <SidebarNav 
            links={filteredSidebarItems} 
            isCollapsed={!isOpen} 
            className="px-2 py-2"
            pricingTier={pricingTier}
          />
          
          <SidebarNav 
            links={filteredBottomItems} 
            isCollapsed={!isOpen} 
            className="px-2 mt-auto"
            pricingTier={pricingTier}
          />
        </div>
      </aside>

      {/* Mobile Sidebar Toggle */}
      {isMobile && (
        <Button
          className="fixed bottom-4 right-4 z-50 rounded-full shadow-md h-12 w-12 p-0"
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          variant="default"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      )}

      {/* Main Content */}
      <div
        className={cn(
          "flex flex-col flex-1 transition-all duration-300",
          isOpen ? "md:ml-64" : "md:ml-16"
        )}
      >
        {children}
      </div>
    </div>
  );
};
