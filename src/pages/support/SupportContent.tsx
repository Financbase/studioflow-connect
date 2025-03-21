
import React from "react";
import ContactCard from "@/components/support/ContactCard";
import { useIsMobile } from "@/hooks/use-mobile";

interface SupportContentProps {
  headerComponent: React.ReactNode;
  tabsComponent: React.ReactNode;
}

const SupportContent = ({ headerComponent, tabsComponent }: SupportContentProps) => {
  const isMobile = useIsMobile();

  return (
    <>
      {headerComponent}
      {isMobile ? (
        <div className="space-y-8">
          <div>{tabsComponent}</div>
          <ContactCard />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <ContactCard />
          </div>
          <div className="md:col-span-3">
            {tabsComponent}
          </div>
        </div>
      )}
    </>
  );
};

export default SupportContent;
