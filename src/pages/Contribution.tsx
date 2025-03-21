
import React from "react";
import { SidebarLayout } from "@/components/layout/Sidebar";
import Header from "@/components/Header";
import ContributorDashboard from "@/components/contribution/ContributorDashboard";

const Contribution = () => {
  return (
    <SidebarLayout>
      <Header />
      <main className="flex-1 px-4 py-6 md:px-6 lg:px-8 bg-background overflow-auto">
        <div className="max-w-[1200px] mx-auto">
          <ContributorDashboard />
        </div>
      </main>
    </SidebarLayout>
  );
};

export default Contribution;
