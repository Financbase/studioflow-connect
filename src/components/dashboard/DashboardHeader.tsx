
import React from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { format } from "date-fns";
import DashboardActions from "./DashboardActions";
import { useLanguage } from "@/contexts/language/LanguageProvider";
import { useDashboard } from "@/contexts/dashboard";

interface DashboardHeaderProps {
  onZenModeActivate?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onZenModeActivate }) => {
  const user = useUser();
  const { t } = useLanguage();
  const { pricingTier } = useDashboard();
  const currentTime = new Date();
  
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return t("dashboard.greeting.morning");
    if (hour < 18) return t("dashboard.greeting.afternoon");
    return t("dashboard.greeting.evening");
  };
  
  const getUsername = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name.split(' ')[0];
    }
    return user?.email?.split('@')[0] || t("dashboard.user");
  };
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl md:text-3xl font-bold">
            {getGreeting()}, {getUsername()}
          </h1>
          {pricingTier !== 'free' && (
            <Badge variant={pricingTier === 'pro' ? "default" : "outline"} className="ml-2">
              {pricingTier.charAt(0).toUpperCase() + pricingTier.slice(1)}
            </Badge>
          )}
        </div>
        <div className="flex items-center text-muted-foreground text-sm">
          <Clock className="mr-2 h-4 w-4" />
          <span>
            {format(currentTime, "EEEE, MMMM d, yyyy")}
          </span>
        </div>
      </div>
      
      <DashboardActions onZenModeActivate={onZenModeActivate} />
    </div>
  );
};

export default DashboardHeader;
