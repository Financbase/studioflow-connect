
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ImpactAllocationProps {
  category: string;
  percentage: number;
  color: string;
}

const ImpactAllocationTab: React.FC<{ impactAllocation: ImpactAllocationProps[] }> = ({ impactAllocation }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fund Allocation</CardTitle>
        <CardDescription>How your contributions are used</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {impactAllocation.map((item) => (
            <div key={item.category} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{item.category}</span>
                <span className="font-medium">{item.percentage}%</span>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.percentage}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImpactAllocationTab;
