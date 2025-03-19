
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Documentation from "./pages/Documentation";
import Auth from "./pages/Auth";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { DashboardProvider } from "./contexts/DashboardContext";
import { useEffect } from "react";
import { useThemeInitializer } from "./hooks/use-theme-initializer";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import ProtectedRoute from "./components/ProtectedRoute";

// Initialize query client with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false, // Disable refetching on window focus for better performance
      gcTime: 10 * 60 * 1000, // 10 minutes (replaced cacheTime which is deprecated)
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
  useThemeInitializer();
  
  // Initialize Supabase client with correct API
  const [supabaseClient] = useState(() => createClientComponentClient());

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <DashboardProvider>
            <ThemeProvider>
              <LanguageProvider>
                <Toaster />
                <BrowserRouter>
                  <ScrollToTop />
                  <Routes>
                    <Route path="/auth" element={<Auth />} />
                    <Route 
                      path="/" 
                      element={
                        <ProtectedRoute>
                          <Index />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/docs" 
                      element={
                        <ProtectedRoute>
                          <Documentation />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/terms" 
                      element={
                        <ProtectedRoute>
                          <Documentation page="terms" />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/privacy" 
                      element={
                        <ProtectedRoute>
                          <Documentation page="privacy" />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/contact" 
                      element={
                        <ProtectedRoute>
                          <Documentation page="contact" />
                        </ProtectedRoute>
                      } 
                    />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </LanguageProvider>
            </ThemeProvider>
          </DashboardProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </SessionContextProvider>
  );
};

export default App;
