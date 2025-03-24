
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Documentation from "./pages/Documentation";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import {
  AdminUsers,
  AdminTickets,
  AdminSessions,
  AdminAnalytics,
  AdminRemote,
  AdminStats,
  AdminNotifications,
  AdminHelp,
  AdminSettings
} from "./pages/admin";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import Projects from "./pages/Projects";
import Library from "./pages/Library";
import Connect from "./pages/Connect";
import AIToolsPage from "./pages/AITools";
import SubscriptionPage from "./pages/Subscription";
import RecommendationsPage from "./pages/RecommendationsPage";
import Contribution from "./pages/Contribution";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/language";
import { DashboardProvider } from "./contexts/DashboardContext";
import { useEffect } from "react";
import { useThemeInitializer } from "./hooks/use-theme-initializer";
import { supabase } from '@/integrations/supabase/client';
import ProtectedRoute from "./components/ProtectedRoute";
import { SessionContextProvider } from '@supabase/auth-helpers-react';

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
            <TooltipProvider>
              <BrowserRouter>
                {/* Dashboard Provider moved inside BrowserRouter so useNavigate works properly */}
                <DashboardProvider>
                  <Toaster />
                  <ScrollToTop />
                  <Routes>
                    <Route path="/auth" element={<Auth />} />
                    
                    {/* Home and Dashboard Routes */}
                    <Route 
                      path="/" 
                      element={
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                      } 
                    />
                    
                    <Route 
                      path="/dashboard" 
                      element={
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                      } 
                    />
                    
                    {/* Feature Routes */}
                    <Route 
                      path="/projects" 
                      element={
                        <ProtectedRoute>
                          <Projects />
                        </ProtectedRoute>
                      } 
                    />
                    
                    <Route 
                      path="/library" 
                      element={
                        <ProtectedRoute>
                          <Library />
                        </ProtectedRoute>
                      } 
                    />
                    
                    <Route 
                      path="/connect" 
                      element={
                        <ProtectedRoute>
                          <Connect />
                        </ProtectedRoute>
                      } 
                    />
                    
                    <Route 
                      path="/ai-tools" 
                      element={
                        <ProtectedRoute>
                          <AIToolsPage />
                        </ProtectedRoute>
                      } 
                    />

                    <Route 
                      path="/subscription" 
                      element={
                        <ProtectedRoute>
                          <SubscriptionPage />
                        </ProtectedRoute>
                      } 
                    />
                    
                    <Route 
                      path="/recommendations" 
                      element={
                        <ProtectedRoute>
                          <RecommendationsPage />
                        </ProtectedRoute>
                      } 
                    />
                    
                    {/* Contribution Routes */}
                    <Route 
                      path="/contribution" 
                      element={
                        <ProtectedRoute>
                          <Contribution />
                        </ProtectedRoute>
                      } 
                    />
                    
                    {/* Admin Routes */}
                    <Route 
                      path="/admin" 
                      element={
                        <ProtectedRoute>
                          <AdminDashboard />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/admin/users" 
                      element={
                        <ProtectedRoute>
                          <AdminUsers />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/admin/tickets" 
                      element={
                        <ProtectedRoute>
                          <AdminTickets />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/admin/sessions" 
                      element={
                        <ProtectedRoute>
                          <AdminSessions />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/admin/analytics" 
                      element={
                        <ProtectedRoute>
                          <AdminAnalytics />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/admin/remote" 
                      element={
                        <ProtectedRoute>
                          <AdminRemote />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/admin/stats" 
                      element={
                        <ProtectedRoute>
                          <AdminStats />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/admin/notifications" 
                      element={
                        <ProtectedRoute>
                          <AdminNotifications />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/admin/help" 
                      element={
                        <ProtectedRoute>
                          <AdminHelp />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/admin/settings" 
                      element={
                        <ProtectedRoute>
                          <AdminSettings />
                        </ProtectedRoute>
                      } 
                    />
                    
                    {/* User & System Routes */}
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
                      path="/support" 
                      element={
                        <ProtectedRoute>
                          <Support />
                        </ProtectedRoute>
                      } 
                    />
                    
                    {/* Documentation Routes */}
                    <Route 
                      path="/docs" 
                      element={
                        <ProtectedRoute>
                          <Documentation />
                        </ProtectedRoute>
                      } 
                    />
                    
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </DashboardProvider>
              </BrowserRouter>
            </TooltipProvider>
          </LanguageProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </SessionContextProvider>
  );
};

export default App;
