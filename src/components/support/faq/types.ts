
export interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export interface FAQSectionProps {
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  faqType?: 'general' | 'musicProduction';
}

export interface FAQSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: (e: React.FormEvent) => void;
}

export interface FAQCategoriesProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  categoryCount: Array<{ category: string; count: number }>;
  getCategoryIcon: (category: string) => JSX.Element;
}

export interface FAQContentProps {
  filteredFaqs: FAQ[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleFaqClick: (question: string) => void;
  t: (key: string) => string;
}

export interface FAQAdvancedViewProps {
  lastSearched: string[];
  viewHistory: string[];
  setSearchQuery: (query: string) => void;
  faqType: 'general' | 'musicProduction';
}
