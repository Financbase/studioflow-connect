
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart2, TicketPlus, Activity, 
  Share2, LineChart, Users
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AdminTabsProps {
  activeTab: string;
}

const AdminTabs: React.FC<AdminTabsProps> = ({ activeTab }) => {
  const { t } = useLanguage();
  
  return (
    <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 h-auto">
      <TabsTrigger value="overview" className="text-sm h-10">
        <BarChart2 className="mr-2 h-4 w-4" />
        <span className="hidden xs:inline">{t("admin.overview")}</span>
      </TabsTrigger>
      
      <TabsTrigger value="tickets" className="text-sm h-10">
        <TicketPlus className="mr-2 h-4 w-4" />
        <span className="hidden xs:inline">{t("admin.support_tickets")}</span>
      </TabsTrigger>
      
      <TabsTrigger value="sessions" className="text-sm h-10">
        <Activity className="mr-2 h-4 w-4" />
        <span className="hidden xs:inline">{t("admin.user_sessions")}</span>
      </TabsTrigger>
      
      <TabsTrigger value="users" className="text-sm h-10">
        <Users className="mr-2 h-4 w-4" />
        <span className="hidden xs:inline">{t("admin.manage_users")}</span>
      </TabsTrigger>
      
      <TabsTrigger value="remote" className="text-sm h-10">
        <Share2 className="mr-2 h-4 w-4" />
        <span className="hidden xs:inline">{t("admin.remote_assistance")}</span>
      </TabsTrigger>
      
      <TabsTrigger value="analytics" className="text-sm h-10">
        <LineChart className="mr-2 h-4 w-4" />
        <span className="hidden xs:inline">{t("admin.system_analytics")}</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default AdminTabs;
