
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface RecommendationHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const RecommendationHeader: React.FC<RecommendationHeaderProps> = ({
  searchQuery,
  setSearchQuery
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Recommendations</h1>
          <p className="text-muted-foreground">
            Discover features and tools to enhance your workflow
          </p>
        </div>
        <div className="relative flex w-full md:w-[300px]">
          <Input
            placeholder="Search recommendations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
          {searchQuery ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchQuery("")}
              className="absolute right-0 top-0 h-full"
            >
              <X className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full pointer-events-none"
            >
              <Search className="h-4 w-4 text-muted-foreground" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
