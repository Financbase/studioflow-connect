
import generalFAQs from "./faqs";
import musicProductionFAQs from "./musicProductionFAQs";
import technicalFAQs from "./technicalFAQs";
import { FAQItem, FAQType } from "@/components/support/faq/types";

// Combined FAQs for searching across all categories
export const allFAQs: FAQItem[] = [
  ...generalFAQs,
  ...musicProductionFAQs,
  ...technicalFAQs
];

// Get FAQs by type
export const getFAQsByType = (type: FAQType): FAQItem[] => {
  switch (type) {
    case 'general':
      return generalFAQs;
    case 'musicProduction':
      return musicProductionFAQs;
    case 'technical':
      return technicalFAQs;
    default:
      return generalFAQs;
  }
};

// Extract all unique categories across all FAQ types
export const getAllCategories = (): string[] => {
  const categories = new Set<string>();
  
  allFAQs.forEach(faq => {
    categories.add(faq.category);
  });
  
  return Array.from(categories).sort();
};

// Get category counts for a specific FAQ type
export const getCategoryCounts = (type: FAQType): Record<string, number> => {
  const faqs = getFAQsByType(type);
  const counts: Record<string, number> = {};
  
  faqs.forEach(faq => {
    if (counts[faq.category]) {
      counts[faq.category]++;
    } else {
      counts[faq.category] = 1;
    }
  });
  
  return counts;
};

export default {
  generalFAQs,
  musicProductionFAQs,
  technicalFAQs,
  allFAQs,
  getFAQsByType,
  getAllCategories,
  getCategoryCounts
};
