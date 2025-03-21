
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, MessageSquare, CheckCircle2 } from "lucide-react";
import { PricingTier } from "@/contexts/dashboard/types";

interface AIAssistantInfoProps {
  pricingTier: PricingTier;
  handleUpgrade: (plan: string) => void;
}

const AIAssistantInfo: React.FC<AIAssistantInfoProps> = ({ pricingTier, handleUpgrade }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          AI Assistant
        </CardTitle>
        <CardDescription>
          Your intelligent companion for music production
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Available with Pro and Enterprise plans</AlertTitle>
          <AlertDescription>
            The AI Assistant is available to Pro and Enterprise subscribers.
            {pricingTier !== 'pro' && pricingTier !== 'enterprise' && (
              <Button 
                variant="outline" 
                size="sm" 
                className="ml-2"
                onClick={() => handleUpgrade('Pro')}
              >
                Upgrade Now
              </Button>
            )}
          </AlertDescription>
        </Alert>
        
        <div className="bg-muted/30 p-6 rounded-lg border border-muted">
          <h3 className="text-xl font-semibold mb-4">How the AI Assistant Helps You</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Creative Support</h4>
                  <p className="text-sm text-muted-foreground">Overcome creative blocks with AI-generated suggestions for melodies, chord progressions, and arrangements</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Technical Guidance</h4>
                  <p className="text-sm text-muted-foreground">Get instant help with technical issues, mixing advice, and plugin recommendations</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Workflow Optimization</h4>
                  <p className="text-sm text-muted-foreground">Receive personalized suggestions to improve your production workflow based on your habits</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Mental Health Support</h4>
                  <p className="text-sm text-muted-foreground">Access mindfulness techniques, focus exercises, and strategies to manage creative stress</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Learning Resources</h4>
                  <p className="text-sm text-muted-foreground">Curated tutorials and learning paths based on your skill level and interests</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Usage Analytics</h4>
                  <p className="text-sm text-muted-foreground">Track your productivity, identify patterns, and get suggestions for improvement</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-card rounded-lg border border-border">
            <h4 className="font-medium mb-2">How It Works</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Our AI Assistant uses advanced natural language processing to understand your needs and provide relevant, helpful responses. It learns from your interactions to become more personalized over time.
            </p>
            <div className="bg-muted p-3 rounded-md text-sm">
              <div className="flex items-start gap-2 mb-3">
                <span className="font-medium min-w-[80px]">You:</span>
                <span>I'm struggling with mixing the low end of my track.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-medium min-w-[80px]">Assistant:</span>
                <span>I notice you've been working on bass-heavy genres lately. For your current track, try using a high-pass filter on non-bass elements around 100Hz to create more space. Then apply a gentle compression on your bass with a slow attack to preserve transients while controlling the sustain. Would you like me to suggest some specific EQ settings based on your project?</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          {(pricingTier === 'pro' || pricingTier === 'enterprise') ? (
            <Button className="w-full md:w-auto">
              <MessageSquare className="mr-2 h-4 w-4" />
              Open Assistant
            </Button>
          ) : (
            <Button 
              onClick={() => handleUpgrade('Pro')} 
              className="w-full md:w-auto bg-gradient-to-r from-gray-500 to-gray-700 text-white"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Upgrade to Access Assistant
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAssistantInfo;
