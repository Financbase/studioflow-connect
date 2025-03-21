
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
  // Determine gradient class based on the value/type
  const getProgressClass = () => {
    if (color === "green-500" || color === "success") {
      return "progress-gradient-success";
    } else if (color === "orange-500" || color === "destructive") {
      return "progress-gradient-warning";
    } else if (color === "destructive") {
      return "progress-gradient-error";
    } else {
      return progressColorClass;
    }
  };

  return (
    <Card className={`shadow-md border-l-4 border-l-${color} hover:shadow-lg transition-all duration-300 animate-fade-in`}>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground tracking-wide">{title}</p>
            <h3 className="text-2xl font-bold font-heading mt-1">{value}</h3>
          </div>
          <div className="bg-background/80 p-2 rounded-full">
            {icon}
          </div>
        </div>
        <Progress value={progressValue} className={`h-1.5 mt-4 ${getProgressClass()}`} />
        <p className="text-xs text-muted-foreground mt-2">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
