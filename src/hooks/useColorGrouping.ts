
import { useState, useEffect } from "react";
import { rgbToHex, hexToRgb } from "@/lib/colorUtils/colorConversion";
import { ColorSetting } from "@/components/settings/types/colorSettings";

export const useColorGrouping = (theme: string, themeVariant: string) => {
  const [currentColors, setCurrentColors] = useState<ColorSetting[]>([]);
  const [primaryColor, setPrimaryColor] = useState("#4f46e5");
  
  // Load current CSS variables as hex colors when component mounts or theme changes
  useEffect(() => {
    const loadCurrentColors = () => {
      const colors: ColorSetting[] = [
        {
          name: "Background",
          key: "background",
          value: rgbToHex(getComputedStyle(document.documentElement).getPropertyValue('--background').trim()),
          description: "Main background color of the app"
        },
        {
          name: "Foreground",
          key: "foreground",
          value: rgbToHex(getComputedStyle(document.documentElement).getPropertyValue('--foreground').trim()),
          description: "Primary text color"
        },
        {
          name: "Card",
          key: "card",
          value: rgbToHex(getComputedStyle(document.documentElement).getPropertyValue('--card').trim()),
          description: "Card component background"
        },
        {
          name: "Card Foreground",
          key: "card-foreground",
          value: rgbToHex(getComputedStyle(document.documentElement).getPropertyValue('--card-foreground').trim()),
          description: "Text color inside cards"
        },
        {
          name: "Primary",
          key: "primary",
          value: rgbToHex(getComputedStyle(document.documentElement).getPropertyValue('--primary').trim()),
          description: "Primary action color"
        },
        {
          name: "Primary Foreground",
          key: "primary-foreground",
          value: rgbToHex(getComputedStyle(document.documentElement).getPropertyValue('--primary-foreground').trim()),
          description: "Text on primary color background"
        },
        {
          name: "Secondary",
          key: "secondary",
          value: rgbToHex(getComputedStyle(document.documentElement).getPropertyValue('--secondary').trim()),
          description: "Secondary action color"
        },
        {
          name: "Secondary Foreground",
          key: "secondary-foreground",
          value: rgbToHex(getComputedStyle(document.documentElement).getPropertyValue('--secondary-foreground').trim()),
          description: "Text on secondary color background"
        },
        {
          name: "Muted",
          key: "muted",
          value: rgbToHex(getComputedStyle(document.documentElement).getPropertyValue('--muted').trim()),
          description: "Muted background color"
        },
        {
          name: "Muted Foreground",
          key: "muted-foreground",
          value: rgbToHex(getComputedStyle(document.documentElement).getPropertyValue('--muted-foreground').trim()),
          description: "Muted text color"
        },
        {
          name: "Accent",
          key: "accent",
          value: rgbToHex(getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()),
          description: "Accent highlight color"
        },
        {
          name: "Accent Foreground",
          key: "accent-foreground",
          value: rgbToHex(getComputedStyle(document.documentElement).getPropertyValue('--accent-foreground').trim()),
          description: "Text on accent color background"
        },
        {
          name: "Border",
          key: "border",
          value: rgbToHex(getComputedStyle(document.documentElement).getPropertyValue('--border').trim()),
          description: "Border color for elements"
        },
        {
          name: "Input",
          key: "input",
          value: rgbToHex(getComputedStyle(document.documentElement).getPropertyValue('--input').trim()),
          description: "Input border color"
        },
        {
          name: "Ring",
          key: "ring",
          value: rgbToHex(getComputedStyle(document.documentElement).getPropertyValue('--ring').trim()),
          description: "Focus ring color"
        },
        {
          name: "Destructive",
          key: "destructive",
          value: rgbToHex(getComputedStyle(document.documentElement).getPropertyValue('--destructive').trim()),
          description: "Destructive action color"
        },
        {
          name: "Destructive Foreground",
          key: "destructive-foreground",
          value: rgbToHex(getComputedStyle(document.documentElement).getPropertyValue('--destructive-foreground').trim()),
          description: "Text on destructive color background"
        }
      ];
      
      setCurrentColors(colors);
      
      // Set primary color default value from current theme
      const primary = colors.find(c => c.key === "primary");
      if (primary) {
        setPrimaryColor(primary.value);
      }
    };
    
    loadCurrentColors();
  }, [theme, themeVariant]);

  const handleColorChange = (index: number, value: string) => {
    const newColors = [...currentColors];
    newColors[index].value = value;
    setCurrentColors(newColors);
    
    // Preview the color change in real-time
    const colorKey = newColors[index].key;
    const { r, g, b } = hexToRgb(value);
    document.documentElement.style.setProperty(`--${colorKey}`, `${r} ${g} ${b}`);
  };
  
  // Group colors by category for better organization
  const colorGroups = {
    "Base Colors": currentColors.filter(c => ["background", "foreground", "border", "input", "ring"].includes(c.key)),
    "Primary Colors": currentColors.filter(c => c.key.includes("primary")),
    "Secondary Colors": currentColors.filter(c => c.key.includes("secondary")),
    "Accent Colors": currentColors.filter(c => c.key.includes("accent")),
    "Card Colors": currentColors.filter(c => c.key.includes("card")),
    "Muted Colors": currentColors.filter(c => c.key.includes("muted")),
    "Destructive Colors": currentColors.filter(c => c.key.includes("destructive"))
  };

  return {
    currentColors,
    setCurrentColors,
    primaryColor,
    setPrimaryColor,
    handleColorChange,
    colorGroups
  };
};
