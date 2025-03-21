
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Download, HardDrive, Zap, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDashboard } from "@/contexts/dashboard/useDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type NotificationType = "update" | "alert" | "info";

interface Notification {
  id: string;
  title: string;
  description: string;
  date: string;
  read: boolean;
  type: NotificationType;
  category: "plugin" | "firmware" | "software" | "system";
  actionUrl?: string;
  actionLabel?: string;
}

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Audio Driver Update Available",
    description: "New version 2.5.1 of your audio interface driver is available with improved latency performance.",
    date: "2025-03-18",
    read: false,
    type: "update",
    category: "firmware",
    actionUrl: "#",
    actionLabel: "Download"
  },
  {
    id: "2",
    title: "EQ Plugin Critical Update",
    description: "Critical bug fix for the parametric EQ plugin that addresses CPU spikes during automation.",
    date: "2025-03-15",
    read: false,
    type: "alert",
    category: "plugin",
    actionUrl: "#",
    actionLabel: "Update Now"
  },
  {
    id: "3",
    title: "System Optimization Tips",
    description: "Learn how to optimize your system for better audio performance with our latest guide.",
    date: "2025-03-10",
    read: true,
    type: "info",
    category: "system"
  },
  {
    id: "4",
    title: "StudioFlow Update v2.1",
    description: "The latest StudioFlow update includes new templates and collaboration features.",
    date: "2025-03-07",
    read: true,
    type: "update",
    category: "software",
    actionUrl: "#",
    actionLabel: "View Details"
  },
  {
    id: "5",
    title: "Hardware Firmware Release",
    description: "Your MIDI controller has a new firmware that improves responsiveness and adds new features.",
    date: "2025-03-05",
    read: false,
    type: "update",
    category: "firmware",
    actionUrl: "#",
    actionLabel: "Download"
  }
];

