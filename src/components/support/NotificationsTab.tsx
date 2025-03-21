
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Bell, Check, Download, Settings, Package, HardDrive, Zap, AlertTriangle, 
  BellRing, CheckCircle2, X, SlidersHorizontal, Clock, Filter
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/contexts/LanguageContext";

// Types for our notifications
export type NotificationType = 'plugin_update' | 'firmware_update' | 'software_update' | 'system_alert';
export type NotificationPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: NotificationPriority;
  actionAvailable: boolean;
  version?: string;
  releaseNotes?: string;
  affectedComponents?: string[];
}

// Sample notification data
const getMockNotifications = (): Notification[] => [
  {
    id: "notif-001",
    type: "plugin_update",
    title: "EchoDrive Reverb Update",
    message: "A new update (v2.3.1) is available for EchoDrive Reverb plugin. This update includes improved CPU performance and new presets.",
    timestamp: "2025-03-21T09:30:00Z",
    read: false,
    priority: "medium",
    actionAvailable: true,
    version: "2.3.1",
    releaseNotes: "https://example.com/release-notes/echo-drive-2.3.1"
  },
  {
    id: "notif-002",
    type: "firmware_update",
    title: "SoundMatrix Interface Firmware",
    message: "Critical firmware update available for your SoundMatrix audio interface. This update resolves connectivity issues with macOS Xanadu.",
    timestamp: "2025-03-20T14:45:00Z",
    read: false,
    priority: "high",
    actionAvailable: true,
    version: "3.5.0",
    affectedComponents: ["Driver", "Control Panel"]
  },
  {
    id: "notif-003",
    type: "software_update",
    title: "StudioFlow X Update",
    message: "StudioFlow X v1.2.0 is now available with new AI-assisted mastering tools and improved DAW integration.",
    timestamp: "2025-03-19T11:20:00Z",
    read: true,
    priority: "medium",
    actionAvailable: true,
    version: "1.2.0"
  },
  {
    id: "notif-004",
    type: "system_alert",
    title: "Low Storage Space",
    message: "Your system is running low on storage space. This may affect recording performance and sample library functionality.",
    timestamp: "2025-03-21T07:15:00Z",
    read: false,
    priority: "critical",
    actionAvailable: false
  },
  {
    id: "notif-005",
    type: "plugin_update",
    title: "HarmonicEQ Update",
    message: "HarmonicEQ v3.2 update available with M2 chip optimization and new filter types.",
    timestamp: "2025-03-18T16:30:00Z",
    read: true,
    priority: "low",
    actionAvailable: true,
    version: "3.2.0"
  },
  {
    id: "notif-006",
    type: "firmware_update",
    title: "BeatMaker Controller Firmware",
    message: "New firmware for your BeatMaker MIDI controller adds velocity curve customization and fixes latency issues.",
    timestamp: "2025-03-17T13:45:00Z",
    read: false,
    priority: "medium",
    actionAvailable: true,
    version: "1.4.2"
  },
  {
    id: "notif-007",
    type: "software_update",
    title: "Sample Library Manager Update",
    message: "Sample Library Manager update includes improved database indexing and faster search functionality.",
    timestamp: "2025-03-16T10:10:00Z",
    read: true,
    priority: "low",
    actionAvailable: true,
    version: "2.1.0"
  },
  {
    id: "notif-008",
    type: "system_alert",
    title: "CPU Performance Issue",
    message: "High CPU usage detected in your recent session. Consider increasing buffer size or freezing CPU-intensive tracks.",
    timestamp: "2025-03-15T19:20:00Z",
    read: false,
    priority: "high",
    actionAvailable: false
  }
];

