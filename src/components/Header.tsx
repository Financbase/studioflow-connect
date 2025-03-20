import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/mode-toggle";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDashboard } from "@/contexts/DashboardContext";
import { useAuth } from "@/hooks/use-auth";
import { MusicIcon, Menu, User, LogOut, Settings, HelpCircle, Languages, Shield } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import PlanSwitcher from "@/components/PlanSwitcher";
import CustomLayoutEditor from "@/components/CustomLayoutEditor";
import { useResponsive } from "@/hooks/use-mobile";

const Header = () => {
  const { themeVariant } = useTheme();
  const { t, setLanguage, currentLanguage } = useLanguage();
  const { user, profile, signOut, isAuthenticated } = useAuth();
  const { pricingTier, setPricingTier, viewMode, setViewMode } = useDashboard();
  const { isMobile } = useResponsive();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Check if user has admin privileges (in a real app, this would check roles)
  const isAdmin = profile?.username === "admin" || user?.email?.includes("admin");
  
  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
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
          <nav className="flex items-center gap-4 ml-6">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
              {t("nav.dashboard")}
            </Link>
            <Link to="/docs" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              {t("nav.docs")}
            </Link>
            {isAdmin && (
              <Link to="/admin" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary flex items-center gap-1">
                <Shield className="h-3.5 w-3.5" />
                {t("nav.admin")}
              </Link>
            )}
          </nav>
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
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="ml-1">
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center gap-2 py-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={profile?.avatar_url || undefined} />
                          <AvatarFallback>{profile?.username?.slice(0, 2).toUpperCase() || "U"}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{profile?.full_name || profile?.username || "User"}</p>
                          <p className="text-xs text-muted-foreground">{user?.email}</p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex flex-col gap-1 py-4">
                        <Link 
                          to="/" 
                          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
                          onClick={closeMobileMenu}
                        >
                          {t("nav.dashboard")}
                        </Link>
                        <Link 
                          to="/docs" 
                          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
                          onClick={closeMobileMenu}
                        >
                          {t("nav.docs")}
                        </Link>
                        {isAdmin && (
                          <Link 
                            to="/admin" 
                            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
                            onClick={closeMobileMenu}
                          >
                            <Shield className="h-4 w-4" />
                            {t("nav.admin")}
                          </Link>
                        )}
                      </div>
                      
                      <Separator />
                      
                      <div className="py-4">
                        <p className="px-3 text-sm font-medium mb-2">{t("settings.title")}</p>
                        <div className="space-y-3 px-3">
                          <PlanSwitcher currentPlan={pricingTier} onPlanChange={setPricingTier} />
                          <CustomLayoutEditor />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="mt-auto py-4">
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start gap-2" 
                          onClick={handleSignOut}
                        >
                          <LogOut className="h-4 w-4" />
                          {t("auth.signout")}
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={profile?.avatar_url || undefined} />
                        <AvatarFallback>{profile?.username?.slice(0, 2).toUpperCase() || "U"}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{profile?.full_name || profile?.username || "User"}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>{t("nav.profile")}</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>{t("nav.settings")}</span>
                      </Link>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link to="/admin" className="cursor-pointer">
                          <Shield className="mr-2 h-4 w-4" />
                          <span>{t("nav.admin")}</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/docs" className="cursor-pointer">
                        <HelpCircle className="mr-2 h-4 w-4" />
                        <span>{t("nav.help")}</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <Languages className="mr-2 h-4 w-4" />
                      <select 
                        value={currentLanguage}
                        onChange={(e) => handleLanguageChange(e.target.value)}
                        className="bg-transparent border-none outline-none w-full cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                        <option value="de">Deutsch</option>
                        <option value="ja">日本語</option>
                      </select>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{t("auth.signout")}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
