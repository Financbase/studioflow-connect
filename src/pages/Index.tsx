
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import SystemMonitor from "@/components/SystemMonitor";
import AudioAnalyzer from "@/components/AudioAnalyzer";
import AITools from "@/components/AITools";
import VMController from "@/components/VMController";
import DAWWorkflow from "@/components/DAWWorkflow";
import StudioMarketplace from "@/components/StudioMarketplace";
import StudioFlowConnect from "@/components/StudioFlowConnect";
import MobileCompanion from "@/components/MobileCompanion";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/language";
import { Link } from "react-router-dom";
import DashboardWidget from "@/components/DashboardWidget";
import { useDashboard, WidgetId } from "@/contexts/dashboard";
import { useIsMobile } from "@/hooks/use-mobile";
import PageContainer from "@/components/ui/page-container";
import useResponsiveLayout from "@/hooks/use-responsive-layout";
import Breadcrumbs from "@/components/navigation/breadcrumbs";
import { toast } from "@/hooks/use-toast";
import useErrorHandling from "@/hooks/use-error-handling";
import ViewSelector from "@/components/ViewSelector";
import MainDashboardContent from "@/components/dashboard/MainDashboardContent";

const Index = () => {
  const { themeVariant } = useTheme();
  const { t } = useLanguage();
  const { isWidgetVisible, hasFeatureAccess, viewMode } = useDashboard();
  const isMobile = useIsMobile();
  const { getContainerClass } = useResponsiveLayout();
  const { handleError } = useErrorHandling();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading and handle potential errors
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        // Load dashboard data or perform initialization logic
        setIsLoading(false);
      } catch (error) {
        handleError(error, {
          title: t("errors.dashboardError")
        });
        setIsLoading(false);
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [handleError, t]);

  // Define breadcrumb items
  const breadcrumbItems = [
    { label: t("nav.dashboard"), href: "/" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased">
      <Header />
      
      <PageContainer isMain padded="lg" maxWidth="xl" className="animate-fade-in">
        {!isLoading && (
          <>
            <div className="mb-6">
              <Breadcrumbs items={breadcrumbItems} />
            </div>
            
            <section className="space-y-2 mb-8">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">{t("dashboard.title")}</h1>
              <p className="text-lg text-muted-foreground text-balance">
                {t("dashboard.subtitle")}
              </p>
            </section>
            
            <div className="flex justify-end mb-6">
              <ViewSelector />
            </div>
            
            <Separator className={`mb-8 ${themeVariant === "windows" ? "border-b-2" : ""}`} />
            
            {isMobile ? (
              <MobileCompanion />
            ) : (
              <>
                {viewMode === 'simple' && (
                  <div className="mb-12">
                    <MainDashboardContent />
                  </div>
                )}
                
                <div className="space-y-10 py-4">
                  {/* Always show StudioFlow Connect as the main MVP feature */}
                  {isWidgetVisible(WidgetId.connect) && (
                    <div className="mb-10">
                      <DashboardWidget id={WidgetId.connect} title={t("widgets.connect")}>
                        <StudioFlowConnect />
                      </DashboardWidget>
                      <Separator className={`mt-10 ${themeVariant === "windows" ? "border-b-2" : ""}`} />
                    </div>
                  )}
                  
                  {isWidgetVisible(WidgetId.system) && hasFeatureAccess(WidgetId.system) && (
                    <div className="mb-10">
                      <DashboardWidget id={WidgetId.system} title={t("widgets.system")} isPremiumFeature>
                        <SystemMonitor />
                      </DashboardWidget>
                      <Separator className={`mt-10 ${themeVariant === "windows" ? "border-b-2" : ""}`} />
                    </div>
                  )}
                  
                  {isWidgetVisible(WidgetId.vm) && hasFeatureAccess(WidgetId.vm) && (
                    <div className="mb-10">
                      <DashboardWidget id={WidgetId.vm} title={t("widgets.vm")} isPremiumFeature>
                        <VMController />
                      </DashboardWidget>
                      <Separator className={`mt-10 ${themeVariant === "windows" ? "border-b-2" : ""}`} />
                    </div>
                  )}
                  
                  {isWidgetVisible(WidgetId.daw) && hasFeatureAccess(WidgetId.daw) && (
                    <div className="mb-10">
                      <DashboardWidget id={WidgetId.daw} title={t("widgets.daw")} isPremiumFeature>
                        <DAWWorkflow />
                      </DashboardWidget>
                      <Separator className={`mt-10 ${themeVariant === "windows" ? "border-b-2" : ""}`} />
                    </div>
                  )}
                  
                  {isWidgetVisible(WidgetId.audio) && hasFeatureAccess(WidgetId.audio) && (
                    <div className="mb-10">
                      <DashboardWidget id={WidgetId.audio} title={t("widgets.audio")}>
                        <AudioAnalyzer />
                      </DashboardWidget>
                      <Separator className={`mt-10 ${themeVariant === "windows" ? "border-b-2" : ""}`} />
                    </div>
                  )}
                  
                  {isWidgetVisible(WidgetId.ai) && hasFeatureAccess(WidgetId.ai) && (
                    <div className="mb-10">
                      <DashboardWidget id={WidgetId.ai} title={t("widgets.ai")} isPremiumFeature>
                        <AITools />
                      </DashboardWidget>
                      <Separator className={`mt-10 ${themeVariant === "windows" ? "border-b-2" : ""}`} />
                    </div>
                  )}
                  
                  {isWidgetVisible(WidgetId.marketplace) && hasFeatureAccess(WidgetId.marketplace) && (
                    <div className="mb-10">
                      <DashboardWidget id={WidgetId.marketplace} title={t("widgets.marketplace")} isPremiumFeature>
                        <StudioMarketplace />
                      </DashboardWidget>
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        )}
        
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-pulse-soft text-center">
              <p className="text-muted-foreground">{t("dashboard.loading")}</p>
            </div>
          </div>
        )}
      </PageContainer>
      
      <footer className={`mt-auto border-t py-6 ${themeVariant === "windows" ? "border-t-2" : ""}`}>
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>{t("footer.copyright")}</p>
          <div className="flex gap-6">
            <Link to="/terms" className="hover:text-foreground transition-colors">{t("footer.terms")}</Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors">{t("footer.privacy")}</Link>
            <Link to="/contact" className="hover:text-foreground transition-colors">{t("footer.contact")}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
