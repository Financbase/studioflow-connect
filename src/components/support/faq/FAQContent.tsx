
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FAQContentProps } from "./types";

const FAQContent = ({ 
  filteredFAQs, 
  searchQuery, 
  setSearchQuery, 
  handleFaqClick,
  t 
}: FAQContentProps) => {
  // Render empty state if no FAQs match the search/filter
  if (filteredFAQs.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">{t("kb.no_results")}</p>
        {searchQuery && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setSearchQuery("")}
          >
            {t("kb.clear_search")}
          </Button>
        )}
      </div>
    );
  }

  // Function to highlight search terms in text
  const highlightSearchTerm = (text: string) => {
    if (!searchQuery) return text;
    
    const regex = new RegExp(`(${searchQuery})`, 'gi');
    return text.split(regex).map((part, i) => {
      if (part.toLowerCase() === searchQuery.toLowerCase()) {
        return <span key={i} className="bg-yellow-200 dark:bg-yellow-800">{part}</span>;
      }
      return part;
    });
  };

  return (
    <TabsContent value="all" forceMount>
      <Accordion type="single" collapsible className="space-y-2">
        {filteredFAQs.map((faq) => (
          <AccordionItem
            key={faq.id}
            value={faq.id}
            className="bg-card border rounded-lg overflow-hidden"
            onClick={() => handleFaqClick(faq.question)}
          >
            <AccordionTrigger className="px-4 py-3 hover:no-underline font-medium">
              {highlightSearchTerm(faq.question)}
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-3 pt-0">
              <div className="prose dark:prose-invert max-w-none">
                {highlightSearchTerm(faq.answer)}
              </div>
              
              {faq.tags && faq.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {faq.tags.map((tag) => (
                    <Button
                      key={tag}
                      variant="ghost"
                      size="sm"
                      className="text-xs py-0 h-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSearchQuery(tag);
                      }}
                    >
                      #{tag}
                    </Button>
                  ))}
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </TabsContent>
  );
};

export default FAQContent;
