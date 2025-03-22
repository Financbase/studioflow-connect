
import React, { useState, useMemo, useEffect } from "react";
import { Sliders, ChevronDown } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/language";
import { FAQItem, FAQSectionProps } from "./types";
import FAQSearch from "./FAQSearch";
import FAQCategories from "./FAQCategories";
import FAQContent from "./FAQContent";
import FAQAdvancedView from "./FAQAdvancedView";
import { getCategoryIcon } from "./faqUtils";
import generalFAQs from "@/data/faqs";
import musicProductionFAQs from "@/data/musicProductionFAQs";
import technicalFAQs from "@/data/technicalFAQs";

const FAQSection = ({ 
  title,
  subtitle,
  faqs,
  showAdvancedView = false,
  faqType = 'general',
  searchQuery: initialSearchQuery = "", 
  setSearchQuery: externalSetSearchQuery
}: FAQSectionProps) => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [faqData, setFaqData] = useState<FAQItem[]>(
    faqType === 'musicProduction' ? musicProductionFAQs : 
    faqType === 'technical' ? technicalFAQs : 
    generalFAQs
  );
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [showAdvanced, setShowAdvanced] = useState(showAdvancedView);
  const [lastSearched, setLastSearched] = useState<string[]>([]);
  const [viewHistory, setViewHistory] = useState<string[]>([]);
  
  // Update search query state when prop changes
  useEffect(() => {
    setSearchQuery(initialSearchQuery);
  }, [initialSearchQuery]);

  // Sync internal state with external state if provided
  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
    if (externalSetSearchQuery) {
      externalSetSearchQuery(query);
    }
  };
  
  // Update FAQ data when faqType changes
  useEffect(() => {
    if (faqType === 'musicProduction') {
      setFaqData(musicProductionFAQs);
    } else if (faqType === 'technical') {
      setFaqData(technicalFAQs);
    } else {
      setFaqData(generalFAQs);
    }
    setActiveCategory("all");
  }, [faqType]);
  
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(faqData.map(faq => faq.category)));
    return ["all", ...uniqueCategories];
  }, [faqData]);
  
  const filteredFAQs = useMemo(() => {
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
          <CardTitle>{title || (faqType === 'musicProduction' ? t("kb.music_production") : t("kb.title"))}</CardTitle>
          <CardDescription>
            {subtitle || (faqType === 'musicProduction' 
              ? t("kb.expert_tips") 
              : t("kb.guides"))}
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
        <FAQSearch 
          searchQuery={searchQuery} 
          setSearchQuery={handleSearchQueryChange} 
          onSearch={handleSearch}
          resultsCount={filteredFAQs.length}
          isSearching={searchQuery.length > 0}
        />
        
        {showAdvanced && (
          <FAQAdvancedView 
            lastSearched={lastSearched}
            viewHistory={viewHistory}
            setSearchQuery={handleSearchQueryChange}
            faqType={faqType}
          />
        )}

        <FAQCategories 
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          categoryCounts={{}}
          categoryCount={categoryCount}
          getCategoryIcon={getCategoryIcon}
        />

        <Tabs value={activeCategory}>
          <FAQContent 
            filteredFAQs={filteredFAQs}
            searchQuery={searchQuery}
            setSearchQuery={handleSearchQueryChange}
            handleFaqClick={handleFaqClick}
            t={t}
          />
        </Tabs>
      </CardContent>
      <CardFooter className="pt-0 border-t flex justify-between">
        <div className="text-xs text-muted-foreground">
          {filteredFAQs.length} {t("kb.results_found")}
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
