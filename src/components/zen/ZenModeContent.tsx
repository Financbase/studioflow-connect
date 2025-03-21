
import React, { useState } from "react";
import MinimalThemeContent from "./content/MinimalThemeContent";
import AmbientThemeContent from "./content/AmbientThemeContent";
import FocusThemeContent from "./content/FocusThemeContent";

interface ZenModeContentProps {
  themeMode: "minimal" | "ambient" | "focus";
}

const ZenModeContent: React.FC<ZenModeContentProps> = ({ themeMode }) => {
  const [activeFeature, setActiveFeature] = useState<"none" | "writing" | "audio">("none");

  const handleFeatureClick = (feature: "writing" | "audio") => {
    setActiveFeature(activeFeature === feature ? "none" : feature);
  };

  // Render different content based on theme
  switch (themeMode) {
    case "minimal":
      return (
        <MinimalThemeContent 
          activeFeature={activeFeature} 
          handleFeatureClick={handleFeatureClick} 
        />
      );
    case "ambient":
      return (
        <AmbientThemeContent 
          activeFeature={activeFeature} 
          handleFeatureClick={handleFeatureClick}
        />
      );
    case "focus":
    default:
      return (
        <FocusThemeContent 
          activeFeature={activeFeature} 
          handleFeatureClick={handleFeatureClick}
        />
      );
  }
};

export default ZenModeContent;
