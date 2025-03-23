
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/language";

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sortBy: "date" | "name" | "size";
  onSortChange: (value: "date" | "name" | "size") => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="relative w-full sm:w-96">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={t("library.searchFilter.search")}
          className="pl-8"
          value={searchQuery}
          onChange={onSearchChange}
        />
      </div>
      <div className="flex items-center gap-2 ml-auto">
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          {t("library.searchFilter.sortBy")}:
        </span>
        <Select
          value={sortBy}
          onValueChange={(value) => onSortChange(value as "date" | "name" | "size")}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="date">{t("library.searchFilter.date")}</SelectItem>
              <SelectItem value="name">{t("library.searchFilter.name")}</SelectItem>
              <SelectItem value="size">{t("library.searchFilter.size")}</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SearchAndFilter;
