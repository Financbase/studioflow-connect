
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface BaseVisualizerProps {
  className?: string;
  children: React.ReactNode;
  title: string;
}

const BaseVisualizer: React.FC<BaseVisualizerProps> = ({ 
  className, 
  children,
  title
}) => {
  return (
    <Card className={className}>
      <CardContent className="p-0 overflow-hidden">
        <div className="relative w-full h-64">
          {children}
          <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-black/20 dark:bg-black/40 px-2 py-1 rounded">
            {title}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BaseVisualizer;
