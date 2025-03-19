
import React, { useState } from "react";
import { MusicIcon, Sliders, Menu, HelpCircle, BookOpen, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
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
  const { themeVariant } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md transition-all duration-200">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <MusicIcon className="h-6 w-6 text-primary animate-pulse-soft" />
            <span className="text-lg font-semibold tracking-tight max-w-[140px] truncate">{t("dashboard.title")}</span>
          </Link>
          {pricingTier === "pro" && (
            <span className="bg-primary/20 text-primary text-xs font-semibold px-2 py-0.5 rounded-full">
              {t("label.pro")}
            </span>
          )}
          <HelpTip 
            title={t("header.welcome")}
            content={
              <div className="space-y-2">
                <p>{t("help.welcome_description")}</p>
                <p>{t("help.navigation_tip")}</p>
                <Link to="/docs" className="flex items-center text-primary hover:underline mt-2">
                  <BookOpen className="h-3 w-3 mr-1" />
                  {t("help.view_documentation")}
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
          <div className="flex items-center gap-2 md:gap-3">
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
                  <MoreHorizontal className="h-[1.2rem] w-[1.2rem]" />
                  <span className="sr-only">{t("dropdown.more")}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className={`w-[220px] bg-popover text-popover-foreground ${themeVariant === "windows" ? "rounded-none" : ""}`}>
                <DropdownMenuLabel className="text-foreground">{t("dropdown.actions")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <DropdownMenuGroup>
                  <DropdownMenuItem className="hover:bg-accent hover:text-accent-foreground text-foreground">
                    <Sliders className="h-4 w-4 mr-2" />
                    {t("dropdown.quickactions")}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-accent hover:text-accent-foreground text-foreground">
                    {t("dropdown.batchprocess")}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-accent hover:text-accent-foreground text-foreground">
                    {t("dropdown.aitools")}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-accent hover:text-accent-foreground text-foreground">
                    {t("dropdown.vmmanagement")}
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-foreground">{t("dropdown.resources")}</DropdownMenuLabel>
                  <Link to="/docs">
                    <DropdownMenuItem className="hover:bg-accent hover:text-accent-foreground text-foreground">
                      <BookOpen className="h-4 w-4 mr-2" />
                      {t("header.documentation")}
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/terms">
                    <DropdownMenuItem className="hover:bg-accent hover:text-accent-foreground text-foreground">
                      {t("footer.terms")}
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/privacy">
                    <DropdownMenuItem className="hover:bg-accent hover:text-accent-foreground text-foreground">
                      {t("footer.privacy")}
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/contact">
                    <DropdownMenuItem className="hover:bg-accent hover:text-accent-foreground text-foreground">
                      {t("footer.contact")}
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <HelpTip
              title={t("header.need_help")}
              content={
                <div className="space-y-2">
                  <p>{t("help.assistance_description")}</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>{t("help.tip_icons")}</li>
                    <li>{t("help.tip_docs")}</li>
                    <li>{t("help.tip_support")}</li>
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
              
              <Link to="/terms" className="text-sm font-medium py-2 transition-colors hover:text-primary">
                {t("footer.terms")}
              </Link>
              
              <Link to="/privacy" className="text-sm font-medium py-2 transition-colors hover:text-primary">
                {t("footer.privacy")}
              </Link>
              
              <Link to="/contact" className="text-sm font-medium py-2 transition-colors hover:text-primary">
                {t("footer.contact")}
              </Link>
              
              <div className="h-px bg-border my-2"></div>
              
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
