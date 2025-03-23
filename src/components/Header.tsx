
import React, { useState } from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";
import { useZenMode } from "@/hooks/use-zen-mode";
import ZenModeToggle from "./header/ZenModeToggle";
import UserMenu from "./header/UserMenu";
import NavLinks from "./header/NavLinks";
import MobileMenu from "./header/MobileMenu";
import { useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/contexts/language";

const Header = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { isActive, toggle } = useZenMode();
  const { user, profile, signOut } = useAuth();
  const { language, setLanguage } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isMounted = React.useRef(false);
  
  React.useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Only show the header if:
  // 1. We're not on the auth page
  // 2. We're not on the index page
  // 3. Zen mode is not active
  
  const isAuthPage = location.pathname === "/auth";
  const isIndexPage = location.pathname === "/";
  
  if (isAuthPage || isIndexPage || isActive) {
    return null;
  }

  // Determine if the user is an admin
  const isAdmin = profile?.plan === 'pro'; // Using plan as a proxy for admin status

  return (
    <header className="border-b z-10 bg-background">
      <div className="flex h-16 items-center px-4">
        <div className="flex gap-2 items-center">
          <span className="text-xl font-bold">StudioFlow</span>
        </div>
        
        {/* Navigation Links */}
        {!isMobile && (
          <NavLinks isAdmin={isAdmin} />
        )}
        
        <div className="ml-auto flex items-center space-x-2">
          {/* Use the correct property from zen mode hook */}
          <ZenModeToggle onClick={toggle} isActive={isActive} />
          <ThemeSwitcher />
          <LanguageSwitcher />
          
          {/* User Menu Section */}
          <UserMenu 
            user={user}
            profile={profile}
            isAdmin={isAdmin}
            onSignOut={signOut}
            currentLanguage={language}
            onLanguageChange={(lang) => setLanguage(lang as any)}
          />
          
          {/* Mobile Menu Button (visible on small screens) */}
          {isMobile && (
            <MobileMenu 
              isOpen={isMobileMenuOpen}
              onOpenChange={setIsMobileMenuOpen}
              user={user}
              profile={profile}
              isAdmin={isAdmin}
              onSignOut={signOut}
              pricingTier={profile?.plan || 'free'}
              setPricingTier={() => {}} // This is a placeholder, ideally should be implemented fully
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
