
import React from "react";
import { useDashboard, WidgetId } from "@/contexts/DashboardContext";
import { ChevronDown, ChevronUp, Lock, BookOpen } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import HelpTip from "@/components/HelpSystem";
import { Link } from "react-router-dom";

interface WidgetSectionProps {
  id: WidgetId;
  title: string;
  children: React.ReactNode;
  isPremiumFeature?: boolean;
}

// Help content for each widget section
const widgetHelpContent: Record<WidgetId, { title: string, content: React.ReactNode, severity?: "info" | "warning" | "critical" }> = {
  system: {
    title: "System Monitor",
    content: (
      <div className="space-y-2">
        <p>Monitors your system's performance metrics including CPU, RAM, and disk usage.</p>
        <p>Keep an eye on these values to ensure optimal performance during audio processing.</p>
      </div>
    )
  },
  vm: {
    title: "Virtual Machine Controller",
    content: (
      <div className="space-y-2">
        <p>Manage virtual machines for running different OS environments and DAW setups.</p>
        <p>Each VM maintains isolated audio environments for maximum compatibility.</p>
      </div>
    ),
    severity: "warning"
  },
  daw: {
    title: "DAW Workflow Integration",
    content: (
      <div className="space-y-2">
        <p>Connect and manage multiple DAWs to maintain consistent workflows between them.</p>
        <p>Synchronize projects, plugins, and settings across different audio workstations.</p>
      </div>
    )
  },
  audio: {
    title: "Audio Analysis",
    content: (
      <div className="space-y-2">
        <p>Analyze audio files and signals for frequency response, dynamics, and potential issues.</p>
        <p>Compare your mixes to reference tracks or industry standards.</p>
      </div>
    )
  },
  ai: {
    title: "AI-Powered Tools",
    content: (
      <div className="space-y-2">
        <p>Leverage machine learning to enhance your production workflow.</p>
        <p>Generate musical ideas, improve mixing decisions, and automate repetitive tasks.</p>
      </div>
    )
  },
  marketplace: {
    title: "Studio Marketplace",
    content: (
      <div className="space-y-2">
        <p>Browse and purchase plugins, samples, presets, and other studio resources.</p>
        <p>Share and sell your own creations to the community.</p>
      </div>
    )
  }
};

const WidgetSection: React.FC<WidgetSectionProps> = ({ 
  id, 
  title, 
  children, 
  isPremiumFeature = false 
}) => {
  const { 
    isWidgetVisible, 
    hasFeatureAccess, 
    isWidgetCollapsed, 
    toggleWidgetCollapse 
  } = useDashboard();
  
  // Don't render if this widget shouldn't be visible
  if (!isWidgetVisible(id)) {
    return null;
  }
  
  const hasAccess = hasFeatureAccess(id);
  const isCollapsed = isWidgetCollapsed(id);
  const helpInfo = widgetHelpContent[id];
  
  return (
    <section id={id} className="relative rounded-lg border bg-card shadow-sm animate-fade-in transition-all duration-300">
      <Collapsible open={!isCollapsed} onOpenChange={open => toggleWidgetCollapse(id)}>
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
              {title}
              {isPremiumFeature && !hasAccess && (
                <span className="inline-flex items-center rounded-full bg-secondary px-2 py-1 text-xs font-medium">
                  <Lock className="mr-1 h-3 w-3" />
                  Pro
                </span>
              )}
            </h2>
            <HelpTip
              title={helpInfo.title}
              content={helpInfo.content}
              severity={helpInfo.severity || "info"}
              size="small"
              sectionId={id}
            />
            <Link 
              to={`/docs#${id}`} 
              className="ml-2 text-xs text-muted-foreground hover:text-primary flex items-center"
              aria-label={`View ${title} documentation`}
            >
              <BookOpen className="h-3 w-3 mr-1" />
              <span className="hidden sm:inline">Docs</span>
            </Link>
          </div>
          <CollapsibleTrigger asChild>
            <button
              className="rounded-full p-1 hover:bg-muted transition-colors focus:outline-none"
              aria-label={isCollapsed ? "Expand section" : "Collapse section"}
            >
              {isCollapsed ? (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent className="transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          <div className="p-4">
            {hasAccess ? (
              children
            ) : (
              <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
                <Lock className="h-8 w-8 text-muted-foreground" />
                <h3 className="text-lg font-medium">Premium Feature</h3>
                <p className="text-muted-foreground max-w-md">
                  This feature is available on Standard and Pro plans. 
                  Upgrade your plan to access this and other premium features.
                </p>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </section>
  );
};

export default WidgetSection;
