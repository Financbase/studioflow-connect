
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Documentation from "./pages/Documentation";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { DashboardProvider } from "./contexts/DashboardContext";
import { useEffect } from "react";
import { useThemeInitializer } from "./hooks/use-theme-initializer";
import { supabase } from '@/integrations/supabase/client';
import ProtectedRoute from "./components/ProtectedRoute";
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { ToastProvider } from "@/hooks/use-toast";

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

// Main application with proper provider nesting
const App = () => {
  // Initialize themes and language
  useThemeInitializer();

  return (
    <SessionContextProvider supabaseClient={supabase}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <LanguageProvider>
            <ToastProvider>
              <TooltipProvider>
                <BrowserRouter>
                  {/* Dashboard Provider moved inside BrowserRouter so useNavigate works properly */}
                  <DashboardProvider>
                    <Toaster />
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
                        path="/admin" 
                        element={
                          <ProtectedRoute>
                            <AdminDashboard />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/profile" 
                        element={
                          <ProtectedRoute>
                            <Profile />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/settings" 
                        element={
                          <ProtectedRoute>
                            <Settings />
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
                  </DashboardProvider>
                </BrowserRouter>
              </TooltipProvider>
            </ToastProvider>
          </LanguageProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </SessionContextProvider>
  );
};

export default App;
