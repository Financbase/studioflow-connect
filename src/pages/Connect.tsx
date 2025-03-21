
import React from "react";
import { SidebarLayout } from "@/components/layout/Sidebar";
import Header from "@/components/Header";
import StudioFlowConnect from "@/components/StudioFlowConnect";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Connect = () => {
  return (
    <SidebarLayout>
      <Header />
      <main className="flex-1 px-4 py-6 md:px-6 lg:px-8 bg-background overflow-auto">
        <div className="max-w-[1200px] mx-auto space-y-6 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold">StudioFlow Connect</h1>
            <p className="text-muted-foreground">
              Cross-platform storage access and audio device connectivity
            </p>
          </div>

          <Tabs defaultValue="connect" className="space-y-4">
            <TabsList>
              <TabsTrigger value="connect">Connect</TabsTrigger>
              <TabsTrigger value="devices">Devices</TabsTrigger>
              <TabsTrigger value="storage">Storage</TabsTrigger>
              <TabsTrigger value="plugins">Plugins</TabsTrigger>
            </TabsList>
            
            <TabsContent value="connect" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>StudioFlow Connect</CardTitle>
                  <CardDescription>
                    Connect your storage devices, plugins, and hardware
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <StudioFlowConnect />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="devices" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Connected Devices</CardTitle>
                  <CardDescription>
                    Manage your audio interfaces and MIDI controllers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Device management content would go here</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="storage" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Storage Management</CardTitle>
                  <CardDescription>
                    Manage your connected storage devices
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Storage management content would go here</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="plugins" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Plugin Bridge</CardTitle>
                  <CardDescription>
                    Manage cross-platform plugin compatibility
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Plugin bridge management content would go here</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </SidebarLayout>
  );
};

export default Connect;
