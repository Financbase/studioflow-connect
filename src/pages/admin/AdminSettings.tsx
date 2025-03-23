
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminToolbar from "@/components/admin/AdminToolbar";
import { Separator } from "@/components/ui/separator";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";

const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState("general");
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been successfully updated",
    });
  };
  
  return (
    <AdminLayout>
      <AdminToolbar />
      <h1 className="text-2xl font-bold mb-4">Admin Settings</h1>
      <Separator className="mb-6" />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-3 md:w-[400px]">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Manage system-wide settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Site Name</Label>
                  <Input id="site-name" defaultValue="Admin Dashboard" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input id="contact-email" type="email" defaultValue="admin@example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="support-phone">Support Phone</Label>
                  <Input id="support-phone" type="tel" defaultValue="+1 (555) 123-4567" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Put the site in maintenance mode for all users
                    </p>
                  </div>
                  <Switch id="maintenance-mode" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="debug-mode">Debug Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable detailed error logging for troubleshooting
                    </p>
                  </div>
                  <Switch id="debug-mode" />
                </div>
              </div>
              
              <Button onClick={handleSaveSettings}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security options and access controls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Require two-factor authentication for all admin users
                    </p>
                  </div>
                  <Switch id="two-factor" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="password-policy">Strong Password Policy</Label>
                    <p className="text-sm text-muted-foreground">
                      Enforce complex password requirements
                    </p>
                  </div>
                  <Switch id="password-policy" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="session-timeout">Session Timeout</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically log out inactive sessions after 30 minutes
                    </p>
                  </div>
                  <Switch id="session-timeout" defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="login-attempts">Failed Login Attempts</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="login-attempts"
                      type="number"
                      defaultValue="5"
                      className="w-20"
                    />
                    <span className="text-sm text-muted-foreground">
                      attempts before temporary lockout
                    </span>
                  </div>
                </div>
              </div>
              
              <Button onClick={handleSaveSettings}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure system notifications and alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Send email notifications for important events
                    </p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="user-registrations">New User Registrations</Label>
                    <p className="text-sm text-muted-foreground">
                      Notify administrators when new users register
                    </p>
                  </div>
                  <Switch id="user-registrations" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="system-alerts">System Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications for system warnings and errors
                    </p>
                  </div>
                  <Switch id="system-alerts" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="support-tickets">Support Tickets</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when new support tickets are created
                    </p>
                  </div>
                  <Switch id="support-tickets" defaultChecked />
                </div>
              </div>
              
              <Button onClick={handleSaveSettings}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminSettings;
