
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface UsageStat {
  name: string;
  value: number;
  max: number | string;
  format?: (value: number) => string;
}

const UsageStatsCard = () => {
  const [progressValues, setProgressValues] = useState<{[key: string]: number}>({
    cpu: 0,
    storage: 0,
    projects: 0,
    aiCredits: 0,
  });

  const stats: UsageStat[] = [
    {
      name: "CPU Usage",
      value: 65,
      max: 100,
      format: (value) => `${value}%`
    },
    {
      name: "Storage",
      value: 45,
      max: 100,
      format: (value) => `${value}%`
    },
    {
      name: "Projects",
      value: 12,
      max: "20",
      format: (value) => `${value}/20`
    },
    {
      name: "AI Credits",
      value: 38,
      max: 100,
      format: (value) => `${value}%`
    }
  ];

  // Animate progress bars on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressValues({
        cpu: 65,
        storage: 45,
        projects: 60,
        aiCredits: 38,
      });
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Usage Stats</CardTitle>
        <CardDescription>This month's activity</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {stats.map((stat, index) => {
          const statKey = stat.name.toLowerCase().replace(' ', '');
          const progressKey = Object.keys(progressValues)[index];
          
          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{stat.name}</span>
                <span className="font-medium">
                  {stat.format ? stat.format(stat.value) : stat.value}
                </span>
              </div>
              <Progress 
                value={progressValues[progressKey]} 
                className={`h-2 transition-all duration-1000 ease-out ${
                  progressValues[progressKey] > 80 ? 'bg-red-100' : 
                  progressValues[progressKey] > 60 ? 'bg-amber-100' : 
                  'bg-green-100'
                }`}
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default UsageStatsCard;
