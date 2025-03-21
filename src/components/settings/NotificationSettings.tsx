
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";

const NotificationSettings = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    desktopNotifications: true,
    updateNotifications: true,
    marketingNotifications: false,
  });

  const handleNotificationToggle = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
    
    toast({
      title: "Notification setting updated",
      description: `${setting} has been ${notificationSettings[setting] ? "disabled" : "enabled"}`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>
          Configure when and how you want to be notified
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(notificationSettings).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor={key}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</Label>
              <p className="text-sm text-muted-foreground">
                Receive {key.replace(/([A-Z])/g, ' $1').toLowerCase()} about your account and activity
              </p>
            </div>
            <Switch
              id={key}
              checked={value}
              onCheckedChange={() => handleNotificationToggle(key as keyof typeof notificationSettings)}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
