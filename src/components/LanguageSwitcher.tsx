
import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();
  const { themeVariant } = useTheme();
  
  const getFlagEmoji = (languageCode: Language) => {
    const flags: Record<Language, string> = {
      en: "🇬🇧",
      es: "🇪🇸",
      fr: "🇫🇷",
      de: "🇩🇪",
      sv: "🇸🇪"
    };
    return flags[languageCode];
  };
  
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
      <DropdownMenuContent align="end" className="w-[150px] bg-popover">
        <DropdownMenuLabel>{t("label.language")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={() => setLanguage("en")}
          className={`hover:bg-accent hover:text-accent-foreground ${language === "en" ? "bg-accent text-accent-foreground" : ""}`}
        >
          <span className="mr-2">{getFlagEmoji("en")}</span>
          <span>{t("language.en")}</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => setLanguage("es")}
          className={`hover:bg-accent hover:text-accent-foreground ${language === "es" ? "bg-accent text-accent-foreground" : ""}`}
        >
          <span className="mr-2">{getFlagEmoji("es")}</span>
          <span>{t("language.es")}</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => setLanguage("fr")}
          className={`hover:bg-accent hover:text-accent-foreground ${language === "fr" ? "bg-accent text-accent-foreground" : ""}`}
        >
          <span className="mr-2">{getFlagEmoji("fr")}</span>
          <span>{t("language.fr")}</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => setLanguage("de")}
          className={`hover:bg-accent hover:text-accent-foreground ${language === "de" ? "bg-accent text-accent-foreground" : ""}`}
        >
          <span className="mr-2">{getFlagEmoji("de")}</span>
          <span>{t("language.de")}</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => setLanguage("sv")}
          className={`hover:bg-accent hover:text-accent-foreground ${language === "sv" ? "bg-accent text-accent-foreground" : ""}`}
        >
          <span className="mr-2">{getFlagEmoji("sv")}</span>
          <span>{t("language.sv")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
