
import React from "react";
import { PageContainer } from "@/components/ui/page-container";
import Header from "@/components/Header";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased">
      <Header />
      
      <PageContainer isMain className="py-8">
        <div className="max-w-[1200px] mx-auto space-y-8">
          {children}
        </div>
      </PageContainer>
    </div>
  );
};

export default AdminLayout;
