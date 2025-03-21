
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, ThumbsUp } from "lucide-react";

interface RecommendationHeaderProps {
  pricingTier: string;
}

const RecommendationHeader: React.FC<RecommendationHeaderProps> = ({ pricingTier }) => {
  return (
    <Card className="border-blue-500/30 bg-blue-500/5">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-blue-500" />
          <CardTitle>Tailored for You</CardTitle>
        </div>
        <CardDescription>
          Based on your {pricingTier} subscription and usage patterns
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm">
          <ThumbsUp className="h-4 w-4 text-blue-500" />
          <span>We've analyzed your workflow and found these recommendations just for you.</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationHeader;
