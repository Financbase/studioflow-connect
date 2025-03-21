import React, { useState } from "react";
import { SidebarLayout } from "@/components/layout/Sidebar";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDashboard } from "@/contexts/dashboard/useDashboard";
import { BarChart2, Music, Headphones, Share2, Sparkles, PieChart, BarChart, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/contexts/ThemeContext";
import { Link } from "react-router-dom";
import ZenMode from "@/components/zen/ZenMode";
import { useIsMobile } from "@/hooks/use-mobile";
import { ZenModeOptions } from "@/hooks/use-zen-mode";

const Dashboard = () => {
  const { pricingTier, hasFeatureAccess } = useDashboard();
  const { themeVariant } = useTheme();
  const isMobile = useIsMobile();
  const [zenModeActive, setZenModeActive] = useState(false);
  const [zenModeOptions, setZenModeOptions] = useState<ZenModeOptions>({
    theme: 'minimal',
    soundscape: 'silence',
    enableTimers: false,
    hideNotifications: true
  });

  // Quick stats for the dashboard
  const quickStats = [
    { 
      title: "Audio Projects", 
      value: "12", 
      description: "Active projects", 
      change: "+2",
      color: "progress-gradient-purple"
    },
    { 
      title: "Connected Devices", 
      value: "3", 
      description: "Available devices", 
      change: "+1",
      color: "progress-gradient-blue"
    },
    { 
      title: "Storage Used", 
      value: "45%", 
      description: "15GB of 30GB", 
      change: "+5%",
      color: "progress-gradient-amber"
    },
    { 
      title: "Recent Activity", 
      value: "24", 
      description: "Actions this week", 
      change: "+10",
      color: "progress-gradient-purple"
    }
  ];

  // Recent activity for timeline
  const recentActivity = [
    { id: 1, action: "Project Created", name: "Ambient Soundscape", time: "2 hours ago" },
    { id: 2, action: "File Uploaded", name: "vocal_take_final.wav", time: "Yesterday" },
    { id: 3, action: "Device Connected", name: "Focusrite Scarlett 2i2", time: "3 days ago" },
    { id: 4, action: "Project Shared", name: "Summer Beats EP", time: "1 week ago" }
  ];

  return (
    <SidebarLayout>
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 bg-background animate-fade-in">
        <div className="max-w-[1200px] mx-auto space-y-6">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">Welcome to your StudioFlow dashboard.</p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button onClick={() => setZenModeActive(true)} variant="outline" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                <span>Zen Mode</span>
              </Button>
              
              <Button asChild variant="default">
                <Link to="/connect">
                  <Share2 className="h-4 w-4 mr-2" />
                  <span>Connect Device</span>
                </Link>
              </Button>
            </div>
          </div>
          
          <Separator className={themeVariant === "windows" ? "border-b-2" : ""} />
          
          {/* Quick Stats Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Quick Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickStats.map((stat, index) => (
                <Card key={index} className="dashboard-stat-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{stat.title}</CardTitle>
                    <CardDescription>{stat.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-3xl font-bold">{stat.value}</span>
                      <span className="text-sm text-green-500">{stat.change}</span>
                    </div>
                    <Progress value={65} className={stat.color} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
          
          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Activity and Charts Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Charts Tab */}
              <Card>
                <CardHeader>
                  <CardTitle>Analytics</CardTitle>
                  <CardDescription>Your audio production activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="activity">
                    <TabsList className="mb-4">
                      <TabsTrigger value="activity">Activity</TabsTrigger>
                      <TabsTrigger value="storage">Storage</TabsTrigger>
                      <TabsTrigger value="performance">Performance</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="activity" className="space-y-4">
                      <div className="flex items-center justify-center h-[200px] border rounded-md">
                        {/* Placeholder for activity chart */}
                        <div className="text-center">
                          <Activity className="h-16 w-16 mx-auto text-muted-foreground" />
                          <p className="mt-2 text-muted-foreground">Activity data visualization</p>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="storage" className="space-y-4">
                      <div className="flex items-center justify-center h-[200px] border rounded-md">
                        {/* Placeholder for storage chart */}
                        <div className="text-center">
                          <PieChart className="h-16 w-16 mx-auto text-muted-foreground" />
                          <p className="mt-2 text-muted-foreground">Storage usage breakdown</p>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="performance" className="space-y-4">
                      <div className="flex items-center justify-center h-[200px] border rounded-md">
                        {/* Placeholder for performance chart */}
                        <div className="text-center">
                          <BarChart className="h-16 w-16 mx-auto text-muted-foreground" />
                          <p className="mt-2 text-muted-foreground">System performance metrics</p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest actions and updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {recentActivity.map((item) => (
                      <li key={item.id} className="flex items-start gap-4 pb-4 border-b last:border-0">
                        <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
                        <div className="flex-1">
                          <p className="font-medium">{item.action}</p>
                          <p className="text-sm text-muted-foreground">{item.name}</p>
                        </div>
                        <div className="text-sm text-muted-foreground">{item.time}</div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            {/* Quick Actions and Recommendations */}
            <div className="space-y-6">
              {/* Quick Links */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Frequently used features</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="h-auto py-4 justify-start flex-col items-center" asChild>
                    <Link to="/projects">
                      <Music className="h-5 w-5 mb-1" />
                      <span>New Project</span>
                    </Link>
                  </Button>
                  
                  <Button variant="outline" className="h-auto py-4 justify-start flex-col items-center" asChild>
                    <Link to="/library">
                      <Headphones className="h-5 w-5 mb-1" />
                      <span>My Library</span>
                    </Link>
                  </Button>
                  
                  <Button variant="outline" className="h-auto py-4 justify-start flex-col items-center" asChild>
                    <Link to="/connect">
                      <Share2 className="h-5 w-5 mb-1" />
                      <span>Connect</span>
                    </Link>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className={`h-auto py-4 justify-start flex-col items-center ${!hasFeatureAccess('ai') ? 'opacity-50' : ''}`}
                    disabled={!hasFeatureAccess('ai')}
                    asChild={hasFeatureAccess('ai')}
                  >
                    {hasFeatureAccess('ai') ? (
                      <Link to="/ai-tools">
                        <Sparkles className="h-5 w-5 mb-1" />
                        <span>AI Tools</span>
                      </Link>
                    ) : (
                      <div>
                        <Sparkles className="h-5 w-5 mb-1" />
                        <span>AI Tools</span>
                      </div>
                    )}
                  </Button>
                </CardContent>
              </Card>
              
              {/* Usage Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Usage Stats</CardTitle>
                  <CardDescription>This month's activity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>CPU Usage</span>
                      <span className="font-medium">65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Storage</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Projects</span>
                      <span className="font-medium">12/20</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>AI Credits</span>
                      <span className="font-medium">38%</span>
                    </div>
                    <Progress value={38} className="h-2" />
                  </div>
                </CardContent>
              </Card>
              
              {/* Plan Info */}
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle>Your Plan</CardTitle>
                  <CardDescription>Current subscription details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold capitalize">{pricingTier} Plan</span>
                    {pricingTier !== 'enterprise' && (
                      <Button size="sm" variant="outline" className="border-primary/30" asChild>
                        <Link to="/subscription">Upgrade</Link>
                      </Button>
                    )}
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Projects</span>
                      <span>{pricingTier === 'free' ? '5' : pricingTier === 'standard' ? '20' : 'Unlimited'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Storage</span>
                      <span>{pricingTier === 'free' ? '5GB' : pricingTier === 'standard' ? '30GB' : '100GB'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>AI Features</span>
                      <span>{pricingTier === 'free' ? 'Limited' : 'Full Access'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
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
