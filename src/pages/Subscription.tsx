
import React, { useState } from "react";
import { SidebarLayout } from "@/components/layout/Sidebar";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, AlertTriangle, Info, MessageSquare } from "lucide-react";
import { useDashboard } from "@/contexts/dashboard/useDashboard";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface PlanFeature {
  name: string;
  description: string;
  free: boolean;
  standard: boolean;
  pro: boolean;
  enterprise: boolean;
}

const Subscription: React.FC = () => {
  const { pricingTier, setPricingTier } = useDashboard();
  const [showUpgradeAlert, setShowUpgradeAlert] = useState(false);

  const planFeatures: PlanFeature[] = [
    { 
      name: "Basic Studio Access", 
      description: "Access to core studio features including session management and basic editing tools",
      free: true, 
      standard: true, 
      pro: true, 
      enterprise: true 
    },
    { 
      name: "Cloud Storage", 
      description: "Store your audio files in the cloud for easy access across devices",
      free: true, 
      standard: true, 
      pro: true, 
      enterprise: true 
    },
    { 
      name: "Project Exports", 
      description: "Export your projects in various formats for sharing and publishing",
      free: true, 
      standard: true, 
      pro: true, 
      enterprise: true 
    },
    { 
      name: "Advanced Audio Tools", 
      description: "Access to professional mixing and mastering tools for high-quality audio production",
      free: false, 
      standard: true, 
      pro: true, 
      enterprise: true 
    },
    { 
      name: "Unlimited Projects", 
      description: "Create and manage as many projects as you need without limitations",
      free: false, 
      standard: true, 
      pro: true, 
      enterprise: true 
    },
    { 
      name: "AI Audio Tools", 
      description: "Leverage AI to enhance your audio production workflow, including auto-mixing and mastering",
      free: false, 
      standard: false, 
      pro: true, 
      enterprise: true 
    },
    { 
      name: "Priority Support", 
      description: "Get faster responses and dedicated support for any technical issues",
      free: false, 
      standard: false, 
      pro: true, 
      enterprise: true 
    },
    { 
      name: "Custom Sound Library", 
      description: "Access an exclusive library of premium sounds and samples curated for professionals",
      free: false, 
      standard: false, 
      pro: false, 
      enterprise: true 
    },
    { 
      name: "Dedicated Account Manager", 
      description: "Work with a personal account manager who knows your specific needs and workflow",
      free: false, 
      standard: false, 
      pro: false, 
      enterprise: true 
    },
    { 
      name: "White Label Option", 
      description: "Remove StudioFlow branding for client-facing work and create branded exports",
      free: false, 
      standard: false, 
      pro: false, 
      enterprise: true 
    },
    { 
      name: "Mental Health Support", 
      description: "Access to tools and resources to maintain creative wellness and productivity",
      free: false, 
      standard: true, 
      pro: true, 
      enterprise: true 
    },
    { 
      name: "Usage Analytics", 
      description: "Get insights into your workflow patterns to optimize productivity",
      free: false, 
      standard: false, 
      pro: true, 
      enterprise: true 
    },
    { 
      name: "AI Assistant", 
      description: "Intelligent assistant to help with creative blocks, technical issues, and workflow optimization",
      free: false, 
      standard: false, 
      pro: true, 
      enterprise: true 
    },
  ];

  const handleUpgrade = (plan: string) => {
    // In a real app, this would navigate to payment
    setShowUpgradeAlert(false);
    toast({
      title: "Upgrade Initiated",
      description: `You've selected to upgrade to the ${plan} plan. In a real app, this would take you to payment.`,
    });
  };

  const handleSwitch = (plan: "free" | "standard" | "pro" | "enterprise") => {
    setPricingTier(plan);
    setShowUpgradeAlert(false);
    toast({
      title: "Plan Switched",
      description: `Your plan has been switched to ${plan}. In a real app, this would be connected to payment systems.`,
    });
  };

  const FeatureCheck = ({ included, description }: { included: boolean; description: string }) => {
    return included ? (
      <div className="flex items-start gap-2">
        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
        <div>
          <span className="font-medium">{included ? "Included" : "Not included"}</span>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
    ) : (
      <div className="flex items-start gap-2">
        <XCircle className="h-5 w-5 text-gray-300 mt-0.5" />
        <div>
          <span className="text-muted-foreground">Not included</span>
          <p className="text-xs text-muted-foreground hidden md:block">{description}</p>
        </div>
      </div>
    );
  };

  return (
    <SidebarLayout>
      <Header />
      <main className="flex-1 px-4 py-6 md:px-6 lg:px-8 bg-background overflow-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Subscription Plans</h1>
            <p className="text-muted-foreground">
              Choose the perfect plan for your audio production needs
            </p>
          </div>

          {showUpgradeAlert && (
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Something went wrong!</AlertTitle>
              <AlertDescription>
                There was an issue processing your subscription. Please try again or contact support.
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="ml-2" 
                  onClick={() => setShowUpgradeAlert(false)}
                >
                  Dismiss
                </Button>
              </AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="plans">
            <TabsList className="mb-4">
              <TabsTrigger value="plans">Plans</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
            </TabsList>
            
            <TabsContent value="plans" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Free Plan */}
                <Card className={`border-2 ${pricingTier === 'free' ? 'border-primary' : 'border-border'}`}>
                  <CardHeader>
                    <Badge variant="outline" className="w-fit mb-2">Free</Badge>
                    <CardTitle className="text-2xl">Free</CardTitle>
                    <CardDescription>Get started with basic features</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-6">$0<span className="text-sm font-normal text-muted-foreground"> / month</span></div>
                    <ul className="space-y-2">
                      {planFeatures.slice(0, 5).map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          {feature.free ? 
                            <CheckCircle2 className="h-5 w-5 text-green-500" /> : 
                            <XCircle className="h-5 w-5 text-gray-300" />
                          }
                          <span className={!feature.free ? "text-muted-foreground" : ""}>{feature.name}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant={pricingTier === 'free' ? 'secondary' : 'outline'} 
                      onClick={() => handleSwitch('free')} 
                      className="w-full"
                    >
                      {pricingTier === 'free' ? 'Current Plan' : 'Switch to Free'}
                    </Button>
                  </CardFooter>
                </Card>

                {/* Standard Plan */}
                <Card className={`border-2 ${pricingTier === 'standard' ? 'border-primary' : 'border-border'}`}>
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">Popular</Badge>
                    <CardTitle className="text-2xl">Standard</CardTitle>
                    <CardDescription>Perfect for hobbyists</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-6">$9.99<span className="text-sm font-normal text-muted-foreground"> / month</span></div>
                    <ul className="space-y-2">
                      {planFeatures.slice(0, 6).map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          {feature.standard ? 
                            <CheckCircle2 className="h-5 w-5 text-green-500" /> : 
                            <XCircle className="h-5 w-5 text-gray-300" />
                          }
                          <span className={!feature.standard ? "text-muted-foreground" : ""}>{feature.name}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    {pricingTier === 'standard' ? (
                      <Button variant="secondary" className="w-full">Current Plan</Button>
                    ) : pricingTier === 'free' ? (
                      <Button onClick={() => handleUpgrade('Standard')} className="w-full">Upgrade Now</Button>
                    ) : (
                      <Button variant="outline" onClick={() => handleSwitch('standard')} className="w-full">Switch to Standard</Button>
                    )}
                  </CardFooter>
                </Card>

                {/* Pro Plan */}
                <Card className={`border-2 ${pricingTier === 'pro' ? 'border-primary' : 'border-border'}`}>
                  <CardHeader>
                    <Badge className="bg-gradient-to-r from-gray-500 to-gray-700 text-white w-fit mb-2">Pro</Badge>
                    <CardTitle className="text-2xl">Pro</CardTitle>
                    <CardDescription>For serious creators</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-6">$19.99<span className="text-sm font-normal text-muted-foreground"> / month</span></div>
                    <ul className="space-y-2">
                      {planFeatures.slice(0, 8).map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          {feature.pro ? 
                            <CheckCircle2 className="h-5 w-5 text-green-500" /> : 
                            <XCircle className="h-5 w-5 text-gray-300" />
                          }
                          <span className={!feature.pro ? "text-muted-foreground" : ""}>{feature.name}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    {pricingTier === 'pro' ? (
                      <Button variant="secondary" className="w-full">Current Plan</Button>
                    ) : pricingTier === 'enterprise' ? (
                      <Button variant="outline" onClick={() => handleSwitch('pro')} className="w-full">Switch to Pro</Button>
                    ) : (
                      <Button 
                        className="w-full bg-gradient-to-r from-gray-500 to-gray-700 text-white"
                        onClick={() => handleUpgrade('Pro')}
                      >
                        Upgrade Now
                      </Button>
                    )}
                  </CardFooter>
                </Card>

                {/* Enterprise Plan */}
                <Card className={`border-2 ${pricingTier === 'enterprise' ? 'border-primary' : 'border-border'}`}>
                  <CardHeader>
                    <Badge className="bg-gradient-to-r from-gray-700 to-black text-white w-fit mb-2">Enterprise</Badge>
                    <CardTitle className="text-2xl">Enterprise</CardTitle>
                    <CardDescription>For professional studios</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-6">$49.99<span className="text-sm font-normal text-muted-foreground"> / month</span></div>
                    <ul className="space-y-2">
                      {planFeatures.slice(0, 10).map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          {feature.enterprise ? 
                            <CheckCircle2 className="h-5 w-5 text-green-500" /> : 
                            <XCircle className="h-5 w-5 text-gray-300" />
                          }
                          <span className={!feature.enterprise ? "text-muted-foreground" : ""}>{feature.name}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    {pricingTier === 'enterprise' ? (
                      <Button variant="secondary" className="w-full">Current Plan</Button>
                    ) : (
                      <Button 
                        className="w-full bg-gradient-to-r from-gray-700 to-black text-white"
                        onClick={() => handleUpgrade('Enterprise')}
                      >
                        Upgrade Now
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </div>

              <div className="mt-8 p-6 bg-muted rounded-lg">
                <h2 className="text-xl font-semibold mb-2">Need a custom solution?</h2>
                <p className="text-muted-foreground mb-4">
                  Contact our sales team for custom enterprise pricing and dedicated support.
                </p>
                <Button variant="outline">Contact Sales</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="features" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Feature Comparison</CardTitle>
                  <CardDescription>
                    Compare all available features across different subscription plans
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Feature</th>
                          <th className="text-center py-3 px-4">Free</th>
                          <th className="text-center py-3 px-4">Standard</th>
                          <th className="text-center py-3 px-4">Pro</th>
                          <th className="text-center py-3 px-4">Enterprise</th>
                        </tr>
                      </thead>
                      <tbody>
                        {planFeatures.map((feature, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-4 px-4">
                              <div className="font-medium">{feature.name}</div>
                              <div className="text-sm text-muted-foreground">{feature.description}</div>
                            </td>
                            <td className="text-center py-4 px-4">
                              {feature.free ? <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" /> : <XCircle className="h-5 w-5 text-gray-300 mx-auto" />}
                            </td>
                            <td className="text-center py-4 px-4">
                              {feature.standard ? <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" /> : <XCircle className="h-5 w-5 text-gray-300 mx-auto" />}
                            </td>
                            <td className="text-center py-4 px-4">
                              {feature.pro ? <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" /> : <XCircle className="h-5 w-5 text-gray-300 mx-auto" />}
                            </td>
                            <td className="text-center py-4 px-4">
                              {feature.enterprise ? <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" /> : <XCircle className="h-5 w-5 text-gray-300 mx-auto" />}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      Audio Production Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Our platform provides a comprehensive set of tools for audio production, from basic recording to advanced mixing and mastering.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                        <span>Multi-track recording and editing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                        <span>Professional mixing console</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                        <span>Suite of audio effects and processors</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                        <span>MIDI sequencing and editing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                        <span>Virtual instrument support</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      AI-Powered Tools
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Leverage cutting-edge AI technology to enhance your audio production workflow and creativity.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                        <span>Intelligent auto-mixing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                        <span>AI-assisted mastering</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                        <span>Smart instrument tuning</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                        <span>Vocal correction and enhancement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                        <span>Creative suggestion engine</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      Creative Wellness
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Tools and resources to support your mental health and maximize creative productivity.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                        <span>Workflow analysis and optimization</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                        <span>Creative block assistance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                        <span>Focus and productivity tools</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                        <span>Session planning and goal setting</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                        <span>Progress tracking and analytics</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="assistant" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    AI Assistant
                  </CardTitle>
                  <CardDescription>
                    Your intelligent companion for music production
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Available with Pro and Enterprise plans</AlertTitle>
                    <AlertDescription>
                      The AI Assistant is available to Pro and Enterprise subscribers.
                      {pricingTier !== 'pro' && pricingTier !== 'enterprise' && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="ml-2"
                          onClick={() => handleUpgrade('Pro')}
                        >
                          Upgrade Now
                        </Button>
                      )}
                    </AlertDescription>
                  </Alert>
                  
                  <div className="bg-muted/30 p-6 rounded-lg border border-muted">
                    <h3 className="text-xl font-semibold mb-4">How the AI Assistant Helps You</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <CheckCircle2 className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">Creative Support</h4>
                            <p className="text-sm text-muted-foreground">Overcome creative blocks with AI-generated suggestions for melodies, chord progressions, and arrangements</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <CheckCircle2 className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">Technical Guidance</h4>
                            <p className="text-sm text-muted-foreground">Get instant help with technical issues, mixing advice, and plugin recommendations</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <CheckCircle2 className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">Workflow Optimization</h4>
                            <p className="text-sm text-muted-foreground">Receive personalized suggestions to improve your production workflow based on your habits</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <CheckCircle2 className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">Mental Health Support</h4>
                            <p className="text-sm text-muted-foreground">Access mindfulness techniques, focus exercises, and strategies to manage creative stress</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <CheckCircle2 className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">Learning Resources</h4>
                            <p className="text-sm text-muted-foreground">Curated tutorials and learning paths based on your skill level and interests</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <CheckCircle2 className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">Usage Analytics</h4>
                            <p className="text-sm text-muted-foreground">Track your productivity, identify patterns, and get suggestions for improvement</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-card rounded-lg border border-border">
                      <h4 className="font-medium mb-2">How It Works</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Our AI Assistant uses advanced natural language processing to understand your needs and provide relevant, helpful responses. It learns from your interactions to become more personalized over time.
                      </p>
                      <div className="bg-muted p-3 rounded-md text-sm">
                        <div className="flex items-start gap-2 mb-3">
                          <span className="font-medium min-w-[80px]">You:</span>
                          <span>I'm struggling with mixing the low end of my track.</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-medium min-w-[80px]">Assistant:</span>
                          <span>I notice you've been working on bass-heavy genres lately. For your current track, try using a high-pass filter on non-bass elements around 100Hz to create more space. Then apply a gentle compression on your bass with a slow attack to preserve transients while controlling the sustain. Would you like me to suggest some specific EQ settings based on your project?</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    {(pricingTier === 'pro' || pricingTier === 'enterprise') ? (
                      <Button className="w-full md:w-auto">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Open Assistant
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => handleUpgrade('Pro')} 
                        className="w-full md:w-auto bg-gradient-to-r from-gray-500 to-gray-700 text-white"
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Upgrade to Access Assistant
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </SidebarLayout>
  );
};

export default Subscription;
