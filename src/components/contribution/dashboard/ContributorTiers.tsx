
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Award, Gift } from "lucide-react";

interface ContributorTierProps {
  name: string;
  price: string;
  color: string;
  icon: React.ReactNode;
}

const ContributorTiers: React.FC<{ tiers: ContributorTierProps[] }> = ({ tiers }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Contributor Tiers</CardTitle>
        <CardDescription>Join our community of supporters</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tiers.map((tier) => (
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
  );
};

export default ContributorTiers;
