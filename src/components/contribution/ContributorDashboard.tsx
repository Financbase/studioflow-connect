
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Star, Award, Users, GitFork, TrendingUp, Gift } from "lucide-react";

interface ContributorProps {
  name: string;
  tier: "Gold" | "Platinum" | "Diamond";
  joinDate: string;
  avatarUrl?: string;
}

interface FundingStats {
  currentAmount: number;
  targetAmount: number;
  backerCount: number;
  daysRemaining: number;
  percentComplete: number;
}

const ContributorDashboard = () => {
  // Sample data - in a real app, this would come from an API
  const fundingStats: FundingStats = {
    currentAmount: 28750,
    targetAmount: 50000,
    backerCount: 348,
    daysRemaining: 21,
    percentComplete: 57.5,
  };

  const contributorTiers = [
    { name: "Gold", price: "$20+", color: "text-yellow-400", icon: <Star className="h-4 w-4" /> },
    { name: "Platinum", price: "$50+", color: "text-zinc-300", icon: <Award className="h-4 w-4" /> },
    { name: "Diamond", price: "$100+", color: "text-blue-300", icon: <Gift className="h-4 w-4" /> },
  ];

  const topContributors: ContributorProps[] = [
    { name: "Alex Producer", tier: "Diamond", joinDate: "2023-04-12" },
    { name: "Sound Engineer", tier: "Platinum", joinDate: "2023-05-08" },
    { name: "Mix Master", tier: "Diamond", joinDate: "2023-03-29" },
    { name: "Beatmaker Pro", tier: "Gold", joinDate: "2023-06-15" },
    { name: "Studio Flow", tier: "Platinum", joinDate: "2023-05-02" },
  ];

  const impactAllocation = [
    { category: "Creator Grants", percentage: 30, color: "bg-purple-500" },
    { category: "Free Education", percentage: 20, color: "bg-blue-500" },
    { category: "Core Development", percentage: 25, color: "bg-cyan-500" },
    { category: "AR Research", percentage: 15, color: "bg-green-500" },
    { category: "Operations", percentage: 10, color: "bg-yellow-500" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">StudioFlow Contributor Hub</h2>
          <p className="text-muted-foreground">Support the open-source foundation for audio production</p>
        </div>
        <Button className="bg-accent hover:bg-accent/90">
          <Heart className="mr-2 h-4 w-4" /> Contribute Now
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Funding Progress</CardTitle>
            <CardDescription>
              Help us reach our goal to build the future of audio production
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-end mb-1">
                <div>
                  <span className="text-3xl font-bold">${fundingStats.currentAmount.toLocaleString()}</span>
                  <span className="text-muted-foreground ml-2">of ${fundingStats.targetAmount.toLocaleString()}</span>
                </div>
                <Badge variant="outline" className="bg-accent/10 text-accent">
                  {fundingStats.daysRemaining} days left
                </Badge>
              </div>
              
              <Progress value={fundingStats.percentComplete} className="h-2" />
              
              <div className="flex justify-between text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{fundingStats.backerCount} backers</span>
                </div>
                <div>{fundingStats.percentComplete}% complete</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Contributor Tiers</CardTitle>
            <CardDescription>Join our community of supporters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {contributorTiers.map((tier) => (
                <div key={tier.name} className="flex items-center p-2 border rounded-md hover:bg-muted/50 transition-colors">
                  <div className={`mr-3 ${tier.color}`}>
                    {tier.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{tier.name}</div>
                    <div className="text-sm text-muted-foreground">{tier.price}</div>
                  </div>
                  <Button variant="outline" size="sm">Join</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="impact">
        <TabsList className="mb-4">
          <TabsTrigger value="impact">Impact Transparency</TabsTrigger>
          <TabsTrigger value="contributors">Top Contributors</TabsTrigger>
          <TabsTrigger value="roadmap">Feature Roadmap</TabsTrigger>
        </TabsList>
        
        <TabsContent value="impact" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Fund Allocation</CardTitle>
              <CardDescription>How your contributions are used</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {impactAllocation.map((item) => (
                  <div key={item.category} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{item.category}</span>
                      <span className="font-medium">{item.percentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contributors" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Our Community Heroes</CardTitle>
              <CardDescription>Thank you for your support!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {topContributors.map((contributor, index) => (
                  <div key={index} className="flex items-center p-3 border rounded-md hover:bg-muted/50 transition-colors">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center mr-3">
                      {contributor.avatarUrl ? (
                        <img src={contributor.avatarUrl} alt={contributor.name} className="rounded-full" />
                      ) : (
                        <span className="text-xs font-bold">{contributor.name.substring(0, 2).toUpperCase()}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{contributor.name}</div>
                      <div className="text-xs text-muted-foreground">Since {new Date(contributor.joinDate).toLocaleDateString()}</div>
                    </div>
                    <Badge variant={contributor.tier === "Diamond" ? "default" : "outline"} className={
                      contributor.tier === "Diamond" ? "bg-blue-300/20 text-blue-300" : 
                      contributor.tier === "Platinum" ? "bg-zinc-300/20 text-zinc-300" : 
                      "bg-yellow-400/20 text-yellow-400"
                    }>
                      {contributor.tier}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-4">
              <Button variant="outline">View All Contributors</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="roadmap" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Development Roadmap</CardTitle>
              <CardDescription>Upcoming features and improvements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-500/10 text-green-500">In Progress</Badge>
                    <h3 className="font-medium">Phase 1: Cross-Platform Storage Foundation</h3>
                  </div>
                  <div className="ml-6 pl-2 border-l text-sm space-y-2">
                    <div className="flex items-start gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">StudioFlow Connect Core</p>
                        <p className="text-muted-foreground">Universal drive access and file system compatibility</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Audio Analysis Tools</p>
                        <p className="text-muted-foreground">Basic waveform and spectral visualization</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-500">Coming Soon</Badge>
                    <h3 className="font-medium">Phase 2: Collaboration & Cloud Features</h3>
                  </div>
                  <div className="ml-6 pl-2 border-l text-sm space-y-2">
                    <div className="flex items-start gap-2">
                      <GitFork className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Cloud Sync Engine</p>
                        <p className="text-muted-foreground">Seamless project syncing across devices</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <GitFork className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Real-time Collaboration</p>
                        <p className="text-muted-foreground">Multi-user session support</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-purple-500/10 text-purple-500">Future</Badge>
                    <h3 className="font-medium">Phase 3: Extended Reality Integration</h3>
                  </div>
                  <div className="ml-6 pl-2 border-l text-sm space-y-2">
                    <div className="flex items-start gap-2">
                      <GitFork className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">AR/VR Studio Environment</p>
                        <p className="text-muted-foreground">Immersive mixing and production workspace</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <GitFork className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Spatial Audio Tools</p>
                        <p className="text-muted-foreground">3D audio positioning and immersive sound design</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContributorDashboard;
