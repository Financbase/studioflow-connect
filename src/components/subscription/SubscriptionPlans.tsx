
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";
import { PricingTier } from "@/contexts/dashboard/types";
import { toast } from "@/components/ui/use-toast";

interface SubscriptionPlansProps {
  pricingTier: PricingTier;
  planFeatures: any[];
  handleSwitch: (plan: PricingTier) => void;
  handleUpgrade: (plan: string) => void;
}

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({
  pricingTier,
  planFeatures,
  handleSwitch,
  handleUpgrade
}) => {
  return (
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
  );
};

export default SubscriptionPlans;
