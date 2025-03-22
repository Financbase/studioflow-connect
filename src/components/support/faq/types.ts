
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
  filteredFAQs: FAQItem[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleFaqClick: (question: string) => void;
  t: (key: string) => string;
}

export interface FAQSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  resultsCount: number;
  isSearching: boolean;
  onSearch: (e: React.FormEvent) => void;
}

export interface FAQCategoriesProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  categoryCounts: Record<string, number>;
  categoryCount?: { category: string; count: number }[];
  getCategoryIcon?: (category: string) => ReactNode;
}

export interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  faqs?: FAQItem[];
  showAdvancedView?: boolean;
  faqType?: FAQType;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}
