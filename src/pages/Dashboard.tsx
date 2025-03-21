
import React, { useState } from "react";
import { SidebarLayout } from "@/components/layout/Sidebar";
import Header from "@/components/Header";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/contexts/ThemeContext";
import ZenMode from "@/components/zen/ZenMode";
import { ZenModeOptions } from "@/hooks/use-zen-mode";

// Import the new dashboard components
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import QuickOverview from "@/components/dashboard/QuickOverview";
import MainDashboardContent from "@/components/dashboard/MainDashboardContent";

const Dashboard = () => {
  const { themeVariant } = useTheme();
  const [zenModeActive, setZenModeActive] = useState(false);
  const [zenModeOptions, setZenModeOptions] = useState<ZenModeOptions>({
    theme: 'minimal',
    soundscape: 'silence',
    enableTimers: false,
    hideNotifications: true
  });

  return (
    <SidebarLayout>
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 bg-background animate-fade-in">
        <div className="max-w-[1200px] mx-auto space-y-6">
          {/* Dashboard Header */}
          <DashboardHeader onZenModeActivate={() => setZenModeActive(true)} />
          
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
        onToggle={() => setZenModeActive(!zenModeActive)}
        options={zenModeOptions}
        onOptionsChange={(options) => setZenModeOptions({...zenModeOptions, ...options})}
      />
    </SidebarLayout>
  );
};

export default Dashboard;
