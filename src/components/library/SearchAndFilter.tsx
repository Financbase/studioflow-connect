
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Filter, 
  ChevronDown,
  Calendar,
  Type,
  HardDrive
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/language/LanguageProvider";

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sortBy?: "date" | "name" | "size";
  onSortChange?: (sort: "date" | "name" | "size") => void;
}

const SearchAndFilter = ({ 
  searchQuery, 
  onSearchChange,
  sortBy = "date",
  onSortChange = () => {}
}: SearchAndFilterProps) => {
  const { t } = useLanguage();
  
  const getSortLabel = () => {
    switch(sortBy) {
      case "date": return t("library.sort.date") || "Date Added";
      case "name": return t("library.sort.name") || "File Name";
      case "size": return t("library.sort.size") || "File Size";
      default: return t("library.sort.date") || "Date Added";
    }
  };
  
  const getSortIcon = () => {
    switch(sortBy) {
      case "date": return <Calendar className="h-4 w-4 mr-2" />;
      case "name": return <Type className="h-4 w-4 mr-2" />;
      case "size": return <HardDrive className="h-4 w-4 mr-2" />;
      default: return <Calendar className="h-4 w-4 mr-2" />;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder={t("library.search.placeholder") || "Search by name, type, or tag..."}
          className="pl-9"
          value={searchQuery}
          onChange={onSearchChange}
        />
      </div>
      
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-1">
              {getSortIcon()}
              <span className="hidden sm:inline">{getSortLabel()}</span>
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>{t("library.sort.title") || "Sort By"}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => onSortChange("date")}>
                <Calendar className="h-4 w-4 mr-2" />
                <span>{t("library.sort.date") || "Date Added"}</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSortChange("name")}>
                <Type className="h-4 w-4 mr-2" />
                <span>{t("library.sort.name") || "File Name"}</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSortChange("size")}>
                <HardDrive className="h-4 w-4 mr-2" />
                <span>{t("library.sort.size") || "File Size"}</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="h-10 w-10">
              <Filter className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>{t("library.filter.title") || "Filter"}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs">{t("library.filter.type") || "File Type"}</DropdownMenuLabel>
              <div className="p-2 flex flex-wrap gap-2">
                <Badge variant="outline" className="cursor-pointer hover:bg-accent">WAV</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-accent">MP3</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-accent">FLAC</Badge>
              </div>
            </DropdownMenuGroup>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs">{t("library.filter.tags") || "Tags"}</DropdownMenuLabel>
              <div className="p-2 flex flex-wrap gap-2">
                <Badge variant="outline" className="cursor-pointer hover:bg-accent">Drums</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-accent">Bass</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-accent">Synth</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-accent">Guitar</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-accent">Vocals</Badge>
              </div>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default SearchAndFilter;
