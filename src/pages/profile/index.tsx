
import React, { useState } from "react";
import { SidebarLayout } from "@/components/layout/Sidebar";
import Header from "@/components/Header";
import { useAuth } from "@/hooks/use-auth";
import { Badge } from "@/components/ui/badge";
import { useDashboard } from "@/contexts/dashboard/useDashboard";
import { getPlanBadge } from "./types";
import ProfileTabs from "./ProfileTabs";
import { getMockStats } from "./mockData";

const Profile = () => {
  const { user, profile, updateProfile } = useAuth();
  const { pricingTier } = useDashboard();
  const [activeTab, setActiveTab] = useState("profile");
  
  // Get mock stats data
  const mockStats = getMockStats();

  // Helper function to get the plan badge
  const renderPlanBadge = () => {
    const badgeVariant = getPlanBadge(pricingTier);
    return <Badge variant={badgeVariant as any}>{pricingTier.charAt(0).toUpperCase() + pricingTier.slice(1)} Plan</Badge>;
  };

  return (
    <SidebarLayout>
      <Header />
      <main className="flex-1 px-4 py-6 md:px-6 lg:px-8 bg-background overflow-auto">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">My Profile</h1>
              <p className="text-muted-foreground">
                Manage your personal information and preferences
              </p>
            </div>
            {renderPlanBadge()}
          </div>

          <ProfileTabs 
            user={user}
            profile={profile}
            updateProfile={updateProfile}
            pricingTier={pricingTier}
            stats={mockStats}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
      </main>
    </SidebarLayout>
  );
};

export default Profile;
