
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, User, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  content: string;
  sender: "user" | "agent";
  timestamp: Date;
}

interface LiveChatDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  chatMessage: string;
  setChatMessage: (message: string) => void;
  onSendMessage: () => void;
}

const LiveChatDialog = ({
  isOpen,
  setIsOpen,
  chatMessage,
  setChatMessage,
  onSendMessage
}: LiveChatDialogProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! How can we help you today?",
      sender: "agent",
      timestamp: new Date()
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    
    // Add user message
    const newUserMessage: Message = {
      id: `user-${Date.now()}`,
      content: chatMessage,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    
    // Call the parent handler
    onSendMessage();
    
    // Auto-reply for demo purposes
    setTimeout(() => {
      const agentReply: Message = {
        id: `agent-${Date.now()}`,
        content: "Thanks for your message! Our team will respond shortly. Is there anything else you'd like to know?",
        sender: "agent",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, agentReply]);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <MessageSquare className="h-4 w-4" />
          Live Chat
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <DialogTitle className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                Online
              </Badge>
              Live Support Chat
            </DialogTitle>
            <DialogDescription>
              Chat with our support team in real-time for immediate assistance.
            </DialogDescription>
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <ScrollArea className="bg-muted/40 p-4 rounded-md h-[300px]" type="always">
          <div className="flex flex-col gap-3">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex gap-2 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={message.sender === 'agent' ? "/placeholder.svg" : ""} />
                  <AvatarFallback>
                    {message.sender === 'agent' ? 'SP' : <User className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>
                <div 
                  className={`p-3 rounded-md max-w-[80%] ${
                    message.sender === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs text-muted-foreground mt-1 opacity-70">
                    {message.sender === 'agent' ? 'Support Agent' : 'You'} • {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <form onSubmit={handleSubmit} className="flex gap-2 pt-2">
          <Input 
            value={chatMessage} 
            onChange={(e) => setChatMessage(e.target.value)} 
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LiveChatDialog;
