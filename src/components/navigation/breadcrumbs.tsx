
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  homeHref?: string;
  className?: string;
  separator?: React.ReactNode;
  showHome?: boolean;
  maxItems?: number;
}

/**
 * Breadcrumbs component that shows the current navigation path
 * and allows users to navigate back to previous levels.
 */
export const Breadcrumbs = ({
  items = [],
  homeHref = '/',
  className,
  separator = <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />,
  showHome = true,
  maxItems = 0, // 0 means no limit
}: BreadcrumbsProps) => {
  const location = useLocation();
  
  // Generate breadcrumbs from the current path if no items are provided
  const generatedItems = React.useMemo(() => {
    if (items.length > 0) return items;
    
    const pathSegments = location.pathname.split('/')
      .filter(segment => segment !== '');
    
    const breadcrumbItems: BreadcrumbItem[] = [];
    let path = '';
    
    for (const segment of pathSegments) {
      path += `/${segment}`;
      
      // Capitalize first letter and replace hyphens with spaces
      const label = segment
        .replace(/-/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase());
      
      breadcrumbItems.push({
        label,
        href: path,
      });
    }
    
    return breadcrumbItems;
  }, [items, location.pathname]);
  
  // Apply max items limit if specified
  const visibleItems = maxItems > 0 && generatedItems.length > maxItems
    ? [
        ...generatedItems.slice(0, maxItems - 2),
        { label: '...', href: undefined },
        generatedItems[generatedItems.length - 1],
      ]
    : generatedItems;
  
  return (
    <nav
      className={cn(
        "flex items-center text-sm text-muted-foreground",
        className
      )}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-1">
        {showHome && (
          <li className="flex items-center">
            <Link
              to={homeHref}
              className="flex items-center hover:text-foreground transition-colors"
              aria-label="Home"
            >
              <Home className="h-4 w-4" />
            </Link>
            {visibleItems.length > 0 && separator}
          </li>
        )}
        
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1;
          
          return (
            <li key={`${item.label}-${index}`} className="flex items-center">
              {item.href ? (
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center hover:text-foreground transition-colors",
                    isLast && "text-foreground font-medium pointer-events-none"
                  )}
                >
                  {item.icon && <span className="mr-1">{item.icon}</span>}
                  {item.label}
                </Link>
              ) : (
                <span className="flex items-center">
                  {item.icon && <span className="mr-1">{item.icon}</span>}
                  {item.label}
                </span>
              )}
              {!isLast && separator}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
