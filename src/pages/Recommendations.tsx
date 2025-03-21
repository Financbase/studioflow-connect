
import React, { useState } from "react";
import { SidebarLayout } from "@/components/layout/Sidebar";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Lightbulb, 
  Music, 
  Settings, 
  BookOpen, 
  ThumbsUp, 
  FileCode, 
  Headphones, 
  Zap
} from "lucide-react";
import { useDashboard } from "@/contexts/dashboard/useDashboard";
import FeatureRecommendation from "@/components/FeatureRecommendation";
import { Recommendation } from "@/components/recommendation/RecommendationCard";

const RecommendationsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { pricingTier } = useDashboard();
  
  // Sample recommendation data
  const workflowRecommendations: Recommendation[] = [
    {
      id: "rec1",
      title: "Try the Template System",
      description: "Speed up your workflow by using our pre-made project templates",
      category: "workflow",
      requiredTier: "free",
      icon: <Music className="h-5 w-5 text-primary" />,
      actionLabel: "Explore Templates",
      actionUrl: "/templates"
    },
    {
      id: "rec2",
      title: "Set Up Key Commands",
      description: "Customize your keyboard shortcuts for faster editing",
      category: "workflow",
      requiredTier: "free",
      icon: <Settings className="h-5 w-5 text-primary" />,
      actionLabel: "Setup Shortcuts",
      actionUrl: "/settings/shortcuts"
    },
    {
      id: "rec3",
      title: "Try AI Mastering",
      description: "Let our AI handle the final touches on your track",
      category: "workflow",
      requiredTier: "pro",
      icon: <Zap className="h-5 w-5 text-primary" />,
      actionLabel: "Try AI Mastering",
      actionUrl: "/ai/mastering"
    }
  ];
  
  const learningRecommendations: Recommendation[] = [
    {
      id: "rec4",
      title: "Mixing Basics Course",
      description: "Learn the fundamentals of audio mixing in our free course",
      category: "learning",
      requiredTier: "free",
      icon: <BookOpen className="h-5 w-5 text-primary" />,
      actionLabel: "Start Learning",
      actionUrl: "/learn/mixing-basics"
    },
    {
      id: "rec5",
      title: "Advanced Production Techniques",
      description: "Take your productions to the next level with advanced techniques",
      category: "learning",
      requiredTier: "standard",
      icon: <Headphones className="h-5 w-5 text-primary" />,
      actionLabel: "Start Course",
      actionUrl: "/learn/advanced-production"
    }
  ];
  
  const aiRecommendations: Recommendation[] = [
    {
      id: "rec6",
      title: "AI Stem Separation",
      description: "Extract vocals, drums, bass and more from any track",
      category: "ai",
      requiredTier: "pro",
      icon: <FileCode className="h-5 w-5 text-primary" />,
      actionLabel: "Try Stem Separation",
      actionUrl: "/ai/stem-separation"
    },
    {
      id: "rec7",
      title: "AI Vocal Enhancement",
      description: "Clean up and enhance your vocal recordings",
      category: "ai",
      requiredTier: "pro",
      icon: <Zap className="h-5 w-5 text-primary" />,
      actionLabel: "Enhance Vocals",
      actionUrl: "/ai/vocal-enhancement"
    }
  ];

  const filterRecommendations = (recommendations: Recommendation[]) => {
    if (!searchQuery) return recommendations;
    
    return recommendations.filter(rec => 
      rec.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      rec.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <SidebarLayout>
      <Header />
      <main className="flex-1 px-4 py-6 md:px-6 lg:px-8 bg-background overflow-auto">
        <div className="max-w-5xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Recommendations</h1>
            <p className="text-muted-foreground">
              Personalized suggestions to improve your workflow and skills
            </p>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search recommendations..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Card className="border-blue-500/30 bg-blue-500/5">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-blue-500" />
                <CardTitle>Tailored for You</CardTitle>
              </div>
              <CardDescription>
                Based on your {pricingTier} subscription and usage patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm">
                <ThumbsUp className="h-4 w-4 text-blue-500" />
                <span>We've analyzed your workflow and found these recommendations just for you.</span>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Recommendations</TabsTrigger>
              <TabsTrigger value="workflow">Workflow</TabsTrigger>
              <TabsTrigger value="learning">Learning</TabsTrigger>
              <TabsTrigger value="ai">AI Tools</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Settings className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-bold">Workflow Improvements</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filterRecommendations(workflowRecommendations).map(rec => (
                      <Card key={rec.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2">
                              {rec.icon}
                              <CardTitle className="text-base">{rec.title}</CardTitle>
                            </div>
                            <Badge variant={rec.requiredTier === "free" ? "outline" : "secondary"}>
                              {rec.requiredTier}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">{rec.description}</p>
                          <Button 
                            size="sm" 
                            disabled={pricingTier !== "pro" && rec.requiredTier === "pro"}
                            variant={pricingTier !== "pro" && rec.requiredTier === "pro" ? "outline" : "default"}
                          >
                            {rec.actionLabel}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-bold">Learning Resources</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filterRecommendations(learningRecommendations).map(rec => (
                      <Card key={rec.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2">
                              {rec.icon}
                              <CardTitle className="text-base">{rec.title}</CardTitle>
                            </div>
                            <Badge variant={rec.requiredTier === "free" ? "outline" : "secondary"}>
                              {rec.requiredTier}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">{rec.description}</p>
                          <Button 
                            size="sm" 
                            disabled={
                              (pricingTier === "free" && rec.requiredTier !== "free") ||
                              (pricingTier === "standard" && rec.requiredTier === "pro")
                            }
                            variant={
                              (pricingTier === "free" && rec.requiredTier !== "free") ||
                              (pricingTier === "standard" && rec.requiredTier === "pro")
                                ? "outline" : "default"
                            }
                          >
                            {rec.actionLabel}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <FileCode className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-bold">AI-Powered Features</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filterRecommendations(aiRecommendations).map(rec => (
                      <Card key={rec.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2">
                              {rec.icon}
                              <CardTitle className="text-base">{rec.title}</CardTitle>
                            </div>
                            <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                              {rec.requiredTier}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">{rec.description}</p>
                          <Button 
                            size="sm" 
                            disabled={pricingTier !== "pro" && pricingTier !== "enterprise"}
                            variant={pricingTier !== "pro" && pricingTier !== "enterprise" ? "outline" : "default"}
                            className={pricingTier === "pro" || pricingTier === "enterprise" ? "bg-gradient-to-r from-blue-500 to-purple-500" : ""}
                          >
                            {rec.actionLabel}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="workflow">
              <FeatureRecommendation recommendations={filterRecommendations(workflowRecommendations)} category="Workflow" />
            </TabsContent>
            
            <TabsContent value="learning">
              <FeatureRecommendation recommendations={filterRecommendations(learningRecommendations)} category="Learning" />
            </TabsContent>
            
            <TabsContent value="ai">
              <FeatureRecommendation recommendations={filterRecommendations(aiRecommendations)} category="AI Tools" />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </SidebarLayout>
  );
};

export default RecommendationsPage;
