
import { ReactNode } from "react";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags?: string[];
}

export type FAQType = 'general' | 'musicProduction' | 'technical';

export interface FAQAdvancedViewProps {
  lastSearched: string[];
  viewHistory: string[];
  setSearchQuery: (query: string) => void;
  faqType?: FAQType;
}

export interface FAQContentProps {
  faqs: FAQItem[];
  filteredFAQs: FAQItem[];
  activeFAQ: string | null;
  setActiveFAQ: (id: string | null) => void;
  isSearching: boolean;
  searchQuery: string;
}

export interface FAQSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  resultsCount: number;
  isSearching: boolean;
}

export interface FAQCategoriesProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  categoryCounts: Record<string, number>;
}

export interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  faqs: FAQItem[];
  showAdvancedView?: boolean;
  faqType?: FAQType;
}
