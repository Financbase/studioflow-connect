
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, FileAudio, Headphones, Music, PlusCircle } from "lucide-react";
import { ProfileStats } from "./types";

interface ProjectsTabContentProps {
  stats: ProfileStats;
}

const ProjectsTabContent: React.FC<ProjectsTabContentProps> = ({ stats }) => {
  return (
    <div className="space-y-6 mt-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>My Projects</CardTitle>
              <CardDescription>
                Manage your music projects and recordings
              </CardDescription>
            </div>
            <Button className="gap-2">
              <PlusCircle className="h-4 w-4" />
              New Project
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.recentProjects.map(project => (
              <div 
                key={project.id} 
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                    <Music className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{project.name}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Last modified: {new Date(project.lastModified).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Open</Button>
                  <Button variant="ghost" size="sm">Share</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="outline" className="w-full">
            View All Projects
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your recent project activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <FileAudio className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm">You uploaded <span className="font-medium">Vocal Take 4.wav</span></p>
                <p className="text-xs text-muted-foreground">Today at 2:34 PM</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <Music className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm">You created project <span className="font-medium">Summer Beats</span></p>
                <p className="text-xs text-muted-foreground">Yesterday at 10:15 AM</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                <Headphones className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm">You connected to <span className="font-medium">Logic Pro X</span></p>
                <p className="text-xs text-muted-foreground">2 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectsTabContent;
