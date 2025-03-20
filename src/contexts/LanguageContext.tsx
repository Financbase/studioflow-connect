
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

export type Language = "en" | "es" | "fr" | "de" | "sv";

interface LanguageContextType {
  language: Language;
  currentLanguage: Language; // Add this property
  setLanguage: (lang: Language) => void;
  translations: Record<string, Record<Language, string>>;
  t: (key: string) => string;
}

const translations = {
  // Header translations
  "header.documentation": {
    en: "Documentation",
    es: "Documentación",
    fr: "Documentation",
    de: "Dokumentation",
    sv: "Dokumentation"
  },
  "header.need_help": {
    en: "Need Help?",
    es: "¿Necesitas Ayuda?",
    fr: "Besoin d'Aide?",
    de: "Brauchen Sie Hilfe?",
    sv: "Behöver du hjälp?"
  },
  "header.welcome": {
    en: "Welcome to StudioFlow X",
    es: "Bienvenido a StudioFlow X",
    fr: "Bienvenue sur StudioFlow X",
    de: "Willkommen bei StudioFlow X",
    sv: "Välkommen till StudioFlow X"
  },
  
  // Dashboard translations
  "dashboard.title": {
    en: "StudioFlow X",
    es: "StudioFlow X",
    fr: "StudioFlow X",
    de: "StudioFlow X",
    sv: "StudioFlow X"
  },
  "dashboard.subtitle": {
    en: "Unified music production platform for legacy integration, multi-DAW workflows, and creative tools",
    es: "Plataforma unificada de producción musical para integración heredada, flujos de trabajo multi-DAW y herramientas creativas",
    fr: "Plateforme de production musicale unifiée pour l'intégration héritée, les flux de travail multi-DAW et les outils créatifs",
    de: "Einheitliche Musikproduktionsplattform für Legacy-Integration, Multi-DAW-Workflows und kreative Tools",
    sv: "Enhetlig musikproduktionsplattform för legacy-integration, multi-DAW-arbetsflöden och kreativa verktyg"
  },
  
  // Footer translations
  "footer.terms": {
    en: "Terms",
    es: "Términos",
    fr: "Conditions",
    de: "Bedingungen",
    sv: "Villkor"
  },
  "footer.privacy": {
    en: "Privacy",
    es: "Privacidad",
    fr: "Confidentialité",
    de: "Datenschutz",
    sv: "Integritet"
  },
  "footer.contact": {
    en: "Contact",
    es: "Contacto",
    fr: "Contact",
    de: "Kontakt",
    sv: "Kontakt"
  },
  "footer.copyright": {
    en: "© 2024 StudioFlow X. All rights reserved.",
    es: "© 2024 StudioFlow X. Todos los derechos reservados.",
    fr: "© 2024 StudioFlow X. Tous droits réservés.",
    de: "© 2024 StudioFlow X. Alle Rechte vorbehalten.",
    sv: "© 2024 StudioFlow X. Alla rättigheter förbehållna."
  },
  
  // Widget titles
  "widgets.system": {
    en: "StudioFlow System Monitor",
    es: "Monitor del Sistema StudioFlow",
    fr: "Moniteur Système StudioFlow",
    de: "StudioFlow Systemmonitor",
    sv: "StudioFlow Systemövervakning"
  },
  
  // Language names
  "language.en": {
    en: "English",
    es: "Inglés",
    fr: "Anglais",
    de: "Englisch",
    sv: "Engelska"
  },
  "language.es": {
    en: "Spanish",
    es: "Español",
    fr: "Espagnol",
    de: "Spanisch",
    sv: "Spanska"
  },
  "language.fr": {
    en: "French",
    es: "Francés",
    fr: "Français",
    de: "Französisch",
    sv: "Franska"
  },
  "language.de": {
    en: "German",
    es: "Alemán",
    fr: "Allemand",
    de: "Deutsch",
    sv: "Tyska"
  },
  "language.sv": {
    en: "Swedish",
    es: "Sueco",
    fr: "Suédois",
    de: "Schwedisch",
    sv: "Svenska"
  },
  
  // Not Found page
  "notfound.title": {
    en: "Page Not Found",
    es: "Página No Encontrada",
    fr: "Page Non Trouvée",
    de: "Seite Nicht Gefunden",
    sv: "Sidan Hittades Inte"
  },
  "notfound.description": {
    en: "Sorry, the page you are looking for does not exist.",
    es: "Lo sentimos, la página que estás buscando no existe.",
    fr: "Désolé, la page que vous recherchez n'existe pas.",
    de: "Entschuldigung, die gesuchte Seite existiert nicht.",
    sv: "Tyvärr, sidan du letar efter finns inte."
  },
  "notfound.back": {
    en: "Back to Home",
    es: "Volver al Inicio",
    fr: "Retour à l'Accueil",
    de: "Zurück zur Startseite",
    sv: "Tillbaka till Startsidan"
  },
  
  // Documentation page
  "docs.title": {
    en: "Documentation",
    es: "Documentación",
    fr: "Documentation",
    de: "Dokumentation",
    sv: "Dokumentation"
  },
  "docs.description": {
    en: "Learn how to use StudioFlow X to enhance your music production workflow.",
    es: "Aprende a usar StudioFlow X para mejorar tu flujo de trabajo de producción musical.",
    fr: "Apprenez à utiliser StudioFlow X pour améliorer votre flux de travail de production musicale.",
    de: "Lernen Sie, wie Sie StudioFlow X verwenden können, um Ihren Musikproduktions-Workflow zu verbessern.",
    sv: "Lär dig hur du använder StudioFlow X för att förbättra ditt musikproduktionsarbetsflöde."
  },
  "docs.getting_started": {
    en: "Getting Started",
    es: "Primeros Pasos",
    fr: "Commencer",
    de: "Erste Schritte",
    sv: "Komma igång"
  },
  "docs.installation": {
    en: "Installation",
    es: "Instalación",
    fr: "Installation",
    de: "Installation",
    sv: "Installation"
  },
  "docs.configuration": {
    en: "Configuration",
    es: "Configuración",
    fr: "Configuration",
    de: "Konfiguration",
    sv: "Konfiguration"
  },
  "docs.api": {
    en: "API Reference",
    es: "Referencia de API",
    fr: "Référence de l'API",
    de: "API-Referenz",
    sv: "API-referens"
  },
  "docs.features": {
    en: "Features",
    es: "Características",
    fr: "Fonctionnalités",
    de: "Funktionen",
    sv: "Funktioner"
  },
  "docs.tutorials": {
    en: "Tutorials",
    es: "Tutoriales",
    fr: "Tutoriels",
    de: "Tutorials",
    sv: "Handledningar"
  },
  "docs.faq": {
    en: "FAQ",
    es: "Preguntas Frecuentes",
    fr: "FAQ",
    de: "FAQ",
    sv: "Vanliga frågor"
  },
  "docs.search": {
    en: "Search documentation...",
    es: "Buscar documentación...",
    fr: "Rechercher dans la documentation...",
    de: "Dokumentation durchsuchen...",
    sv: "Sök i dokumentationen..."
  },
  "docs.terms_title": {
    en: "Terms of Service",
    es: "Términos de Servicio",
    fr: "Conditions d'Utilisation",
    de: "Nutzungsbedingungen",
    sv: "Användarvillkor"
  },
  "docs.privacy_title": {
    en: "Privacy Policy",
    es: "Política de Privacidad",
    fr: "Politique de Confidentialité",
    de: "Datenschutzrichtlinie",
    sv: "Integritetspolicy"
  },
  "docs.contact_title": {
    en: "Contact Us",
    es: "Contáctenos",
    fr: "Contactez-nous",
    de: "Kontaktieren Sie uns",
    sv: "Kontakta oss"
  },
  
  // Button texts
  "button.customize": {
    en: "Customize Layout",
    es: "Personalizar Diseño",
    fr: "Personnaliser Disposition",
    de: "Layout Anpassen",
    sv: "Anpassa Layout"
  },
  
  // Dropdown menu items
  "dropdown.quickactions": {
    en: "Quick Actions",
    es: "Acciones Rápidas",
    fr: "Actions Rapides",
    de: "Schnellaktionen",
    sv: "Snabbåtgärder"
  },
  "dropdown.batchprocess": {
    en: "Batch Process",
    es: "Procesamiento por Lotes",
    fr: "Traitement par Lots",
    de: "Stapelverarbeitung",
    sv: "Batchbearbetning"
  },
  "dropdown.aitools": {
    en: "AI Tools",
    es: "Herramientas de IA",
    fr: "Outils IA",
    de: "KI-Werkzeuge",
    sv: "AI-verktyg"
  },
  "dropdown.vmmanagement": {
    en: "VM Management",
    es: "Gestión de VM",
    fr: "Gestion de VM",
    de: "VM-Verwaltung",
    sv: "VM-hantering"
  },
  "dropdown.more": {
    en: "More",
    es: "Más",
    fr: "Plus",
    de: "Mehr",
    sv: "Mer"
  },
  "dropdown.actions": {
    en: "Actions",
    es: "Acciones",
    fr: "Actions",
    de: "Aktionen",
    sv: "Åtgärder"
  },
  "dropdown.resources": {
    en: "Resources",
    es: "Recursos",
    fr: "Ressources",
    de: "Ressourcen",
    sv: "Resurser"
  },
  
  // Labels
  "label.dashboardview": {
    en: "Dashboard View",
    es: "Vista del Panel",
    fr: "Vue du Tableau de Bord",
    de: "Dashboard-Ansicht",
    sv: "Instrumentpanelsvy"
  },
  "label.plan": {
    en: "Plan",
    es: "Plan",
    fr: "Forfait",
    de: "Plan",
    sv: "Plan"
  },
  "label.uitheme": {
    en: "UI Theme",
    es: "Tema de UI",
    fr: "Thème UI",
    de: "UI-Theme",
    sv: "UI-tema"
  },
  "label.language": {
    en: "Language",
    es: "Idioma",
    fr: "Langue",
    de: "Sprache",
    sv: "Språk"
  },
  "label.pro": {
    en: "PRO",
    es: "PRO",
    fr: "PRO",
    de: "PRO",
    sv: "PRO"
  },
  "label.profeature": {
    en: "Pro Feature",
    es: "Función Pro",
    fr: "Fonctionnalité Pro",
    de: "Pro-Funktion",
    sv: "Pro-funktion"
  },
  
  // View options
  "view.simple": {
    en: "Simple",
    es: "Simple",
    fr: "Simple",
    de: "Einfach",
    sv: "Enkel"
  },
  "view.advanced": {
    en: "Advanced",
    es: "Avanzado",
    fr: "Avancé",
    de: "Erweitert",
    sv: "Avancerad"
  },
  "view.custom": {
    en: "Custom",
    es: "Personalizado",
    fr: "Personnalisé",
    de: "Benutzerdefiniert",
    sv: "Anpassad"
  },
  
  // Tooltips
  "tooltips.simpleview": {
    en: "Basic view with essential widgets",
    es: "Vista básica con widgets esenciales",
    fr: "Vue basique avec widgets essentiels",
    de: "Einfache Ansicht mit wesentlichen Widgets",
    sv: "Grundvy med väsentliga widgets"
  },
  "tooltips.advancedview": {
    en: "Comprehensive view with all features",
    es: "Vista completa con todas las funciones",
    fr: "Vue complète avec toutes les fonctionnalités",
    de: "Umfassende Ansicht mit allen Funktionen",
    sv: "Omfattande vy med alla funktioner"
  },
  "tooltips.customview": {
    en: "Personalized dashboard layout",
    es: "Diseño de panel personalizado",
    fr: "Disposition de tableau de bord personnalisée",
    de: "Personalisiertes Dashboard-Layout",
    sv: "Personlig instrumentpanelslayout"
  },
  "tooltips.proonly": {
    en: "Available with Pro plan only",
    es: "Disponible solo con plan Pro",
    fr: "Disponible uniquement avec le forfait Pro",
    de: "Nur mit Pro-Plan verfügbar",
    sv: "Endast tillgängligt med Pro-plan"
  },
  
  // Custom dashboard dialog
  "dialog.customdashboard": {
    en: "Customize Dashboard",
    es: "Personalizar Panel",
    fr: "Personnaliser le Tableau de Bord",
    de: "Dashboard Anpassen",
    sv: "Anpassa Instrumentpanel"
  },
  "dialog.selectwidgets": {
    en: "Select which widgets to display in your custom dashboard view.",
    es: "Selecciona qué widgets mostrar en tu vista personalizada del panel.",
    fr: "Sélectionnez les widgets à afficher dans votre vue personnalisée du tableau de bord.",
    de: "Wählen Sie aus, welche Widgets in Ihrer benutzerdefinierten Dashboard-Ansicht angezeigt werden sollen.",
    sv: "Välj vilka widgets som ska visas i din anpassade instrumentpanelsvy."
  },
  "dialog.cancel": {
    en: "Cancel",
    es: "Cancelar",
    fr: "Annuler",
    de: "Abbrechen",
    sv: "Avbryt"
  },
  "dialog.save": {
    en: "Save Changes",
    es: "Guardar Cambios",
    fr: "Enregistrer les Modifications",
    de: "Änderungen Speichern",
    sv: "Spara Ändringar"
  },
  
  // Toast notifications
  "toast.layoutupdated": {
    en: "Layout Updated",
    es: "Diseño Actualizado",
    fr: "Disposition Mise à Jour",
    de: "Layout Aktualisiert",
    sv: "Layout Uppdaterad"
  },
  "toast.layoutsaved": {
    en: "Your custom dashboard layout has been saved",
    es: "Se ha guardado el diseño personalizado de tu panel",
    fr: "Votre disposition de tableau de bord personnalisée a été sauvegardée",
    de: "Ihr benutzerdefiniertes Dashboard-Layout wurde gespeichert",
    sv: "Din anpassade instrumentpanelslayout har sparats"
  },
  "toast.invalidlayout": {
    en: "Invalid Layout",
    es: "Diseño Inválido",
    fr: "Disposition Invalide",
    de: "Ungültiges Layout",
    sv: "Ogiltig Layout"
  },
  "toast.selectatleastone": {
    en: "You must select at least one widget",
    es: "Debes seleccionar al menos un widget",
    fr: "Vous devez sélectionner au moins un widget",
    de: "Sie müssen mindestens ein Widget auswählen",
    sv: "Du måste välja minst en widget"
  },
  
  // Widgets names
  "widget.systemmonitor": {
    en: "System Monitor",
    es: "Monitor del Sistema",
    fr: "Moniteur Système",
    de: "Systemmonitor",
    sv: "Systemövervakare"
  },
  "widget.vmcontroller": {
    en: "VM Controller",
    es: "Controlador de VM",
    fr: "Contrôleur de VM",
    de: "VM-Controller",
    sv: "VM-kontroller"
  },
  "widget.dawworkflow": {
    en: "DAW Workflow",
    es: "Flujo de Trabajo DAW",
    fr: "Flux de Travail DAW",
    de: "DAW-Workflow",
    sv: "DAW-arbetsflöde"
  },
  "widget.audioanalyzer": {
    en: "Audio Analyzer",
    es: "Analizador de Audio",
    fr: "Analyseur Audio",
    de: "Audio-Analysator",
    sv: "Ljudanalysator"
  },
  "widget.aitools": {
    en: "AI Tools",
    es: "Herramientas de IA",
    fr: "Outils IA",
    de: "KI-Werkzeuge",
    sv: "AI-verktyg"
  },
  "widget.marketplace": {
    en: "Marketplace",
    es: "Mercado",
    fr: "Marché",
    de: "Marktplatz",
    sv: "Marknadsplats"
  },
  
  // Help system
  "help.welcome_description": {
    en: "This unified platform helps you manage multiple DAWs, plugins, and creative tools.",
    es: "Esta plataforma unificada te ayuda a gestionar múltiples DAWs, plugins y herramientas creativas.",
    fr: "Cette plateforme unifiée vous aide à gérer plusieurs DAW, plugins et outils créatifs.",
    de: "Diese einheitliche Plattform hilft Ihnen bei der Verwaltung mehrerer DAWs, Plugins und kreativer Tools.",
    sv: "Denna enhetliga plattform hjälper dig att hantera flera DAW, plugins och kreativa verktyg."
  },
  "help.navigation_tip": {
    en: "Navigate using the section tabs below or customize your view from the header controls.",
    es: "Navega usando las pestañas de sección a continuación o personaliza tu vista desde los controles del encabezado.",
    fr: "Naviguez à l'aide des onglets de section ci-dessous ou personnalisez votre vue à partir des contrôles d'en-tête.",
    de: "Navigieren Sie mit den Abschnitts-Tabs unten oder passen Sie Ihre Ansicht über die Kopfzeilensteuerungen an.",
    sv: "Navigera med hjälp av sektionsflikarna nedan eller anpassa din vy från rubrikkontrollen."
  },
  "help.view_documentation": {
    en: "View full documentation",
    es: "Ver documentación completa",
    fr: "Voir la documentation complète",
    de: "Vollständige Dokumentation anzeigen",
    sv: "Visa fullständig dokumentation"
  },
  "help.assistance_description": {
    en: "Get assistance with any feature in StudioFlow X:",
    es: "Obtén ayuda con cualquier función en StudioFlow X:",
    fr: "Obtenez de l'aide pour toute fonctionnalité dans StudioFlow X:",
    de: "Erhalten Sie Unterstützung für jede Funktion in StudioFlow X:",
    sv: "Få hjälp med vilken funktion som helst i StudioFlow X:"
  },
  "help.tip_icons": {
    en: "Look for help icons near features",
    es: "Busca los iconos de ayuda cerca de las funciones",
    fr: "Recherchez les icônes d'aide près des fonctionnalités",
    de: "Suchen Sie nach Hilfesymbolen in der Nähe von Funktionen",
    sv: "Leta efter hjälpikoner nära funktioner"
  },
  "help.tip_docs": {
    en: "Visit our documentation for detailed guides",
    es: "Visita nuestra documentación para guías detalladas",
    fr: "Consultez notre documentation pour des guides détaillés",
    de: "Besuchen Sie unsere Dokumentation für detaillierte Anleitungen",
    sv: "Besök vår dokumentation för detaljerade guider"
  },
  "help.tip_support": {
    en: "Contact support for personalized assistance",
    es: "Contacta con soporte para asistencia personalizada",
    fr: "Contactez le support pour une assistance personnalisée",
    de: "Kontaktieren Sie den Support für persönliche Unterstützung",
    sv: "Kontakta support för personlig hjälp"
  },
  "help.chat_support": {
    en: "Open Chat Support",
    es: "Abrir Chat de Soporte",
    fr: "Ouvrir le Chat d'Assistance",
    de: "Support-Chat Öffnen",
    sv: "Öppna Chatthjälp"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("en");
  
  // Initialize language from localStorage
  useEffect(() => {
    const storedLanguage = localStorage.getItem("app_language") as Language;
    if (storedLanguage && ["en", "es", "fr", "de", "sv"].includes(storedLanguage)) {
      setLanguageState(storedLanguage);
    }
  }, []);
  
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("app_language", lang);
    
    // Dispatch custom event for responsive text adjustment
    const event = new CustomEvent("languageChange", { detail: { language: lang } });
    window.dispatchEvent(event);
    
    toast({
      title: "Language Updated",
      description: `Language changed to ${translations[`language.${lang}`][lang]}`,
    });
  };
  
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language] || translations[key].en;
  };
  
  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        currentLanguage: language, // Add this property
        setLanguage,
        translations,
        t
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
