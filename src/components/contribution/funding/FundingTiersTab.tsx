
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import { FundingTierProps } from "./types";

const FundingTiersTab: React.FC<{ tiers: FundingTierProps[] }> = ({ tiers }) => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default FundingTiersTab;
