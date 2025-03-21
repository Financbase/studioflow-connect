
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { BackerProps } from "./types";

const RecentBackersTab: React.FC<{ recentBackers: BackerProps[] }> = ({ recentBackers }) => {
  return (
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
  );
};

export default RecentBackersTab;
