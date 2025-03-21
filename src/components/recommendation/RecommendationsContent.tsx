
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecommendationHeader } from "./RecommendationHeader";
import { RecommendationList } from "./RecommendationList";
import { useRecommendations } from "@/hooks/useRecommendations";

interface RecommendationsContentProps {
  pricingTier: string;
  embedded?: boolean;
}

export const RecommendationsContent: React.FC<RecommendationsContentProps> = ({
  pricingTier = "free",
  embedded = false
}) => {
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
    <div className={embedded ? "" : "container mx-auto px-4 py-8"}>
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
    </div>
  );
};
