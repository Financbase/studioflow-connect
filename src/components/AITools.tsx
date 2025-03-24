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

const AITools = () => {
  const { t, isInitialized } = useLanguage();
  const [activeTab, setActiveTab] = useState("organization");
  
  const handleToolClick = (tool: string) => {
    toast({
      title: `${tool} ${isInitialized ? t("ai.activated") : "activated"}`,
      description: isInitialized ? t("ai.workflowStarted") : "Workflow started successfully",
      duration: 3000,
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
                  description={isInitialized ? t("ai.tools.referenceLibraryDesc") : "Access a vast library of audio samples and references"}
                  icon={<Bookmark className="h-5 w-5" />}
                  onClick={() => handleToolClick(isInitialized ? t("ai.tools.referenceLibrary") : "Reference Library")}
                />
                <AIToolCard 
                  title={isInitialized ? t("ai.tools.autoDocumentation") : "Auto Documentation"}
                  description={isInitialized ? t("ai.tools.autoDocumentationDesc") : "Automatically generate documentation for your audio projects"}
                  icon={<FileText className="h-5 w-5" />}
                  onClick={() => handleToolClick(isInitialized ? t("ai.tools.autoDocumentation") : "Auto Documentation")}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="project-management" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <AIToolCard 
                  title={isInitialized ? t("ai.tools.deadlineTracker") : "Deadline Tracker"}
                  description={isInitialized ? t("ai.tools.deadlineTrackerDesc") : "Never miss a project deadline with AI-powered scheduling"}
                  icon={<Calendar className="h-5 w-5" />}
                  onClick={() => handleToolClick(isInitialized ? t("ai.tools.deadlineTracker") : "Deadline Tracker")}
                />
                <AIToolCard 
                  title={isInitialized ? t("ai.tools.clientFeedback") : "Client Feedback"}
                  description={isInitialized ? t("ai.tools.clientFeedbackDesc") : "Streamline client communication and feedback collection"}
                  icon={<MessageSquare className="h-5 w-5" />}
                  onClick={() => handleToolClick(isInitialized ? t("ai.tools.clientFeedback") : "Client Feedback")}
                />
                <AIToolCard 
                  title={isInitialized ? t("ai.tools.timeTracker") : "Time Tracker"}
                  description={isInitialized ? t("ai.tools.timeTrackerDesc") : "Track and optimize your recording time"}
                  icon={<Timer className="h-5 w-5" />}
                  onClick={() => handleToolClick(isInitialized ? t("ai.tools.timeTracker") : "Time Tracker")}
                />
                <AIToolCard 
                  title={isInitialized ? t("ai.tools.backupManager") : "Backup Manager"}
                  description={isInitialized ? t("ai.tools.backupManagerDesc") : "Automatically back up your audio projects"}
                  icon={<Clock className="h-5 w-5" />}
                  onClick={() => handleToolClick(isInitialized ? t("ai.tools.backupManager") : "Backup Manager")}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="studio-tools" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <AIToolCard 
                  title={isInitialized ? t("ai.tools.resourceMonitor") : "Resource Monitor"}
                  description={isInitialized ? t("ai.tools.resourceMonitorDesc") : "Track system performance and optimize resource usage"}
                  icon={<Activity className="h-5 w-5" />}
                  onClick={() => handleToolClick(isInitialized ? t("ai.tools.resourceMonitor") : "Resource Monitor")}
                />
                <AIToolCard 
                  title={isInitialized ? t("ai.tools.equipmentScanner") : "Equipment Scanner"}
                  description={isInitialized ? t("ai.tools.equipmentScannerDesc") : "Automatically scan and manage your recording equipment"}
                  icon={<FolderSearch className="h-5 w-5" />}
                  onClick={() => handleToolClick(isInitialized ? t("ai.tools.equipmentScanner") : "Equipment Scanner")}
                />
                <AIToolCard 
                  title={isInitialized ? t("ai.tools.pluginAnalytics") : "Plugin Analytics"}
                  description={isInitialized ? t("ai.tools.pluginAnalyticsDesc") : "Analyze and optimize the performance of your audio plugins"}
                  icon={<Activity className="h-5 w-5" />}
                  onClick={() => handleToolClick(isInitialized ? t("ai.tools.pluginAnalytics") : "Plugin Analytics")}
                />
                <AIToolCard 
                  title={isInitialized ? t("ai.tools.bpmDetector") : "BPM Detector"}
                  description={isInitialized ? t("ai.tools.bpmDetectorDesc") : "Automatically detect and adjust BPM in your audio projects"}
                  icon={<Tag className="h-5 w-5" />}
                  onClick={() => handleToolClick(isInitialized ? t("ai.tools.bpmDetector") : "BPM Detector")}
                />
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6">
            <div className="bg-muted/50 p-4 rounded-md mb-4">
              <p className="text-sm font-medium mb-2">{isInitialized ? t("ai.philosophyTitle") : "Our AI Philosophy"}</p>
              <p className="text-xs text-muted-foreground">
                {isInitialized ? t("ai.philosophyDescription") : "We believe in AI that enhances human creativity rather than replacing it"}
              </p>
            </div>
            <div className="flex justify-end">
              <Button variant="outline" className="mr-2">
                {isInitialized ? t("ai.viewHistory") : "View History"}
              </Button>
              <Button>
                <Wand2 className="h-4 w-4 mr-2" />
                {isInitialized ? t("ai.startBatch") : "Start Batch"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-8">
        <FeatureShowcase 
          title={isInitialized ? t("ai.features.templatesTitle") : "Project Templates"}
          icon={<FolderGit2 className="h-6 w-6 text-primary" />}
          description={isInitialized ? t("ai.features.templatesDesc") : "Get started fast with intelligent templates"}
        >
          <p className="text-sm text-muted-foreground mb-4">
            {isInitialized ? t("ai.features.templatesLongDesc") : "Our AI analyzes your previous projects and working style to create personalized templates that match your workflow preferences."}
          </p>
          <ul className="text-sm space-y-2 mb-4">
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                <Clock className="h-3 w-3 text-primary" />
              </div>
              <span>{isInitialized ? t("ai.features.templatesFeature1") : "Intelligent template suggestions based on project type"}</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                <Clock className="h-3 w-3 text-primary" />
              </div>
              <span>{isInitialized ? t("ai.features.templatesFeature2") : "Customizable template parameters for fine-tuning"}</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                <Clock className="h-3 w-3 text-primary" />
              </div>
              <span>{isInitialized ? t("ai.features.templatesFeature3") : "Share templates with team members and collaborate"}</span>
            </li>
          </ul>
          <Button size="sm" onClick={() => handleToolClick(isInitialized ? t("ai.tools.projectTemplates") : "Project Templates")}>
            {isInitialized ? t("ai.browse") : "Browse Templates"}
          </Button>
        </FeatureShowcase>

        <FeatureShowcase 
          title={isInitialized ? t("ai.features.deadlineTitle") : "Smart Deadline Tracker"}
          icon={<Calendar className="h-6 w-6 text-primary" />}
          description={isInitialized ? t("ai.features.deadlineDesc") : "Never miss a project deadline with AI-powered scheduling"}
        >
          <p className="text-sm text-muted-foreground mb-4">
            {isInitialized ? t("ai.features.deadlineLongDesc") : "Our AI-powered deadline tracker learns from your work patterns and project history to provide intelligent scheduling assistance. It analyzes your commitments, resource availability, and delivers realistic timeline estimates."}
          </p>
          <ul className="text-sm space-y-2 mb-4">
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                <Clock className="h-3 w-3 text-primary" />
              </div>
              <span>{isInitialized ? t("ai.features.deadlineFeature1") : "Smart timeline predictions based on your working patterns"}</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                <Clock className="h-3 w-3 text-primary" />
              </div>
              <span>{isInitialized ? t("ai.features.deadlineFeature2") : "Automated resource allocation to meet critical deadlines"}</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                <Clock className="h-3 w-3 text-primary" />
              </div>
              <span>{isInitialized ? t("ai.features.deadlineFeature3") : "Collaborative scheduling with team availability synchronization"}</span>
            </li>
          </ul>
          <Button size="sm" onClick={() => handleToolClick(isInitialized ? t("ai.tools.deadlineTracker") : "Deadline Tracker")}>
            {isInitialized ? t("ai.viewProjects") : "View Projects"}
          </Button>
        </FeatureShowcase>

        <FeatureShowcase 
          title={isInitialized ? t("ai.features.feedbackTitle") : "Client Feedback Portal"}
          icon={<MessageSquare className="h-6 w-6 text-primary" />}
          description={isInitialized ? t("ai.features.feedbackDesc") : "Streamline client communication and feedback collection"}
        >
          <p className="text-sm text-muted-foreground mb-4">
            {isInitialized ? t("ai.features.feedbackLongDesc") : "Our AI-powered feedback portal provides a centralized platform for collecting, organizing, and responding to client feedback. Automated sentiment analysis helps prioritize critical feedback."}
          </p>
          <ul className="text-sm space-y-2 mb-4">
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                <Clock className="h-3 w-3 text-primary" />
              </div>
              <span>{isInitialized ? t("ai.features.feedbackFeature1") : "Secure client access with customizable permission levels"}</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                <Clock className="h-3 w-3 text-primary" />
              </div>
              <span>{isInitialized ? t("ai.features.feedbackFeature2") : "AI-powered sentiment analysis to prioritize feedback"}</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                <Clock className="h-3 w-3 text-primary" />
              </div>
              <span>{isInitialized ? t("ai.features.feedbackFeature3") : "Automated response suggestions for common feedback types"}</span>
            </li>
          </ul>
          <Button size="sm" onClick={() => handleToolClick(isInitialized ? t("ai.tools.clientFeedback") : "Client Feedback")}>
            {isInitialized ? t("ai.openPortal") : "Open AI Portal"}
          </Button>
        </FeatureShowcase>

        <FeatureShowcase 
          title={isInitialized ? t("ai.features.resourceTitle") : "Resource Monitor"}
          icon={<Activity className="h-6 w-6 text-primary" />}
          description={isInitialized ? t("ai.features.resourceDesc") : "Track system performance and optimize resource usage"}
        >
          <p className="text-sm text-muted-foreground mb-4">
            {isInitialized ? t("ai.features.resourceLongDesc") : "Our AI-powered resource monitor continuously analyzes your system performance, identifying bottlenecks and suggesting optimizations to improve workflow efficiency."}
          </p>
          <ul className="text-sm space-y-2 mb-4">
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                <Clock className="h-3 w-3 text-primary" />
              </div>
              <span>{isInitialized ? t("ai.features.resourceFeature1") : "Real-time CPU, RAM, and disk usage monitoring"}</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                <Clock className="h-3 w-3 text-primary" />
              </div>
              <span>{isInitialized ? t("ai.features.resourceFeature2") : "Plugin performance analysis and optimization suggestions"}</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                <Clock className="h-3 w-3 text-primary" />
              </div>
              <span>{isInitialized ? t("ai.features.resourceFeature3") : "Project-specific resource allocation recommendations"}</span>
            </li>
          </ul>
          <Button size="sm" onClick={() => handleToolClick(isInitialized ? t("ai.tools.resourceMonitor") : "Resource Monitor")}>
            {isInitialized ? t("ai.runAnalysis") : "Run Analysis"}
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
