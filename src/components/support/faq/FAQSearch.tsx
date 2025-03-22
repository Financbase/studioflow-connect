
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/language";
import { FAQSearchProps } from "./types";

const FAQSearch = ({ searchQuery, setSearchQuery, onSearch, resultsCount, isSearching }: FAQSearchProps) => {
  const { t } = useLanguage();
  
  return (
    <form onSubmit={onSearch} className="relative">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input 
        className="pl-9" 
        placeholder={t("kb.search")}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </form>
  );
};

export default FAQSearch;
