
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { MessageSquare as MessageSquareIcon } from "lucide-react";

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
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <MessageSquareIcon className="h-4 w-4" />
          Live Chat
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Live Support Chat</DialogTitle>
          <DialogDescription>
            Chat with our support team in real-time for immediate assistance.
          </DialogDescription>
        </DialogHeader>
        <div className="bg-muted p-4 rounded-md h-[200px] overflow-y-auto mb-4">
          <div className="flex flex-col gap-2">
            <div className="bg-primary/10 p-2 rounded-md self-start max-w-[80%]">
              <p className="text-sm">Hello! How can we help you today?</p>
              <p className="text-xs text-muted-foreground mt-1">Support Agent • Just now</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Input 
            value={chatMessage} 
            onChange={(e) => setChatMessage(e.target.value)} 
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button onClick={onSendMessage}>Send</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LiveChatDialog;
