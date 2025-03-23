
import React from "react";
import { PageContainer } from "@/components/ui/page-container";
import Header from "@/components/Header";
import AdminSidebar from "./AdminSidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />
        
        <div className="flex-1 overflow-auto">
          <PageContainer isMain className="py-8">
            <div className="max-w-[1200px] mx-auto space-y-8">
              {children}
            </div>
          </PageContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
