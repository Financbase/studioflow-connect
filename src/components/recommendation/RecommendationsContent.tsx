
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecommendationHeader } from "./RecommendationHeader";
import { RecommendationList } from "./RecommendationList";
import { recommendations } from "@/data/recommendations";

interface RecommendationsContentProps {
  pricingTier: string;
  embedded?: boolean;
}

export const RecommendationsContent: React.FC<RecommendationsContentProps> = ({
  pricingTier = "free",
  embedded = false
}) => {
  const [activeCategory, setActiveCategory] = useState("system");
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  // Filter recommendations based on search query
  const filteredRecommendations = searchQuery
    ? Object.entries(recommendations).reduce((acc, [key, items]) => {
        const filtered = items.filter(
          item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (filtered.length > 0) {
          acc[key] = filtered;
        }
        return acc;
      }, {} as Record<string, any[]>)
    : recommendations;

  return (
    <div className={embedded ? "" : "container mx-auto px-4 py-8"}>
      <RecommendationHeader 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />

      <Tabs
        defaultValue="system"
        value={activeCategory}
        onValueChange={handleCategoryChange}
        className="mt-8"
      >
        <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2">
          <TabsTrigger value="system" className="px-3 py-2">System</TabsTrigger>
          <TabsTrigger value="vm" className="px-3 py-2">VM</TabsTrigger>
          <TabsTrigger value="daw" className="px-3 py-2">DAW</TabsTrigger>
          <TabsTrigger value="audio" className="px-3 py-2">Audio</TabsTrigger>
          <TabsTrigger value="ai" className="px-3 py-2">AI</TabsTrigger>
          <TabsTrigger value="marketplace" className="px-3 py-2">Marketplace</TabsTrigger>
        </TabsList>

        {Object.entries(filteredRecommendations).map(([category, items]) => (
          <TabsContent key={category} value={category} className="mt-6 animate-in slide-in-from-bottom-1">
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
