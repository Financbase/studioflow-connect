
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
import { Paintbrush, Monitor, Wind, Layers, Lock } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useDashboard } from "@/contexts/DashboardContext";
import { toast } from "@/components/ui/use-toast";

const ThemeSwitcher = () => {
  const { themeVariant, setThemeVariant } = useTheme();
  const { pricingTier } = useDashboard();
  
  const handleThemeChange = (theme: "modern" | "legacy" | "classic" | "windows") => {
    if (pricingTier !== "pro") {
      toast({
        title: "Pro Feature",
        description: "UI themes are available with the Pro plan",
        variant: "destructive"
      });
      return;
    }
    
    setThemeVariant(theme);
    toast({
      title: "Theme Updated",
      description: `UI theme changed to ${theme.charAt(0).toUpperCase() + theme.slice(1)}`,
    });
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
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
          disabled={pricingTier !== "pro"}
        >
          <Layers className="mr-2 h-4 w-4" />
          <span>Legacy</span>
          {pricingTier !== "pro" && <Lock className="ml-auto h-3 w-3" />}
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => handleThemeChange("classic")}
          className={themeVariant === "classic" ? "bg-accent text-accent-foreground" : ""}
          disabled={pricingTier !== "pro"}
        >
          <Monitor className="mr-2 h-4 w-4" />
          <span>Classic</span>
          {pricingTier !== "pro" && <Lock className="ml-auto h-3 w-3" />}
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => handleThemeChange("windows")}
          className={themeVariant === "windows" ? "bg-accent text-accent-foreground" : ""}
          disabled={pricingTier !== "pro"}
        >
          <Wind className="mr-2 h-4 w-4" />
          <span>Windows</span>
          {pricingTier !== "pro" && <Lock className="ml-auto h-3 w-3" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitcher;
