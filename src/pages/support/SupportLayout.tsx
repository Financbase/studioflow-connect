
import React from "react";
import { SidebarLayout } from "@/components/layout/Sidebar";
import Header from "@/components/Header";
import ContactCard from "@/components/support/ContactCard";

interface SupportLayoutProps {
  children: React.ReactNode;
}

const SupportLayout = ({ children }: SupportLayoutProps) => {
  return (
    <SidebarLayout>
      <Header />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 py-8">
        <div className="max-w-[1000px] mx-auto space-y-8">
          {children}
        </div>
      </main>
    </SidebarLayout>
  );
};

export default SupportLayout;
