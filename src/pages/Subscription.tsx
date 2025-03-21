
import React from "react";
import { SidebarLayout } from "@/components/layout/Sidebar";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";
import { useDashboard } from "@/contexts/dashboard/useDashboard";
import { toast } from "@/components/ui/use-toast";

interface PlanFeature {
  name: string;
  free: boolean;
  standard: boolean;
  pro: boolean;
  enterprise: boolean;
}

const Subscription: React.FC = () => {
  const { pricingTier, setPricingTier } = useDashboard();

  const planFeatures: PlanFeature[] = [
    { name: "Basic Studio Access", free: true, standard: true, pro: true, enterprise: true },
    { name: "Cloud Storage", free: true, standard: true, pro: true, enterprise: true },
    { name: "Project Exports", free: true, standard: true, pro: true, enterprise: true },
    { name: "Advanced Audio Tools", free: false, standard: true, pro: true, enterprise: true },
    { name: "Unlimited Projects", free: false, standard: true, pro: true, enterprise: true },
    { name: "AI Audio Tools", free: false, standard: false, pro: true, enterprise: true },
    { name: "Priority Support", free: false, standard: false, pro: true, enterprise: true },
    { name: "Custom Sound Library", free: false, standard: false, pro: false, enterprise: true },
    { name: "Dedicated Account Manager", free: false, standard: false, pro: false, enterprise: true },
    { name: "White Label Option", free: false, standard: false, pro: false, enterprise: true },
  ];

  const handleUpgrade = (plan: string) => {
    // In a real app, this would navigate to payment
    toast({
      title: "Upgrade Initiated",
      description: `You've selected to upgrade to the ${plan} plan. In a real app, this would take you to payment.`,
    });
  };

  const handleSwitch = (plan: "free" | "standard" | "pro" | "enterprise") => {
    setPricingTier(plan);
    toast({
      title: "Plan Switched",
      description: `Your plan has been switched to ${plan}. In a real app, this would be connected to payment systems.`,
    });
  };

  const FeatureCheck = ({ included }: { included: boolean }) => {
    return included ? (
      <CheckCircle2 className="h-5 w-5 text-green-500" />
    ) : (
      <XCircle className="h-5 w-5 text-gray-300" />
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
                  {planFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <FeatureCheck included={feature.free} />
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
                  {planFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <FeatureCheck included={feature.standard} />
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
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white w-fit mb-2">Pro</Badge>
                <CardTitle className="text-2xl">Pro</CardTitle>
                <CardDescription>For serious creators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-6">$19.99<span className="text-sm font-normal text-muted-foreground"> / month</span></div>
                <ul className="space-y-2">
                  {planFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <FeatureCheck included={feature.pro} />
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
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white"
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
                <Badge className="bg-gradient-to-r from-purple-500 to-red-500 text-white w-fit mb-2">Enterprise</Badge>
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <CardDescription>For professional studios</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-6">$49.99<span className="text-sm font-normal text-muted-foreground"> / month</span></div>
                <ul className="space-y-2">
                  {planFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <FeatureCheck included={feature.enterprise} />
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
                    className="w-full bg-gradient-to-r from-purple-500 to-red-500 text-white"
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
        </div>
      </main>
    </SidebarLayout>
  );
};

export default Subscription;
