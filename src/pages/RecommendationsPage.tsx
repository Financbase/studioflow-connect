
import React from "react";
import { SidebarLayout } from "@/components/layout/Sidebar";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecommendationHeader } from "@/components/recommendation/RecommendationHeader";
import { RecommendationList } from "@/components/recommendation/RecommendationList";
import { useDashboard } from "@/contexts/dashboard/useDashboard";
import { useRecommendations } from "@/hooks/useRecommendations";
import { RecommendationsContent } from "@/components/recommendation/RecommendationsContent";

const RecommendationsPage = () => {
  const { pricingTier = "free" } = useDashboard();

  return (
    <SidebarLayout>
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 bg-background animate-fade-in">
        <RecommendationsContent pricingTier={pricingTier} />
      </main>
    </SidebarLayout>
  );
};

export default RecommendationsPage;
