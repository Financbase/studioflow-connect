
import React from "react";
import { SidebarLayout } from "@/components/layout/Sidebar";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { FileAudio, Music, FolderOpen, Upload, Search } from "lucide-react";

const Library = () => {
  // Mock library data
  const audioSamples = [
    { name: "Acoustic Guitar.wav", size: "24.5 MB", duration: "5:42", type: "Instrument" },
    { name: "Drum Loop 120BPM.wav", size: "8.2 MB", duration: "0:32", type: "Loop" },
    { name: "Strings Ensemble.mp3", size: "18.7 MB", duration: "3:15", type: "Instrument" },
    { name: "Vocal Stem.wav", size: "35.1 MB", duration: "4:12", type: "Vocal" },
    { name: "Bass Line.wav", size: "15.3 MB", duration: "1:45", type: "Bass" },
  ];

  return (
    <SidebarLayout>
      <Header />
      <main className="flex-1 px-4 py-6 md:px-6 lg:px-8 bg-background overflow-auto">
        <div className="max-w-[1200px] mx-auto space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Audio Library</h1>
              <p className="text-muted-foreground">Manage your samples, loops, and audio assets</p>
            </div>
            <Button className="gap-2">
              <Upload className="w-4 h-4" />
              Upload Assets
            </Button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search your audio library..." 
              className="pl-9"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

            <div className="md:col-span-3 space-y-6">
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All Files</TabsTrigger>
                  <TabsTrigger value="samples">Samples</TabsTrigger>
                  <TabsTrigger value="loops">Loops</TabsTrigger>
                  <TabsTrigger value="presets">Presets</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-4 mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Audio Assets</CardTitle>
                      <CardDescription>Browse all your audio files and samples</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {audioSamples.map((sample, index) => (
                          <div 
                            key={index} 
                            className="flex items-center justify-between p-3 rounded-md border hover:bg-accent/50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-full bg-muted">
                                <FileAudio className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">{sample.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {sample.size} • {sample.duration}
                                </p>
                              </div>
                            </div>
                            <Badge variant="outline">{sample.type}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">Import</Button>
                      <Button variant="outline">Organize</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="samples" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Samples</CardTitle>
                      <CardDescription>One-shot samples and instrument sounds</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p>Content for Samples tab</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="loops" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Loops</CardTitle>
                      <CardDescription>Drum and melody loops</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p>Content for Loops tab</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="presets" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Presets</CardTitle>
                      <CardDescription>Synth and effect presets</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p>Content for Presets tab</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recently Added</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                        <Music className="h-8 w-8 text-muted-foreground mb-2" />
                        <h4 className="font-medium">New Sample Pack {i}</h4>
                        <p className="text-sm text-muted-foreground">Added yesterday</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </SidebarLayout>
  );
};

export default Library;
