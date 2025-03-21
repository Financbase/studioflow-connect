
import React from "react";
import { SidebarLayout } from "@/components/layout/Sidebar";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "react-router-dom";
import { AlertCircle, Newspaper, BarChart2, Users, Music, MessageSquare } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Home = () => {
  const { themeVariant } = useTheme();
  const { user, profile } = useAuth();
  
  const news = [
    {
      title: "New VST Plugin Release: SoundScape Pro",
      date: "3 hours ago",
      excerpt: "The latest virtual instrument from AudioTech features 200+ presets and advanced wavetable synthesis.",
      category: "Industry News"
    },
    {
      title: "Grammy Nominations Announced",
      date: "1 day ago",
      excerpt: "This year's nominations include several independent artists who used DAW-based production.",
      category: "Events"
    },
    {
      title: "StudioFlow v2.1 Coming Next Month",
      date: "2 days ago",
      excerpt: "Our next update will include enhanced DAW integration and improved audio analysis tools.",
      category: "Updates"
    }
  ];

  const updates = [
    {
      title: "Pro Feature Access",
      description: "You now have access to all premium features",
      icon: <AlertCircle className="h-5 w-5 text-blue-500" />
    },
    {
      title: "New Collaboration Invite",
      description: "Dave Miller invited you to 'Summer Project'",
      icon: <Users className="h-5 w-5 text-green-500" />
    }
  ];

  return (
    <SidebarLayout>
      <Header />
      
      <main className="flex-1 px-4 py-6 md:px-6 lg:px-8 bg-background overflow-auto">
        <div className="max-w-[1200px] mx-auto space-y-8 animate-fade-in">
          <section className="space-y-2">
            <h1 className="text-3xl font-bold">Welcome to StudioFlow</h1>
            <p className="text-muted-foreground">
              Your home for music production tools and resources
            </p>
          </section>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5 text-primary" />
                  What's New
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {updates.map((update, i) => (
                  <div key={i} className="flex items-start gap-3 border-b pb-3 last:border-0 last:pb-0">
                    {update.icon}
                    <div>
                      <h3 className="font-medium">{update.title}</h3>
                      <p className="text-sm text-muted-foreground">{update.description}</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full mt-2">
                  View All Notifications
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <BarChart2 className="mr-2 h-5 w-5 text-primary" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-lg p-3">
                    <p className="text-muted-foreground text-sm">Active Projects</p>
                    <p className="text-2xl font-bold">8</p>
                  </div>
                  <div className="border rounded-lg p-3">
                    <p className="text-muted-foreground text-sm">Recent Sessions</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  <div className="border rounded-lg p-3">
                    <p className="text-muted-foreground text-sm">Storage Used</p>
                    <p className="text-2xl font-bold">64%</p>
                  </div>
                  <div className="border rounded-lg p-3">
                    <p className="text-muted-foreground text-sm">Collaborators</p>
                    <p className="text-2xl font-bold">6</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-2">
                  <Link to="/dashboard">Go to Dashboard</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center">
                <Newspaper className="mr-2 h-5 w-5" />
                Music Industry News
              </h2>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3">
              {news.map((item, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="bg-muted h-32 flex items-center justify-center">
                    <Music className="h-10 w-10 opacity-50" />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {item.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{item.date}</span>
                    </div>
                    <h3 className="font-medium mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.excerpt}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
          
          <Separator className={themeVariant === "windows" ? "border-b-2" : ""} />
          
          <section className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                  Community Discussions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-b pb-3">
                    <div className="flex justify-between mb-1">
                      <h3 className="font-medium">Best VST for orchestral sounds?</h3>
                      <span className="text-xs text-muted-foreground">12 replies</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Started by Alex Chen • 3 hours ago</p>
                  </div>
                  <div className="border-b pb-3">
                    <div className="flex justify-between mb-1">
                      <h3 className="font-medium">Logic Pro vs Ableton for electronic music</h3>
                      <span className="text-xs text-muted-foreground">28 replies</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Started by Jamie Wilson • 1 day ago</p>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <h3 className="font-medium">Recommended monitors under $500?</h3>
                      <span className="text-xs text-muted-foreground">7 replies</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Started by Sam Taylor • 2 days ago</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  Join Discussion
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <Music className="mr-2 h-5 w-5 text-primary" />
                  Featured Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3 border-b pb-3">
                    <div className="bg-muted h-16 w-16 rounded-md flex items-center justify-center">
                      <Music className="h-8 w-8 opacity-50" />
                    </div>
                    <div>
                      <h3 className="font-medium">Mixing Vocals: Professional Techniques</h3>
                      <p className="text-sm text-muted-foreground">Tutorial • 15 min read</p>
                    </div>
                  </div>
                  <div className="flex gap-3 border-b pb-3">
                    <div className="bg-muted h-16 w-16 rounded-md flex items-center justify-center">
                      <Music className="h-8 w-8 opacity-50" />
                    </div>
                    <div>
                      <h3 className="font-medium">60-Second Tips: Sidechain Compression</h3>
                      <p className="text-sm text-muted-foreground">Video • 1 min watch</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="bg-muted h-16 w-16 rounded-md flex items-center justify-center">
                      <Music className="h-8 w-8 opacity-50" />
                    </div>
                    <div>
                      <h3 className="font-medium">Weekend Project: Build a DIY Acoustic Panel</h3>
                      <p className="text-sm text-muted-foreground">Guide • 8 min read</p>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  Browse Content Library
                </Button>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </SidebarLayout>
  );
};

export default Home;
