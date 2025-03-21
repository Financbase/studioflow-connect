
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { PlusCircle, Settings } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ProfileStats } from "./types";

interface WorkflowsTabContentProps {
  stats: ProfileStats;
}

const WorkflowsTabContent: React.FC<WorkflowsTabContentProps> = ({ stats }) => {
  return (
    <div className="space-y-6 mt-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Studio Workflows</CardTitle>
              <CardDescription>
                Configure custom workflows for different production tasks
              </CardDescription>
            </div>
            <Button className="gap-2">
              <PlusCircle className="h-4 w-4" />
              New Workflow
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {stats.workflows.map(workflow => (
              <Card key={workflow.id} className="overflow-hidden">
                <CardHeader className="pb-3 pt-4">
                  <CardTitle className="text-lg">{workflow.name}</CardTitle>
                </CardHeader>
                <CardContent className="pb-3">
                  {workflow.devices && (
                    <div className="mb-3">
                      <h4 className="text-sm font-medium mb-2">Connected Devices</h4>
                      <div className="flex flex-wrap gap-2">
                        {workflow.devices.map((device, i) => (
                          <Badge variant="secondary" key={i}>{device}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {workflow.plugins && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Plugins</h4>
                      <div className="flex flex-wrap gap-2">
                        {workflow.plugins.map((plugin, i) => (
                          <Badge variant="outline" key={i}>{plugin}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="pt-0 flex justify-end gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="default" size="sm">Activate</Button>
                </CardFooter>
              </Card>
            ))}
            
            <Card className="border-dashed">
              <CardContent className="p-6 flex flex-col items-center justify-center">
                <PlusCircle className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground font-medium">Create New Workflow</p>
                <p className="text-xs text-muted-foreground text-center mt-1 max-w-md">
                  Set up custom configurations for different tasks like recording, mixing, and mastering
                </p>
                <Button variant="outline" className="mt-4">Get Started</Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Settings Sync</CardTitle>
          <CardDescription>
            Synchronize your settings across different devices and DAWs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-blue-100 flex items-center justify-center">
                <Settings className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Plugin Presets</p>
                <p className="text-xs text-muted-foreground">Sync your favorite plugin settings</p>
              </div>
            </div>
            <Switch checked={true} />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-purple-100 flex items-center justify-center">
                <Settings className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="font-medium">DAW Templates</p>
                <p className="text-xs text-muted-foreground">Sync project templates between DAWs</p>
              </div>
            </div>
            <Switch checked={true} />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-green-100 flex items-center justify-center">
                <Settings className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Control Surface Mappings</p>
                <p className="text-xs text-muted-foreground">Sync controller mappings across devices</p>
              </div>
            </div>
            <Switch checked={false} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkflowsTabContent;
