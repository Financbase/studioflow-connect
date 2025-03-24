import React, { useState } from "react";
import { DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { useTicketContext } from "./TicketContext";
import { useIsMobile } from "@/hooks/use-mobile";

// Import our new sub-components
import TicketHeader from "./TicketHeader";
import TicketSummary from "./TicketSummary";
import MessageHistory from "./MessageHistory";
import ReplyForm from "./ReplyForm";

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
      <TicketHeader ticket={selectedTicket} />
      
      <div className="space-y-4">
        <TicketSummary ticket={selectedTicket} />
        
        <Separator />
        
        <MessageHistory ticket={selectedTicket} />
        
        <ReplyForm 
          replyText={replyText} 
          setReplyText={setReplyText} 
          onSubmit={handleReplySubmit} 
        />
      </div>
    </DialogContent>
  );
};

export default TicketDetailsDialog;
