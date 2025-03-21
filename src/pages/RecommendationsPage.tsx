
import React from "react";
import { SidebarLayout } from "@/components/layout/Sidebar";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecommendationHeader } from "@/components/recommendation/RecommendationHeader";
import { RecommendationList } from "@/components/recommendation/RecommendationList";
import { useDashboard } from "@/contexts/dashboard/useDashboard";
import { useRecommendations } from "@/hooks/useRecommendations";

const RecommendationsPage = () => {
  const { pricingTier = "free" } = useDashboard();
  const {
    categories,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    filteredRecommendations
  } = useRecommendations({ 
    pricingTier, 
    filterByTier: true 
  });

  return (
    <SidebarLayout>
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 bg-background animate-fade-in">
        <RecommendationHeader 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />

        <Tabs
          defaultValue="system"
          value={activeCategory}
          onValueChange={setActiveCategory}
          className="mt-8"
        >
          <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {categories.map(category => (
              <TabsTrigger 
                key={category} 
                value={category} 
                className="px-3 py-2"
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(filteredRecommendations).map(([category, items]) => (
            <TabsContent 
              key={category} 
              value={category} 
              className="mt-6 animate-in slide-in-from-bottom-1"
            >
              <RecommendationList 
                recommendations={items} 
                pricingTier={pricingTier} 
              />
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </SidebarLayout>
  );
};

export default RecommendationsPage;
