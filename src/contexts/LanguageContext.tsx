import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

export type Language = "en" | "es" | "fr" | "de" | "sv" | "ja" | "zh" | "ru" | "pt" | "ar";

interface LanguageContextType {
  language: Language;
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  translations: Record<string, Record<Language, string>>;
  t: (key: string) => string;
  getTranslationObject: () => Record<string, string>;
  translateDynamic: (text: string) => string;
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
    sv: "Engelska",
    ja: "英語",
    zh: "英语",
    ru: "Английский",
    pt: "Inglês",
    ar: "الإنجليزية"
  },
  "language.es": {
    en: "Spanish",
    es: "Español",
    fr: "Espagnol",
    de: "Spanisch",
    sv: "Spanska",
    ja: "スペイン語",
    zh: "西班牙语",
    ru: "Испанский",
    pt: "Espanhol",
    ar: "الإسبانية"
  },
  "language.fr": {
    en: "French",
    es: "Francés",
    fr: "Français",
    de: "Französisch",
    sv: "Franska",
    ja: "フランス語",
    zh: "法语",
    ru: "Французский",
    pt: "Francês",
    ar: "الفرنسية"
  },
  "language.de": {
    en: "German",
    es: "Alemán",
    fr: "Allemand",
    de: "Deutsch",
    sv: "Tyska",
    ja: "ドイツ語",
    zh: "德语",
    ru: "Немецкий",
    pt: "Alemão",
    ar: "الألمانية"
  },
  "language.sv": {
    en: "Swedish",
    es: "Sueco",
    fr: "Suédois",
    de: "Schwedisch",
    sv: "Svenska",
    ja: "スウェーデン語",
    zh: "瑞典语",
    ru: "Шведский",
    pt: "Sueco",
    ar: "السويدية"
  },
  "language.ja": {
    en: "Japanese",
    es: "Japonés",
    fr: "Japonais",
    de: "Japanisch",
    sv: "Japanska",
    ja: "日本語",
    zh: "日语",
    ru: "Японский",
    pt: "Japonês",
    ar: "اليابانية"
  },
  "language.zh": {
    en: "Chinese",
    es: "Chino",
    fr: "Chinois",
    de: "Chinesisch",
    sv: "Kinesiska",
    ja: "中国語",
    zh: "中文",
    ru: "Китайский",
    pt: "Chinês",
    ar: "الصينية"
  },
  "language.ru": {
    en: "Russian",
    es: "Ruso",
    fr: "Russe",
    de: "Russisch",
    sv: "Ryska",
    ja: "ロシア語",
    zh: "俄语",
    ru: "Русский",
    pt: "Russo",
    ar: "الروسية"
  },
  "language.pt": {
    en: "Portuguese",
    es: "Portugués",
    fr: "Portugais",
    de: "Portugiesisch",
    sv: "Portugisiska",
    ja: "ポルトガル語",
    zh: "葡萄牙语",
    ru: "Португальский",
    pt: "Português",
    ar: "البرتغالية"
  },
  "language.ar": {
    en: "Arabic",
    es: "Árabe",
    fr: "Arabe",
    de: "Arabisch",
    sv: "Arabiska",
    ja: "アラビア語",
    zh: "阿拉伯语",
    ru: "Арабский",
    pt: "Árabe",
    ar: "العربية"
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
  },
  
  // Support system and tickets
  "support.title": {
    en: "Support Center",
    es: "Centro de Soporte",
    fr: "Centre d'Assistance",
    de: "Support-Center",
    sv: "Supportcenter",
    ja: "サポートセンター",
    zh: "支持中心",
    ru: "Центр поддержки",
    pt: "Centro de Suporte",
    ar: "مركز الدعم"
  },
  "support.description": {
    en: "Get help with StudioFlow X",
    es: "Obtén ayuda con StudioFlow X",
    fr: "Obtenez de l'aide avec StudioFlow X",
    de: "Hilfe zu StudioFlow X erhalten",
    sv: "Få hjälp med StudioFlow X",
    ja: "StudioFlow Xのヘルプを取得",
    zh: "获取StudioFlow X帮助",
    ru: "Получить помощь по StudioFlow X",
    pt: "Obtenha ajuda com StudioFlow X",
    ar: "الحصول على مساعدة مع StudioFlow X"
  },
  "support.chat": {
    en: "Live Chat",
    es: "Chat en Vivo",
    fr: "Chat en Direct",
    de: "Live-Chat",
    sv: "Live-chatt",
    ja: "ライブチャット",
    zh: "在线聊天",
    ru: "Живой чат",
    pt: "Chat ao Vivo",
    ar: "الدردشة المباشرة"
  },
  "support.tickets": {
    en: "My Tickets",
    es: "Mis Tickets",
    fr: "Mes Tickets",
    de: "Meine Tickets",
    sv: "Mina Ärenden",
    ja: "マイチケット",
    zh: "我的工单",
    ru: "Мои тикеты",
    pt: "Meus Tickets",
    ar: "تذاكري"
  },
  "support.notifications": {
    en: "Notifications",
    es: "Notificaciones",
    fr: "Notifications",
    de: "Benachrichtigungen",
    sv: "Aviseringar",
    ja: "通知",
    zh: "通知",
    ru: "Уведомления",
    pt: "Notificações",
    ar: "الإشعارات"
  },
  "support.faq": {
    en: "FAQs",
    es: "Preguntas Frecuentes",
    fr: "FAQ",
    de: "FAQ",
    sv: "Vanliga frågor",
    ja: "よくある質問",
    zh: "常见问题",
    ru: "ЧЗВ",
    pt: "Perguntas Frequentes",
    ar: "الأسئلة الشائعة"
  },
  "support.contact": {
    en: "Contact",
    es: "Contacto",
    fr: "Contact",
    de: "Kontakt",
    sv: "Kontakt",
    ja: "お問い合わせ",
    zh: "联系我们",
    ru: "Контакты",
    pt: "Contato",
    ar: "اتصل بنا"
  },
  "support.create_ticket": {
    en: "Create Ticket",
    es: "Crear Ticket",
    fr: "Créer un Ticket",
    de: "Ticket erstellen",
    sv: "Skapa ärende",
    ja: "チケットを作成",
    zh: "创建工单",
    ru: "Создать тикет",
    pt: "Criar Ticket",
    ar: "إنشاء تذكرة"
  },
  "support.ticket_title": {
    en: "Ticket Title",
    es: "Título del Ticket",
    fr: "Titre du Ticket",
    de: "Ticket-Titel",
    sv: "Ärendetitel",
    ja: "チケットのタイトル",
    zh: "工单标题",
    ru: "Заголовок тикета",
    pt: "Título do Ticket",
    ar: "عنوان التذكرة"
  },
  "support.ticket_description": {
    en: "Description",
    es: "Descripción",
    fr: "Description",
    de: "Beschreibung",
    sv: "Beskrivning",
    ja: "説明",
    zh: "描述",
    ru: "Описание",
    pt: "Descrição",
    ar: "وصف"
  },
  "support.priority": {
    en: "Priority",
    es: "Prioridad",
    fr: "Priorité",
    de: "Priorität",
    sv: "Prioritet",
    ja: "優先度",
    zh: "优先级",
    ru: "Приоритет",
    pt: "Prioridade",
    ar: "الأولوية"
  },
  "support.low": {
    en: "Low",
    es: "Baja",
    fr: "Faible",
    de: "Niedrig",
    sv: "Låg",
    ja: "低",
    zh: "低",
    ru: "Низкий",
    pt: "Baixa",
    ar: "منخفضة"
  },
  "support.medium": {
    en: "Medium",
    es: "Media",
    fr: "Moyenne",
    de: "Mittel",
    sv: "Medel",
    ja: "中",
    zh: "中",
    ru: "Средний",
    pt: "Média",
    ar: "متوسطة"
  },
  "support.high": {
    en: "High",
    es: "Alta",
    fr: "Élevée",
    de: "Hoch",
    sv: "Hög",
    ja: "高",
    zh: "高",
    ru: "Высокий",
    pt: "Alta",
    ar: "عالية"
  },
  "support.critical": {
    en: "Critical",
    es: "Crítica",
    fr: "Critique",
    de: "Kritisch",
    sv: "Kritisk",
    ja: "最重要",
    zh: "紧急",
    ru: "Критический",
    pt: "Crítica",
    ar: "حرجة"
  },
  "support.submit": {
    en: "Submit",
    es: "Enviar",
    fr: "Soumettre",
    de: "Absenden",
    sv: "Skicka",
    ja: "送信",
    zh: "提交",
    ru: "Отправить",
    pt: "Enviar",
    ar: "إرسال"
  },
  "support.cancel": {
    en: "Cancel",
    es: "Cancelar",
    fr: "Annuler",
    de: "Abbrechen",
    sv: "Avbryt",
    ja: "キャンセル",
    zh: "取消",
    ru: "Отмена",
    pt: "Cancelar",
    ar: "إلغاء"
  },
  "support.no_tickets": {
    en: "You don't have any support tickets yet.",
    es: "Aún no tienes tickets de soporte.",
    fr: "Vous n'avez pas encore de tickets d'assistance.",
    de: "Sie haben noch keine Support-Tickets.",
    sv: "Du har inga supportärenden än.",
    ja: "サポートチケットはまだありません。",
    zh: "您还没有任何支持工单。",
    ru: "У вас еще нет тикетов поддержки.",
    pt: "Você ainda não tem tickets de suporte.",
    ar: "ليس لديك أي تذاكر دعم حتى الآن."
  },
  
  // Admin dashboard
  "admin.dashboard": {
    en: "Admin Dashboard",
    es: "Panel de Administración",
    fr: "Tableau de Bord d'Administration",
    de: "Admin-Dashboard",
    sv: "Administratörspanel",
    ja: "管理ダッシュボード",
    zh: "管理仪表板",
    ru: "Панель администратора",
    pt: "Painel de Administração",
    ar: "لوحة تحكم المشرف"
  },
  "admin.overview": {
    en: "Overview",
    es: "Resumen",
    fr: "Aperçu",
    de: "Übersicht",
    sv: "Översikt",
    ja: "概要",
    zh: "概览",
    ru: "Обзор",
    pt: "Visão Geral",
    ar: "نظرة عامة"
  },
  "admin.support_tickets": {
    en: "Support Tickets",
    es: "Tickets de Soporte",
    fr: "Tickets d'Assistance",
    de: "Support-Tickets",
    sv: "Supportärenden",
    ja: "サポートチケット",
    zh: "支持工单",
    ru: "Тикеты поддержки",
    pt: "Tickets de Suporte",
    ar: "تذاكر الدعم"
  },
  "admin.user_sessions": {
    en: "User Sessions",
    es: "Sesiones de Usuario",
    fr: "Sessions Utilisateur",
    de: "Benutzersitzungen",
    sv: "Användarsessioner",
    ja: "ユーザーセッション",
    zh: "用户会话",
    ru: "Сессии пользователей",
    pt: "Sessões de Usuário",
    ar: "جلسات المستخدم"
  },
  "admin.remote_assistance": {
    en: "Remote Assistance",
    es: "Asistencia Remota",
    fr: "Assistance à Distance",
    de: "Fernunterstützung",
    sv: "Fjärrassistans",
    ja: "リモートアシスタンス",
    zh: "远程协助",
    ru: "Удаленная помощь",
    pt: "Assistência Remota",
    ar: "المساعدة عن بعد"
  },
  "admin.system_analytics": {
    en: "System Analytics",
    es: "Análisis del Sistema",
    fr: "Analytique du Système",
    de: "Systemanalyse",
    sv: "Systemanalys",
    ja: "システム分析",
    zh: "系统分析",
    ru: "Системная аналитика",
    pt: "Análise do Sistema",
    ar: "تحليلات النظام"
  },
  "admin.active_users": {
    en: "Active Users",
    es: "Usuarios Activos",
    fr: "Utilisateurs Actifs",
    de: "Aktive Benutzer",
    sv: "Aktiva användare",
    ja: "アクティブユーザー",
    zh: "活跃用户",
    ru: "Активные пользователи",
    pt: "Usuários Ativos",
    ar: "المستخدمين النشطين"
  },
  "admin.open_tickets": {
    en: "Open Tickets",
    es: "Tickets Abiertos",
    fr: "Tickets Ouverts",
    de: "Offene Tickets",
    sv: "Öppna ärenden",
    ja: "オープンチケット",
    zh: "未处理工单",
    ru: "Открытые тикеты",
    pt: "Tickets Abertos",
    ar: "التذاكر المفتوحة"
  },
  "admin.critical_issues": {
    en: "Critical Issues",
    es: "Problemas Críticos",
    fr: "Problèmes Critiques",
    de: "Kritische Probleme",
    sv: "Kritiska problem",
    ja: "重大な問題",
    zh: "严重问题",
    ru: "Критические проблемы",
    pt: "Problemas Críticos",
    ar: "مشاكل حرجة"
  },
  "admin.resolved_today": {
    en: "Resolved Today",
    es: "Resueltos Hoy",
    fr: "Résolus Aujourd'hui",
    de: "Heute gelöst",
    sv: "Lösta idag",
    ja: "今日解決",
    zh: "今日已解决",
    ru: "Решено сегодня",
    pt: "Resolvidos Hoje",
    ar: "تم حلها اليوم"
  },
  
  // Knowledge base content
  "kb.title": {
    en: "Knowledge Base",
    es: "Base de Conocimiento",
    fr: "Base de Connaissances",
    de: "Wissensdatenbank",
    sv: "Kunskapsbas",
    ja: "ナレッジベース",
    zh: "知识库",
    ru: "База знаний",
    pt: "Base de Conhecimento",
    ar: "قاعدة المعرفة"
  },
  "kb.music_production": {
    en: "Music Production Knowledge Base",
    es: "Base de Conocimiento de Producción Musical",
    fr: "Base de Connaissances de Production Musicale",
    de: "Wissensdatenbank zur Musikproduktion",
    sv: "Kunskapsbas för musikproduktion",
    ja: "音楽制作ナレッジベース",
    zh: "音乐制作知识库",
    ru: "База знаний по музыкальному производству",
    pt: "Base de Conhecimento de Produção Musical",
    ar: "قاعدة معرفة إنتاج الموسيقى"
  },
  "kb.expert_tips": {
    en: "Expert tips and solutions for music producers and engineers",
    es: "Consejos y soluciones de expertos para productores e ingenieros de música",
    fr: "Conseils d'experts et solutions pour les producteurs et ingénieurs du son",
    de: "Expertentipps und Lösungen für Musikproduzenten und Toningenieure",
    sv: "Experttips och lösningar för musikproducenter och ljudtekniker",
    ja: "音楽プロデューサーとエンジニアのための専門家のヒントとソリューション",
    zh: "为音乐制作人和工程师提供的专家提示和解决方案",
    ru: "Экспертные советы и решения для музыкальных продюсеров и инженеров",
    pt: "Dicas e soluções de especialistas para produtores e engenheiros de música",
    ar: "نصائح وحلول الخبراء لمنتجي ومهندسي الموسيقى"
  },
  "kb.guides": {
    en: "Frequently asked questions and helpful guides",
    es: "Preguntas frecuentes y guías útiles",
    fr: "Questions fréquemment posées et guides utiles",
    de: "Häufig gestellte Fragen und hilfreiche Anleitungen",
    sv: "Vanliga frågor och hjälpsamma guider",
    ja: "よくある質問と役立つガイド",
    zh: "常见问题和有用的指南",
    ru: "Часто задаваемые вопросы и полезные руководства",
    pt: "Perguntas frequentes e guias úteis",
    ar: "الأسئلة الشائعة والأدلة المفيدة"
  },
  "kb.search": {
    en: "Search knowledge base...",
    es: "Buscar en la base de conocimiento...",
    fr: "Rechercher dans la base de connaissances...",
    de: "Wissensdatenbank durchsuchen...",
    sv: "Sök i kunskapsbasen...",
    ja: "ナレッジベースを検索...",
    zh: "搜索知识库...",
    ru: "Поиск в базе знаний...",
    pt: "Pesquisar na base de conhecimento...",
    ar: "البحث في قاعدة المعرفة..."
  },
  "kb.search_music": {
    en: "Search music production topics...",
    es: "Buscar temas de producción musical...",
    fr: "Rechercher des sujets de production musicale...",
    de: "Musikproduktionsthemen durchsuchen...",
    sv: "Sök musikproduktionsämnen...",
    ja: "音楽制作のトピックを検索...",
    zh: "搜索音乐制作主题...",
    ru: "Поиск тем по музыкальному производству...",
    pt: "Pesquisar tópicos de produção musical...",
    ar: "البحث في مواضيع إنتاج الموسيقى..."
  },
  "kb.no_results": {
    en: "No articles found matching",
    es: "No se encontraron artículos que coincidan con",
    fr: "Aucun article trouvé correspondant à",
    de: "Keine Artikel gefunden, die zu folgenden passen",
    sv: "Inga artiklar hittades som matchar",
    ja: "一致する記事が見つかりません",
    zh: "未找到匹配的文章",
    ru: "Не найдено статей, соответствующих",
    pt: "Nenhum artigo encontrado correspondente a",
    ar: "لم يتم العثور على مقالات مطابقة لـ"
  },
  "kb.clear_search": {
    en: "Clear search",
    es: "Borrar búsqueda",
    fr: "Effacer la recherche",
    de: "Suche löschen",
    sv: "Rensa sökning",
    ja: "検索をクリア",
    zh: "清除搜索",
    ru: "Очистить поиск",
    pt: "Limpar pesquisa",
    ar: "مسح البحث"
  },
  "kb.results_found": {
    en: "results found",
    es: "resultados encontrados",
    fr: "résultats trouvés",
    de: "Ergebnisse gefunden",
    sv: "resultat hittades",
    ja: "の結果が見つかりました",
    zh: "个结果",
    ru: "найдено результатов",
    pt: "resultados encontrados",
    ar: "نتائج وجدت"
  },
  "kb.view_all": {
    en: "View All FAQs",
    es: "Ver Todas las Preguntas Frecuentes",
    fr: "Voir Toutes les FAQ",
    de: "Alle FAQs Anzeigen",
    sv: "Se Alla Vanliga Frågor",
    ja: "すべてのFAQを表示",
    zh: "查看所有常见问题",
    ru: "Просмотреть Все ЧЗВ",
    pt: "Ver Todas as Perguntas Frequentes",
    ar: "عرض جميع الأسئلة الشائعة"
  },
  
  // Notifications
  "notifications.title": {
    en: "Notifications",
    es: "Notificaciones",
    fr: "Notifications",
    de: "Benachrichtigungen",
    sv: "Aviseringar",
    ja: "通知",
    zh: "通知",
    ru: "Уведомления",
    pt: "Notificações",
    ar: "الإشعارات"
  },
  "notifications.plugin_updates": {
    en: "Plugin Updates",
    es: "Actualizaciones de Plugins",
    fr: "Mises à Jour des Plugins",
    de: "Plugin-Updates",
    sv: "Pluginuppdateringar",
    ja: "プラグインアップデート",
    zh: "插件更新",
    ru: "Обновления плагинов",
    pt: "Atualizações de Plugins",
    ar: "تحديثات المكونات الإضافية"
  },
  "notifications.firmware_updates": {
    en: "Firmware Updates",
    es: "Actualizaciones de Firmware",
    fr: "Mises à Jour du Firmware",
    de: "Firmware-Updates",
    sv: "Firmwareuppdateringar",
    ja: "ファームウェアアップデート",
    zh: "固件更新",
    ru: "Обновления прошивки",
    pt: "Atualizações de Firmware",
    ar: "تحديثات البرامج الثابتة"
  },
  "notifications.software_updates": {
    en: "Software Updates",
    es: "Actualizaciones de Software",
    fr: "Mises à Jour Logicielles",
    de: "Software-Updates",
    sv: "Programvaruuppdateringar",
    ja: "ソフトウェアアップデート",
    zh: "软件更新",
    ru: "Обновления программного обеспечения",
    pt: "Atualizações de Software",
    ar: "تحديثات البرمجيات"
  },
  "notifications.system_alerts": {
    en: "System Alerts",
    es: "Alertas del Sistema",
    fr: "Alertes Système",
    de: "Systemwarnungen",
    sv: "Systemvarningar",
    ja: "システムアラート",
    zh: "系统提醒",
    ru: "Системные оповещения",
    pt: "Alertas do Sistema",
    ar: "تنبيهات النظام"
  },
  "notifications.all": {
    en: "All Notifications",
    es: "Todas las Notificaciones",
    fr: "Toutes les Notifications",
    de: "Alle Benachrichtigungen",
    sv: "Alla aviseringar",
    ja: "すべての通知",
    zh: "所有通知",
    ru: "Все уведомления",
    pt: "Todas as Notificações",
    ar: "جميع الإشعارات"
  },
  "notifications.mark_all_read": {
    en: "Mark All as Read",
    es: "Marcar Todo como Leído",
    fr: "Tout Marquer comme Lu",
    de: "Alles als Gelesen Markieren",
    sv: "Markera alla som lästa",
    ja: "すべて既読にする",
    zh: "标记所有为已读",
    ru: "Отметить все как прочитанное",
    pt: "Marcar Tudo como Lido",
    ar: "وضع علامة قراءة على الكل"
  },
  "notifications.settings": {
    en: "Notification Settings",
    es: "Configuración de Notificaciones",
    fr: "Paramètres de Notification",
    de: "Benachrichtigungseinstellungen",
    sv: "Aviseringsinställningar",
    ja: "通知設定",
    zh: "通知设置",
    ru: "Настройки уведомлений",
    pt: "Configurações de Notificação",
    ar: "إعدادات الإشعارات"
  },
  "notifications.empty": {
    en: "No notifications to display",
    es: "No hay notificaciones para mostrar",
    fr: "Aucune notification à afficher",
    de: "Keine Benachrichtigungen vorhanden",
    sv: "Inga aviseringar att visa",
    ja: "表示する通知はありません",
    zh: "没有通知显示",
    ru: "Нет уведомлений для отображения",
    pt: "Nenhuma notificação para exibir",
    ar: "لا توجد إشعارات للعرض"
  }
};

