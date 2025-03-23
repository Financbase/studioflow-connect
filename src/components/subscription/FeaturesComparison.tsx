
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";
import { useLanguage } from "@/contexts/language";

interface Feature {
  name: string;
  description: string;
  free: boolean;
  standard: boolean;
  pro: boolean;
  enterprise: boolean;
}

interface FeaturesComparisonProps {
  planFeatures: Feature[];
}

const FeaturesComparison: React.FC<FeaturesComparisonProps> = ({ planFeatures }) => {
  const { t, isInitialized } = useLanguage();
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{isInitialized ? t("subscription.featureComparison") : "Detailed Feature Comparison"}</CardTitle>
          <CardDescription>
            {isInitialized ? t("subscription.featureComparisonDescription") : "Compare all available features across different subscription plans"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">{isInitialized ? t("subscription.feature") : "Feature"}</th>
                  <th className="text-center py-3 px-4">{isInitialized ? t("subscription.free") : "Free"}</th>
                  <th className="text-center py-3 px-4">{isInitialized ? t("subscription.standard") : "Standard"}</th>
                  <th className="text-center py-3 px-4">{isInitialized ? t("subscription.pro") : "Pro"}</th>
                  <th className="text-center py-3 px-4">{isInitialized ? t("subscription.enterprise") : "Enterprise"}</th>
                </tr>
              </thead>
              <tbody>
                {planFeatures.map((feature, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-4 px-4">
                      <div className="font-medium">{feature.name}</div>
                      <div className="text-sm text-muted-foreground">{feature.description}</div>
                    </td>
                    <td className="text-center py-4 px-4">
                      {feature.free ? <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" /> : <XCircle className="h-5 w-5 text-gray-300 mx-auto" />}
                    </td>
                    <td className="text-center py-4 px-4">
                      {feature.standard ? <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" /> : <XCircle className="h-5 w-5 text-gray-300 mx-auto" />}
                    </td>
                    <td className="text-center py-4 px-4">
                      {feature.pro ? <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" /> : <XCircle className="h-5 w-5 text-gray-300 mx-auto" />}
                    </td>
                    <td className="text-center py-4 px-4">
                      {feature.enterprise ? <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" /> : <XCircle className="h-5 w-5 text-gray-300 mx-auto" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      <FeatureCategories />
    </div>
  );
};

const FeatureCategories = () => {
  const { t, isInitialized } = useLanguage();
  
  // Inspired by features from XO, Melody Sauce, and Scaler
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            {isInitialized ? t("features.audioProduction") : "Audio Production Features"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            {isInitialized 
              ? t("features.audioProductionDescription") 
              : "Our platform provides a comprehensive set of tools for audio production, from basic recording to advanced mixing and mastering."
            }
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
              <span>{isInitialized ? t("features.multiTrack") : "Multi-track recording and editing"}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
              <span>{isInitialized ? t("features.mixingConsole") : "Professional mixing console"}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
              <span>{isInitialized ? t("features.audioEffects") : "Suite of audio effects and processors"}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
              <span>{isInitialized ? t("features.midiSequencing") : "MIDI sequencing and editing"}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
              <span>{isInitialized ? t("features.virtualInstrument") : "Virtual instrument support"}</span>
            </li>
          </ul>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            {isInitialized ? t("features.aiTools") : "AI-Powered Tools"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            {isInitialized
              ? t("features.aiToolsDescription")
              : "Leverage cutting-edge AI technology to enhance your audio production workflow and creativity."
            }
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
              <span>{isInitialized ? t("features.autoMixing") : "Intelligent auto-mixing"}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
              <span>{isInitialized ? t("features.aiMastering") : "AI-assisted mastering"}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
              <span>{isInitialized ? t("features.instrumentTuning") : "Smart instrument tuning"}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
              <span>{isInitialized ? t("features.vocalEnhancement") : "Vocal correction and enhancement"}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
              <span>{isInitialized ? t("features.creativeEngine") : "Creative suggestion engine"}</span>
            </li>
          </ul>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            {isInitialized ? t("features.creativeWellness") : "Creative Wellness"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            {isInitialized
              ? t("features.creativeWellnessDescription")
              : "Tools and resources to support your mental health and maximize creative productivity."
            }
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
              <span>{isInitialized ? t("features.workflowAnalysis") : "Workflow analysis and optimization"}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
              <span>{isInitialized ? t("features.creativeBlock") : "Creative block assistance"}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
              <span>{isInitialized ? t("features.focusTools") : "Focus and productivity tools"}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
              <span>{isInitialized ? t("features.sessionPlanning") : "Session planning and goal setting"}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
              <span>{isInitialized ? t("features.progressTracking") : "Progress tracking and analytics"}</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeaturesComparison;
