
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  homeHref?: string;
  className?: string;
  separator?: React.ReactNode;
  showHomeIcon?: boolean;
  maxItems?: number;
}

/**
 * Responsive breadcrumbs navigation component that intelligently
 * handles overflow and provides consistent navigation context.
 */
export const Breadcrumbs = ({
  items,
  homeHref = '/',
  className,
  separator = <ChevronRight className="h-4 w-4 text-muted-foreground" />,
  showHomeIcon = true,
  maxItems = 4
}: BreadcrumbsProps) => {
  const allItems: BreadcrumbItem[] = [
    { label: 'Home', href: homeHref, icon: showHomeIcon ? <Home className="h-4 w-4" /> : undefined },
    ...items
  ];
  
  // Handle overflow by truncating middle items when needed
  const visibleItems = React.useMemo(() => {
    if (allItems.length <= maxItems) {
      return allItems;
    }
    
    // Always show first and last items
    const firstItem = allItems[0];
    const lastItem = allItems[allItems.length - 1];
    
    // Calculate how many middle items we can show
    const remainingSlots = maxItems - 2; // -2 for first and last items
    
    if (remainingSlots <= 0) {
      return [firstItem, { label: '...', href: undefined }, lastItem];
    }
    
    // Show some middle items
    const middleItems = allItems.slice(1, -1);
    const truncated = middleItems.length > remainingSlots;
    
    if (!truncated) {
      return allItems;
    }
    
    // Calculate how many items to show from start/end of middle section
    const startCount = Math.ceil(remainingSlots / 2);
    const endCount = Math.floor(remainingSlots / 2);
    
    const startItems = middleItems.slice(0, startCount);
    const endItems = endCount > 0 
      ? middleItems.slice(middleItems.length - endCount) 
      : [];
    
    return [
      firstItem,
      ...startItems,
      { label: '...', href: undefined },
      ...endItems,
      lastItem
    ];
  }, [allItems, maxItems]);
  
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center text-sm", className)}>
      <ol className="flex items-center flex-wrap">
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1;
          
          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <span className="mx-2 text-muted-foreground" aria-hidden="true">
                  {separator}
                </span>
              )}
              
              {item.href && !isLast ? (
                <Link
                  to={item.href}
                  className="flex items-center hover:text-primary transition-colors gap-1"
                >
                  {item.icon}
                  <span className={item.icon ? "hidden sm:inline" : undefined}>
                    {item.label}
                  </span>
                </Link>
              ) : (
                <span className={cn(
                  "flex items-center gap-1",
                  isLast ? "font-medium text-foreground" : "text-muted-foreground"
                )}>
                  {item.icon}
                  <span className={item.icon && !isLast ? "hidden sm:inline" : undefined}>
                    {item.label}
                  </span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
