
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, Send, User, RefreshCw } from "lucide-react";
import { useDashboard } from "@/contexts/dashboard/useDashboard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

interface AIAssistantProps {
  className?: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ className }) => {
  const { pricingTier } = useDashboard();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi, I'm your StudioFlow AI Assistant. How can I help with your music production today?",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const isPremiumUser = pricingTier === "pro" || pricingTier === "enterprise";

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    
    // Simulate AI response (this would be replaced with an actual API call)
    setTimeout(() => {
      const demoResponses = [
        "I've analyzed your project and noticed your mix is a bit muddy in the low-mid range. Try cutting around 250-300Hz on some of your instruments to create more separation.",
        "Looking at your workflow patterns, you tend to spend a lot of time on sound design. Consider setting a timer to help balance your time between different production stages.",
        "I notice you've been working for 3 hours straight. Research shows taking a 5-minute break every hour can significantly boost creativity and prevent ear fatigue.",
        "Based on your recent projects, you might enjoy experimenting with polyrhythms. Would you like a quick tutorial on implementing them in your current genre?",
        "Your CPU usage has been spiking. I recommend freezing some of your more processor-intensive tracks to improve performance.",
      ];
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: demoResponses[Math.floor(Math.random() * demoResponses.length)],
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isPremiumUser) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            AI Assistant
          </CardTitle>
          <CardDescription>
            Get personalized help with your music production
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <AlertTitle>Premium Feature</AlertTitle>
            <AlertDescription>
              The AI Assistant is available on Pro and Enterprise plans.
            </AlertDescription>
          </Alert>
          <div className="flex justify-center">
            <Button>Upgrade to Pro</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`flex flex-col ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          AI Assistant
        </CardTitle>
        <CardDescription>
          Get personalized help with your music production
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-[400px] px-4">
          <div className="space-y-4 pt-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex max-w-[80%] gap-2 rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {message.role === "assistant" && (
                    <Avatar className="h-6 w-6">
                      <AvatarFallback>AI</AvatarFallback>
                      <AvatarImage src="/ai-avatar.png" alt="AI" />
                    </Avatar>
                  )}
                  <div>
                    <div className="text-sm">{message.content}</div>
                    <div className="mt-1 text-xs opacity-70">
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                  {message.role === "user" && (
                    <Avatar className="h-6 w-6">
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex max-w-[80%] items-center gap-2 rounded-lg bg-muted p-3">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span className="text-xs">Assistant is typing...</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t bg-card p-3">
        <div className="flex w-full items-center gap-2">
          <Input
            placeholder="Ask me anything about music production..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button size="icon" onClick={handleSendMessage} disabled={!input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AIAssistant;
