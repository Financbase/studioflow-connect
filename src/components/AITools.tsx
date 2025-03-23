
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
import { useLanguage } from "@/contexts/language/LanguageProvider";

const AITools = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("organization");
  
  const handleToolClick = (tool: string) => {
    toast({
      title: `${tool} ${t("ai.activated")}`,
      description: t("ai.workflowStarted"),
      duration: 3000,
    });
  };

  return (
    <section id="ai-tools" className="py-6 w-full">
      <h2 className="text-2xl font-semibold mb-4">{t("ai.workflowAssistant")}</h2>
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">{t("ai.generator.title")}</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            {t("ai.workflowDescription")}
          </p>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="organization">{t("ai.tabs.organization")}</TabsTrigger>
              <TabsTrigger value="templates">{t("ai.tabs.templates")}</TabsTrigger>
              <TabsTrigger value="project-management">{t("ai.tabs.projectManagement")}</TabsTrigger>
              <TabsTrigger value="studio-tools">{t("ai.tabs.studioTools")}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="organization" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <AIToolCard 
                  title={t("ai.tools.sampleOrganizer")}
                  description={t("ai.tools.sampleOrganizerDesc")}
                  icon={<FolderSearch className="h-5 w-5" />}
                  onClick={() => handleToolClick(t("ai.tools.sampleOrganizer"))}
                />
                <AIToolCard 
                  title={t("ai.tools.patternCategorizer")}
                  description={t("ai.tools.patternCategorizerDesc")}
                  icon={<Layers className="h-5 w-5" />}
                  onClick={() => handleToolClick(t("ai.tools.patternCategorizer"))}
                />
                <AIToolCard 
                  title={t("ai.tools.smartTagging")}
                  description={t("ai.tools.smartTaggingDesc")}
                  icon={<Tag className="h-5 w-5" />}
                  onClick={() => handleToolClick(t("ai.tools.smartTagging"))}
                />
                <AIToolCard 
                  title={t("ai.tools.sessionPlanner")}
                  description={t("ai.tools.sessionPlannerDesc")}
                  icon={<Clock className="h-5 w-5" />}
                  onClick={() => handleToolClick(t("ai.tools.sessionPlanner"))}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="templates" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <AIToolCard 
                  title={t("ai.tools.projectTemplates")}
                  description={t("ai.tools.projectTemplatesDesc")}
                  icon={<FolderGit2 className="h-5 w-5" />}
                  onClick={() => handleToolClick(t("ai.tools.projectTemplates"))}
                />
                <AIToolCard 
                  title={t("ai.tools.signalFlow")}
                  description={t("ai.tools.signalFlowDesc")}
                  icon={<GitBranch className="h-5 w-5" />}
                  onClick={() => handleToolClick(t("ai.tools.signalFlow"))}
                />
                <AIToolCard 
                  title={t("ai.tools.referenceLibrary")}
                  description={t("ai.tools.referenceLibraryDesc")}
                  icon={<Bookmark className="h-5 w-5" />}
                  onClick={() => handleToolClick(t("ai.tools.referenceLibrary"))}
                />
                <AIToolCard 
                  title={t("ai.tools.autoDocumentation")}
                  description={t("ai.tools.autoDocumentationDesc")}
                  icon={<FileText className="h-5 w-5" />}
                  onClick={() => handleToolClick(t("ai.tools.autoDocumentation"))}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="project-management" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <AIToolCard 
                  title={t("ai.tools.deadlineTracker")}
                  description={t("ai.tools.deadlineTrackerDesc")}
                  icon={<Calendar className="h-5 w-5" />}
                  onClick={() => handleToolClick(t("ai.tools.deadlineTracker"))}
                />
                <AIToolCard 
                  title={t("ai.tools.clientFeedback")}
                  description={t("ai.tools.clientFeedbackDesc")}
                  icon={<MessageSquare className="h-5 w-5" />}
                  onClick={() => handleToolClick(t("ai.tools.clientFeedback"))}
                />
                <AIToolCard 
                  title={t("ai.tools.timeTracker")}
                  description={t("ai.tools.timeTrackerDesc")}
                  icon={<Timer className="h-5 w-5" />}
                  onClick={() => handleToolClick(t("ai.tools.timeTracker"))}
                />
                <AIToolCard 
                  title={t("ai.tools.backupManager")}
                  description={t("ai.tools.backupManagerDesc")}
                  icon={<Clock className="h-5 w-5" />}
                  onClick={() => handleToolClick(t("ai.tools.backupManager"))}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="studio-tools" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <AIToolCard 
                  title={t("ai.tools.resourceMonitor")}
                  description={t("ai.tools.resourceMonitorDesc")}
                  icon={<Activity className="h-5 w-5" />}
                  onClick={() => handleToolClick(t("ai.tools.resourceMonitor"))}
                />
                <AIToolCard 
                  title={t("ai.tools.equipmentScanner")}
                  description={t("ai.tools.equipmentScannerDesc")}
                  icon={<FolderSearch className="h-5 w-5" />}
                  onClick={() => handleToolClick(t("ai.tools.equipmentScanner"))}
                />
                <AIToolCard 
                  title={t("ai.tools.pluginAnalytics")}
                  description={t("ai.tools.pluginAnalyticsDesc")}
                  icon={<Activity className="h-5 w-5" />}
                  onClick={() => handleToolClick(t("ai.tools.pluginAnalytics"))}
                />
                <AIToolCard 
                  title={t("ai.tools.bpmDetector")}
                  description={t("ai.tools.bpmDetectorDesc")}
                  icon={<Tag className="h-5 w-5" />}
                  onClick={() => handleToolClick(t("ai.tools.bpmDetector"))}
                />
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6">
            <div className="bg-muted/50 p-4 rounded-md mb-4">
              <p className="text-sm font-medium mb-2">{t("ai.philosophyTitle")}</p>
              <p className="text-xs text-muted-foreground">
                {t("ai.philosophyDescription")}
              </p>
            </div>
            <div className="flex justify-end">
              <Button variant="outline" className="mr-2">
                {t("ai.viewHistory")}
              </Button>
              <Button>
                <Wand2 className="h-4 w-4 mr-2" />
                {t("ai.startBatch")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feature showcase with detailed descriptions */}
      <div className="mt-8 space-y-8">
        <FeatureShowcase 
          title={t("ai.features.templatesTitle")}
          icon={<FolderGit2 className="h-6 w-6 text-primary" />}
          description={t("ai.features.templatesDesc")}
        >
          <p className="text-sm text-muted-foreground mb-4">
            {t("ai.features.templatesLongDesc")}
          </p>
          <ul className="text-sm space-y-2 mb-4">
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                <Clock className="h-3 w-3 text-primary" />
              </div>
              <span>{t("ai.features.templatesFeature1")}</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                <Clock className="h-3 w-3 text-primary" />
              </div>
              <span>{t("ai.features.templatesFeature2")}</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                <Clock className="h-3 w-3 text-primary" />
              </div>
              <span>{t("ai.features.templatesFeature3")}</span>
            </li>
          </ul>
          <Button size="sm" onClick={() => handleToolClick(t("ai.tools.projectTemplates"))}>
            {t("ai.browse")}
          </Button>
        </FeatureShowcase>

        <FeatureShowcase 
          title={t("ai.features.deadlineTitle")}
          icon={<Calendar className="h-6 w-6 text-primary" />}
          description={t("ai.features.deadlineDesc")}
        >
          <p className="text-sm text-muted-foreground mb-4">
            {t("ai.features.deadlineLongDesc")}
          </p>
          <ul className="text-sm space-y-2 mb-4">
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                <Clock className="h-3 w-3 text-primary" />
              </div>
              <span>{t("ai.features.deadlineFeature1")}</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                <Clock className="h-3 w-3 text-primary" />
              </div>
              <span>{t("ai.features.deadlineFeature2")}</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                <Clock className="h-3 w-3 text-primary" />
              </div>
              <span>{t("ai.features.deadlineFeature3")}</span>
            </li>
          </ul>
          <Button size="sm" onClick={() => handleToolClick(t("ai.tools.deadlineTracker"))}>
            {t("ai.viewProjects")}
          </Button>
        </FeatureShowcase>

        <FeatureShowcase 
          title={t("ai.features.feedbackTitle")}
          icon={<MessageSquare className="h-6 w-6 text-primary" />}
          description={t("ai.features.feedbackDesc")}
        >
          <p className="text-sm text-muted-foreground mb-4">
            {t("ai.features.feedbackLongDesc")}
          </p>
          <ul className="text-sm space-y-2 mb-4">
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                <Clock className="h-3 w-3 text-primary" />
              </div>
              <span>{t("ai.features.feedbackFeature1")}</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                <Clock className="h-3 w-3 text-primary" />
              </div>
              <span>{t("ai.features.feedbackFeature2")}</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                <Clock className="h-3 w-3 text-primary" />
              </div>
              <span>{t("ai.features.feedbackFeature3")}</span>
            </li>
          </ul>
          <Button size="sm" onClick={() => handleToolClick(t("ai.tools.clientFeedback"))}>
            {t("ai.openPortal")}
          </Button>
        </FeatureShowcase>

        <FeatureShowcase 
          title={t("ai.features.resourceTitle")}
          icon={<Activity className="h-6 w-6 text-primary" />}
          description={t("ai.features.resourceDesc")}
        >
          <p className="text-sm text-muted-foreground mb-4">
            {t("ai.features.resourceLongDesc")}
          </p>
          <ul className="text-sm space-y-2 mb-4">
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                <Clock className="h-3 w-3 text-primary" />
              </div>
              <span>{t("ai.features.resourceFeature1")}</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                <Clock className="h-3 w-3 text-primary" />
              </div>
              <span>{t("ai.features.resourceFeature2")}</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                <Clock className="h-3 w-3 text-primary" />
              </div>
              <span>{t("ai.features.resourceFeature3")}</span>
            </li>
          </ul>
          <Button size="sm" onClick={() => handleToolClick(t("ai.tools.resourceMonitor"))}>
            {t("ai.runAnalysis")}
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
