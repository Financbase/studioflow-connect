
import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Languages, Check } from "lucide-react";
import { useLanguage } from "@/contexts/language";
import { Language } from "@/contexts/language/types";
import { flagEmojis } from "@/contexts/language/utils";
import { languageNames } from "@/contexts/language/translations";
import { useTheme } from "@/contexts/ThemeContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";

const LanguageSwitcher = () => {
  const { language, setLanguage, t, isInitialized } = useLanguage();
  const { themeVariant } = useTheme();
  
  // Dispatch custom event when language changes
  useEffect(() => {
    const event = new CustomEvent("languageChange", { detail: { language } });
    window.dispatchEvent(event);
    
    // Debug language changes
    console.log(`Language switched to ${language} (component notification)`);
  }, [language]);
  
  // Debug logging when component mounts
  useEffect(() => {
    console.log("LanguageSwitcher mounted, current language:", language);
    console.log("Language provider initialized:", isInitialized);
  }, [language, isInitialized]);
  
  const handleLanguageChange = (lang: Language) => {
    console.log(`Switching language from ${language} to ${lang}`);
    
    // Notify in console before change
    console.log("Available translations before switch:", Object.keys(languageNames).length);
    
    setLanguage(lang);
    
    // Show custom toast with debugging info
    toast({
      title: "Language Updated",
      description: `Switched to ${lang.toUpperCase()} (${isInitialized ? 'Initialized' : 'Not initialized'})`,
    });
    
    // Force a refresh if needed (comment out if not needed)
    // window.location.reload();
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{isInitialized ? t("label.language") : "Language"}</span>
          <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
            {language.toUpperCase()}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={`w-[180px] bg-popover text-popover-foreground ${themeVariant === "windows" ? "rounded-none" : ""}`}>
        <DropdownMenuLabel className="text-foreground flex items-center gap-2">
          <Languages className="h-4 w-4" />
          <span>{isInitialized ? t("label.language") : "Language"}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <ScrollArea className="h-[280px]">
          <DropdownMenuGroup>
            {Object.keys(flagEmojis).map((langCode) => {
              const lang = langCode as Language;
              const langDisplayName = isInitialized && languageNames[lang] && languageNames[lang][language] 
                ? languageNames[lang][language] 
                : lang.toUpperCase();
                
              return (
                <DropdownMenuItem 
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`hover:bg-accent hover:text-accent-foreground text-foreground ${language === lang ? "bg-accent text-accent-foreground" : ""} flex justify-between`}
                >
                  <div className="flex items-center">
                    <span className="mr-2">{flagEmojis[lang]}</span>
                    <span>{langDisplayName}</span>
                  </div>
                  {language === lang && <Check className="h-4 w-4" />}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuGroup>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
