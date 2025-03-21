
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Brain } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import BrainstormMessageList from "./brainstorm/BrainstormMessageList";
import BrainstormInput from "./brainstorm/BrainstormInput";
import { Message } from "./brainstorm/BrainstormMessage";
import { generateResponse } from "./brainstorm/brainstormUtils";

interface ZenModeBrainstormProps {
  isVisible: boolean;
  themeMode: "minimal" | "ambient" | "focus";
}

const ZenModeBrainstorm: React.FC<ZenModeBrainstormProps> = ({ isVisible, themeMode }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      content: "Welcome to Zen Brainstorming. Share your ideas, and I'll help you explore them further. What would you like to explore today?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleSendMessage = async (input: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);

    try {
      // Get AI response
      const responseText = await generateResponse(input);
      
      // Add AI message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseText,
        sender: "assistant",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      toast({
        title: "Error",
        description: "Failed to generate a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isVisible) return null;

  // Apply different styles based on the theme mode
  const getContainerClass = () => {
    switch (themeMode) {
      case "ambient":
        return "bg-background/10 border-white/10 backdrop-blur-md";
      case "focus":
        return "bg-background/15 border-white/15 backdrop-blur-lg focus-border-glow";
      case "minimal":
      default:
        return "bg-background/20 border-white/10 backdrop-blur-sm";
    }
  };

  return (
    <Card className={`w-full max-h-[70vh] flex flex-col rounded-xl overflow-hidden ${getContainerClass()}`}>
      <CardContent className="flex flex-col h-full p-0">
        <div className="p-4 border-b border-white/10 bg-white/5 flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary/80" />
          <h3 className="text-lg font-medium">Zen Brainstorming</h3>
        </div>
        
        <BrainstormMessageList messages={messages} />
        
        <BrainstormInput 
          onSendMessage={handleSendMessage}
          isProcessing={isProcessing}
        />
      </CardContent>
    </Card>
  );
};

export default ZenModeBrainstorm;
