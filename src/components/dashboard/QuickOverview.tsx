
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface QuickStatProps {
  title: string;
  value: string;
  description: string;
  change: string;
  color: string;
}

const QuickOverview = () => {
  // Quick stats for the dashboard
  const quickStats = [
    { 
      title: "Audio Projects", 
      value: "12", 
      description: "Active projects", 
      change: "+2",
      color: "progress-gradient-purple"
    },
    { 
      title: "Connected Devices", 
      value: "3", 
      description: "Available devices", 
      change: "+1",
      color: "progress-gradient-blue"
    },
    { 
      title: "Storage Used", 
      value: "45%", 
      description: "15GB of 30GB", 
      change: "+5%",
      color: "progress-gradient-amber"
    },
    { 
      title: "Recent Activity", 
      value: "24", 
      description: "Actions this week", 
      change: "+10",
      color: "progress-gradient-purple"
    }
  ];

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Quick Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className="dashboard-stat-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{stat.title}</CardTitle>
              <CardDescription>{stat.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end mb-2">
                <span className="text-3xl font-bold">{stat.value}</span>
                <span className="text-sm text-green-500">{stat.change}</span>
              </div>
              <Progress value={65} className={stat.color} />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default QuickOverview;
