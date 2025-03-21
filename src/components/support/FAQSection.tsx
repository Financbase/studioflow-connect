
import React, { useState, useMemo } from "react";
import { Search, Info, ChevronDown, Tag as TagIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const FAQSection = ({ faqs, searchQuery, setSearchQuery }: FAQSectionProps) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(faqs.map(faq => faq.category)));
    return ["all", ...uniqueCategories];
  }, [faqs]);
  
  const filteredFaqs = useMemo(() => {
    return faqs.filter(faq => {
      const matchesSearch = 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [faqs, searchQuery, activeCategory]);

  const categoryCount = useMemo(() => {
    return categories.map(category => {
      if (category === "all") {
        return { category, count: faqs.length };
      }
      return { 
        category, 
        count: faqs.filter(faq => faq.category === category).length 
      };
    });
  }, [faqs, categories]);

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Knowledge Base</CardTitle>
          <CardDescription>Frequently asked questions and helpful guides</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            className="pl-9" 
            placeholder="Search knowledge base..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs 
          defaultValue="all" 
          value={activeCategory} 
          onValueChange={setActiveCategory}
          className="w-full"
        >
          <ScrollArea className="w-full pb-2" orientation="horizontal">
            <TabsList className="inline-flex w-full justify-start h-auto p-1">
              {categoryCount.map(({category, count}) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="flex items-center gap-1 capitalize"
                >
                  <TagIcon className="h-3 w-3" />
                  {category}
                  <Badge variant="outline" className="ml-1 h-5 text-xs">
                    {count}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>
          </ScrollArea>

          <TabsContent value={activeCategory} className="pt-2">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-8">
                <Info className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">No articles found matching "{searchQuery}"</p>
                <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
                  Clear search
                </Button>
              </div>
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className="mt-0.5 capitalize">{faq.category}</Badge>
                        <span>{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="pt-0 border-t flex justify-between">
        <div className="text-xs text-muted-foreground">
          {filteredFaqs.length} results found
        </div>
        <Button variant="ghost" size="sm" className="gap-1 text-xs">
          <ChevronDown className="h-3 w-3" />
          View All FAQs
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FAQSection;
