
import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FAQCategoriesProps } from "./types";

const FAQCategories = ({ 
  categories, 
  activeCategory, 
  setActiveCategory, 
  categoryCounts, 
  categoryCount, 
  getCategoryIcon 
}: FAQCategoriesProps) => {
  return (
    <ScrollArea className="max-h-[300px]">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          // Get count from either categoryCount array or categoryCounts object
          let count = 0;
          if (categoryCount) {
            const countItem = categoryCount.find(c => c.category === category);
            count = countItem ? countItem.count : 0;
          } else if (categoryCounts && categoryCounts[category]) {
            count = categoryCounts[category];
          }
          
          return (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className="flex items-center gap-1"
            >
              {getCategoryIcon && getCategoryIcon(category)}
              <span className="capitalize">{category}</span>
              <span className="ml-1 text-xs opacity-70">({count})</span>
            </Button>
          );
        })}
      </div>
    </ScrollArea>
  );
};

export default FAQCategories;
