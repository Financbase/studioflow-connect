
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  TicketPlus, 
  Settings, 
  Activity, 
  BarChart2,
  Share2,
  LineChart,
  HelpCircle,
  Mail
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  isActive: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon, 
  label, 
  isActive, 
  onClick 
}) => {
  return (
    <button
      className={cn(
        "flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md transition-colors",
        isActive 
          ? "bg-primary/10 text-primary font-medium" 
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
      onClick={onClick}
    >
      <span className="flex-shrink-0">{icon}</span>
      <span className="truncate">{label}</span>
    </button>
  );
};

const AdminSidebar: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get current section from the path
  const currentPath = location.pathname;
  
  const sidebarItems = [
    {
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: t("admin.dashboard"),
      path: "/admin",
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: t("admin.manage_users"),
      path: "/admin/users",
    },
    {
      icon: <TicketPlus className="h-5 w-5" />,
      label: t("admin.support_tickets"),
      path: "/admin/tickets",
    },
    {
      icon: <Activity className="h-5 w-5" />,
      label: t("admin.user_sessions"),
      path: "/admin/sessions",
    },
    {
      icon: <BarChart2 className="h-5 w-5" />,
      label: t("admin.system_analytics"),
      path: "/admin/analytics",
    },
    {
      icon: <Share2 className="h-5 w-5" />,
      label: t("admin.remote_assistance"),
      path: "/admin/remote",
    },
    {
      icon: <LineChart className="h-5 w-5" />,
      label: t("admin.system_stats"),
      path: "/admin/stats",
    }
  ];
  
  const bottomItems = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: t("admin.notifications"),
      path: "/admin/notifications",
    },
    {
      icon: <HelpCircle className="h-5 w-5" />,
      label: t("admin.help"),
      path: "/admin/help",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: t("admin.settings"),
      path: "/admin/settings",
    }
  ];
  
  const handleNavigation = (path: string) => {
    navigate(path);
  };
  
  return (
    <div className="w-64 h-full bg-card border-r border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold text-lg">Admin Portal</h2>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="p-3">
          <p className="text-xs font-medium text-muted-foreground mb-2 pl-2">
            {t("admin.main_navigation")}
          </p>
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <SidebarItem
                key={item.path}
                icon={item.icon}
                label={item.label}
                path={item.path}
                isActive={currentPath === item.path}
                onClick={() => handleNavigation(item.path)}
              />
            ))}
          </nav>
        </div>
      </div>
      
      <div className="p-3 border-t border-border">
        <nav className="space-y-1">
          {bottomItems.map((item) => (
            <SidebarItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              path={item.path}
              isActive={currentPath === item.path}
              onClick={() => handleNavigation(item.path)}
            />
          ))}
        </nav>
      </div>
    </div>
  );
};

export default AdminSidebar;
