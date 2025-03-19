
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
import LanguageSwitcher from "@/components/LanguageSwitcher";
import HelpTip from "@/components/HelpSystem";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const Header = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { viewMode, pricingTier, setViewMode, setPricingTier } = useDashboard();
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md transition-all duration-200">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <MusicIcon className="h-6 w-6 text-primary animate-pulse-soft" />
          <span className="text-lg font-semibold tracking-tight">{t("dashboard.title")}</span>
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
            
            <LanguageSwitcher />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sliders className="h-[1.2rem] w-[1.2rem]" />
                  <span className="sr-only">{t("dropdown.quickactions")}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px] animate-fade-in">
                <DropdownMenuLabel>{t("dropdown.quickactions")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>{t("dropdown.batchprocess")}</DropdownMenuItem>
                <DropdownMenuItem>{t("dropdown.aitools")}</DropdownMenuItem>
                <DropdownMenuItem>{t("dropdown.vmmanagement")}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link to="/docs">
              <Button variant="outline" size="sm" className="gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">{t("header.documentation")}</span>
              </Button>
            </Link>
            
            <HelpTip
              title={t("header.need_help")}
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
          <div className="absolute top-16 left-0 right-0 bg-background border-b border-border animate-slide-in z-50">
            <nav className="flex flex-col p-4 gap-4">
              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-medium">{t("label.dashboardview")}</span>
                <ViewSelector />
              </div>
              
              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-medium">{t("label.plan")}</span>
                <PlanSwitcher 
                  currentPlan={pricingTier}
                  onPlanChange={(plan) => {
                    setPricingTier(plan);
                  }}
                />
              </div>
              
              {pricingTier === "pro" && (
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium">{t("label.uitheme")}</span>
                  <ThemeSwitcher />
                </div>
              )}
              
              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-medium">{t("label.language")}</span>
                <LanguageSwitcher />
              </div>
              
              {viewMode === "custom" && pricingTier === "pro" && (
                <div className="py-2">
                  <CustomLayoutEditor />
                </div>
              )}
              
              <Link to="/docs" className="text-sm font-medium py-2 transition-colors hover:text-primary flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                {t("header.documentation")}
              </Link>
              
              <a href="#system" className="text-sm font-medium py-2 transition-colors hover:text-primary">
                {t("widget.systemmonitor")}
              </a>
              <a href="#audio" className="text-sm font-medium py-2 transition-colors hover:text-primary">
                {t("widget.audioanalyzer")}
              </a>
              <a href="#ai-tools" className="text-sm font-medium py-2 transition-colors hover:text-primary">
                {t("widget.aitools")}
              </a>
              <a href="#vm-controller" className="text-sm font-medium py-2 transition-colors hover:text-primary">
                {t("widget.vmcontroller")}
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
