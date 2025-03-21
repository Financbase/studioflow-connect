
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface MetricsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  progressValue: number;
  description: string;
  color: string;
  progressColorClass?: string;
}

const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  icon,
  progressValue,
  description,
  color,
  progressColorClass = ""
}) => {
  return (
    <Card className={`shadow-sm border-l-4 border-l-${color}`}>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
          </div>
          {icon}
        </div>
        <Progress value={progressValue} className={`h-1 mt-4 ${progressColorClass}`} />
        <p className="text-xs text-muted-foreground mt-1">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