const NotificationsTab: React.FC = () => {
  const { t } = useLanguage();
  const [notifications, setNotifications] = useState<Notification[]>(getMockNotifications());
  const [activeTab, setActiveTab] = useState<string>("all");
  const [showSettings, setShowSettings] = useState(false);
  
  // Notification settings
  const [settings, setSettings] = useState({
    receivePluginUpdates: true,
    receiveFirmwareUpdates: true,
    receiveSoftwareUpdates: true,
    receiveSystemAlerts: true,
    desktopNotifications: true,
    emailNotifications: false,
    notificationSounds: true
  });
  
  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === "all") return true;
    return notification.type === activeTab;
  });
  
  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;
  
  // Handle marking a notification as read
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };
  
  // Handle marking all notifications as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    toast({
      title: "Success",
      description: "All notifications marked as read",
    });
  };
  
  // Handle updating notification settings
  const updateSetting = (key: keyof typeof settings, value: boolean) => {
    setSettings({
      ...settings,
      [key]: value
    });
  };
  
  // Handle notification action (e.g., downloading update)
  const handleNotificationAction = (notification: Notification) => {
    toast({
      title: "Action Initiated",
      description: `Processing action for ${notification.title}`,
    });
    // In a real app, this would initiate a download or other action
  };
  
  // Get appropriate icon for notification type
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "plugin_update": return <Package className="h-5 w-5" />;
      case "firmware_update": return <HardDrive className="h-5 w-5" />;
      case "software_update": return <Download className="h-5 w-5" />;
      case "system_alert": return <AlertTriangle className="h-5 w-5" />;
      default: return <Bell className="h-5 w-5" />;
    }
  };
  
  // Get appropriate color for notification priority
  const getPriorityColor = (priority: NotificationPriority) => {
    switch (priority) {
      case "critical": return "bg-red-500";
      case "high": return "bg-orange-500";
      case "medium": return "bg-blue-500";
      case "low": return "bg-slate-300";
      default: return "bg-blue-500";
    }
  };
  
  // Format relative time
  const getRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.round(diffMs / 1000);
    const diffMin = Math.round(diffSec / 60);
    const diffHour = Math.round(diffMin / 60);
    const diffDay = Math.round(diffHour / 24);
    
    if (diffDay > 0) return `${diffDay}d ago`;
    if (diffHour > 0) return `${diffHour}h ago`;
    if (diffMin > 0) return `${diffMin}m ago`;
    return "Just now";
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="flex items-center gap-2">
            <BellRing className="h-5 w-5" />
            {t("notifications.title")}
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount} new
              </Badge>
            )}
          </CardTitle>
          <CardDescription>
            Stay updated with the latest changes and alerts
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="flex gap-1" 
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            <CheckCircle2 className="h-4 w-4" />
            <span className="hidden sm:inline">{t("notifications.mark_all_read")}</span>
          </Button>
          <Button 
            size="sm" 
            variant={showSettings ? "default" : "outline"} 
            className="flex gap-1" 
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">{showSettings ? "Close" : "Settings"}</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        {showSettings ? (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t("notifications.settings")}</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Notification Types</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        <Label htmlFor="plugin-updates">{t("notifications.plugin_updates")}</Label>
                      </div>
                      <Switch 
                        id="plugin-updates" 
                        checked={settings.receivePluginUpdates}
                        onCheckedChange={(checked) => updateSetting('receivePluginUpdates', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <HardDrive className="h-4 w-4" />
                        <Label htmlFor="firmware-updates">{t("notifications.firmware_updates")}</Label>
                      </div>
                      <Switch 
                        id="firmware-updates" 
                        checked={settings.receiveFirmwareUpdates}
                        onCheckedChange={(checked) => updateSetting('receiveFirmwareUpdates', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        <Label htmlFor="software-updates">{t("notifications.software_updates")}</Label>
                      </div>
                      <Switch 
                        id="software-updates" 
                        checked={settings.receiveSoftwareUpdates}
                        onCheckedChange={(checked) => updateSetting('receiveSoftwareUpdates', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        <Label htmlFor="system-alerts">{t("notifications.system_alerts")}</Label>
                      </div>
                      <Switch 
                        id="system-alerts" 
                        checked={settings.receiveSystemAlerts}
                        onCheckedChange={(checked) => updateSetting('receiveSystemAlerts', checked)}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Delivery Methods</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="desktop-notifications">Desktop Notifications</Label>
                      <Switch 
                        id="desktop-notifications" 
                        checked={settings.desktopNotifications}
                        onCheckedChange={(checked) => updateSetting('desktopNotifications', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <Switch 
                        id="email-notifications" 
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notification-sounds">Notification Sounds</Label>
                      <Switch 
                        id="notification-sounds" 
                        checked={settings.notificationSounds}
                        onCheckedChange={(checked) => updateSetting('notificationSounds', checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full sm:w-auto mt-4" 
                onClick={() => {
                  toast({
                    title: "Settings Saved",
                    description: "Your notification preferences have been updated",
                  });
                  setShowSettings(false);
                }}
              >
                Save Settings
              </Button>
            </div>
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger value="all" className="flex items-center gap-1">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">{t("notifications.all")}</span>
              </TabsTrigger>
              <TabsTrigger value="plugin_update" className="flex items-center gap-1">
                <Package className="h-4 w-4" />
                <span className="hidden sm:inline">Plugins</span>
              </TabsTrigger>
              <TabsTrigger value="firmware_update" className="flex items-center gap-1">
                <HardDrive className="h-4 w-4" />
                <span className="hidden sm:inline">Firmware</span>
              </TabsTrigger>
              <TabsTrigger value="software_update" className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Software</span>
              </TabsTrigger>
              <TabsTrigger value="system_alert" className="flex items-center gap-1">
                <AlertTriangle className="h-4 w-4" />
                <span className="hidden sm:inline">Alerts</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab}>
              <ScrollArea className="h-[400px] pr-4">
                {filteredNotifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                    <Bell className="h-10 w-10 mb-2 opacity-20" />
                    <p>{t("notifications.empty")}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredNotifications.map(notification => (
                      <Card key={notification.id} className={`overflow-hidden transition-colors duration-300 ${notification.read ? '' : 'bg-muted/30'}`}>
                        <div className={`h-1 w-full ${getPriorityColor(notification.priority)}`} />
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-full ${
                              notification.type === 'plugin_update' ? 'bg-purple-100 text-purple-600' :
                              notification.type === 'firmware_update' ? 'bg-blue-100 text-blue-600' :
                              notification.type === 'software_update' ? 'bg-green-100 text-green-600' :
                              'bg-red-100 text-red-600'
                            }`}>
                              {getNotificationIcon(notification.type)}
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <h3 className="font-medium flex items-center">
                                  {notification.title}
                                  {notification.version && (
                                    <Badge variant="outline" className="ml-2">v{notification.version}</Badge>
                                  )}
                                </h3>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  {getRelativeTime(notification.timestamp)}
                                </div>
                              </div>
                              
                              <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                              
                              <div className="flex justify-between items-center mt-3">
                                <div className="flex gap-2">
                                  {notification.actionAvailable && (
                                    <Button 
                                      size="sm" 
                                      variant="default" 
                                      className="h-8"
                                      onClick={() => handleNotificationAction(notification)}
                                    >
                                      {notification.type.includes('update') ? (
                                        <>
                                          <Download className="h-3 w-3 mr-1" />
                                          Download
                                        </>
                                      ) : (
                                        <>
                                          <Zap className="h-3 w-3 mr-1" />
                                          View Details
                                        </>
                                      )}
                                    </Button>
                                  )}
                                  
                                  {!notification.read && (
                                    <Button 
                                      size="sm" 
                                      variant="outline" 
                                      className="h-8"
                                      onClick={() => markAsRead(notification.id)}
                                    >
                                      <Check className="h-3 w-3 mr-1" />
                                      Mark as read
                                    </Button>
                                  )}
                                </div>
                                
                                <Button 
                                  size="icon" 
                                  variant="ghost" 
                                  className="h-7 w-7" 
                                  onClick={() => {
                                    setNotifications(notifications.filter(n => n.id !== notification.id));
                                  }}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-2 border-t">
        <div className="text-xs text-muted-foreground">
          {filteredNotifications.length} {filteredNotifications.length === 1 ? 'notification' : 'notifications'} displayed
        </div>
        <Button variant="ghost" size="sm" className="gap-1 text-xs">
          <Filter className="h-3 w-3" />
          Advanced filters
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NotificationsTab;
