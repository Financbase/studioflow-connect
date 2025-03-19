
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { 
  Brain, FolderSearch, Wand2, Layers, Tag, Clock, 
  FolderGit2, Calendar, MessageSquare, Activity, 
  Timer, GitBranch, Bookmark, FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AITools = () => {
  const handleToolClick = (tool: string) => {
    toast({
      title: `${tool} activated`,
      description: "AI workflow assistance has started. This feature is a placeholder.",
      duration: 3000,
    });
  };

  return (
    <section id="ai-tools" className="py-6 w-full">
      <h2 className="text-2xl font-semibold mb-4">AI Workflow Assistant</h2>
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Intelligent Production Workflow</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            AI-powered tools to organize and optimize your production workflow without affecting your creative output.
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="organization" className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="organization">Organization</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="project-management">Project Management</TabsTrigger>
              <TabsTrigger value="studio-tools">Studio Tools</TabsTrigger>
            </TabsList>
            
            <TabsContent value="organization" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <AIToolCard 
                  title="Sample Organizer" 
                  description="Automatically categorize and tag sample libraries by instrument, genre, and character" 
                  icon={<FolderSearch className="h-5 w-5" />}
                  onClick={() => handleToolClick("Sample Organizer")}
                />
                <AIToolCard 
                  title="Drum Pattern Categorizer" 
                  description="Identify and categorize drum patterns by genre, BPM, and complexity" 
                  icon={<Layers className="h-5 w-5" />}
                  onClick={() => handleToolClick("Drum Pattern Categorizer")}
                />
                <AIToolCard 
                  title="Smart Tagging" 
                  description="Automatically generate consistent tags and metadata across your entire library" 
                  icon={<Tag className="h-5 w-5" />}
                  onClick={() => handleToolClick("Smart Tagging")}
                />
                <AIToolCard 
                  title="Session Planner" 
                  description="Optimize your studio time with intelligent session planning and reminders" 
                  icon={<Clock className="h-5 w-5" />}
                  onClick={() => handleToolClick("Session Planner")}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="templates" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <AIToolCard 
                  title="Project Templates" 
                  description="Pre-configured session templates for mixing, tracking, mastering, and other workflows" 
                  icon={<FolderGit2 className="h-5 w-5" />}
                  onClick={() => handleToolClick("Project Templates")}
                />
                <AIToolCard 
                  title="Signal Flow Visualizer" 
                  description="Create and save routing diagrams of complex signal paths for future reference" 
                  icon={<GitBranch className="h-5 w-5" />}
                  onClick={() => handleToolClick("Signal Flow Visualizer")}
                />
                <AIToolCard 
                  title="Reference Library" 
                  description="Organize reference tracks by genre, mood, or sonic characteristic for quick access" 
                  icon={<Bookmark className="h-5 w-5" />}
                  onClick={() => handleToolClick("Reference Library")}
                />
                <AIToolCard 
                  title="Auto Documentation" 
                  description="Generate session documentation including gear used, settings, and routing" 
                  icon={<FileText className="h-5 w-5" />}
                  onClick={() => handleToolClick("Auto Documentation")}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="project-management" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <AIToolCard 
                  title="Deadline Tracker" 
                  description="Manage multiple projects with deadlines, milestones, and automated reminders" 
                  icon={<Calendar className="h-5 w-5" />}
                  onClick={() => handleToolClick("Deadline Tracker")}
                />
                <AIToolCard 
                  title="Client Feedback Portal" 
                  description="Allow clients to leave timestamped comments on shared audio drafts" 
                  icon={<MessageSquare className="h-5 w-5" />}
                  onClick={() => handleToolClick("Client Feedback Portal")}
                />
                <AIToolCard 
                  title="Studio Time Tracker" 
                  description="Log hours spent on different projects for time management and client billing" 
                  icon={<Timer className="h-5 w-5" />}
                  onClick={() => handleToolClick("Studio Time Tracker")}
                />
                <AIToolCard 
                  title="Session Backup Manager" 
                  description="Automatically back up sessions at regular intervals with blockchain verification" 
                  icon={<Clock className="h-5 w-5" />}
                  onClick={() => handleToolClick("Session Backup Manager")}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="studio-tools" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <AIToolCard 
                  title="Resource Monitor" 
                  description="Track CPU/memory usage per plugin to identify performance bottlenecks" 
                  icon={<Activity className="h-5 w-5" />}
                  onClick={() => handleToolClick("Resource Monitor")}
                />
                <AIToolCard 
                  title="Equipment Scanner" 
                  description="Detect and catalog all connected hardware/peripherals for quick setup" 
                  icon={<FolderSearch className="h-5 w-5" />}
                  onClick={() => handleToolClick("Equipment Scanner")}
                />
                <AIToolCard 
                  title="Plugin Analytics" 
                  description="Track which plugins you use most frequently across sessions" 
                  icon={<Activity className="h-5 w-5" />}
                  onClick={() => handleToolClick("Plugin Analytics")}
                />
                <AIToolCard 
                  title="BPM & Key Detector" 
                  description="Analyze and tag files with tempo and key information for better organization" 
                  icon={<Tag className="h-5 w-5" />}
                  onClick={() => handleToolClick("BPM & Key Detector")}
                />
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6">
            <div className="bg-muted/50 p-4 rounded-md mb-4">
              <p className="text-sm font-medium mb-2">AI Workflow Assistant Philosophy</p>
              <p className="text-xs text-muted-foreground">
                Our AI tools focus solely on workflow optimization - organizing samples, categorizing content, and planning sessions. 
                These tools never modify your audio or creative content, preserving your artistic vision while eliminating tedious organization tasks.
              </p>
            </div>
            <div className="flex justify-end">
              <Button variant="outline" className="mr-2">
                View Assistant History
              </Button>
              <Button>
                <Wand2 className="h-4 w-4 mr-2" />
                Start Batch Organization
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feature showcase with detailed descriptions */}
      <div className="mt-8 space-y-8">
        <FeatureShowcase 
          title="Project Templates Library" 
          icon={<FolderGit2 className="h-6 w-6 text-primary" />}
          description="Start new projects faster with intelligent templates that adapt to your workflow."
        >
          <p className="text-sm text-muted-foreground mb-4">
            Our AI-powered Project Templates Library analyzes your most successful workflows and creates optimized 
            templates for different production scenarios. Each template includes:
          </p>
          <ul className="text-sm space-y-2 mb-4">
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                <Clock className="h-3 w-3 text-primary" />
              </div>
              <span>Pre-configured track layouts and routing based on your most productive sessions</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                <Clock className="h-3 w-3 text-primary" />
              </div>
              <span>Optimized plugin chains for different instruments and production styles</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                <Clock className="h-3 w-3 text-primary" />
              </div>
              <span>Smart defaults for mixing templates based on genre and instrumentation</span>
            </li>
          </ul>
          <Button size="sm" onClick={() => handleToolClick("Project Templates")}>
            Browse Templates
          </Button>
        </FeatureShowcase>

        <FeatureShowcase 
          title="Deadline Tracker" 
          icon={<Calendar className="h-6 w-6 text-primary" />}
          description="Never miss a deadline with intelligent project management built for audio professionals."
        >
          <p className="text-sm text-muted-foreground mb-4">
            The Deadline Tracker is designed specifically for music production workflows, helping you manage 
            multiple project timelines with automated workload balancing and progress tracking:
          </p>
          <ul className="text-sm space-y-2 mb-4">
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                <Clock className="h-3 w-3 text-primary" />
              </div>
              <span>Visual timeline of all projects with milestone tracking and smart reminders</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                <Clock className="h-3 w-3 text-primary" />
              </div>
              <span>Automatic time estimation based on project complexity and your historical data</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                <Clock className="h-3 w-3 text-primary" />
              </div>
              <span>Client-facing progress reports with customizable sharing options</span>
            </li>
          </ul>
          <Button size="sm" onClick={() => handleToolClick("Deadline Tracker")}>
            View Projects
          </Button>
        </FeatureShowcase>

        <FeatureShowcase 
          title="Client Feedback Portal" 
          icon={<MessageSquare className="h-6 w-6 text-primary" />}
          description="Streamline client communication with an intelligent feedback system built for audio."
        >
          <p className="text-sm text-muted-foreground mb-4">
            The Client Feedback Portal transforms how you collect and implement feedback, with tools designed 
            specifically for audio review workflows:
          </p>
          <ul className="text-sm space-y-2 mb-4">
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                <Clock className="h-3 w-3 text-primary" />
              </div>
              <span>Secure sharing links with timestamped commenting directly on audio waveforms</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                <Clock className="h-3 w-3 text-primary" />
              </div>
              <span>Automatic feedback categorization and prioritization to streamline revisions</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                <Clock className="h-3 w-3 text-primary" />
              </div>
              <span>Version tracking that links client comments to specific mix iterations</span>
            </li>
          </ul>
          <Button size="sm" onClick={() => handleToolClick("Client Feedback Portal")}>
            Open Portal
          </Button>
        </FeatureShowcase>

        <FeatureShowcase 
          title="Resource Usage Monitor" 
          icon={<Activity className="h-6 w-6 text-primary" />}
          description="Optimize your system performance with intelligent resource tracking and recommendations."
        >
          <p className="text-sm text-muted-foreground mb-4">
            The Resource Usage Monitor helps identify performance bottlenecks in your sessions and provides 
            actionable recommendations to improve stability:
          </p>
          <ul className="text-sm space-y-2 mb-4">
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                <Clock className="h-3 w-3 text-primary" />
              </div>
              <span>Per-plugin CPU, memory, and disk usage tracking to identify resource-heavy processors</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                <Clock className="h-3 w-3 text-primary" />
              </div>
              <span>Intelligent freeze/bounce recommendations based on project complexity and system capacity</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                <Clock className="h-3 w-3 text-primary" />
              </div>
              <span>Historical performance analysis with predictive warnings before system overloads</span>
            </li>
          </ul>
          <Button size="sm" onClick={() => handleToolClick("Resource Usage Monitor")}>
            Run Analysis
          </Button>
        </FeatureShowcase>
      </div>
    </section>
  );
};

interface AIToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const AIToolCard = ({ title, description, icon, onClick }: AIToolCardProps) => {
  return (
    <div 
      className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:translate-y-[-2px] cursor-pointer"
      onClick={onClick}
    >
      <div className="p-4 flex flex-col h-full">
        <div className="flex items-center gap-2 mb-2">
          <div className="rounded-full bg-primary/10 p-1.5 text-primary">
            {icon}
          </div>
          <h4 className="font-medium text-sm">{title}</h4>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

interface FeatureShowcaseProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  children: React.ReactNode;
}

const FeatureShowcase = ({ title, icon, description, children }: FeatureShowcaseProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-3">
          {icon}
          <div>
            <h3 className="text-lg font-medium">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <div className="mt-4 border-t pt-4">
          {children}
        </div>
      </CardContent>
    </Card>
  );
};

export default AITools;
