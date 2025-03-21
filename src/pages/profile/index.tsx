
import React, { useState } from "react";
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
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6 md:py-10">
        <div className="flex flex-col gap-6 max-w-5xl mx-auto">
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
    </div>
  );
};

export default Profile;
