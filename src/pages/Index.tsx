
import React from "react";
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

const Index = () => {
  const { themeVariant } = useTheme();
  const { t } = useLanguage();
  const { isWidgetVisible, hasFeatureAccess } = useDashboard();
  const isMobile = useIsMobile();

  return (
    <div className={`min-h-screen flex flex-col bg-background text-foreground antialiased`}>
      <Header />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 py-8 animate-fade-in">
        {isMobile ? (
          <MobileCompanion />
        ) : (
          <div className="max-w-[1200px] mx-auto space-y-8">
            <section className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">{t("dashboard.title")}</h1>
              <p className="text-lg text-muted-foreground text-balance">
                {t("dashboard.subtitle")}
              </p>
            </section>
            
            <Separator className={themeVariant === "windows" ? "border-b-2" : ""} />
            
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
      </main>
      
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
