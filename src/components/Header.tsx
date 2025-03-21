
import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";
import { useZenMode } from "@/hooks/use-zen-mode";
import ZenModeToggle from "./header/ZenModeToggle";
import UserMenu from "./header/UserMenu";
import NavLinks from "./header/NavLinks";
import MobileMenu from "./header/MobileMenu";
import { useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  // Use the correct property names from useZenMode hook
  const { isActive, toggle } = useZenMode();

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

  return (
    <header className="border-b z-10 bg-background">
      <div className="flex h-16 items-center px-4">
        <div className="flex gap-2 items-center">
          <span className="text-xl font-bold">StudioFlow</span>
        </div>
        
        {/* Navigation Links */}
        {!isMobile && <NavLinks />}
        
        <div className="ml-auto flex items-center space-x-2">
          {/* Use the correct property names for zen mode */}
          <ZenModeToggle onClick={toggle} isActive={isActive} />
          <ThemeSwitcher />
          <LanguageSwitcher />
          
          {/* User Menu Section */}
          <UserMenu />
          
          {/* Mobile Menu Button (visible on small screens) */}
          {isMobile && <MobileMenu />}
        </div>
      </div>
    </header>
  );
};

export default Header;
