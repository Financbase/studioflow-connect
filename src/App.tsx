
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Documentation from "./pages/Documentation";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { DashboardProvider } from "./contexts/DashboardContext";
import { useEffect } from "react";

// Initialize query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

// ScrollToTop component to handle navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  // Initialize themes and language
  useEffect(() => {
    // Set dark mode by default if not set
    if (!localStorage.getItem("theme")) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      // Apply existing theme setting
      const isDarkMode = localStorage.getItem("theme") === "dark";
      document.documentElement.classList.toggle("dark", isDarkMode);
    }
    
    // Initialize theme variant if it exists in localStorage
    const storedTheme = localStorage.getItem("ui_theme_variant");
    if (storedTheme && ["modern", "legacy", "classic", "windows"].includes(storedTheme)) {
      document.documentElement.classList.add(`theme-${storedTheme}`);
    } else {
      document.documentElement.classList.add("theme-modern");
      localStorage.setItem("ui_theme_variant", "modern");
    }
    
    // Initialize language if not set
    if (!localStorage.getItem("app_language")) {
      localStorage.setItem("app_language", "en");
    }
    
    // Add event listener for language changes to adjust layout
    window.addEventListener("languageChange", () => {
      document.documentElement.classList.add("text-adaptive");
    });
    
    return () => {
      window.removeEventListener("languageChange", () => {});
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <DashboardProvider>
          <ThemeProvider>
            <LanguageProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/docs" element={<Documentation />} />
                  <Route path="/terms" element={<Documentation page="terms" />} />
                  <Route path="/privacy" element={<Documentation page="privacy" />} />
                  <Route path="/contact" element={<Documentation page="contact" />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </LanguageProvider>
          </ThemeProvider>
        </DashboardProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
