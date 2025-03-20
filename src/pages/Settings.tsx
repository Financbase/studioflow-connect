
import React from "react";
import { useAuth } from "@/hooks/use-auth";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDashboard } from "@/contexts/DashboardContext";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlanSwitcher from "@/components/PlanSwitcher";
import CustomLayoutEditor from "@/components/CustomLayoutEditor";

const Settings = () => {
  const { user, profile } = useAuth();
  const { themeVariant, setThemeVariant, theme, setTheme } = useTheme();
  const { currentLanguage, setLanguage, t } = useLanguage();
  const { viewMode, setViewMode, pricingTier, setPricingTier } = useDashboard();

  // Type-safe language selection handler
  const handleLanguageChange = (lang: string) => {
    if (lang === "en" || lang === "es" || lang === "fr" || lang === "de" || lang === "sv") {
      setLanguage(lang);
      toast({
        title: "Language Changed",
        description: `The interface language has been updated to ${lang.toUpperCase()}.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6 md:py-10">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>

        <Tabs defaultValue="appearance">
          <TabsList className="mb-4">
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="language">Language</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
          </TabsList>

          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Theme Settings</CardTitle>
                <CardDescription>
                  Customize the appearance of the application.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <Switch 
                      id="dark-mode" 
                      checked={theme === "dark"}
                      onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Enable dark mode for a more comfortable viewing experience in low light.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Theme Variant</Label>
                  <Select value={themeVariant} onValueChange={(value: 'default' | 'modern' | 'windows' | 'retro') => setThemeVariant(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select theme variant" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="windows">Windows</SelectItem>
                      <SelectItem value="retro">Retro</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Choose a theme variant to customize the look and feel of the application.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="language" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Language Settings</CardTitle>
                <CardDescription>
                  Change the language used throughout the application.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Interface Language</Label>
                  <Select value={currentLanguage} onValueChange={handleLanguageChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="sv">Svenska</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscription" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Management</CardTitle>
                <CardDescription>
                  View and manage your subscription plan.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PlanSwitcher currentPlan={pricingTier} onPlanChange={setPricingTier} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="layout" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard Layout</CardTitle>
                <CardDescription>
                  Customize your dashboard view and layout settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>View Mode</Label>
                  <Select value={viewMode} onValueChange={(value: 'simple' | 'advanced' | 'compact') => setViewMode(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select view mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="simple">Simple</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="compact">Compact</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Choose how you want your dashboard to be displayed.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Custom Layout</Label>
                  <CustomLayoutEditor />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Settings;
