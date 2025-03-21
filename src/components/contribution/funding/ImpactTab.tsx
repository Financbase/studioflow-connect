
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FundAllocationProps } from "./types";

const ImpactTab: React.FC<{ fundAllocation: FundAllocationProps[] }> = ({ fundAllocation }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Where Your Money Goes</CardTitle>
        <CardDescription>Transparency in how we allocate funding</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {fundAllocation.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">{item.category}</span>
              <span className="text-sm">{item.percentage}%</span>
            </div>
            <Progress value={item.percentage} className="h-2" />
            {index === 0 && (
              <p className="text-xs text-muted-foreground pt-1">Building and improving the core platform</p>
            )}
            {index === 1 && (
              <p className="text-xs text-muted-foreground pt-1">Supporting independent audio creators</p>
            )}
          </div>
        ))}
      </CardContent>
      <CardFooter className="border-t border-border/50 bg-muted/20 text-xs text-muted-foreground">
        <p>We publish quarterly transparency reports on all fund allocations</p>
      </CardFooter>
    </Card>
  );
};

export default ImpactTab;
