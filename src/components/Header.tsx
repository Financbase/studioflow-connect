
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDashboard } from "@/contexts/DashboardContext";
import { useAuth } from "@/hooks/use-auth";
import { MusicIcon } from "lucide-react";
import PlanSwitcher from "@/components/PlanSwitcher";
import CustomLayoutEditor from "@/components/CustomLayoutEditor";
import { useResponsive } from "@/hooks/use-mobile";
import NavLinks from "./header/NavLinks";
import UserMenu from "./header/UserMenu";
import MobileMenu from "./header/MobileMenu";

const Header = () => {
  const { themeVariant } = useTheme();
  const { t, setLanguage, currentLanguage } = useLanguage();
  const { user, profile, signOut, isAuthenticated } = useAuth();
  const { pricingTier, setPricingTier } = useDashboard();
  const { isMobile } = useResponsive();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Check if user has admin privileges
  const isAdmin = profile?.username === "admin" || user?.email?.includes("admin");
  
  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  // Type-safe language selection handler
  const handleLanguageChange = (lang: string) => {
    if (lang === "en" || lang === "es" || lang === "fr" || lang === "de" || lang === "sv") {
      setLanguage(lang);
    }
  };
  
  return (
    <header className={`sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${themeVariant === "windows" ? "border-b-2" : ""}`}>
      <div className="container flex h-14 items-center">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <MusicIcon className="h-5 w-5 text-primary" />
          <span className="hidden md:inline-block">StudioFlow</span>
        </Link>
        
        {isAuthenticated && !isMobile && (
          <NavLinks isAdmin={isAdmin} t={t} />
        )}
        
        <div className="flex flex-1 items-center justify-end gap-2">
          {isAuthenticated && !isMobile && (
            <>
              <PlanSwitcher currentPlan={pricingTier} onPlanChange={setPricingTier} />
              <CustomLayoutEditor />
            </>
          )}
          
          <ModeToggle />
          
          {isAuthenticated ? (
            <>
              {isMobile ? (
                <MobileMenu 
                  isOpen={mobileMenuOpen}
                  onOpenChange={setMobileMenuOpen}
                  user={user}
                  profile={profile}
                  isAdmin={isAdmin}
                  onSignOut={handleSignOut}
                  pricingTier={pricingTier}
                  setPricingTier={setPricingTier}
                  t={t}
                />
              ) : (
                <UserMenu 
                  user={user}
                  profile={profile}
                  isAdmin={isAdmin}
                  onSignOut={handleSignOut}
                  t={t}
                  currentLanguage={currentLanguage}
                  onLanguageChange={handleLanguageChange}
                />
              )}
            </>
          ) : (
            <Button size="sm" onClick={() => navigate("/auth")}>
              {t("auth.signin")}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
