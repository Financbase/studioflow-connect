
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    <Tabs 
      value={activeCategory} 
      onValueChange={setActiveCategory}
      className="w-full"
    >
      <ScrollArea className="w-full pb-2">
        <TabsList className="inline-flex w-full justify-start h-auto p-1">
          {categoryCount ? categoryCount.map(({category, count}) => (
            <TabsTrigger 
              key={category} 
              value={category}
              className="flex items-center gap-1 capitalize"
            >
              {getCategoryIcon && getCategoryIcon(category)}
              {category}
              <Badge variant="outline" className="ml-1 h-5 text-xs">
                {count}
              </Badge>
            </TabsTrigger>
          )) : 
          categories.map(category => (
            <TabsTrigger 
              key={category} 
              value={category}
              className="flex items-center gap-1 capitalize"
            >
              {getCategoryIcon && getCategoryIcon(category)}
              {category}
              <Badge variant="outline" className="ml-1 h-5 text-xs">
                {categoryCounts[category] || 0}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>
      </ScrollArea>
    </Tabs>
  );
};

export default FAQCategories;
