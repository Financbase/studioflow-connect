
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchAndFilter = ({ searchQuery, onSearchChange }: SearchAndFilterProps) => {
  return (
    <div className="relative flex gap-2">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search your audio library..." 
          className="pl-9"
          value={searchQuery}
          onChange={onSearchChange}
        />
      </div>
      <Button variant="outline" size="icon" className="h-10 w-10">
        <Filter className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SearchAndFilter;
