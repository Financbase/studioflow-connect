
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/contexts/language";
import { FAQAdvancedViewProps } from "./types";

// Define related topic maps for different FAQ types
const relatedTopicsMap: Record<string, string[]> = {
  musicProduction: [
    "Studio Setup", "Sound Design", "Vocals", "Plugins", "Mixing", "Mastering"
  ],
  general: [
    "Account", "Billing", "Features", "Help", "Privacy", "Security"
  ],
  technical: [
    "Installation", "Compatibility", "Performance", "Troubleshooting", "Updates"
  ]
};

const FAQAdvancedView = ({ 
  lastSearched, 
  viewHistory, 
  setSearchQuery,
  faqType = 'general'
}: FAQAdvancedViewProps) => {
  const { t } = useLanguage();
  
  // Get the appropriate related topics based on FAQ type
  const relatedTopics = relatedTopicsMap[faqType] || relatedTopicsMap.general;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2 pb-2">
      <Card className="shadow-sm">
        <CardHeader className="py-2 px-3">
          <CardTitle className="text-sm">{t("support.recently_searched")}</CardTitle>
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
            <p className="text-xs text-muted-foreground">{t("kb.no_results")}</p>
          )}
        </CardContent>
      </Card>
      
      <Card className="shadow-sm">
        <CardHeader className="py-2 px-3">
          <CardTitle className="text-sm">{t("support.recently_viewed")}</CardTitle>
        </CardHeader>
        <CardContent className="py-2 px-3">
          {viewHistory.length > 0 ? (
            <ScrollArea className="h-[60px]">
              <ul className="space-y-1">
                {viewHistory.map((question, i) => (
                  <li 
                    key={i} 
                    className="text-xs hover:underline cursor-pointer text-muted-foreground"
                    onClick={() => setSearchQuery(question)}
                  >
                    {question.length > 40 ? `${question.substring(0, 40)}...` : question}
                  </li>
                ))}
              </ul>
            </ScrollArea>
          ) : (
            <p className="text-xs text-muted-foreground">{t("kb.no_results")}</p>
          )}
        </CardContent>
      </Card>
      
      <Card className="shadow-sm">
        <CardHeader className="py-2 px-3">
          <CardTitle className="text-sm">{t("support.related_topics")}</CardTitle>
        </CardHeader>
        <CardContent className="py-2 px-3">
          <div className="flex flex-wrap gap-1">
            {relatedTopics.map((topic, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="cursor-pointer"
                onClick={() => setSearchQuery(topic)}
              >
                {topic}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FAQAdvancedView;
