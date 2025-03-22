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
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import DashboardWidget from "@/components/DashboardWidget";
import { useDashboard, WidgetId } from "@/contexts/DashboardContext";
import { useIsMobile } from "@/hooks/use-mobile";
import PageContainer from "@/components/ui/page-container";
import useResponsiveLayout from "@/hooks/use-responsive-layout";
import Breadcrumbs from "@/components/navigation/breadcrumbs";
import { toast } from "@/hooks/use-toast";
import useErrorHandling from "@/hooks/use-error-handling";

const Index = () => {
  const { themeVariant } = useTheme();
  const { t } = useLanguage();
  const { isWidgetVisible, hasFeatureAccess } = useDashboard();
  const isMobile = useIsMobile();
  const { screenSize, getContainerClass } = useResponsiveLayout();
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
          title: "Dashboard Error"
        });
        setIsLoading(false);
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [handleError]);

  // Define breadcrumb items
  const breadcrumbItems = [
    { label: "Dashboard", href: "/" }
  ];

  return (
    <div className={`min-h-screen flex flex-col bg-background text-foreground antialiased`}>
      <Header />
      
      <PageContainer isMain padded="lg" maxWidth="xl" className="animate-fade-in">
        {!isLoading && (
          <>
            <div className="mb-6">
              <Breadcrumbs items={breadcrumbItems} />
            </div>
            
            <section className="space-y-2 mb-6">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">{t("dashboard.title")}</h1>
              <p className="text-lg text-muted-foreground text-balance">
                {t("dashboard.subtitle")}
              </p>
            </section>
            
            <Separator className={themeVariant === "windows" ? "border-b-2" : ""} />
            
            {isMobile ? (
              <MobileCompanion />
            ) : (
              <div className="space-y-8 py-6">
                {/* Always show StudioFlow Connect as the main MVP feature */}
                {isWidgetVisible('connect') && (
                  <>
                    <DashboardWidget id="connect" title="StudioFlow Connect">
                      <StudioFlowConnect />
                    </DashboardWidget>
                    <Separator className={themeVariant === "windows" ? "border-b-2" : ""} />
                  </>
                )}
                
                {isWidgetVisible('system') && hasFeatureAccess('system') && (
                  <>
                    <DashboardWidget id="system" title={t("widgets.system")} isPremiumFeature>
                      <SystemMonitor />
                    </DashboardWidget>
                    <Separator className={themeVariant === "windows" ? "border-b-2" : ""} />
                  </>
                )}
                
                {isWidgetVisible('vm') && hasFeatureAccess('vm') && (
                  <>
                    <DashboardWidget id="vm" title="Virtual Machine Controller" isPremiumFeature>
                      <VMController />
                    </DashboardWidget>
                    <Separator className={themeVariant === "windows" ? "border-b-2" : ""} />
                  </>
                )}
                
                {isWidgetVisible('daw') && hasFeatureAccess('daw') && (
                  <>
                    <DashboardWidget id="daw" title="DAW Workflow Integration" isPremiumFeature>
                      <DAWWorkflow />
                    </DashboardWidget>
                    <Separator className={themeVariant === "windows" ? "border-b-2" : ""} />
                  </>
                )}
                
                {isWidgetVisible('audio') && hasFeatureAccess('audio') && (
                  <>
                    <DashboardWidget id="audio" title="Audio Analysis">
                      <AudioAnalyzer />
                    </DashboardWidget>
                    <Separator className={themeVariant === "windows" ? "border-b-2" : ""} />
                  </>
                )}
                
                {isWidgetVisible('ai') && hasFeatureAccess('ai') && (
                  <>
                    <DashboardWidget id="ai" title="AI-Powered Tools" isPremiumFeature>
                      <AITools />
                    </DashboardWidget>
                    <Separator className={themeVariant === "windows" ? "border-b-2" : ""} />
                  </>
                )}
                
                {isWidgetVisible('marketplace') && hasFeatureAccess('marketplace') && (
                  <>
                    <DashboardWidget id="marketplace" title="Studio Marketplace" isPremiumFeature>
                      <StudioMarketplace />
                    </DashboardWidget>
                  </>
                )}
              </div>
            )}
          </>
        )}
        
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-pulse-soft text-center">
              <p className="text-muted-foreground">Loading dashboard...</p>
            </div>
          </div>
        )}
      </PageContainer>
      
      <footer className={`border-t py-6 ${themeVariant === "windows" ? "border-t-2" : ""}`}>
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
