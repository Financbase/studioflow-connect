
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";

const PrivacySettings = () => {
  const [privacySettings, setPrivacySettings] = useState({
    shareAnalytics: true,
    shareUsageData: true,
    allowCookies: true,
  });

  const handlePrivacyToggle = (setting: keyof typeof privacySettings) => {
    setPrivacySettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
    
    toast({
      title: "Privacy setting updated",
      description: `${setting} has been ${privacySettings[setting] ? "disabled" : "enabled"}`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Privacy Settings</CardTitle>
        <CardDescription>
          Control your data and privacy preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(privacySettings).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor={key}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</Label>
              <p className="text-sm text-muted-foreground">
                {key === 'shareAnalytics' ? 'Share anonymous usage data to help us improve' :
                 key === 'shareUsageData' ? 'Share feature usage data for personalized recommendations' :
                 'Allow cookies for improved site functionality'}
              </p>
            </div>
            <Switch
              id={key}
              checked={value}
              onCheckedChange={() => handlePrivacyToggle(key as keyof typeof privacySettings)}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PrivacySettings;
