
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { 
  HardDrive, 
  Clock, 
  RefreshCw, 
  CloudDownload, 
  Zap,
  AlertTriangle,
  Shield,
  Link2 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboard } from "@/contexts/dashboard";
import { WidgetId } from "@/contexts/dashboard/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const MOCK_DRIVES = [
  { id: "drive1", name: "Main Project Drive", format: "APFS", used: 420, total: 1000, status: "healthy" },
  { id: "drive2", name: "Sample Library", format: "exFAT", used: 890, total: 1000, status: "syncing" },
  { id: "drive3", name: "Backup Drive", format: "NTFS", used: 350, total: 1000, status: "warning" },
];

const MobileCompanion = () => {
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  const { hasFeatureAccess } = useDashboard();
  const [activeSync, setActiveSync] = React.useState<string | null>("drive2");
  const [syncProgress, setSyncProgress] = React.useState(32);

  // Only show on mobile devices
  if (!isMobile) return null;

  const handleConnectDrive = () => {
    toast({
      title: t("toast.connectsuccess"),
      description: t("toast.drivescanning")
    });
  };

  const handleOptimizeDrive = (driveId: string) => {
    toast({
      title: t("toast.optimizing"),
      description: t("toast.optimizationongoing")
    });
  };

  React.useEffect(() => {
    if (activeSync) {
      const interval = setInterval(() => {
        setSyncProgress(prev => {
          const newProgress = prev + Math.floor(Math.random() * 5);
          if (newProgress >= 100) {
            clearInterval(interval);
            setActiveSync(null);
            toast({
              title: t("toast.synccomplete"),
              description: t("toast.drivesready")
            });
            return 100;
          }
          return newProgress;
        });
      }, 1500);
      
      return () => clearInterval(interval);
    }
  }, [activeSync, t]);

  return (
    <div className="space-y-4 px-2 pb-24">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Link2 className="h-5 w-5 text-primary" />
            {t("mobile.quickconnect")}
          </CardTitle>
          <CardDescription>{t("mobile.connectdescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={handleConnectDrive}>
            {t("mobile.connectnewdrive")}
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4">
        {MOCK_DRIVES.map(drive => (
          <Card key={drive.id} className={drive.status === "warning" ? "border-amber-500" : ""}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-base flex items-center gap-2">
                  <HardDrive className="h-4 w-4" />
                  {drive.name}
                </CardTitle>
                <Badge variant={
                  drive.status === "healthy" ? "outline" : 
                  drive.status === "syncing" ? "secondary" :
                  "destructive"
                }>
                  {drive.status === "healthy" && "Ready"}
                  {drive.status === "syncing" && "Syncing"}
                  {drive.status === "warning" && "Warning"}
                </Badge>
              </div>
              <CardDescription className="flex items-center justify-between">
                <span>{drive.format}</span>
                <span>{Math.round(drive.used / drive.total * 100)}% used</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <Progress value={drive.used / drive.total * 100} className="h-2" />
              
              {drive.status === "syncing" && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Sync Progress</span>
                    <span>{syncProgress}%</span>
                  </div>
                  <Progress value={syncProgress} className="h-1.5" />
                </div>
              )}
              
              {drive.status === "warning" && (
                <div className="mt-2 text-sm flex items-center gap-2 text-amber-500">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Permissions issue detected</span>
                </div>
              )}
            </CardContent>
            <CardFooter className="pt-0 flex gap-2">
              {drive.status === "warning" ? (
                <Button size="sm" className="flex-1" variant="outline" onClick={() => handleOptimizeDrive(drive.id)}>
                  <Shield className="h-4 w-4 mr-1" />
                  Fix Issues
                </Button>
              ) : (
                <Button size="sm" className="flex-1" variant="outline" onClick={() => handleOptimizeDrive(drive.id)}>
                  <Zap className="h-4 w-4 mr-1" />
                  Optimize
                </Button>
              )}
              
              <Button size="sm" className="flex-1" variant="ghost">
                <Clock className="h-4 w-4 mr-1" />
                History
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {!hasFeatureAccess(WidgetId.ai) && (
        <Card className="bg-muted/40">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">
              {t("mobile.upgradetopro")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">
              {t("mobile.unlockcontent")}
            </p>
            <Button variant="default" className="w-full" size="sm">
              {t("button.upgrade")}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MobileCompanion;
