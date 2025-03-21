import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDashboard } from "@/contexts/dashboard/useDashboard";
import { useTheme } from "@/contexts/ThemeContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { Separator } from "@/components/ui/separator";
import { 
  ChevronLeft, 
  ChevronRight, 
  Home, 
  Settings, 
  User, 
  FileMusic, 
  Headphones, 
  Library, 
  Plug, 
  LifeBuoy, 
  FileCode
} from "lucide-react";

interface SidebarProps {
  children: React.ReactNode;
}

interface SidebarItemProps {
  label: string;
  icon: React.ReactNode;
  link: string;
}

interface SidebarGroupProps {
  title: string;
  children: React.ReactNode;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, icon, link }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === link;

  return (
    <Button
      variant="ghost"
      className={`w-full justify-start font-normal ${
        isActive ? "bg-secondary text-foreground hover:bg-secondary" : "hover:bg-secondary/50"
      }`}
      onClick={() => navigate(link)}
    >
      {icon}
      <span>{label}</span>
    </Button>
  );
};

const SidebarGroup: React.FC<SidebarGroupProps> = ({ title, children }) => (
  <div className="space-y-1">
    <h4 className="mb-2 px-3 text-sm font-medium">{title}</h4>
    {children}
  </div>
);

const SidebarLayout: React.FC<SidebarProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { themeVariant } = useTheme();
  const { hasFeatureAccess } = useDashboard();
  const { isMobile } = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Collapse the sidebar on mobile devices
    if (isMobile) {
      setIsCollapsed(true);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`flex flex-col space-y-2 bg-secondary border-r border-r-muted/50 transition-all duration-300 ${
          isCollapsed ? "w-16" : "w-64"
        } ${themeVariant === "windows" ? "border-r-2" : ""} z-50`}
      >
        <div className="flex items-center justify-between py-3 px-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <Home className="h-5 w-5" />
            {!isCollapsed && <span className="ml-2">Home</span>}
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
        
        <Separator className={themeVariant === "windows" ? "border-b-2" : ""} />

        <ScrollArea className="flex-1">
          <div className="flex flex-col space-y-4 py-4">
            <SidebarGroup title="Studio">
              <SidebarItem
                label="Projects"
                icon={<FileMusic className="h-4 w-4 mr-2" />}
                link="/projects"
              />
              <SidebarItem
                label="Library"
                icon={<Library className="h-4 w-4 mr-2" />}
                link="/library"
              />
              <SidebarItem
                label="Connect"
                icon={<Plug className="h-4 w-4 mr-2" />}
                link="/connect"
              />
              {hasFeatureAccess('ai') && (
                <SidebarItem
                  label="AI Tools"
                  icon={<FileCode className="h-4 w-4 mr-2" />}
                  link="/ai"
                />
              )}
            </SidebarGroup>

            <SidebarGroup title="User">
              <SidebarItem
                label="Profile"
                icon={<User className="h-4 w-4 mr-2" />}
                link="/profile"
              />
              <SidebarItem
                label="Settings"
                icon={<Settings className="h-4 w-4 mr-2" />}
                link="/settings"
              />
              <SidebarItem
                label="Support"
                icon={<LifeBuoy className="h-4 w-4 mr-2" />}
                link="/support"
              />
            </SidebarGroup>
          </div>
        </ScrollArea>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden">{children}</div>
    </div>
  );
};

export { SidebarLayout };
