
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Award, Users, Gift, ChevronRight, Clock } from "lucide-react";

const FundingProgress: React.FC = () => {
  // Funding data - would come from API in production
  const currentFunding = 24850;
  const goal = 50000;
  const percentComplete = Math.min(100, Math.round((currentFunding / goal) * 100));
  const daysRemaining = 18;
  const backers = 347;
  
  // Funding tiers
  const tiers = [
    { 
      name: "Supporter", 
      amount: "$20+", 
      benefits: ["Early access to new features", "Supporter badge", "Discord access"], 
      backers: 214,
      icon: <Heart className="h-5 w-5 text-rose-500" />
    },
    { 
      name: "Producer", 
      amount: "$50+", 
      benefits: ["All Supporter benefits", "Feature voting rights", "Monthly Q&A sessions", "Producer badge"], 
      backers: 98,
      icon: <Award className="h-5 w-5 text-amber-500" />
    },
    { 
      name: "Studio Pro", 
      amount: "$100+", 
      benefits: ["All Producer benefits", "Co-design session", "Name in credits", "Pro badge", "1-year Pro subscription"], 
      backers: 35,
      icon: <Users className="h-5 w-5 text-accent-primary" />
    }
  ];
  
  // Recent backers - would come from API in production
  const recentBackers = [
    { name: "Alex", location: "Berlin", tier: "Producer", timeAgo: "2 minutes ago" },
    { name: "Sarah", location: "Toronto", tier: "Studio Pro", timeAgo: "15 minutes ago" },
    { name: "Michael", location: "Austin", tier: "Supporter", timeAgo: "1 hour ago" },
    { name: "Jaime", location: "Tokyo", tier: "Producer", timeAgo: "3 hours ago" }
  ];
  
  // Fund allocation data
  const fundAllocation = [
    { category: "Core Development", percentage: 25 },
    { category: "Creator Grants", percentage: 30 },
    { category: "Free Education", percentage: 20 },
    { category: "AR Research", percentage: 15 },
    { category: "Operations", percentage: 10 }
  ];
  
  return (
    <div className="space-y-6">
      <Card className="border-highlight/30 bg-gradient-to-b from-background to-background/95">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <Gift className="h-6 w-6 text-highlight" />
                StudioFlow Connect Kickstarter
              </CardTitle>
              <CardDescription>Help us build the future of music production</CardDescription>
            </div>
            <Badge variant="outline" className="bg-highlight/10 text-highlight border-highlight/30">
              {daysRemaining} days left
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">${currentFunding.toLocaleString()}</span>
              <span className="text-sm text-muted-foreground">of ${goal.toLocaleString()} goal</span>
            </div>
            <Progress value={percentComplete} className="h-3" />
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>{percentComplete}% funded</span>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{backers} backers</span>
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <Button className="w-full bg-highlight hover:bg-highlight/90 text-black">
              Back This Project
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="tiers">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="tiers">Funding Tiers</TabsTrigger>
          <TabsTrigger value="backers">Recent Backers</TabsTrigger>
          <TabsTrigger value="impact">Your Impact</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tiers" className="space-y-4">
          {tiers.map((tier, index) => (
            <Card key={index} className="border-muted overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {tier.icon}
                    {tier.name}
                  </CardTitle>
                  <Badge variant="secondary">{tier.amount}</Badge>
                </div>
                <CardDescription>{tier.backers} backers</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  {tier.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <ChevronRight className="h-3 w-3 text-primary" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="bg-muted/20 border-t border-border/50">
                <Button className="w-full" variant="outline">Select {tier.name} Tier</Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="backers">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Latest Supporters</CardTitle>
              <CardDescription>Join these amazing people backing our project</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {recentBackers.map((backer, index) => (
                  <li key={index} className="flex items-center justify-between pb-3 border-b border-border/40 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-muted h-8 w-8 flex items-center justify-center">
                        {backer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{backer.name} from {backer.location}</p>
                        <p className="text-xs text-muted-foreground">Became a {backer.tier}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {backer.timeAgo}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="border-t border-border/50 bg-muted/20">
              <Button variant="ghost" className="w-full text-xs">
                See All Backers
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="impact">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Where Your Money Goes</CardTitle>
              <CardDescription>Transparency in how we allocate funding</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {fundAllocation.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{item.category}</span>
                    <span className="text-sm">{item.percentage}%</span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                  {index === 0 && (
                    <p className="text-xs text-muted-foreground pt-1">Building and improving the core platform</p>
                  )}
                  {index === 1 && (
                    <p className="text-xs text-muted-foreground pt-1">Supporting independent audio creators</p>
                  )}
                </div>
              ))}
            </CardContent>
            <CardFooter className="border-t border-border/50 bg-muted/20 text-xs text-muted-foreground">
              <p>We publish quarterly transparency reports on all fund allocations</p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FundingProgress;
