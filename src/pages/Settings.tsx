import React, { useState } from "react";
import { SidebarLayout } from "@/components/layout/Sidebar";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import PlanSwitcher from "@/components/PlanSwitcher";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDashboard } from "@/contexts/dashboard/useDashboard";
import { PricingTier } from "@/contexts/dashboard/types";
import { toast } from "@/hooks/use-toast";

const Settings = () => {
  const { themeVariant, setThemeVariant } = useTheme();
  const { currentLanguage, setLanguage } = useLanguage();
  const { pricingTier, setPricingTier } = useDashboard();
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    desktopNotifications: true,
    updateNotifications: true,
    marketingNotifications: false,
  });
  
  const [privacySettings, setPrivacySettings] = useState({
    shareAnalytics: true,
    shareUsageData: true,
    allowCookies: true,
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
  
  const handleThemeChange = (theme: any) => {
    setThemeVariant(theme);
  };
  
  const handleLanguageChange = (language: any) => {
    setLanguage(language);
  };
  
  const handlePlanChange = (plan: PricingTier) => {
    setPricingTier(plan);
    
    toast({
      title: "Subscription updated",
      description: `Your plan has been updated to ${plan.charAt(0).toUpperCase() + plan.slice(1)}`,
    });
  };

  return (
    <SidebarLayout>
      <Header />
      <main className="flex-1 px-4 py-6 md:px-6 lg:px-8 bg-background overflow-auto">
        <div className="max-w-5xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </div>

          <Tabs defaultValue="general" className="space-y-4">
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="subscription">Subscription</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>
                    Manage your basic account preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="john@example.com" type="email" />
                    <p className="text-sm text-muted-foreground">
                      This email will be used for important notifications
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <LanguageSwitcher 
                    currentLanguage={currentLanguage}
                    onLanguageChange={handleLanguageChange}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="appearance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>
                    Customize how StudioFlow looks and feels
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ThemeSwitcher 
                    currentTheme={themeVariant} 
                    onThemeChange={handleThemeChange}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-4">
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
            </TabsContent>
            
            <TabsContent value="privacy" className="space-y-4">
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
            </TabsContent>
            
            <TabsContent value="subscription" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Plan</CardTitle>
                  <CardDescription>
                    Manage your subscription and billing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PlanSwitcher 
                    currentPlan={pricingTier} 
                    onPlanChange={handlePlanChange}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </SidebarLayout>
  );
};

export default Settings;
