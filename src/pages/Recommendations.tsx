
import React from "react";
import { SidebarLayout } from "@/components/layout/Sidebar";
import Header from "@/components/Header";
import { RecommendationsContent } from "@/components/recommendation/RecommendationsContent";
import { useDashboard } from "@/contexts/dashboard/useDashboard";

const Recommendations = () => {
  const { pricingTier = "free" } = useDashboard();

  return (
    <SidebarLayout>
      <Header />
      <main className="flex-1 bg-background animate-fade-in">
        <RecommendationsContent pricingTier={pricingTier} />
      </main>
    </SidebarLayout>
  );
};

export default Recommendations;
