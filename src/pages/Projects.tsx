
import React, { useState } from "react";
import { SidebarLayout } from "@/components/layout/Sidebar";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Plus, FolderPlus, Clock, FileMusic, Edit, Filter, Search, Trash2, Copy, Share2 } from "lucide-react";

interface Project {
  id: number;
  name: string;
  lastEdited: string;
  tracks: number;
  status: "In Progress" | "Mixing" | "Mastering" | "Completed" | "Archived";
  description?: string;
}

const Projects = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [newProject, setNewProject] = useState({ name: "", description: "" });
  const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false);
  
  const [projects, setProjects] = useState<Project[]>([
    { id: 1, name: "Summer Beats EP", lastEdited: "2 hours ago", tracks: 8, status: "In Progress", description: "Summer-themed beats for upcoming release" },
    { id: 2, name: "Vocal Sessions", lastEdited: "1 day ago", tracks: 12, status: "Mixing", description: "Vocal recording sessions with featured artists" },
    { id: 3, name: "Ambient Album", lastEdited: "3 days ago", tracks: 6, status: "Mastering", description: "Atmospheric ambient tracks for meditation app" },
    { id: 4, name: "Club Remix", lastEdited: "1 week ago", tracks: 3, status: "Completed", description: "Remix of popular club track" },
    { id: 5, name: "Guitar Recordings", lastEdited: "2 weeks ago", tracks: 5, status: "Archived", description: "Acoustic guitar session recordings" },
  ]);

  const handleCreateProject = () => {
    if (!newProject.name.trim()) {
      toast({
        title: "Project name required",
        description: "Please enter a name for your project",
        variant: "destructive"
      });
      return;
    }

    const newId = Math.max(...projects.map(p => p.id), 0) + 1;
    
    setProjects([
      {
        id: newId,
        name: newProject.name,
        description: newProject.description,
        lastEdited: "Just now",
        tracks: 0,
        status: "In Progress"
      },
      ...projects
    ]);
    
    setNewProject({ name: "", description: "" });
    setIsNewProjectDialogOpen(false);
    
    toast({
      title: "Project created",
      description: `"${newProject.name}" has been created successfully`
    });
  };

  const handleDeleteProject = (id: number) => {
    const projectToDelete = projects.find(p => p.id === id);
    
    setProjects(projects.filter(project => project.id !== id));
    
    toast({
      title: "Project deleted",
      description: `"${projectToDelete?.name}" has been deleted`,
      variant: "default"
    });
  };

  const handleDuplicateProject = (id: number) => {
    const projectToDuplicate = projects.find(p => p.id === id);
    
    if (projectToDuplicate) {
      const newId = Math.max(...projects.map(p => p.id)) + 1;
      const newProject = {
        ...projectToDuplicate,
        id: newId,
        name: `${projectToDuplicate.name} (Copy)`,
        lastEdited: "Just now"
      };
      
      setProjects([newProject, ...projects]);
      
      toast({
        title: "Project duplicated",
        description: `"${projectToDuplicate.name}" has been duplicated`
      });
    }
  };

  const handleChangeStatus = (id: number, newStatus: Project["status"]) => {
    setProjects(projects.map(project => 
      project.id === id ? { ...project, status: newStatus } : project
    ));
    
    const projectName = projects.find(p => p.id === id)?.name;
    
    toast({
      title: "Status updated",
      description: `"${projectName}" is now ${newStatus}`
    });
  };

  const filteredProjects = projects.filter(project => {
    if (activeTab === "all") {
      return true;
    } else if (activeTab === "archived") {
      return project.status === "Archived";
    } else if (activeTab === "recent") {
      return project.lastEdited.includes("hour") || project.lastEdited.includes("Just now");
    } else if (activeTab === "shared") {
      return false;
    }
    
    if (searchQuery) {
      return project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             (project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    
    return true;
  });

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
            
            <Dialog open={isNewProjectDialogOpen} onOpenChange={setIsNewProjectDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  New Project
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Project</DialogTitle>
                  <DialogDescription>
                    Add a new music project to your workspace
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="project-name" className="text-sm font-medium">
                      Project Name
                    </label>
                    <Input 
                      id="project-name" 
                      placeholder="My New Project" 
                      value={newProject.name}
                      onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="project-description" className="text-sm font-medium">
                      Description (Optional)
                    </label>
                    <Input 
                      id="project-description" 
                      placeholder="Brief description of your project" 
                      value={newProject.description}
                      onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsNewProjectDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateProject}>
                    Create Project
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="relative flex gap-2 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search projects..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="h-10 w-10">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
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
                  {filteredProjects.length > 0 ? (
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
                        {filteredProjects.map((project) => (
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
                                  project.status === "Archived" ? "outline" : 
                                  "outline"
                                }
                              >
                                {project.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-1">
                                <Button variant="ghost" size="icon" title="Edit">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  title="Duplicate"
                                  onClick={() => handleDuplicateProject(project.id)}
                                >
                                  <Copy className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  title="Delete"
                                  onClick={() => handleDeleteProject(project.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-muted-foreground">No projects found matching your search</p>
                      <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
                        Clear search
                      </Button>
                    </div>
                  )}
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
                  <div className="space-y-4">
                    {filteredProjects.length > 0 ? (
                      filteredProjects.map(project => (
                        <div key={project.id} className="flex justify-between items-center p-4 border rounded-md">
                          <div className="flex items-center gap-3">
                            <FileMusic className="h-8 w-8 text-primary/60" />
                            <div>
                              <h4 className="font-medium">{project.name}</h4>
                              <p className="text-sm text-muted-foreground">{project.lastEdited}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">Open</Button>
                        </div>
                      ))
                    ) : (
                      <p className="text-center py-10 text-muted-foreground">No recent projects found</p>
                    )}
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
                <CardContent className="min-h-[300px] flex flex-col items-center justify-center">
                  <Share2 className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">No shared projects yet</h3>
                  <p className="text-muted-foreground text-center max-w-md mb-6">
                    Share your projects with collaborators to see them here
                  </p>
                  <Button variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share a Project
                  </Button>
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
                  {filteredProjects.length > 0 ? (
                    <div className="space-y-4">
                      {filteredProjects.map(project => (
                        <div key={project.id} className="flex justify-between items-center p-4 border rounded-md bg-muted/30">
                          <div className="flex items-center gap-3">
                            <FileMusic className="h-8 w-8 text-muted-foreground" />
                            <div>
                              <h4 className="font-medium">{project.name}</h4>
                              <p className="text-sm text-muted-foreground">Archived on {project.lastEdited}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleChangeStatus(project.id, "In Progress")}>
                              Restore
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteProject(project.id)}>
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-10 text-muted-foreground">No archived projects found</p>
                  )}
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
