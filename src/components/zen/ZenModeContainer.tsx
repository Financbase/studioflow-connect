
import React from "react";
import { ZenModeOptions } from "@/hooks/use-zen-mode";

interface ZenModeContainerProps {
  isActive: boolean;
  options: ZenModeOptions;
  children: React.ReactNode;
}

const ZenModeContainer: React.FC<ZenModeContainerProps> = ({ 
  isActive, 
  options, 
  children 
}) => {
  if (!isActive) return null;
  
  const getBackgroundClass = () => {
    switch(options.theme) {
      case 'ambient':
        return 'bg-gradient-to-br from-[#1C1C2E]/90 to-[#2A2A4E]/90 ambient-background';
      case 'focus':
        return 'bg-gradient-to-br from-[#1C1C2E]/95 to-[#2D2D3A]/95';
      case 'minimal':
      default:
        return 'bg-[#1C1C2E]/95';
    }
  };
  
  return (
    <div className={`fixed inset-0 z-50 backdrop-blur-xl ${getBackgroundClass()} flex flex-col items-center justify-center transition-opacity duration-500`}>
      {children}
    </div>
  );
};

export default ZenModeContainer;