const flagEmojis: Record<Language, string> = {
  en: "🇬🇧",
  es: "🇪🇸",
  fr: "🇫🇷",
  de: "🇩🇪",
  sv: "🇸🇪",
  ja: "🇯🇵",
  zh: "🇨🇳",
  ru: "🇷🇺",
  pt: "🇵🇹",
  ar: "🇸🇦"
};

const languageNames: Record<Language, Record<Language, string>> = {
  en: {
    en: "English",
    es: "Inglés",
    fr: "Anglais",
    de: "Englisch",
    sv: "Engelska",
    ja: "英語",
    zh: "英语",
    ru: "Английский",
    pt: "Inglês",
    ar: "الإنجليزية"
  },
  es: {
    en: "Spanish",
    es: "Español",
    fr: "Espagnol",
    de: "Spanisch",
    sv: "Spanska",
    ja: "スペイン語",
    zh: "西班牙语",
    ru: "Испанский",
    pt: "Espanhol",
    ar: "الإسبانية"
  },
  fr: {
    en: "French",
    es: "Francés",
    fr: "Français",
    de: "Französisch",
    sv: "Franska",
    ja: "フランス語",
    zh: "法语",
    ru: "Французский",
    pt: "Francês",
    ar: "الفرنسية"
  },
  de: {
    en: "German",
    es: "Alemán",
    fr: "Allemand",
    de: "Deutsch",
    sv: "Tyska",
    ja: "ドイツ語",
    zh: "德语",
    ru: "Немецкий",
    pt: "Alemão",
    ar: "الألمانية"
  },
  sv: {
    en: "Swedish",
    es: "Sueco",
    fr: "Suédois",
    de: "Schwedisch",
    sv: "Svenska",
    ja: "スウェーデン語",
    zh: "瑞典语",
    ru: "Шведский",
    pt: "Sueco",
    ar: "السويدية"
  },
  ja: {
    en: "Japanese",
    es: "Japonés",
    fr: "Japonais",
    de: "Japanisch",
    sv: "Japanska",
    ja: "日本語",
    zh: "日语",
    ru: "Японский",
    pt: "Japonês",
    ar: "اليابانية"
  },
  zh: {
    en: "Chinese",
    es: "Chino",
    fr: "Chinois",
    de: "Chinesisch",
    sv: "Kinesiska",
    ja: "中国語",
    zh: "中文",
    ru: "Китайский",
    pt: "Chinês",
    ar: "الصينية"
  },
  ru: {
    en: "Russian",
    es: "Ruso",
    fr: "Russe",
    de: "Russisch",
    sv: "Ryska",
    ja: "ロシア語",
    zh: "俄语",
    ru: "Русский",
    pt: "Russo",
    ar: "الروسية"
  },
  pt: {
    en: "Portuguese",
    es: "Portugués",
    fr: "Portugais",
    de: "Portugiesisch",
    sv: "Portugisiska",
    ja: "ポルトガル語",
    zh: "葡萄牙语",
    ru: "Португальский",
    pt: "Português",
    ar: "البرتغالية"
  },
  ar: {
    en: "Arabic",
    es: "Árabe",
    fr: "Arabe",
    de: "Arabisch",
    sv: "Arabiska",
    ja: "アラビア語",
    zh: "阿拉伯语",
    ru: "Арабский",
    pt: "Árabe",
    ar: "العربية"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("en");
  
  useEffect(() => {
    const storedLanguage = localStorage.getItem("app_language") as Language;
    if (storedLanguage && Object.keys(flagEmojis).includes(storedLanguage)) {
      setLanguageState(storedLanguage);
    }
  }, []);
  
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("app_language", lang);
    
    const event = new CustomEvent("languageChange", { detail: { language: lang } });
    window.dispatchEvent(event);
    
    toast({
      title: "Language Updated",
      description: `Language changed to ${languageNames[lang][lang]}`,
    });
    
    document.documentElement.lang = lang;
    
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  };
  
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language] || translations[key].en;
  };
  
  const getTranslationObject = (): Record<string, string> => {
    const result: Record<string, string> = {};
    
    Object.keys(translations).forEach(key => {
      result[key] = translations[key][language] || translations[key].en;
    });
    
    return result;
  };
  
  const translateDynamic = (text: string): string => {
    return text;
  };
  
  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        currentLanguage: language,
        setLanguage,
        translations,
        t,
        getTranslationObject,
        translateDynamic
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

export { flagEmojis, languageNames };
