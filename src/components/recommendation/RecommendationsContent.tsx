
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, BookOpen, FileCode } from "lucide-react";
import { Recommendation } from "@/types/recommendation";
import RecommendationSection from "./RecommendationSection";
import FeatureRecommendation from "@/components/FeatureRecommendation";

interface RecommendationsContentProps {
  workflowRecommendations: Recommendation[];
  learningRecommendations: Recommendation[];
  aiRecommendations: Recommendation[];
  filterRecommendations: (recommendations: Recommendation[]) => Recommendation[];
  pricingTier: string;
}

const RecommendationsContent: React.FC<RecommendationsContentProps> = ({
  workflowRecommendations,
  learningRecommendations,
  aiRecommendations,
  filterRecommendations,
  pricingTier
}) => {
  return (
    <Tabs defaultValue="all">
      <TabsList className="mb-4">
        <TabsTrigger value="all">All Recommendations</TabsTrigger>
        <TabsTrigger value="workflow">Workflow</TabsTrigger>
        <TabsTrigger value="learning">Learning</TabsTrigger>
        <TabsTrigger value="ai">AI Tools</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all">
        <div className="space-y-6">
          <RecommendationSection 
            title="Workflow Improvements"
            icon={<Settings className="h-5 w-5 text-primary" />}
            recommendations={filterRecommendations(workflowRecommendations)}
            pricingTier={pricingTier}
          />
          
          <RecommendationSection 
            title="Learning Resources"
            icon={<BookOpen className="h-5 w-5 text-primary" />}
            recommendations={filterRecommendations(learningRecommendations)}
            pricingTier={pricingTier}
          />
          
          <RecommendationSection 
            title="AI-Powered Features"
            icon={<FileCode className="h-5 w-5 text-primary" />}
            recommendations={filterRecommendations(aiRecommendations)}
            pricingTier={pricingTier}
          />
        </div>
      </TabsContent>
      
      <TabsContent value="workflow">
        <FeatureRecommendation 
          recommendations={filterRecommendations(workflowRecommendations)} 
          category="Workflow" 
        />
      </TabsContent>
      
      <TabsContent value="learning">
        <FeatureRecommendation 
          recommendations={filterRecommendations(learningRecommendations)} 
          category="Learning" 
        />
      </TabsContent>
      
      <TabsContent value="ai">
        <FeatureRecommendation 
          recommendations={filterRecommendations(aiRecommendations)} 
          category="AI Tools" 
        />
      </TabsContent>
    </Tabs>
  );
};

export default RecommendationsContent;
