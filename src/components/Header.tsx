
import React, { useState } from "react";
import { MusicIcon, Sliders, Menu, HelpCircle, BookOpen } from "lucide-react";
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
import ThemeSwitcher from "@/components/ThemeSwitcher";
import HelpTip from "@/components/HelpSystem";
import { useTheme } from "@/contexts/ThemeContext";
import { Link } from "react-router-dom";

const Header = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { viewMode, pricingTier, setViewMode, setPricingTier } = useDashboard();
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md transition-all duration-200">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <MusicIcon className="h-6 w-6 text-primary animate-pulse-soft" />
          <span className="text-lg font-semibold tracking-tight">Music Suite Pro</span>
          <HelpTip 
            title="Welcome to StudioFlow X"
            content={
              <div className="space-y-2">
                <p>This unified platform helps you manage multiple DAWs, plugins, and creative tools.</p>
                <p>Navigate using the section tabs below or customize your view from the header controls.</p>
                <Link to="/docs" className="flex items-center text-primary hover:underline mt-2">
                  <BookOpen className="h-3 w-3 mr-1" />
                  View full documentation
                </Link>
              </div>
            }
            size="small"
            className="ml-2"
          />
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
            
            {pricingTier === "pro" && <ThemeSwitcher />}
            
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
              {isDarkMode ? 
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[1.2rem] w-[1.2rem]"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg> : 
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[1.2rem] w-[1.2rem]"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
              }
              <span className="sr-only">Toggle theme</span>
            </Button>
            
            <Link to="/docs">
              <Button variant="outline" size="sm" className="gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Documentation</span>
              </Button>
            </Link>
            
            <HelpTip
              title="Need Help?"
              content={
                <div className="space-y-2">
                  <p>Get assistance with any feature in StudioFlow X:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Look for help icons (<HelpCircle className="inline h-3 w-3" />) near features</li>
                    <li>Visit our documentation for detailed guides</li>
                    <li>Contact support for personalized assistance</li>
                  </ul>
                </div>
              }
              size="small"
              className="ml-1"
            />
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
              
              {pricingTier === "pro" && (
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium">UI Theme</span>
                  <ThemeSwitcher />
                </div>
              )}
              
              {viewMode === "custom" && pricingTier === "pro" && (
                <div className="py-2">
                  <CustomLayoutEditor />
                </div>
              )}
              
              <Link to="/docs" className="text-sm font-medium py-2 transition-colors hover:text-primary flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Documentation
              </Link>
              
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
                  {isDarkMode ? 
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg> : 
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                  }
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
