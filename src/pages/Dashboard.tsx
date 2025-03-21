
import React from "react";
import { SidebarLayout } from "@/components/layout/Sidebar";
import Header from "@/components/Header";
import SystemMonitor from "@/components/SystemMonitor";
import AudioAnalyzer from "@/components/AudioAnalyzer";
import AITools from "@/components/AITools";
import StudioFlowConnect from "@/components/StudioFlowConnect";
import { useDashboard } from "@/contexts/dashboard/useDashboard";
import { useIsMobile } from "@/hooks/use-mobile";
import DashboardWidget from "@/components/DashboardWidget";
import { Card, CardContent } from "@/components/ui/card";
import { Music, Sparkles, Clock, Users, FileAudio, Zap, ArrowUp } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  const { user, profile } = useAuth();
  const { isWidgetVisible, hasFeatureAccess, pricingTier } = useDashboard();
  const isMobile = useIsMobile();

  const quickStats = [
    { 
      title: "Active Projects", 
      value: "12", 
      icon: <Music className="h-5 w-5 text-purple-500" />,
      change: "+2",
      isPositive: true
    },
    { 
      title: "Collaborators", 
      value: "8", 
      icon: <Users className="h-5 w-5 text-orange-500" />,
      change: "+3",
      isPositive: true
    },
    { 
      title: "Recent Sessions", 
      value: "24", 
      icon: <Clock className="h-5 w-5 text-blue-500" />,
      change: "+5",
      isPositive: true
    },
    { 
      title: "Audio Files", 
      value: "156", 
      icon: <FileAudio className="h-5 w-5 text-green-500" />,
      change: "+12",
      isPositive: true
    },
  ];

  const recentActivity = [
    { id: 1, action: "Project updated", target: "Summer EP", time: "2h ago", user: "You" },
    { id: 2, action: "Audio uploaded", target: "Vocals_Final.wav", time: "5h ago", user: "Alex" },
    { id: 3, action: "Comment added", target: "Bassline Project", time: "1d ago", user: "Sarah" },
    { id: 4, action: "Session scheduled", target: "Mixing Session", time: "2d ago", user: "You" },
  ];

  return (
    <SidebarLayout>
      <Header />
      
      <main className="flex-1 px-4 py-6 md:px-6 lg:px-8 bg-background overflow-auto">
        <div className="max-w-[1200px] mx-auto space-y-8 animate-fade-in">
          {/* Welcome Section */}
          <section className="bg-gradient-to-r from-purple-600/10 via-indigo-600/10 to-blue-600/5 p-6 rounded-2xl border border-purple-100 dark:border-purple-900/20">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <Badge variant="outline" className="bg-purple-500/10 text-purple-700 dark:text-purple-300 mb-2">
                  {pricingTier.charAt(0).toUpperCase() + pricingTier.slice(1)} Plan
                </Badge>
                <h1 className="text-3xl font-bold">Welcome back, {profile?.username || "Producer"}</h1>
                <p className="text-muted-foreground mt-1">Your creative studio is looking good today.</p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Storage Usage</p>
                  <div className="flex items-center mt-1 justify-end">
                    <span className="text-sm font-medium">7.2 GB</span>
                    <span className="text-xs text-muted-foreground ml-1">/ 10 GB</span>
                  </div>
                  <Progress value={72} className="h-1.5 w-32 mt-1" />
                </div>
              </div>
            </div>
          </section>
          
          {/* Stats Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickStats.map((stat, index) => (
              <Card key={index} className="overflow-hidden border border-purple-100/50 dark:border-purple-900/20 hover:shadow-md hover:border-purple-200 dark:hover:border-purple-800/30 transition-all duration-300">
                <CardContent className="p-6 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <div className="flex items-center mt-1">
                      {stat.isPositive ? (
                        <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                      ) : (
                        <ArrowUp className="h-3 w-3 text-red-500 mr-1 rotate-180" />
                      )}
                      <span className={`text-xs ${stat.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                        {stat.change} this week
                      </span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-full p-3">
                    {stat.icon}
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>
          
          {/* Recent Activity */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="col-span-1 lg:col-span-1 border border-purple-100/50 dark:border-purple-900/20">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-amber-500" />
                  Recent Activity
                </h2>
                <div className="space-y-4">
                  {recentActivity.map((item) => (
                    <div key={item.id} className="flex items-start space-x-3 pb-3 border-b border-border last:border-0 last:pb-0">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.action}: <span className="text-purple-600 dark:text-purple-400">{item.target}</span></p>
                        <p className="text-xs text-muted-foreground mt-1">{item.time} by {item.user}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-1 lg:col-span-2 border border-purple-100/50 dark:border-purple-900/20">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-purple-500" />
                  Studio Hub
                </h2>
                
                <div className="space-y-6">
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
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </SidebarLayout>
  );
};

export default Dashboard;
