
import React, { useState, useEffect } from "react";
import { MusicIcon, Sliders, Moon, Sun, LucideHelpCircle, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import ViewSelector from "@/components/ViewSelector";
import PlanSwitcher from "@/components/PlanSwitcher";
import CustomLayoutEditor from "@/components/CustomLayoutEditor";
import { useDashboard } from "@/contexts/DashboardContext";

const Header = () => {
  const [darkMode, setDarkMode] = useState(true);
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { viewMode, pricingTier, setViewMode, setPricingTier } = useDashboard();

  // Initialize dark mode from localStorage or based on user preference
  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark" || 
      (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md transition-all duration-200">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <MusicIcon className="h-6 w-6 text-primary animate-pulse-soft" />
          <span className="text-lg font-semibold tracking-tight">Music Suite Pro</span>
        </div>

        {isMobile ? (
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
        ) : (
          <div className="flex items-center gap-5">
            <ViewSelector />
            
            {viewMode === "custom" && pricingTier === "pro" && (
              <CustomLayoutEditor />
            )}
            
            <PlanSwitcher 
              currentPlan={pricingTier}
              onPlanChange={(plan) => {
                setPricingTier(plan);
              }}
            />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sliders className="h-[1.2rem] w-[1.2rem]" />
                  <span className="sr-only">Options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px] animate-fade-in">
                <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Batch Process</DropdownMenuItem>
                <DropdownMenuItem>AI Tools</DropdownMenuItem>
                <DropdownMenuItem>VM Management</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {darkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
            
            <Button variant="ghost" size="icon">
              <LucideHelpCircle className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Help</span>
            </Button>
          </div>
        )}
        
        {isMobile && isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b border-border animate-slide-in">
            <nav className="flex flex-col p-4 gap-4">
              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-medium">Dashboard View</span>
                <ViewSelector />
              </div>
              
              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-medium">Plan</span>
                <PlanSwitcher 
                  currentPlan={pricingTier}
                  onPlanChange={(plan) => {
                    setPricingTier(plan);
                  }}
                />
              </div>
              
              {viewMode === "custom" && pricingTier === "pro" && (
                <div className="py-2">
                  <CustomLayoutEditor />
                </div>
              )}
              
              <a href="#system" className="text-sm font-medium py-2 transition-colors hover:text-primary">
                System
              </a>
              <a href="#audio" className="text-sm font-medium py-2 transition-colors hover:text-primary">
                Audio Analysis
              </a>
              <a href="#ai-tools" className="text-sm font-medium py-2 transition-colors hover:text-primary">
                AI Tools
              </a>
              <a href="#vm-controller" className="text-sm font-medium py-2 transition-colors hover:text-primary">
                VM Controller
              </a>
              <div className="flex items-center justify-between border-t border-border pt-3">
                <span className="text-sm font-medium">Dark Mode</span>
                <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
