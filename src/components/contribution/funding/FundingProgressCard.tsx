
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, Users } from "lucide-react";
import { FundingProgressProps } from "./types";

const FundingProgressCard: React.FC<FundingProgressProps> = ({
  currentFunding,
  goal,
  percentComplete,
  daysRemaining,
  backers
}) => {
  return (
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
  );
};

export default FundingProgressCard;
