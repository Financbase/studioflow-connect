
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useDashboard } from "@/contexts/dashboard/useDashboard";
import { useAuth } from "@/hooks/use-auth";
import { 
  LayoutDashboard, 
  Music, 
  AudioLines, 
  Mic, 
  Settings, 
  FileAudio, 
  HelpCircle, 
  FolderMusic,
  Sliders, 
  User,
  ListMusic,
  Sparkles,
  ExternalLink
} from "lucide-react";
import { 
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "@/contexts/ThemeContext";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  const { themeVariant } = useTheme();
  
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
};

const AppSidebar = () => {
  const { pricingTier, hasFeatureAccess } = useDashboard();
  const { user, profile } = useAuth();
  const location = useLocation();
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center">
          <Music className="h-6 w-6 text-primary mr-2" />
          <span className="font-bold text-lg">StudioFlow</span>
          <SidebarTrigger className="ml-auto" />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/")}>
                  <Link to="/">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/profile")}>
                  <Link to="/profile">
                    <User />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/projects")}>
                  <Link to="/projects">
                    <FolderMusic />
                    <span>Projects</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/library")}>
                  <Link to="/library">
                    <ListMusic />
                    <span>Library</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Studio Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/connect")}>
                  <Link to="/connect">
                    <ExternalLink />
                    <span>StudioFlow Connect</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive("/audio")}
                  tooltip={!hasFeatureAccess("audio") ? "Upgrade to access" : undefined}
                >
                  <Link to={hasFeatureAccess("audio") ? "/audio" : "#"} className={!hasFeatureAccess("audio") ? "opacity-50 pointer-events-none" : ""}>
                    <AudioLines />
                    <span>Audio Analysis</span>
                    {!hasFeatureAccess("audio") && (
                      <Badge variant="outline" className="ml-auto">Pro</Badge>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive("/daw")}
                  tooltip={!hasFeatureAccess("daw") ? "Upgrade to access" : undefined}
                >
                  <Link to={hasFeatureAccess("daw") ? "/daw" : "#"} className={!hasFeatureAccess("daw") ? "opacity-50 pointer-events-none" : ""}>
                    <Sliders />
                    <span>DAW Integration</span>
                    {!hasFeatureAccess("daw") && (
                      <Badge variant="outline" className="ml-auto">Pro</Badge>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive("/ai")}
                  tooltip={!hasFeatureAccess("ai") ? "Upgrade to access" : undefined}
                >
                  <Link to={hasFeatureAccess("ai") ? "/ai" : "#"} className={!hasFeatureAccess("ai") ? "opacity-50 pointer-events-none" : ""}>
                    <Sparkles />
                    <span>AI Tools</span>
                    {!hasFeatureAccess("ai") && (
                      <Badge variant="outline" className="ml-auto">Pro</Badge>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive("/marketplace")}
                  tooltip={!hasFeatureAccess("marketplace") ? "Upgrade to access" : undefined}
                >
                  <Link to={hasFeatureAccess("marketplace") ? "/marketplace" : "#"} className={!hasFeatureAccess("marketplace") ? "opacity-50 pointer-events-none" : ""}>
                    <FileAudio />
                    <span>Marketplace</span>
                    {!hasFeatureAccess("marketplace") && (
                      <Badge variant="outline" className="ml-auto">Pro</Badge>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/settings")}>
                  <Link to="/settings">
                    <Settings />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/support")}>
                  <Link to="/support">
                    <HelpCircle />
                    <span>Support</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/docs")}>
                  <Link to="/docs">
                    <HelpCircle />
                    <span>Documentation</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            {profile?.avatar_url ? (
              <AvatarImage src={profile.avatar_url} alt={profile.username} />
            ) : (
              <AvatarFallback>
                {profile?.username ? getInitials(profile.username) : "U"}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex flex-col truncate">
            <span className="text-sm font-medium truncate">
              {profile?.username || "User"}
            </span>
            <span className="text-xs text-muted-foreground">
              {pricingTier.charAt(0).toUpperCase() + pricingTier.slice(1)} Plan
            </span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
