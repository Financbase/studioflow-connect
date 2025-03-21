
import React from "react";
import { SidebarLayout } from "@/components/layout/Sidebar";
import Header from "@/components/Header";
import SystemMonitor from "@/components/SystemMonitor";
import AudioAnalyzer from "@/components/AudioAnalyzer";
import AITools from "@/components/AITools";
import VMController from "@/components/VMController";
import DAWWorkflow from "@/components/DAWWorkflow";
import StudioMarketplace from "@/components/StudioMarketplace";
import StudioFlowConnect from "@/components/StudioFlowConnect";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/contexts/ThemeContext";
import { useDashboard, WidgetId } from "@/contexts/dashboard/useDashboard";
import { useIsMobile } from "@/hooks/use-mobile";
import DashboardWidget from "@/components/DashboardWidget";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Sparkles, Clock, TrendingUp, GitFork, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

const Dashboard = () => {
  const { themeVariant } = useTheme();
  const { user, profile } = useAuth();
  const { isWidgetVisible, hasFeatureAccess } = useDashboard();
  const isMobile = useIsMobile();

  const quickStats = [
    { 
      title: "Active Projects", 
      value: "12", 
      icon: <Music className="h-4 w-4 text-primary" />,
      link: "/projects"
    },
    { 
      title: "Collaborators", 
      value: "8", 
      icon: <Users className="h-4 w-4 text-orange-500" />,
      link: "/collaborators"
    },
    { 
      title: "Recent Sessions", 
      value: "24", 
      icon: <Clock className="h-4 w-4 text-blue-500" />,
      link: "/sessions"
    },
    { 
      title: "DAW Integrations", 
      value: "3", 
      icon: <GitFork className="h-4 w-4 text-green-500" />,
      link: "/integrations"
    },
  ];

  return (
    <SidebarLayout>
      <Header />
      
      <main className="flex-1 px-4 py-6 md:px-6 lg:px-8 bg-background overflow-auto">
        <div className="max-w-[1200px] mx-auto space-y-8 animate-fade-in">
          <section>
            <h1 className="text-3xl font-bold">Welcome back, {profile?.username || "Producer"}</h1>
            <p className="text-muted-foreground">Here's what's happening in your studio today</p>
          </section>
          
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickStats.map((stat, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className="bg-muted rounded-full p-3">
                    {stat.icon}
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>
          
          <section className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Studio Hub</h2>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <p className="text-muted-foreground">Access your studio tools and production resources</p>
          </section>
          
          <section className="space-y-6">
            {/* Always show StudioFlow Connect as the main MVP feature */}
            {isWidgetVisible('connect') && (
              <DashboardWidget id="connect" title="StudioFlow Connect">
                <StudioFlowConnect />
              </DashboardWidget>
            )}
            
            {isWidgetVisible('audio') && hasFeatureAccess('audio') && (
              <DashboardWidget id="audio" title="Audio Analysis">
                <AudioAnalyzer />
              </DashboardWidget>
            )}
            
            {isWidgetVisible('ai') && hasFeatureAccess('ai') && (
              <DashboardWidget id="ai" title="AI-Powered Tools" isPremiumFeature>
                <AITools />
              </DashboardWidget>
            )}
            
            {isWidgetVisible('system') && hasFeatureAccess('system') && (
              <DashboardWidget id="system" title="System Monitor" isPremiumFeature>
                <SystemMonitor />
              </DashboardWidget>
            )}
            
            {isWidgetVisible('vm') && hasFeatureAccess('vm') && (
              <DashboardWidget id="vm" title="Virtual Machine Controller" isPremiumFeature>
                <VMController />
              </DashboardWidget>
            )}
            
            {isWidgetVisible('daw') && hasFeatureAccess('daw') && (
              <DashboardWidget id="daw" title="DAW Workflow Integration" isPremiumFeature>
                <DAWWorkflow />
              </DashboardWidget>
            )}
            
            {isWidgetVisible('marketplace') && hasFeatureAccess('marketplace') && (
              <DashboardWidget id="marketplace" title="Studio Marketplace" isPremiumFeature>
                <StudioMarketplace />
              </DashboardWidget>
            )}
          </section>
        </div>
      </main>
    </SidebarLayout>
  );
};

export default Dashboard;