const NotificationsTab: React.FC = () => {
  const { pricingTier } = useDashboard();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [notificationSettings, setNotificationSettings] = useState({
    plugins: true,
    firmware: true,
    software: true,
    system: true
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  
  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };
  
  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };
  
  const handleRemoveNotification = (id: string) => {
    setNotifications(prev => 
      prev.filter(notif => notif.id !== id)
    );
  };

  const getNotificationIcon = (category: string) => {
    switch (category) {
      case "plugin": return <Zap className="h-4 w-4" />;
      case "firmware": return <HardDrive className="h-4 w-4" />;
      case "software": return <Download className="h-4 w-4" />;
      case "system": return <Bell className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };
  
  const getTypeVariant = (type: NotificationType) => {
    switch (type) {
      case "update": return "default";
      case "alert": return "destructive";
      case "info": return "secondary";
      default: return "default";
    }
  };

  const handleToggleSetting = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                Notifications
                {unreadCount > 0 && (
                  <Badge className="ml-2">{unreadCount} new</Badge>
                )}
              </CardTitle>
              <CardDescription>
                Stay updated on your plugins, hardware, and software
              </CardDescription>
            </div>
            {unreadCount > 0 && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleMarkAllAsRead}
              >
                Mark all as read
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              {notifications.length === 0 ? (
                <div className="text-center py-8">
                  <Bell className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                  <h3 className="text-lg font-medium">No notifications</h3>
                  <p className="text-muted-foreground">
                    You're all caught up!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`p-4 rounded-lg border relative ${
                        notification.read ? 'bg-card' : 'bg-accent/10'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <div className="bg-primary/10 p-2 rounded-full">
                          {getNotificationIcon(notification.category)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-medium">{notification.title}</h4>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-7 w-7 -mt-1 -mr-1"
                              onClick={() => handleRemoveNotification(notification.id)}
                            >
                              <X className="h-4 w-4" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.description}
                          </p>
                          <div className="flex items-center justify-between mt-2 text-xs">
                            <div className="flex gap-2 items-center">
                              <Badge 
                                variant={getTypeVariant(notification.type) as any} 
                                className="capitalize text-xs"
                              >
                                {notification.type}
                              </Badge>
                              <span className="text-muted-foreground">
                                {new Date(notification.date).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="space-x-2">
                              {!notification.read && (
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-7 text-xs"
                                  onClick={() => handleMarkAsRead(notification.id)}
                                >
                                  Mark as read
                                </Button>
                              )}
                              {notification.actionUrl && (
                                <Button 
                                  variant="secondary" 
                                  size="sm" 
                                  className="h-7 text-xs"
                                >
                                  {notification.actionLabel || "View"}
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="unread">
              {notifications.filter(n => !n.read).length === 0 ? (
                <div className="text-center py-8">
                  <Bell className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                  <h3 className="text-lg font-medium">No unread notifications</h3>
                  <p className="text-muted-foreground">
                    You're all caught up!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {notifications
                    .filter(notification => !notification.read)
                    .map(notification => (
                      <div 
                        key={notification.id} 
                        className="p-4 rounded-lg border bg-accent/10 relative"
                      >
                        <div className="flex items-start gap-2">
                          <div className="bg-primary/10 p-2 rounded-full">
                            {getNotificationIcon(notification.category)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-medium">{notification.title}</h4>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-7 w-7 -mt-1 -mr-1"
                                onClick={() => handleRemoveNotification(notification.id)}
                              >
                                <X className="h-4 w-4" />
                                <span className="sr-only">Remove</span>
                              </Button>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {notification.description}
                            </p>
                            <div className="flex items-center justify-between mt-2 text-xs">
                              <div className="flex gap-2 items-center">
                                <Badge 
                                  variant={getTypeVariant(notification.type) as any} 
                                  className="capitalize text-xs"
                                >
                                  {notification.type}
                                </Badge>
                                <span className="text-muted-foreground">
                                  {new Date(notification.date).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-7 text-xs"
                                  onClick={() => handleMarkAsRead(notification.id)}
                                >
                                  Mark as read
                                </Button>
                                {notification.actionUrl && (
                                  <Button 
                                    variant="secondary" 
                                    size="sm" 
                                    className="h-7 text-xs"
                                  >
                                    {notification.actionLabel || "View"}
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="settings">
              <div className="space-y-4">
                <div className="grid gap-3">
                  <div className="flex items-center justify-between space-y-0">
                    <div className="flex flex-col">
                      <Label htmlFor="plugins">Plugin Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about plugin updates and important changes
                      </p>
                    </div>
                    <Switch
                      id="plugins"
                      checked={notificationSettings.plugins}
                      onCheckedChange={() => handleToggleSetting('plugins')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-y-0">
                    <div className="flex flex-col">
                      <Label htmlFor="firmware">Hardware Firmware</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive alerts about new firmware for your hardware devices
                      </p>
                    </div>
                    <Switch
                      id="firmware"
                      checked={notificationSettings.firmware}
                      onCheckedChange={() => handleToggleSetting('firmware')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-y-0">
                    <div className="flex flex-col">
                      <Label htmlFor="software">Software Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Stay informed about StudioFlow and other software updates
                      </p>
                    </div>
                    <Switch
                      id="software"
                      checked={notificationSettings.software}
                      onCheckedChange={() => handleToggleSetting('software')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-y-0">
                    <div className="flex flex-col">
                      <Label htmlFor="system">System Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive system performance and optimization notifications
                      </p>
                    </div>
                    <Switch
                      id="system"
                      checked={notificationSettings.system}
                      onCheckedChange={() => handleToggleSetting('system')}
                    />
                  </div>
                </div>
                
                {pricingTier === "free" && (
                  <Card className="bg-primary/5 border-primary/20 mt-6">
                    <CardContent className="pt-6">
                      <h3 className="text-base font-medium mb-2">Advanced Notification Controls</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Upgrade to a paid plan for more granular control over notification frequency and priority filtering.
                      </p>
                      <Button variant="outline" className="w-full">
                        Upgrade Plan
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsTab;
