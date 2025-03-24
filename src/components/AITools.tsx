
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { 
  Brain, FolderSearch, Wand2, Layers, Tag, Clock, 
  FolderGit2, Calendar, MessageSquare, Activity, 
  Timer, GitBranch, Bookmark, FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/language";

interface AIToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const AIToolCard = ({ title, description, icon, onClick }: AIToolCardProps) => (
  <Card className="hover:bg-card/80 transition-all cursor-pointer" onClick={onClick}>
    <CardContent className="p-4">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h4 className="font-medium">{title}</h4>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const AITools = () => {
  const { t, isInitialized } = useLanguage();
  const [activeTab, setActiveTab] = useState("organization");
  
  const handleToolClick = (tool: string) => {
    toast({
      title: `${tool} ${isInitialized ? t("ai.activated") : "activated"}`,
      description: isInitialized ? t("ai.workflowStarted") : "Workflow started successfully"
    });
  };

  return (
    <section id="ai-tools" className="py-6 w-full">
      <h2 className="text-2xl font-semibold mb-4">{isInitialized ? t("ai.workflowAssistant") : "AI Workflow Assistant"}</h2>
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">{isInitialized ? t("ai.generator.title") : "AI Generator"}</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            {isInitialized ? t("ai.workflowDescription") : "Enhance your creative process with AI-powered assistance"}
          </p>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="organization">{isInitialized ? t("ai.tabs.organization") : "Organization"}</TabsTrigger>
              <TabsTrigger value="templates">{isInitialized ? t("ai.tabs.templates") : "Templates"}</TabsTrigger>
              <TabsTrigger value="project-management">{isInitialized ? t("ai.tabs.projectManagement") : "Project Management"}</TabsTrigger>
              <TabsTrigger value="studio-tools">{isInitialized ? t("ai.tabs.studioTools") : "Studio Tools"}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="organization" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <AIToolCard 
                  title={isInitialized ? t("ai.tools.sampleOrganizer") : "Sample Organizer"}
                  description={isInitialized ? t("ai.tools.sampleOrganizerDesc") : "Automatically organize your samples by type, genre, and BPM"}
                  icon={<FolderSearch className="h-5 w-5" />}
                  onClick={() => handleToolClick(isInitialized ? t("ai.tools.sampleOrganizer") : "Sample Organizer")}
                />
                <AIToolCard 
                  title={isInitialized ? t("ai.tools.patternCategorizer") : "Pattern Categorizer"}
                  description={isInitialized ? t("ai.tools.patternCategorizerDesc") : "Identify and categorize patterns in your sound library"}
                  icon={<Layers className="h-5 w-5" />}
                  onClick={() => handleToolClick(isInitialized ? t("ai.tools.patternCategorizer") : "Pattern Categorizer")}
                />
                <AIToolCard 
                  title={isInitialized ? t("ai.tools.smartTagging") : "Smart Tagging"}
                  description={isInitialized ? t("ai.tools.smartTaggingDesc") : "AI-powered tagging for easier content discovery"}
                  icon={<Tag className="h-5 w-5" />}
                  onClick={() => handleToolClick(isInitialized ? t("ai.tools.smartTagging") : "Smart Tagging")}
                />
                <AIToolCard 
                  title={isInitialized ? t("ai.tools.sessionPlanner") : "Session Planner"}
                  description={isInitialized ? t("ai.tools.sessionPlannerDesc") : "Schedule and optimize your recording sessions"}
                  icon={<Clock className="h-5 w-5" />}
                  onClick={() => handleToolClick(isInitialized ? t("ai.tools.sessionPlanner") : "Session Planner")}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="templates" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <AIToolCard 
                  title={isInitialized ? t("ai.tools.projectTemplates") : "Project Templates"}
                  description={isInitialized ? t("ai.tools.projectTemplatesDesc") : "Get started fast with intelligent templates"}
                  icon={<FolderGit2 className="h-5 w-5" />}
                  onClick={() => handleToolClick(isInitialized ? t("ai.tools.projectTemplates") : "Project Templates")}
                />
                <AIToolCard 
                  title={isInitialized ? t("ai.tools.signalFlow") : "Signal Flow"}
                  description={isInitialized ? t("ai.tools.signalFlowDesc") : "Visualize and analyze signal flow in your audio projects"}
                  icon={<GitBranch className="h-5 w-5" />}
                  onClick={() => handleToolClick(isInitialized ? t("ai.tools.signalFlow") : "Signal Flow")}
                />
                <AIToolCard 
                  title={isInitialized ? t("ai.tools.referenceLibrary") : "Reference Library"}
                  description={isInitialized ? t("ai.tools.referenceLibraryDesc") : "AI-curated library of reference tracks"}
                  icon={<Bookmark className="h-5 w-5" />}
                  onClick={() => handleToolClick(isInitialized ? t("ai.tools.referenceLibrary") : "Reference Library")}
                />
                <AIToolCard 
                  title={isInitialized ? t("ai.tools.licenseManager") : "License Manager"}
                  description={isInitialized ? t("ai.tools.licenseManagerDesc") : "Track licensing for all assets in your projects"}
                  icon={<FileText className="h-5 w-5" />}
                  onClick={() => handleToolClick(isInitialized ? t("ai.tools.licenseManager") : "License Manager")}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="project-management" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <AIToolCard 
                  title={isInitialized ? t("ai.tools.deadlineTracker") : "Deadline Tracker"}
                  description={isInitialized ? t("ai.tools.deadlineTrackerDesc") : "Smart reminders based on project milestones"}
                  icon={<Calendar className="h-5 w-5" />}
                  onClick={() => handleToolClick(isInitialized ? t("ai.tools.deadlineTracker") : "Deadline Tracker")}
                />
                <AIToolCard 
                  title={isInitialized ? t("ai.tools.communicationPortal") : "Communication Portal"}
                  description={isInitialized ? t("ai.tools.communicationPortalDesc") : "Streamline client feedback and communication"}
                  icon={<MessageSquare className="h-5 w-5" />}
                  onClick={() => handleToolClick(isInitialized ? t("ai.tools.communicationPortal") : "Communication Portal")}
                />
                <AIToolCard 
                  title={isInitialized ? t("ai.tools.progressTracker") : "Progress Tracker"}
                  description={isInitialized ? t("ai.tools.progressTrackerDesc") : "Visual milestones and completion stats"}
                  icon={<Activity className="h-5 w-5" />}
                  onClick={() => handleToolClick(isInitialized ? t("ai.tools.progressTracker") : "Progress Tracker")}
                />
                <AIToolCard 
                  title={isInitialized ? t("ai.tools.timeTracker") : "Time Tracker"}
                  description={isInitialized ? t("ai.tools.timeTrackerDesc") : "Automatically log time spent on different project aspects"}
                  icon={<Timer className="h-5 w-5" />}
                  onClick={() => handleToolClick(isInitialized ? t("ai.tools.timeTracker") : "Time Tracker")}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="studio-tools" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <AIToolCard 
                  title={isInitialized ? t("ai.tools.melodyGenerator") : "Melody Generator"}
                  description={isInitialized ? t("ai.tools.melodyGeneratorDesc") : "Generate melody ideas based on your project's style"}
                  icon={<Wand2 className="h-5 w-5" />}
                  onClick={() => handleToolClick(isInitialized ? t("ai.tools.melodyGenerator") : "Melody Generator")}
                />
                <AIToolCard 
                  title={isInitialized ? t("ai.tools.arrangeAssistant") : "Arrange Assistant"}
                  description={isInitialized ? t("ai.tools.arrangeAssistantDesc") : "Get personalized arrangement suggestions"}
                  icon={<FolderSearch className="h-5 w-5" />}
                  onClick={() => handleToolClick(isInitialized ? t("ai.tools.arrangeAssistant") : "Arrange Assistant")}
                />
                <AIToolCard 
                  title={isInitialized ? t("ai.tools.mixAnalyzer") : "Mix Analyzer"}
                  description={isInitialized ? t("ai.tools.mixAnalyzerDesc") : "AI-powered mix analysis and recommendations"}
                  icon={<Activity className="h-5 w-5" />}
                  onClick={() => handleToolClick(isInitialized ? t("ai.tools.mixAnalyzer") : "Mix Analyzer")}
                />
                <AIToolCard 
                  title={isInitialized ? t("ai.tools.creativePrompts") : "Creative Prompts"}
                  description={isInitialized ? t("ai.tools.creativePromptsDesc") : "Overcome creative blocks with targeted prompts"}
                  icon={<MessageSquare className="h-5 w-5" />}
                  onClick={() => handleToolClick(isInitialized ? t("ai.tools.creativePrompts") : "Creative Prompts")}
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
};

export default AITools;
