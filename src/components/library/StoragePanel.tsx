
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FolderOpen } from "lucide-react";

const StoragePanel = () => {
  return (
    <Card className="md:col-span-1">
      <CardHeader>
        <CardTitle>Storage</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>4.2 GB used</span>
            <span>10 GB total</span>
          </div>
          <Progress value={42} />
        </div>
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Categories</h4>
          <div className="space-y-1">
            {["All Files", "Samples", "Loops", "Presets", "Projects"].map((category) => (
              <Button 
                key={category} 
                variant={category === "All Files" ? "secondary" : "ghost"} 
                className="w-full justify-start"
                size="sm"
              >
                <FolderOpen className="h-4 w-4 mr-2" />
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Labels</h4>
          <div className="flex flex-wrap gap-2">
            {["Drums", "Bass", "Synth", "Guitar", "Vocals", "FX"].map((label) => (
              <Badge key={label} variant="outline">
                {label}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StoragePanel;
