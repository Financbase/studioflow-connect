
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ContributorProps {
  name: string;
  tier: "Gold" | "Platinum" | "Diamond";
  joinDate: string;
  avatarUrl?: string;
}

const TopContributorsTab: React.FC<{ contributors: ContributorProps[] }> = ({ contributors }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Our Community Heroes</CardTitle>
        <CardDescription>Thank you for your support!</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {contributors.map((contributor, index) => (
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
  );
};

export default TopContributorsTab;
