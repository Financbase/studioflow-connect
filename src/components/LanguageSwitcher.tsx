
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
import { Language } from "@/contexts/language";
import { flagEmojis } from "@/contexts/language";
import { languageNames } from "@/contexts/language";
import { useTheme } from "@/contexts/ThemeContext";
import { ScrollArea } from "@/components/ui/scroll-area";

const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();
  const { themeVariant } = useTheme();
  
  // Dispatch custom event when language changes
  useEffect(() => {
    const event = new CustomEvent("languageChange", { detail: { language } });
    window.dispatchEvent(event);
  }, [language]);
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{t("label.language")}</span>
          <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
            {language.toUpperCase()}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={`w-[180px] bg-popover text-popover-foreground ${themeVariant === "windows" ? "rounded-none" : ""}`}>
        <DropdownMenuLabel className="text-foreground flex items-center gap-2">
          <Languages className="h-4 w-4" />
          <span>{t("label.language")}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <ScrollArea className="h-[280px]">
          <DropdownMenuGroup>
            {Object.keys(flagEmojis).map((langCode) => {
              const lang = langCode as Language;
              return (
                <DropdownMenuItem 
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`hover:bg-accent hover:text-accent-foreground text-foreground ${language === lang ? "bg-accent text-accent-foreground" : ""} flex justify-between`}
                >
                  <div className="flex items-center">
                    <span className="mr-2">{flagEmojis[lang]}</span>
                    <span>{languageNames[lang][language]}</span>
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
