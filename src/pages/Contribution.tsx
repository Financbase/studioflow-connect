
import React from "react";
import { SidebarLayout } from "@/components/layout/Sidebar";
import Header from "@/components/Header";
import ContributorDashboard from "@/components/contribution/ContributorDashboard";
import FundingProgress from "@/components/contribution/FundingProgress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CommunityTab } from "@/components/studioflow/CommunityTab";

const Contribution = () => {
  return (
    <SidebarLayout>
      <Header />
      <main className="flex-1 px-4 py-6 md:px-6 lg:px-8 bg-background overflow-auto">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-3xl font-bold mb-2">Contribute to StudioFlow</h1>
          <p className="text-muted-foreground mb-6">Help shape the future of open-source music production</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
            <div className="lg:col-span-3">
              <FundingProgress />
            </div>
            <div className="lg:col-span-4">
              <Tabs defaultValue="community">
                <TabsList className="mb-4">
                  <TabsTrigger value="community">Community</TabsTrigger>
                  <TabsTrigger value="contributors">Contributors</TabsTrigger>
                </TabsList>
                
                <TabsContent value="community">
                  <CommunityTab />
                </TabsContent>
                
                <TabsContent value="contributors">
                  <ContributorDashboard />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </SidebarLayout>
  );
};

export default Contribution;
