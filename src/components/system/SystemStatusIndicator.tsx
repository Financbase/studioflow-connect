
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/language";

const statusVariants = cva("flex items-center gap-1.5", {
  variants: {
    status: {
      healthy: "text-emerald-600",
      warning: "text-amber-600",
      critical: "text-red-600",
      maintenance: "text-blue-600",
      unknown: "text-slate-500"
    },
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base"
    }
  },
  defaultVariants: {
    status: "unknown",
    size: "md"
  }
});

const dotVariants = cva("rounded-full", {
  variants: {
    status: {
      healthy: "bg-emerald-500",
      warning: "bg-amber-500",
      critical: "bg-red-500",
      maintenance: "bg-blue-500",
      unknown: "bg-slate-400"
    },
    size: {
      sm: "w-1.5 h-1.5",
      md: "w-2 h-2",
      lg: "w-2.5 h-2.5"
    }
  },
  defaultVariants: {
    status: "unknown",
    size: "md"
  }
});

export interface SystemStatusProps extends VariantProps<typeof statusVariants> {
  label?: string;
  showDot?: boolean;
  showLabel?: boolean;
  className?: string;
  badgeVariant?: "outline" | "default" | "secondary" | "destructive";
  tooltipMessage?: string;
}

const SystemStatusIndicator: React.FC<SystemStatusProps> = ({
  status = "unknown",
  size = "md",
  label,
  showDot = true,
  showLabel = true,
  className,
  badgeVariant,
  tooltipMessage
}) => {
  const { t } = useLanguage();
  
  const statusLabels = {
    healthy: t("system.status.healthy") || "Healthy",
    warning: t("system.status.warning") || "Warning",
    critical: t("system.status.critical") || "Critical",
    maintenance: t("system.status.maintenance") || "Maintenance",
    unknown: t("system.status.unknown") || "Unknown"
  };
  
  const displayLabel = label || statusLabels[status as keyof typeof statusLabels];
  
  const content = (
    <div className={cn(statusVariants({ status, size }), className)}>
      {showDot && (
        <div className={cn(dotVariants({ status, size }))} />
      )}
      {showLabel && displayLabel}
    </div>
  );
  
  if (badgeVariant) {
    return (
      <Badge variant={badgeVariant} className={cn(
        "font-normal",
        status === "healthy" && "bg-emerald-100 text-emerald-800 hover:bg-emerald-200",
        status === "warning" && "bg-amber-100 text-amber-800 hover:bg-amber-200",
        status === "critical" && "bg-red-100 text-red-800 hover:bg-red-200",
        status === "maintenance" && "bg-blue-100 text-blue-800 hover:bg-blue-200",
        status === "unknown" && "bg-slate-100 text-slate-800 hover:bg-slate-200"
      )}>
        {content}
      </Badge>
    );
  }
  
  if (tooltipMessage) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {content}
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltipMessage}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  
  return content;
};

export default SystemStatusIndicator;
