
import React from "react";
import { SidebarLayout } from "@/components/layout/Sidebar";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, FolderPlus, Clock, FileMusic, Edit } from "lucide-react";

const Projects = () => {
  // Mock project data
  const recentProjects = [
    { id: 1, name: "Summer Beats EP", lastEdited: "2 hours ago", tracks: 8, status: "In Progress" },
    { id: 2, name: "Vocal Sessions", lastEdited: "1 day ago", tracks: 12, status: "Mixing" },
    { id: 3, name: "Ambient Album", lastEdited: "3 days ago", tracks: 6, status: "Mastering" },
    { id: 4, name: "Club Remix", lastEdited: "1 week ago", tracks: 3, status: "Completed" },
  ];

  return (
    <SidebarLayout>
      <Header />
      <main className="flex-1 px-4 py-6 md:px-6 lg:px-8 bg-background overflow-auto">
        <div className="max-w-[1200px] mx-auto space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Projects</h1>
              <p className="text-muted-foreground">Manage your music projects and sessions</p>
            </div>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Project
            </Button>
          </div>

          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="shared">Shared</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Project Library</CardTitle>
                  <CardDescription>Browse and manage all your music projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Last Edited</TableHead>
                        <TableHead>Tracks</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentProjects.map((project) => (
                        <TableRow key={project.id}>
                          <TableCell className="font-medium">{project.name}</TableCell>
                          <TableCell className="text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {project.lastEdited}
                            </span>
                          </TableCell>
                          <TableCell>{project.tracks}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={
                                project.status === "Completed" ? "default" : 
                                project.status === "Mastering" ? "secondary" : 
                                "outline"
                              }
                            >
                              {project.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Import Project</Button>
                  <Button variant="outline">Export</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="recent" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recently Accessed</CardTitle>
                  <CardDescription>Your most recent project activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p>Content for Recent Projects tab</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="shared" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Shared Projects</CardTitle>
                  <CardDescription>Projects shared with collaborators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p>Content for Shared Projects tab</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="archived" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Archived Projects</CardTitle>
                  <CardDescription>Inactive or completed projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p>Content for Archived Projects tab</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <section className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Project Templates</CardTitle>
                  <CardDescription>Quick-start your next project</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {["Hip-Hop Beat", "EDM Track", "Acoustic Session", "Podcast"].map((template) => (
                    <div key={template} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent transition-colors cursor-pointer">
                      <FolderPlus className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium">{template}</h4>
                        <p className="text-sm text-muted-foreground">Start with a pre-configured template</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { action: "Added 2 tracks", project: "Summer Beats EP", time: "2 hours ago" },
                    { action: "Changed mix settings", project: "Vocal Sessions", time: "1 day ago" },
                    { action: "Exported stems", project: "Ambient Album", time: "3 days ago" },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-muted">
                        <FileMusic className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.project} • {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>
    </SidebarLayout>
  );
};

export default Projects;
