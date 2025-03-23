
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Github, 
  Users, 
  Share2, 
  Star, 
  GitFork as ForkIcon, 
  Eye, 
  AlertCircle, 
  MessageCircle, 
  Code, 
  BookOpen,
  Lightbulb
} from "lucide-react";
import { useLanguage } from "@/contexts/language";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CommunityTab: React.FC = () => {
  const { t, isInitialized } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");
  
  // This would ideally come from an API in a real implementation
  const communityStats = {
    stars: "2.4k",
    forks: "348",
    contributors: "76",
    openIssues: "42",
    // Added fields for expanding functionality
    pullRequests: "28",
    discussions: "156",
    discord: "1.2k"
  };

  // Top contributors data
  const topContributors = [
    { name: "Alex Chen", avatar: "", role: "Core Developer", contributions: 143 },
    { name: "Maria Rodriguez", avatar: "", role: "UI/UX Designer", contributions: 112 },
    { name: "James Kim", avatar: "", role: "Audio Engineer", contributions: 84 },
    { name: "Sarah Johnson", avatar: "", role: "Documentation", contributions: 67 }
  ];

  // Current initiatives
  const currentInitiatives = [
    {
      name: "Plugin Bridge Optimization",
      progress: 65,
      description: "Reducing CPU overhead in plugin virtualization",
      category: "Performance"
    },
    {
      name: "File System Access API",
      progress: 80,
      description: "Enhancing browser-based storage capabilities",
      category: "Web Features"
    },
    {
      name: "Multi-language Documentation",
      progress: 45,
      description: "Translating docs to Spanish, Japanese, and German",
      category: "Documentation"
    }
  ];

  const handleJoinCommunity = (platform: string) => {
    toast({
      title: `Joining ${platform}`,
      description: `You'll be redirected to our ${platform} page in a moment.`,
      duration: 3000
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-3 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="contributors">Contributors</TabsTrigger>
          <TabsTrigger value="getInvolved">Get Involved</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="bg-muted/30 p-6 rounded-lg border border-muted">
            <h3 className="text-xl font-semibold mb-4">
              {isInitialized ? t("community.joinHeading") : "Join the StudioFlow Connect Community"}
            </h3>
            <p className="mb-4">
              {isInitialized 
                ? t("community.description") 
                : "StudioFlow Connect is an open-source project driving innovation in audio production. Join our growing community of developers, audio engineers, and music producers."}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card className="bg-card/60 hover:bg-card/80 transition-colors">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <Star className="h-5 w-5 mb-1 text-yellow-500" />
                  <div className="text-xl font-bold">{communityStats.stars}</div>
                  <div className="text-xs text-muted-foreground">GitHub Stars</div>
                </CardContent>
              </Card>
              
              <Card className="bg-card/60 hover:bg-card/80 transition-colors">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <ForkIcon className="h-5 w-5 mb-1 text-blue-500" />
                  <div className="text-xl font-bold">{communityStats.forks}</div>
                  <div className="text-xs text-muted-foreground">Forks</div>
                </CardContent>
              </Card>
              
              <Card className="bg-card/60 hover:bg-card/80 transition-colors">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <Users className="h-5 w-5 mb-1 text-green-500" />
                  <div className="text-xl font-bold">{communityStats.contributors}</div>
                  <div className="text-xs text-muted-foreground">Contributors</div>
                </CardContent>
              </Card>
              
              <Card className="bg-card/60 hover:bg-card/80 transition-colors">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <AlertCircle className="h-5 w-5 mb-1 text-amber-500" />
                  <div className="text-xl font-bold">{communityStats.openIssues}</div>
                  <div className="text-xs text-muted-foreground">Open Issues</div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-background/70 hover:bg-background/90 transition-colors">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <Github className="h-8 w-8 mb-2 text-primary" />
                  <h4 className="font-medium mb-1">{isInitialized ? t("community.github") : "GitHub"}</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    {isInitialized 
                      ? t("community.githubDesc") 
                      : "Contribute code, report issues, and help build the future"}
                  </p>
                  <Button size="sm" variant="outline" className="w-full" onClick={() => handleJoinCommunity("GitHub")}>
                    {isInitialized ? t("community.viewRepo") : "View Repository"}
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-background/70 hover:bg-background/90 transition-colors">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <MessageCircle className="h-8 w-8 mb-2 text-primary" />
                  <h4 className="font-medium mb-1">{isInitialized ? t("community.forum") : "Discord Community"}</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    {isInitialized 
                      ? t("community.forumDesc") 
                      : "Chat with developers and users in our active Discord server"}
                  </p>
                  <Button size="sm" variant="outline" className="w-full" onClick={() => handleJoinCommunity("Discord")}>
                    {isInitialized ? t("community.joinDiscussion") : "Join Server"}
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-background/70 hover:bg-background/90 transition-colors">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <Share2 className="h-8 w-8 mb-2 text-primary" />
                  <h4 className="font-medium mb-1">{isInitialized ? t("community.support") : "Support"}</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    {isInitialized 
                      ? t("community.supportDesc") 
                      : "Back the VR Mixing Project and StudioFlow Connect development"}
                  </p>
                  <Button size="sm" variant="default" className="w-full" onClick={() => handleJoinCommunity("Funding")}>
                    {isInitialized ? t("community.supportProject") : "Support the Project"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Card className="mt-6">
            <CardHeader>
              <h3 className="text-lg font-semibold">{isInitialized ? t("community.roadmapTitle") : "Current Community Initiatives"}</h3>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentInitiatives.map((initiative, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-primary/10 text-primary">{initiative.category}</Badge>
                    <h4 className="font-medium">{initiative.name}</h4>
                    <span className="ml-auto text-sm text-muted-foreground">{initiative.progress}%</span>
                  </div>
                  <p className="text-sm text-muted-foreground pl-4">
                    {initiative.description}
                  </p>
                  <Progress value={initiative.progress} className="h-2" />
                </div>
              ))}
              
              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full">
                  {isInitialized ? t("community.viewAllInitiatives") : "View All Community Initiatives"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contributors">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Top Contributors</h3>
              <p className="text-sm text-muted-foreground">
                Recognizing the incredible people who make StudioFlow Connect possible
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {topContributors.map((contributor, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-md border bg-card/50">
                    <Avatar>
                      <AvatarImage src={contributor.avatar} />
                      <AvatarFallback>{contributor.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{contributor.name}</div>
                      <div className="text-xs text-muted-foreground">{contributor.role}</div>
                    </div>
                    <div className="ml-auto text-right">
                      <div className="text-sm font-medium">{contributor.contributions}</div>
                      <div className="text-xs text-muted-foreground">contributions</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Card className="bg-muted/20">
                <CardContent className="p-4 space-y-4">
                  <h4 className="font-medium">Monthly Recognition</h4>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-3 rounded-md bg-card">
                      <Badge className="bg-yellow-500 mb-2">1st</Badge>
                      <div className="text-sm font-medium">Alex Chen</div>
                      <div className="text-xs text-muted-foreground">43 commits</div>
                    </div>
                    <div className="p-3 rounded-md bg-card">
                      <Badge className="bg-slate-400 mb-2">2nd</Badge>
                      <div className="text-sm font-medium">Maria R.</div>
                      <div className="text-xs text-muted-foreground">36 commits</div>
                    </div>
                    <div className="p-3 rounded-md bg-card">
                      <Badge className="bg-amber-700 mb-2">3rd</Badge>
                      <div className="text-sm font-medium">James K.</div>
                      <div className="text-xs text-muted-foreground">28 commits</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-muted/10">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Code className="h-5 w-5 text-indigo-500" />
                      <h4 className="font-medium">Code Statistics</h4>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Total commits:</span>
                        <span className="font-medium">2,467</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Pull requests merged:</span>
                        <span className="font-medium">438</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Lines of code:</span>
                        <span className="font-medium">124,562</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-muted/10">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="h-5 w-5 text-emerald-500" />
                      <h4 className="font-medium">Documentation</h4>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Pages written:</span>
                        <span className="font-medium">216</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Languages supported:</span>
                        <span className="font-medium">4</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Documentation PRs:</span>
                        <span className="font-medium">124</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <Button variant="outline" className="w-full">
                See All {communityStats.contributors} Contributors
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="getInvolved">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Get Involved</h3>
              <p className="text-sm text-muted-foreground">
                There are many ways to contribute to StudioFlow Connect
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-muted/10">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Code className="h-5 w-5 text-indigo-500" />
                      <h4 className="font-medium">Code Contributions</h4>
                    </div>
                    <ul className="space-y-3 text-sm pl-2">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5"></div>
                        <span>Fix bugs and implement new features</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5"></div>
                        <span>Improve performance and accessibility</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5"></div>
                        <span>Write tests and improve code quality</span>
                      </li>
                    </ul>
                    <Button variant="outline" size="sm" className="w-full mt-3" onClick={() => handleJoinCommunity("Code")}>
                      View Good First Issues
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-muted/10">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="h-5 w-5 text-emerald-500" />
                      <h4 className="font-medium">Documentation</h4>
                    </div>
                    <ul className="space-y-3 text-sm pl-2">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5"></div>
                        <span>Write guides and tutorials</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5"></div>
                        <span>Improve API documentation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5"></div>
                        <span>Translate documentation to other languages</span>
                      </li>
                    </ul>
                    <Button variant="outline" size="sm" className="w-full mt-3" onClick={() => handleJoinCommunity("Documentation")}>
                      Join Documentation Team
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-muted/10">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="h-5 w-5 text-amber-500" />
                      <h4 className="font-medium">Feature Ideas</h4>
                    </div>
                    <ul className="space-y-3 text-sm pl-2">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5"></div>
                        <span>Suggest new features or improvements</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5"></div>
                        <span>Participate in feature discussions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5"></div>
                        <span>Vote on upcoming feature priorities</span>
                      </li>
                    </ul>
                    <Button variant="outline" size="sm" className="w-full mt-3" onClick={() => handleJoinCommunity("Ideas")}>
                      Submit Feature Ideas
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-muted/10">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Share2 className="h-5 w-5 text-blue-500" />
                      <h4 className="font-medium">Community Support</h4>
                    </div>
                    <ul className="space-y-3 text-sm pl-2">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                        <span>Help answer questions in discussions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                        <span>Create tutorials and share workflows</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                        <span>Report bugs and issues you encounter</span>
                      </li>
                    </ul>
                    <Button variant="outline" size="sm" className="w-full mt-3" onClick={() => handleJoinCommunity("Forum")}>
                      Visit Community Forum
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-muted/30 p-4 rounded-lg border border-muted">
                <h4 className="font-medium mb-2">Contributor Guidelines</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  We welcome contributions from developers of all experience levels. Before contributing, please read our 
                  contributor guidelines and code of conduct.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleJoinCommunity("Guidelines")}>
                    Contributor Guidelines
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleJoinCommunity("Code of Conduct")}>
                    Code of Conduct
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleJoinCommunity("Dev Setup")}>
                    Development Setup
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunityTab;
