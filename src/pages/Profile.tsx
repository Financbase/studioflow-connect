
import React, { useState } from "react";
import Header from "@/components/Header";
import { useAuth } from "@/hooks/use-auth";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { useDashboard } from "@/contexts/DashboardContext";
import { 
  User, 
  Mail, 
  Edit, 
  Save, 
  Clock, 
  FileAudio, 
  Music, 
  Headphones, 
  BarChart, 
  PlusCircle,
  FileImage,
  Library,
  Upload,
  Settings,
  FileText,
  ShieldCheck
} from "lucide-react";

const Profile = () => {
  const { user, profile, updateProfile } = useAuth();
  const { pricingTier } = useDashboard();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: profile?.full_name || "",
    username: profile?.username || "",
    bio: profile?.bio || "",
  });
  
  const [activeTab, setActiveTab] = useState("profile");

  // Mock data for demonstration
  const mockStats = {
    projectsCreated: 24,
    tracksUploaded: 56,
    storageUsed: "4.2 GB",
    totalStorage: "10 GB",
    lastLogin: new Date().toISOString(),
    accountCreated: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(), // 120 days ago
    connectionsCount: 5,
    recentProjects: [
      { id: "p1", name: "Summer Beats", lastModified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
      { id: "p2", name: "Remix Project", lastModified: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
      { id: "p3", name: "Ambient Album", lastModified: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() }
    ],
    audioAssets: [
      { id: "a1", name: "Acoustic Guitar.wav", size: "24.5 MB", duration: "5:42" },
      { id: "a2", name: "Vocals Stem.mp3", size: "18.2 MB", duration: "3:15" },
      { id: "a3", name: "Drum Loop.wav", size: "8.7 MB", duration: "0:32" }
    ],
    workflows: [
      { id: "w1", name: "Recording Session", devices: ["Focusrite Scarlett 2i2", "AKG C414"] },
      { id: "w2", name: "Mixing Setup", plugins: ["FabFilter Pro-Q 3", "Waves SSL", "Valhalla Reverb"] }
    ]
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({
        full_name: formData.fullName,
        username: formData.username,
        bio: formData.bio,
      });
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getPlanBadge = () => {
    switch(pricingTier) {
      case "free":
        return <Badge variant="outline">Free Plan</Badge>;
      case "standard":
        return <Badge variant="secondary">Standard Plan</Badge>;
      case "pro":
        return <Badge className="bg-gradient-to-r from-blue-500 to-purple-500">Pro Plan</Badge>;
      case "enterprise":
        return <Badge className="bg-gradient-to-r from-purple-500 to-red-500">Enterprise Plan</Badge>;
    }
  };

  const getStorageProgress = () => {
    const used = parseFloat(mockStats.storageUsed);
    const total = parseFloat(mockStats.totalStorage);
    return (used / total) * 100;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6 md:py-10">
        <div className="flex flex-col gap-6 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">My Profile</h1>
              <p className="text-muted-foreground">
                Manage your personal information and preferences
              </p>
            </div>
            {getPlanBadge()}
          </div>

          <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
              <TabsTrigger value="profile" className="text-sm">
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="projects" className="text-sm">
                <Music className="h-4 w-4 mr-2" />
                Projects
              </TabsTrigger>
              <TabsTrigger value="assets" className="text-sm">
                <Library className="h-4 w-4 mr-2" />
                Assets
              </TabsTrigger>
              <TabsTrigger value="workflows" className="text-sm">
                <Settings className="h-4 w-4 mr-2" />
                Workflows
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6 mt-6">
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>
                        Update your personal details and preferences
                      </CardDescription>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setIsEditing(!isEditing)}
                      className="gap-2"
                    >
                      {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                      {isEditing ? "Save" : "Edit"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={profile?.avatar_url || undefined} />
                        <AvatarFallback className="text-xl">
                          {profile?.username?.slice(0, 2).toUpperCase() || user?.email?.slice(0, 2).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="fullName" className="flex items-center gap-2">
                              <User className="h-4 w-4" />
                              Full Name
                            </Label>
                            <Input
                              id="fullName"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleChange}
                              disabled={!isEditing}
                              placeholder="Your full name"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="username" className="flex items-center gap-2">
                              <User className="h-4 w-4" />
                              Username
                            </Label>
                            <Input
                              id="username"
                              name="username"
                              value={formData.username}
                              onChange={handleChange}
                              disabled={!isEditing}
                              placeholder="Your username"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email" className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            Email
                          </Label>
                          <Input
                            id="email"
                            value={user?.email || ""}
                            disabled
                            placeholder="Your email address"
                          />
                          <p className="text-xs text-muted-foreground">
                            Your email address is used for sign-in and cannot be changed
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="bio" className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Bio
                          </Label>
                          <textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            disabled={!isEditing}
                            placeholder="A brief description about yourself and your music"
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {isEditing && (
                      <div className="flex justify-end gap-2">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit">Save Changes</Button>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Account Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subscription Plan</span>
                      <span className="font-medium capitalize">{pricingTier}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Account Created</span>
                      <span className="font-medium">{new Date(mockStats.accountCreated).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Last Login</span>
                      <span className="font-medium">{new Date(mockStats.lastLogin).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">2FA Enabled</span>
                      <span className="font-medium flex items-center gap-1">
                        <ShieldCheck className="h-4 w-4 text-green-500" />
                        Yes
                      </span>
                    </div>
                    <Separator />
                    <div className="pt-2">
                      <h4 className="text-sm font-medium mb-2">Storage Usage</h4>
                      <div className="w-full h-2 bg-secondary rounded-full">
                        <div 
                          className="h-2 bg-primary rounded-full" 
                          style={{ width: `${getStorageProgress()}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 flex justify-between">
                        <span>{mockStats.storageUsed} used</span>
                        <span>{mockStats.totalStorage} total</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Activity Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border rounded-lg p-3 text-center">
                        <p className="text-2xl font-bold">{mockStats.projectsCreated}</p>
                        <p className="text-xs text-muted-foreground">Projects Created</p>
                      </div>
                      <div className="border rounded-lg p-3 text-center">
                        <p className="text-2xl font-bold">{mockStats.tracksUploaded}</p>
                        <p className="text-xs text-muted-foreground">Tracks Uploaded</p>
                      </div>
                      <div className="border rounded-lg p-3 text-center">
                        <p className="text-2xl font-bold">{mockStats.connectionsCount}</p>
                        <p className="text-xs text-muted-foreground">Connected DAWs</p>
                      </div>
                      <div className="border rounded-lg p-3 text-center">
                        <p className="text-2xl font-bold">12</p>
                        <p className="text-xs text-muted-foreground">Active Sessions</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full gap-2">
                      <BarChart className="h-4 w-4" />
                      View Detailed Analytics
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="projects" className="space-y-6 mt-6">
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
                    {mockStats.recentProjects.map(project => (
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
            </TabsContent>
            
            <TabsContent value="assets" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Audio Assets</CardTitle>
                      <CardDescription>
                        Manage your audio files and recordings
                      </CardDescription>
                    </div>
                    <Button className="gap-2">
                      <Upload className="h-4 w-4" />
                      Upload Audio
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockStats.audioAssets.map(asset => (
                      <div 
                        key={asset.id} 
                        className="flex items-center justify-between border-b pb-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-md bg-secondary flex items-center justify-center">
                            <FileAudio className="h-5 w-5 text-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">{asset.name}</p>
                            <div className="flex items-center gap-2">
                              <p className="text-xs text-muted-foreground">{asset.size}</p>
                              <span className="text-xs text-muted-foreground">•</span>
                              <p className="text-xs text-muted-foreground">{asset.duration}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Play</Button>
                          <Button variant="ghost" size="sm">Download</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="outline" className="w-full">
                    View Audio Library
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Media & Documents</CardTitle>
                      <CardDescription>
                        Album artwork, lyric sheets and other project assets
                      </CardDescription>
                    </div>
                    <Button variant="outline" className="gap-2">
                      <FileImage className="h-4 w-4" />
                      Add Media
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="aspect-square rounded-md bg-muted flex flex-col items-center justify-center">
                      <FileImage className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-xs text-muted-foreground">Album Cover 1</p>
                    </div>
                    <div className="aspect-square rounded-md bg-muted flex flex-col items-center justify-center">
                      <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-xs text-muted-foreground">Lyrics.docx</p>
                    </div>
                    <div className="aspect-square rounded-md bg-muted flex flex-col items-center justify-center border-2 border-dashed">
                      <PlusCircle className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-xs text-muted-foreground">Add New</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="workflows" className="space-y-6 mt-6">
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
                    {mockStats.workflows.map(workflow => (
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
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Profile;
