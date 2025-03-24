
import React, { useState } from "react";
import { SidebarLayout } from "@/components/layout/Sidebar";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { useDashboard } from "@/contexts/dashboard/useDashboard";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import SubscriptionPlans from "@/components/subscription/SubscriptionPlans";
import FeaturesComparison from "@/components/subscription/FeaturesComparison";
import AIAssistantInfo from "@/components/subscription/AIAssistantInfo";
import { useDashboardSettings } from "@/contexts/dashboard/hooks/useDashboardSettings";
import { PricingTier } from "@/contexts/dashboard/types";

interface PlanFeature {
  name: string;
  description: string;
  free: boolean;
  standard: boolean;
  pro: boolean;
  enterprise: boolean;
}

const Subscription: React.FC = () => {
  const { pricingTier } = useDashboard();
  const { setPricingTier } = useDashboardSettings();
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

  const handleSwitch = (plan: PricingTier) => {
    if (setPricingTier) {
      setPricingTier(plan);
    }
    setShowUpgradeAlert(false);
    toast({
      title: "Plan Switched",
      description: `Your plan has been switched to ${plan}. In a real app, this would be connected to payment systems.`,
    });
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
              <SubscriptionPlans 
                pricingTier={pricingTier} 
                planFeatures={planFeatures}
                handleSwitch={handleSwitch}
                handleUpgrade={handleUpgrade}
              />

              <div className="mt-8 p-6 bg-muted rounded-lg">
                <h2 className="text-xl font-semibold mb-2">Need a custom solution?</h2>
                <p className="text-muted-foreground mb-4">
                  Contact our sales team for custom enterprise pricing and dedicated support.
                </p>
                <Button variant="outline">Contact Sales</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="features" className="space-y-6">
              <FeaturesComparison planFeatures={planFeatures} />
            </TabsContent>
            
            <TabsContent value="assistant" className="space-y-6">
              <AIAssistantInfo 
                pricingTier={pricingTier}
                handleUpgrade={handleUpgrade}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </SidebarLayout>
  );
};

export default Subscription;
