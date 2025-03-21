
import React from "react";
import { SidebarLayout } from "@/components/layout/Sidebar";
import Header from "@/components/Header";
import { useDashboard } from "@/contexts/dashboard/useDashboard";
import RecommendationHeader from "@/components/recommendation/RecommendationHeader";
import RecommendationSearch from "@/components/recommendation/RecommendationSearch";
import RecommendationsContent from "@/components/recommendation/RecommendationsContent";
import { useRecommendationData } from "@/hooks/useRecommendationData";

const RecommendationsPage: React.FC = () => {
  const { pricingTier } = useDashboard();
  const { 
    workflowRecommendations,
    learningRecommendations,
    aiRecommendations,
    searchQuery,
    setSearchQuery,
    filterRecommendations
  } = useRecommendationData();

  return (
    <SidebarLayout>
      <Header />
      <main className="flex-1 px-4 py-6 md:px-6 lg:px-8 bg-background overflow-auto">
        <div className="max-w-5xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Recommendations</h1>
            <p className="text-muted-foreground">
              Personalized suggestions to improve your workflow and skills
            </p>
          </div>

          <RecommendationSearch 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
          />

          <RecommendationHeader pricingTier={pricingTier} />

          <RecommendationsContent
            workflowRecommendations={workflowRecommendations}
            learningRecommendations={learningRecommendations}
            aiRecommendations={aiRecommendations}
            filterRecommendations={filterRecommendations}
            pricingTier={pricingTier}
          />
        </div>
      </main>
    </SidebarLayout>
  );
};

export default RecommendationsPage;
