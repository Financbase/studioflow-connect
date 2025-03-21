
import React from "react";
import { SidebarLayout } from "@/components/layout/Sidebar";
import Header from "@/components/Header";
import ContributorDashboard from "@/components/contribution/ContributorDashboard";
import FundingProgress from "@/components/contribution/FundingProgress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommunityTab from "@/components/studioflow/CommunityTab";

const Contribution = () => {
  return (
    <SidebarLayout>
      <Header />
      <main className="flex-1 px-4 py-6 md:px-6 lg:px-8 bg-background overflow-auto">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col space-y-2 mb-6">
            <h1 className="text-3xl font-bold">Contribute to StudioFlow</h1>
            <p className="text-muted-foreground">Help shape the future of open-source music production</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
            <div className="lg:col-span-3 flex flex-col space-y-4">
              <FundingProgress />
              
              <div className="p-4 bg-amber-100 dark:bg-amber-900/30 rounded-lg border border-amber-200 dark:border-amber-800/50">
                <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-300 mb-2">Why Support Us?</h3>
                <p className="text-sm text-amber-700 dark:text-amber-200">
                  Your contributions directly fund development of new features, improved performance,
                  and help maintain StudioFlow as a free and open-source platform.
                </p>
              </div>
            </div>
            
            <div className="lg:col-span-4">
              <Tabs defaultValue="community" className="w-full">
                <TabsList className="w-full grid grid-cols-2 mb-4">
                  <TabsTrigger value="community" className="rounded-l-md">Community</TabsTrigger>
                  <TabsTrigger value="contributors" className="rounded-r-md">Contributors</TabsTrigger>
                </TabsList>
                
                <TabsContent value="community" className="focus-visible:outline-none focus-visible:ring-0">
                  <CommunityTab />
                </TabsContent>
                
                <TabsContent value="contributors" className="focus-visible:outline-none focus-visible:ring-0">
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
