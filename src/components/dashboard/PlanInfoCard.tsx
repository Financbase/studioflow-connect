
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { useDashboard } from "@/contexts/dashboard";
import { useLanguage } from "@/contexts/language/LanguageProvider";

const PlanInfoCard = () => {
  const { pricingTier } = useDashboard();
  const { t } = useLanguage();

  return (
    <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{t("plan.yourPlan")}</CardTitle>
        <CardDescription>{t("plan.subscriptionDetails")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold capitalize">{t(`plan.${pricingTier}`)}</span>
          {pricingTier !== 'enterprise' && (
            <Button size="sm" variant="outline" className="border-primary/30 hover:border-primary hover:bg-primary/10" asChild>
              <Link to="/subscription">{t("plan.upgrade")}</Link>
            </Button>
          )}
        </div>
        
        <Separator className="bg-primary/10" />
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span>{t("plan.projects")}</span>
            <span className="font-medium">{pricingTier === 'free' ? '5' : pricingTier === 'standard' ? '20' : t("plan.unlimited")}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>{t("plan.storage")}</span>
            <span className="font-medium">{pricingTier === 'free' ? '5GB' : pricingTier === 'standard' ? '30GB' : '100GB'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>{t("plan.aiFeatures")}</span>
            <span className="font-medium">{pricingTier === 'free' ? t("plan.limited") : t("plan.fullAccess")}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanInfoCard;
