
import React from "react";
import { Info } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TabsContent } from "@/components/ui/tabs";
import { FAQContentProps } from "./types";

const FAQContent = ({ 
  filteredFAQs, 
  searchQuery, 
  setSearchQuery, 
  handleFaqClick,
  t
}: FAQContentProps) => {
  return (
    <TabsContent value="all" className="pt-2">
      {filteredFAQs.length === 0 ? (
        <div className="text-center py-8">
          <Info className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">{t("kb.no_results")} "{searchQuery}"</p>
          <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
            {t("kb.clear_search")}
          </Button>
        </div>
      ) : (
        <Accordion type="single" collapsible className="w-full">
          {filteredFAQs.map((faq, index) => (
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
  );
};

export default FAQContent;
