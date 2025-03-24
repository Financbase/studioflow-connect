
import React from "react";
import { Button } from "@/components/ui/button";
import { TicketPlus, MessageSquare } from "lucide-react";
import LiveChatDialog from "@/components/support/LiveChatDialog";
import { useLanguage } from "@/contexts/language";

interface SupportHeaderProps {
  isChatOpen: boolean;
  setIsChatOpen: (isOpen: boolean) => void;
  chatMessage: string;
  setChatMessage: (message: string) => void;
  onSendMessage: () => void;
  onNewTicket: () => void;
}

const SupportHeader = ({
  isChatOpen,
  setIsChatOpen,
  chatMessage,
  setChatMessage,
  onSendMessage,
  onNewTicket
}: SupportHeaderProps) => {
  const { t } = useLanguage();
  
  return (
    <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("support.title")}</h1>
        <p className="text-muted-foreground">
          {t("support.subtitle")}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Button className="gap-2" onClick={onNewTicket}>
          <TicketPlus className="h-4 w-4" />
          {t("support.new_ticket")}
        </Button>
        <LiveChatDialog 
          isOpen={isChatOpen}
          setIsOpen={setIsChatOpen}
          chatMessage={chatMessage}
          setChatMessage={setChatMessage}
          onSendMessage={onSendMessage}
        />
      </div>
    </section>
  );
};

export default SupportHeader;
