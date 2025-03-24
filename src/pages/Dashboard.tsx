
import React, { useState, useEffect } from "react";
import { SidebarLayout } from "@/components/layout/Sidebar";
import Header from "@/components/Header";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/contexts/ThemeContext";
import ZenMode from "@/components/zen/ZenMode";
import { useZenMode } from "@/hooks/use-zen-mode";

// Import the new dashboard components
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import QuickOverview from "@/components/dashboard/QuickOverview";
import MainDashboardContent from "@/components/dashboard/MainDashboardContent";

const Dashboard = () => {
  const { themeVariant } = useTheme();
  
  // Use the zen mode hook instead of managing state manually
  const { 
    isActive: zenModeActive, 
    options: zenModeOptions, 
    toggle: toggleZenMode,
    updateOptions: updateZenModeOptions
  } = useZenMode();
  
  // Optional effect to enhance the experience when entering/exiting zen mode
  useEffect(() => {
    // This could add transition effects to the dashboard when zen mode toggles
    const dashboard = document.getElementById('dashboard-content');
    if (dashboard) {
      dashboard.style.transition = 'opacity 0.3s ease, filter 0.3s ease';
    }
    
    return () => {
      // Cleanup transitions
      if (dashboard) {
        dashboard.style.transition = '';
      }
    };
  }, []);

  return (
    <SidebarLayout>
      <Header />
      
      <main id="dashboard-content" className="flex-1 container mx-auto px-4 py-8 bg-background animate-fade-in">
        <div className="max-w-[1200px] mx-auto space-y-6">
          {/* Dashboard Header */}
          <DashboardHeader onZenModeActivate={toggleZenMode} />
          
          <Separator className={themeVariant === "windows" ? "border-b-2" : ""} />
          
          {/* Quick Stats Section */}
          <QuickOverview />
          
          {/* Main Dashboard Content */}
          <MainDashboardContent />
        </div>
      </main>
      
      {/* Zen Mode Component */}
      <ZenMode 
        isActive={zenModeActive} 
        onToggle={toggleZenMode}
        options={zenModeOptions}
        onOptionsChange={updateZenModeOptions}
      />
    </SidebarLayout>
  );
};

export default Dashboard;
