
import React, { useState } from "react";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useTicketContext } from "./TicketContext";
import { useIsMobile } from "@/hooks/use-mobile";

const TicketDetailsDialog: React.FC = () => {
  const { selectedTicket } = useTicketContext();
  const [replyText, setReplyText] = useState("");
  const isMobile = useIsMobile();
  
  if (!selectedTicket) return null;
  
  const handleReplySubmit = () => {
    if (!replyText.trim()) return;
    
    toast({
      title: "Reply Sent",
      description: "Your reply has been sent to the support team."
    });
    
    setReplyText("");
    // In a real app, you would update the ticket in the database
  };

  return (
    <DialogContent className={`${isMobile ? 'w-[95vw] max-w-full p-4' : 'max-w-xl'}`}>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          Ticket #{selectedTicket.id.split('-').pop()}
        </DialogTitle>
        <DialogDescription className="text-xs md:text-sm">
          Created on {new Date(selectedTicket.created_at).toLocaleString()}
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-base md:text-lg font-medium">{selectedTicket.title}</h3>
          <p className="text-muted-foreground mt-1 text-sm">{selectedTicket.description}</p>
        </div>
        
        <Separator />
        
        <ScrollArea className={`${isMobile ? 'h-[150px]' : 'h-[200px]'} rounded-md border p-3 md:p-4`}>
          <div className="space-y-4">
            <div className="bg-muted p-2 md:p-3 rounded-md">
              <div className="flex justify-between">
                <p className="text-xs font-semibold">You</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(selectedTicket.created_at).toLocaleString()}
                </p>
              </div>
              <p className="text-sm mt-2">{selectedTicket.description}</p>
            </div>
            
            {selectedTicket.response && (
              <div className="bg-primary/10 p-2 md:p-3 rounded-md">
                <div className="flex justify-between">
                  <p className="text-xs font-semibold">Support Agent</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(selectedTicket.updated_at).toLocaleString()}
                  </p>
                </div>
                <p className="text-sm mt-2">{selectedTicket.response}</p>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="space-y-2">
          <label htmlFor="reply" className="text-sm font-medium">
            Reply to this ticket
          </label>
          <Input
            id="reply"
            placeholder="Type your reply here..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <Button 
            className="w-full" 
            onClick={handleReplySubmit}
            disabled={!replyText.trim()}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Send Reply
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default TicketDetailsDialog;
