
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileInfo from "./ProfileInfo";
import AccountInfo from "./AccountInfo";
import ActivityStats from "./ActivityStats";
import ProjectsTabContent from "./ProjectsTabContent";
import AssetsTabContent from "./AssetsTabContent";
import WorkflowsTabContent from "./WorkflowsTabContent";
import { Library, Music, Settings, User } from "lucide-react";
import { PricingTier } from "@/contexts/dashboard/types";
import { ProfileStats } from "./types";

interface ProfileTabsProps {
  user: any;
  profile: any;
  updateProfile: (updates: any) => Promise<void>;
  pricingTier: PricingTier;
  stats: ProfileStats;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({
  user,
  profile,
  updateProfile,
  pricingTier,
  stats,
  activeTab,
  setActiveTab
}) => {
  return (
    <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
        <TabsTrigger value="profile" className="text-sm">
          <User className="h-4 w-4 mr-2" />
          Profile
        </TabsTrigger>
        <TabsTrigger value="projects" className="text-sm">
          <Music className="h-4 w-4 mr-2" />
          Projects
        </TabsTrigger>
        <TabsTrigger value="assets" className="text-sm">
          <Library className="h-4 w-4 mr-2" />
          Assets
        </TabsTrigger>
        <TabsTrigger value="workflows" className="text-sm">
          <Settings className="h-4 w-4 mr-2" />
          Workflows
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profile" className="space-y-6 mt-6">
        <ProfileInfo 
          user={user} 
          profile={profile} 
          updateProfile={updateProfile} 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AccountInfo pricingTier={pricingTier} stats={stats} />
          <ActivityStats stats={stats} />
        </div>
      </TabsContent>
      
      <TabsContent value="projects">
        <ProjectsTabContent stats={stats} />
      </TabsContent>
      
      <TabsContent value="assets">
        <AssetsTabContent stats={stats} />
      </TabsContent>
      
      <TabsContent value="workflows">
        <WorkflowsTabContent stats={stats} />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
