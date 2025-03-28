
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRecommendations } from '@/hooks/useRecommendations';

interface RecommendationSearchProps {
  trigger?: React.ReactNode;
  pricingTier?: string;
}

export const RecommendationSearch: React.FC<RecommendationSearchProps> = ({
  trigger,
  pricingTier = 'free'
}) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  
  const { allRecommendations, categories } = useRecommendations({
    pricingTier,
    filterByTier: false // We'll show all recommendations in search but mark some as unavailable
  });

  // Flatten recommendations for search
  const allFlattenedRecommendations = Object.entries(allRecommendations).flatMap(
    ([category, items]) => items.map(item => ({ ...item, categoryKey: category }))
  );

  const handleSelect = (id: string, category: string) => {
    setOpen(false);
    navigate(`/recommendations?category=${category}&id=${id}`);
  };

  return (
    <>
      {trigger ? (
        <div onClick={() => setOpen(true)}>{trigger}</div>
      ) : (
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => setOpen(true)}
        >
          <Search className="h-4 w-4" />
          <span>Search recommendations</span>
        </Button>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Search Recommendations</DialogTitle>
          </DialogHeader>
          <Command>
            <CommandInput placeholder="Type to search..." />
            <CommandList>
              <CommandEmpty>No recommendations found.</CommandEmpty>
              {categories.map((category) => (
                <CommandGroup 
                  key={category} 
                  heading={category.charAt(0).toUpperCase() + category.slice(1)}
                >
                  {allRecommendations[category]?.map((item) => (
                    <CommandItem
                      key={item.id}
                      value={`${item.title} ${item.description}`}
                      onSelect={() => handleSelect(item.id, category)}
                    >
                      <div className="flex items-center">
                        {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                        <span>{item.title}</span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
};
