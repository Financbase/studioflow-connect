
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminToolbar from "@/components/admin/AdminToolbar";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Users, 
  Server, 
  AlertTriangle, 
  Info, 
  Check,
  Trash2
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const notifications = [
  {
    id: "1",
    title: "New user registrations",
    description: "5 new users have registered in the last 24 hours",
    type: "user",
    priority: "normal",
    time: "2 hours ago",
    read: false
  },
  {
    id: "2",
    title: "System update available",
    description: "Version 2.4.0 is available for installation",
    type: "system",
    priority: "high",
    time: "1 day ago",
    read: true
  },
  {
    id: "3",
    title: "Server maintenance",
    description: "Scheduled maintenance on March 28th at 2:00 AM UTC",
    type: "server",
    priority: "normal",
    time: "2 days ago",
    read: false
  },
  {
    id: "4",
    title: "Storage warning",
    description: "Storage usage has reached 85% of allocated capacity",
    type: "alert",
    priority: "high",
    time: "3 days ago",
    read: true
  },
  {
    id: "5",
    title: "Backup completed",
    description: "Daily backup completed successfully",
    type: "info",
    priority: "low",
    time: "4 days ago",
    read: true
  }
];

const AdminNotifications: React.FC = () => {
  const [activeNotifications, setActiveNotifications] = React.useState(notifications);
  
  const markAllAsRead = () => {
    setActiveNotifications(notifications.map(n => ({ ...n, read: true })));
    toast({
      title: "Notifications updated",
      description: "All notifications marked as read",
    });
  };
  
  const clearAllNotifications = () => {
    setActiveNotifications([]);
    toast({
      title: "Notifications cleared",
      description: "All notifications have been removed",
    });
  };
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "user": return <Users className="h-5 w-5 text-blue-500" />;
      case "system": return <Server className="h-5 w-5 text-purple-500" />;
      case "alert": return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "server": return <Server className="h-5 w-5 text-orange-500" />;
      default: return <Info className="h-5 w-5 text-gray-500" />;
    }
  };
  
  return (
    <AdminLayout>
      <AdminToolbar />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <Check className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
          <Button variant="outline" size="sm" onClick={clearAllNotifications}>
            <Trash2 className="mr-2 h-4 w-4" />
            Clear all
          </Button>
        </div>
      </div>
      <Separator className="mb-6" />
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="mr-2 h-5 w-5" />
            System Notifications
            {activeNotifications.filter(n => !n.read).length > 0 && (
              <Badge variant="default" className="ml-2">
                {activeNotifications.filter(n => !n.read).length} unread
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeNotifications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Bell className="h-12 w-12 mx-auto mb-3 opacity-20" />
              <p>No notifications to display</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeNotifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 rounded-lg border ${!notification.read ? 'bg-muted/40' : ''}`}
                >
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{notification.title}</h4>
                        {!notification.read && (
                          <Badge variant="default" className="text-xs">New</Badge>
                        )}
                        {notification.priority === 'high' && (
                          <Badge variant="outline" className="text-xs border-red-500 text-red-500">
                            High Priority
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminNotifications;
