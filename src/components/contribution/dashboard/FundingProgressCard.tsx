
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

interface FundingStatsProps {
  currentAmount: number;
  targetAmount: number;
  backerCount: number;
  daysRemaining: number;
  percentComplete: number;
}

const FundingProgressCard: React.FC<{ fundingStats: FundingStatsProps }> = ({ fundingStats }) => {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader className="pb-2">
        <CardTitle>Funding Progress</CardTitle>
        <CardDescription>
          Help us reach our goal to build the future of audio production
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-end mb-1">
            <div>
              <span className="text-3xl font-bold">${fundingStats.currentAmount.toLocaleString()}</span>
              <span className="text-muted-foreground ml-2">of ${fundingStats.targetAmount.toLocaleString()}</span>
            </div>
            <Badge variant="outline" className="bg-accent/10 text-accent">
              {fundingStats.daysRemaining} days left
            </Badge>
          </div>
          
          <Progress value={fundingStats.percentComplete} className="h-2" />
          
          <div className="flex justify-between text-sm text-muted-foreground">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{fundingStats.backerCount} backers</span>
            </div>
            <div>{fundingStats.percentComplete}% complete</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FundingProgressCard;
