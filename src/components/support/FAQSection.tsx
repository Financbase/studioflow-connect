
import React, { useState, useMemo, useEffect } from "react";
import { Search, Info, ChevronDown, Tag as TagIcon, Music, Mic, Sliders, Activity, Database, Headphones, FileText, Waveform } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/contexts/LanguageContext";
import { faqs } from "@/data/faqs";
import { musicProductionFAQs } from "@/data/musicProductionFAQs";

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

interface FAQSectionProps {
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  faqType?: 'general' | 'musicProduction';
}

const FAQSection = ({ 
  searchQuery = "", 
  setSearchQuery = () => {}, 
  faqType = 'general' 
}: FAQSectionProps) => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [faqData, setFaqData] = useState<FAQ[]>(faqType === 'musicProduction' ? musicProductionFAQs : faqs);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [lastSearched, setLastSearched] = useState<string[]>([]);
  const [viewHistory, setViewHistory] = useState<string[]>([]);
  
  // Update FAQ data when faqType changes
  useEffect(() => {
    setFaqData(faqType === 'musicProduction' ? musicProductionFAQs : faqs);
    setActiveCategory("all");
  }, [faqType]);
  
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(faqData.map(faq => faq.category)));
    return ["all", ...uniqueCategories];
  }, [faqData]);
  
  const filteredFaqs = useMemo(() => {
    return faqData.filter(faq => {
      const matchesSearch = 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [faqData, searchQuery, activeCategory]);

  const categoryCount = useMemo(() => {
    return categories.map(category => {
      if (category === "all") {
        return { category, count: faqData.length };
      }
      return { 
        category, 
        count: faqData.filter(faq => faq.category === category).length 
      };
    });
  }, [faqData, categories]);
  
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'mixing':
        return <Sliders className="h-3 w-3" />;
      case 'mastering':
        return <Activity className="h-3 w-3" />;
      case 'recording':
        return <Mic className="h-3 w-3" />;
      case 'composition':
        return <Music className="h-3 w-3" />;
      case 'technical':
        return <Database className="h-3 w-3" />;
      case 'hardware':
        return <Headphones className="h-3 w-3" />;
      case 'software':
        return <FileText className="h-3 w-3" />;
      case 'theory':
        return <Waveform className="h-3 w-3" />;
      default:
        return <TagIcon className="h-3 w-3" />;
    }
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery && !lastSearched.includes(searchQuery)) {
      setLastSearched(prev => [searchQuery, ...prev.slice(0, 4)]);
    }
  };
  
  const handleFaqClick = (question: string) => {
    if (!viewHistory.includes(question)) {
      setViewHistory(prev => [question, ...prev.slice(0, 9)]);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>{faqType === 'musicProduction' ? t("kb.music_production") : t("kb.title")}</CardTitle>
          <CardDescription>
            {faqType === 'musicProduction' 
              ? t("kb.expert_tips") 
              : t("kb.guides")}
          </CardDescription>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          <Sliders className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">{showAdvanced ? "Simple View" : "Advanced View"}</span>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            className="pl-9" 
            placeholder={faqType === 'musicProduction' ? t("kb.search_music") : t("kb.search")} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        
        {showAdvanced && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2 pb-2">
            <Card className="shadow-sm">
              <CardHeader className="py-2 px-3">
                <CardTitle className="text-sm">Recently Searched</CardTitle>
              </CardHeader>
              <CardContent className="py-2 px-3">
                {lastSearched.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {lastSearched.map((term, i) => (
                      <Badge 
                        key={i} 
                        variant="outline" 
                        className="cursor-pointer" 
                        onClick={() => setSearchQuery(term)}
                      >
                        {term}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">No recent searches</p>
                )}
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader className="py-2 px-3">
                <CardTitle className="text-sm">Recently Viewed</CardTitle>
              </CardHeader>
              <CardContent className="py-2 px-3">
                {viewHistory.length > 0 ? (
                  <ScrollArea className="h-[60px]">
                    <ul className="space-y-1">
                      {viewHistory.map((question, i) => (
                        <li key={i} className="text-xs hover:underline cursor-pointer text-muted-foreground">
                          {question.length > 40 ? `${question.substring(0, 40)}...` : question}
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                ) : (
                  <p className="text-xs text-muted-foreground">No articles viewed yet</p>
                )}
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader className="py-2 px-3">
                <CardTitle className="text-sm">Related Topics</CardTitle>
              </CardHeader>
              <CardContent className="py-2 px-3">
                <div className="flex flex-wrap gap-1">
                  {faqType === 'musicProduction' ? (
                    <>
                      <Badge variant="outline" className="cursor-pointer">Studio Setup</Badge>
                      <Badge variant="outline" className="cursor-pointer">Sound Design</Badge>
                      <Badge variant="outline" className="cursor-pointer">Vocals</Badge>
                      <Badge variant="outline" className="cursor-pointer">Plugins</Badge>
                    </>
                  ) : (
                    <>
                      <Badge variant="outline" className="cursor-pointer">Account</Badge>
                      <Badge variant="outline" className="cursor-pointer">Billing</Badge>
                      <Badge variant="outline" className="cursor-pointer">Features</Badge>
                      <Badge variant="outline" className="cursor-pointer">Help</Badge>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <Tabs 
          defaultValue="all" 
          value={activeCategory} 
          onValueChange={setActiveCategory}
          className="w-full"
        >
          <ScrollArea className="w-full pb-2">
            <TabsList className="inline-flex w-full justify-start h-auto p-1">
              {categoryCount.map(({category, count}) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="flex items-center gap-1 capitalize"
                >
                  {getCategoryIcon(category)}
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
                <p className="text-muted-foreground">{t("kb.no_results")} "{searchQuery}"</p>
                <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
                  {t("kb.clear_search")}
                </Button>
              </div>
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger 
                      className="text-left"
                      onClick={() => handleFaqClick(faq.question)}
                    >
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
          {filteredFaqs.length} {t("kb.results_found")}
        </div>
        <Button variant="ghost" size="sm" className="gap-1 text-xs">
          <ChevronDown className="h-3 w-3" />
          {t("kb.view_all")}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FAQSection;
