
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, Shield, LogOut, TicketPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import PlanSwitcher from "@/components/PlanSwitcher";
import { CustomLayoutEditor } from "@/components/custom-layout";
import { UserProfile } from "@/types/supabase";
import { PricingTier } from "@/contexts/dashboard/types";
import { useLanguage } from "@/contexts/language";

interface MobileMenuProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  user: any;
  profile: UserProfile | null;
  isAdmin: boolean;
  onSignOut: () => void;
  pricingTier: PricingTier;
  setPricingTier: (tier: PricingTier) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onOpenChange,
  user,
  profile,
  isAdmin,
  onSignOut,
  pricingTier,
  setPricingTier
}) => {
  const { t } = useLanguage();
  
  const closeMobileMenu = () => {
    onOpenChange(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="ml-1">
          <Menu className="h-5 w-5" />
          <span className="sr-only">{t("mobile.toggleMenu")}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2 py-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={profile?.avatar_url || undefined} />
              <AvatarFallback>{profile?.username?.slice(0, 2).toUpperCase() || t("dashboard.user")}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{profile?.full_name || profile?.username || t("dashboard.user")}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex flex-col gap-1 py-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
              onClick={closeMobileMenu}
            >
              {t("nav.dashboard")}
            </Link>
            <Link 
              to="/support" 
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
              onClick={closeMobileMenu}
            >
              <TicketPlus className="h-4 w-4" />
              {t("nav.support")}
            </Link>
            <Link 
              to="/docs" 
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
              onClick={closeMobileMenu}
            >
              {t("header.documentation")}
            </Link>
            {isAdmin && (
              <Link 
                to="/admin" 
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
                onClick={closeMobileMenu}
              >
                <Shield className="h-4 w-4" />
                {t("nav.admin")}
              </Link>
            )}
          </div>
          
          <Separator />
          
          <div className="py-4">
            <p className="px-3 text-sm font-medium mb-2">{t("user.settings")}</p>
            <div className="space-y-3 px-3">
              <PlanSwitcher currentPlan={pricingTier} onPlanChange={setPricingTier} />
              <CustomLayoutEditor />
            </div>
          </div>
          
          <Separator />
          
          <div className="mt-auto py-4">
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-2" 
              onClick={onSignOut}
            >
              <LogOut className="h-4 w-4" />
              {t("user.signout")}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
