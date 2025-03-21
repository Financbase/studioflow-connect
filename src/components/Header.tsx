import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDashboard } from "@/contexts/dashboard/useDashboard";
import { useAuth } from "@/hooks/use-auth";
import { MusicIcon } from "lucide-react";
import ViewSelector from "@/components/ViewSelector";
import CustomLayoutEditor from "@/components/CustomLayoutEditor";
import { useIsMobile } from "@/hooks/use-mobile";
import NavLinks from "./header/NavLinks";
import UserMenu from "./header/UserMenu";
import MobileMenu from "./header/MobileMenu";
import ZenModeToggle from "./header/ZenModeToggle";
import ZenMode from "./zen/ZenMode";
import { useZenMode, ZenModeOptions } from "@/hooks/use-zen-mode";

const Header = () => {
  const { themeVariant } = useTheme();
  const { t, setLanguage, currentLanguage } = useLanguage();
  const { user, profile, signOut, isAuthenticated } = useAuth();
  const { pricingTier, setPricingTier } = useDashboard();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isZenModeActive, toggleZenMode, options, updateOptions } = useZenMode();
  
  const isAdmin = user?.email?.includes("admin") || 
                 profile?.username === "admin" || 
                 profile?.plan === "pro";
  
  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  const handleLanguageChange = (lang: string) => {
    if (lang === "en" || lang === "es" || lang === "fr" || lang === "de" || lang === "sv") {
      setLanguage(lang);
    }
  };
  
  return (
    <>
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
                <ZenModeToggle onClick={toggleZenMode} isActive={isZenModeActive} />
                <ViewSelector />
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
      
      <ZenMode 
        isActive={isZenModeActive} 
        onToggle={toggleZenMode} 
        options={options}
        onOptionsChange={updateOptions}
      />
    </>
  );
};

export default Header;
