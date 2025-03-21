
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Paintbrush, Monitor, Wind, Layers, Lock, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useDashboard } from "@/contexts/dashboard/useDashboard";
import { toast } from "@/components/ui/use-toast";

const ThemeSwitcher = () => {
  const { themeVariant, setThemeVariant, isDarkMode, toggleDarkMode, theme, setTheme } = useTheme();
  const { pricingTier } = useDashboard();
  
  const handleThemeChange = (theme: "modern" | "legacy" | "classic" | "windows") => {
    if (theme !== "modern" && pricingTier !== "pro" && pricingTier !== "enterprise") {
      toast({
        title: "Pro Feature",
        description: "Additional UI themes are available with Pro and Enterprise plans",
        variant: "destructive"
      });
      return;
    }
    
    setThemeVariant(theme);
  };
  
  const handleThemeModeChange = (mode: "dark" | "light") => {
    setTheme(mode);
  };
  
  const getThemeIcon = () => {
    switch (themeVariant) {
      case "legacy": return <Layers className="h-[1.2rem] w-[1.2rem]" />;
      case "classic": return <Monitor className="h-[1.2rem] w-[1.2rem]" />;
      case "windows": return <Wind className="h-[1.2rem] w-[1.2rem]" />;
      default: return <Paintbrush className="h-[1.2rem] w-[1.2rem]" />;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              {getThemeIcon()}
              <span className="sr-only">Change UI Theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuLabel>UI Theme</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuItem 
              onClick={() => handleThemeChange("modern")}
              className={themeVariant === "modern" ? "bg-accent text-accent-foreground" : ""}
            >
              <Paintbrush className="mr-2 h-4 w-4" />
              <span>Modern</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem 
              onClick={() => handleThemeChange("legacy")}
              className={themeVariant === "legacy" ? "bg-accent text-accent-foreground" : ""}
              disabled={pricingTier !== "pro" && pricingTier !== "enterprise"}
            >
              <Layers className="mr-2 h-4 w-4" />
              <span>Legacy</span>
              {pricingTier !== "pro" && pricingTier !== "enterprise" && <Lock className="ml-auto h-3 w-3" />}
            </DropdownMenuItem>
            
            <DropdownMenuItem 
              onClick={() => handleThemeChange("classic")}
              className={themeVariant === "classic" ? "bg-accent text-accent-foreground" : ""}
              disabled={pricingTier !== "pro" && pricingTier !== "enterprise"}
            >
              <Monitor className="mr-2 h-4 w-4" />
              <span>Classic</span>
              {pricingTier !== "pro" && pricingTier !== "enterprise" && <Lock className="ml-auto h-3 w-3" />}
            </DropdownMenuItem>
            
            <DropdownMenuItem 
              onClick={() => handleThemeChange("windows")}
              className={themeVariant === "windows" ? "bg-accent text-accent-foreground" : ""}
              disabled={pricingTier !== "pro" && pricingTier !== "enterprise"}
            >
              <Wind className="mr-2 h-4 w-4" />
              <span>Windows</span>
              {pricingTier !== "pro" && pricingTier !== "enterprise" && <Lock className="ml-auto h-3 w-3" />}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              {isDarkMode ? (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
              )}
              <span className="sr-only">Toggle dark mode</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleThemeModeChange("light")} className={!isDarkMode ? "bg-accent text-accent-foreground" : ""}>
              <Sun className="mr-2 h-4 w-4" />
              <span>Light</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleThemeModeChange("dark")} className={isDarkMode ? "bg-accent text-accent-foreground" : ""}>
              <Moon className="mr-2 h-4 w-4" />
              <span>Dark</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="text-sm text-muted-foreground">
        {themeVariant.charAt(0).toUpperCase() + themeVariant.slice(1)} • {isDarkMode ? "Dark" : "Light"}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
