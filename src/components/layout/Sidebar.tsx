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
  FileCode,
  CreditCard,
  HelpCircle,
  BookOpen,
  MessageSquare,
  Heart
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
      <span className="ml-2">{label}</span>
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
  const { hasFeatureAccess, pricingTier } = useDashboard();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true);
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true);
    }
  }, [location.pathname, isMobile]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex h-screen">
      <aside
        className={`flex flex-col space-y-2 bg-background border-r border-r-muted transition-all duration-300 ${
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
            <SidebarGroup title={isCollapsed ? "" : "Studio"}>
              <SidebarItem
                label="Projects"
                icon={<FileMusic className="h-4 w-4" />}
                link="/projects"
              />
              <SidebarItem
                label="Library"
                icon={<Library className="h-4 w-4" />}
                link="/library"
              />
              <SidebarItem
                label="Connect"
                icon={<Plug className="h-4 w-4" />}
                link="/connect"
              />
              {hasFeatureAccess('ai') && (
                <SidebarItem
                  label="AI Tools"
                  icon={<FileCode className="h-4 w-4" />}
                  link="/ai"
                />
              )}
            </SidebarGroup>

            <SidebarGroup title={isCollapsed ? "" : "Community"}>
              <SidebarItem
                label="Contribute"
                icon={<Heart className="h-4 w-4" />}
                link="/contribute"
              />
              <SidebarItem
                label="Learn"
                icon={<BookOpen className="h-4 w-4" />}
                link="/recommendations"
              />
            </SidebarGroup>

            <SidebarGroup title={isCollapsed ? "" : "Account"}>
              <SidebarItem
                label="Profile"
                icon={<User className="h-4 w-4" />}
                link="/profile"
              />
              <SidebarItem
                label="Settings"
                icon={<Settings className="h-4 w-4" />}
                link="/settings"
              />
              <SidebarItem
                label="Subscription"
                icon={<CreditCard className="h-4 w-4" />}
                link="/subscription"
              />
            </SidebarGroup>

            <SidebarGroup title={isCollapsed ? "" : "Support"}>
              <SidebarItem
                label="Help Center"
                icon={<HelpCircle className="h-4 w-4" />}
                link="/docs"
              />
              <SidebarItem
                label="Support"
                icon={<LifeBuoy className="h-4 w-4" />}
                link="/support"
              />
            </SidebarGroup>
          </div>
        </ScrollArea>
      </aside>

      <div className="flex-1 overflow-x-hidden">{children}</div>
    </div>
  );
};

export { SidebarLayout };
