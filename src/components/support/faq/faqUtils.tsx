
import { Book, HelpCircle, Settings, Music, Activity, Users, Lock, CreditCard, FileQuestion, MessagesSquare } from "lucide-react";
import { FAQItem, FAQType } from "./types";
import { getFAQsByType, getCategoryCounts, getAllCategories } from "@/data/faqsIndex";
import React from "react";

/**
 * Get icon for FAQ category
 */
export const getCategoryIcon = (category: string) => {
  const icons: Record<string, React.ReactNode> = {
    account: <Users className="h-4 w-4" />,
    billing: <CreditCard className="h-4 w-4" />,
    security: <Lock className="h-4 w-4" />,
    help: <HelpCircle className="h-4 w-4" />,
    technical: <Settings className="h-4 w-4" />,
    installation: <Settings className="h-4 w-4" />,
    compatibility: <Activity className="h-4 w-4" />,
    performance: <Activity className="h-4 w-4" />,
    troubleshooting: <FileQuestion className="h-4 w-4" />,
    updates: <Activity className="h-4 w-4" />,
    mixing: <Music className="h-4 w-4" />,
    mastering: <Music className="h-4 w-4" />,
    production: <Music className="h-4 w-4" />,
    all: <MessagesSquare className="h-4 w-4" />,
  };

  const lowerCaseCategory = category.toLowerCase();
  
  return icons[lowerCaseCategory] || <Book className="h-4 w-4" />;
};

/**
 * Search FAQs based on a query string
 */
export const searchFAQs = (faqs: FAQItem[], query: string): FAQItem[] => {
  if (!query.trim()) return faqs;
  
  const lowercaseQuery = query.toLowerCase();
  
  return faqs.filter((faq) => {
    const matchesQuestion = faq.question.toLowerCase().includes(lowercaseQuery);
    const matchesAnswer = faq.answer.toLowerCase().includes(lowercaseQuery);
    const matchesCategory = faq.category.toLowerCase().includes(lowercaseQuery);
    const matchesTags = faq.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery));
    
    return matchesQuestion || matchesAnswer || matchesCategory || matchesTags;
  });
};

/**
 * Filter FAQs by category
 */
export const filterFAQsByCategory = (faqs: FAQItem[], category: string): FAQItem[] => {
  if (category === "all") return faqs;
  return faqs.filter((faq) => faq.category === category);
};

/**
 * Get all available categories from FAQs
 */
export const getCategories = (faqType: FAQType): string[] => {
  // Use the utility from faqsIndex to get categories
  return getAllCategories();
};

/**
 * Count FAQs per category
 */
export const countFAQsPerCategory = (faqType: FAQType): Record<string, number> => {
  // Use the utility from faqsIndex to get category counts
  return getCategoryCounts(faqType);
};

/**
 * Get FAQs by type
 */
export const getFAQs = (faqType: FAQType): FAQItem[] => {
  // Use the utility from faqsIndex
  return getFAQsByType(faqType);
};

export default {
  searchFAQs,
  filterFAQsByCategory,
  getCategories,
  countFAQsPerCategory,
  getFAQs,
  getCategoryIcon
};
