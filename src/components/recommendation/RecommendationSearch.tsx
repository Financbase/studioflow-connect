
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface RecommendationSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const RecommendationSearch: React.FC<RecommendationSearchProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input 
        placeholder="Search recommendations..." 
        className="pl-9"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default RecommendationSearch;
