import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TicketList from "@/components/support/TicketList";
import FAQSection from "@/components/support/FAQSection";
import { Ticket } from "@/components/support/ticket/types";
import ContactCard from "@/components/support/ContactCard";
import NotificationsTab from "@/components/support/NotificationsTab";
import { Badge } from "@/components/ui/badge";
import { Bell, MessageSquare, HelpCircle, PhoneCall } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const mockTickets: Ticket[] = [
  {
    id: "ticket-123-456",
    user_id: "user-789",
    title: "DAW Integration Issue",
    description: "I'm having trouble connecting my DAW with the audio interface. The connection drops intermittently during recording sessions.",
    status: "open",
    priority: "high",
    created_at: "2025-03-01T10:30:00Z",
    updated_at: "2025-03-02T14:20:00Z"
  },
  {
    id: "ticket-456-789",
    user_id: "user-789",
    title: "Billing Question",
    description: "I was charged twice for my monthly subscription. Could you please help me resolve this issue?",
    status: "in_progress",
    priority: "medium",
    created_at: "2025-02-28T15:45:00Z",
    updated_at: "2025-03-01T09:10:00Z",
    response: "We're looking into this issue and will get back to you shortly."
  },
  {
    id: "ticket-789-012",
    user_id: "user-789",
    title: "Feature Request",
    description: "I would love to see integration with virtual instruments. This would streamline my workflow significantly.",
    status: "open",
    priority: "low",
    created_at: "2025-02-25T11:20:00Z",
    updated_at: "2025-02-25T11:20:00Z"
  },
  {
    id: "ticket-012-345",
    user_id: "user-789",
    title: "Resolved Audio Latency",
    description: "I was experiencing high latency during recording. The support team helped me optimize my buffer settings and it's now working perfectly.",
    status: "resolved",
    priority: "high",
    created_at: "2025-02-20T09:15:00Z",
    updated_at: "2025-02-22T16:30:00Z",
    response: "Glad we could help resolve your latency issues. Let us know if you need any further assistance!"
  },
  {
    id: "ticket-345-678",
    user_id: "user-789",
    title: "Closed Account Deletion Request",
    description: "I'd like to delete my account and remove all my data from your servers.",
    status: "closed",
    priority: "medium",
    created_at: "2025-02-15T14:20:00Z",
    updated_at: "2025-02-17T11:05:00Z",
    response: "Your account has been successfully deleted and all data has been removed from our servers as requested."
  }
];

interface SupportTabsProps {
  className?: string;
}

const SupportTabs: React.FC<SupportTabsProps> = ({ className }) => {
  const { t } = useLanguage();
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [searchQuery, setSearchQuery] = useState("");
  
  const notificationCount = 3; // This would come from your notification system

  return (
    <Tabs defaultValue="tickets" className={className}>
      <TabsList className="mb-4">
        <TabsTrigger value="tickets" className="flex items-center gap-1">
          <MessageSquare className="h-4 w-4" />
          <span>{t("support.tickets")}</span>
        </TabsTrigger>
        <TabsTrigger value="notifications" className="relative flex items-center gap-1">
          <Bell className="h-4 w-4" />
          <span>{t("support.notifications")}</span>
          {notificationCount > 0 && (
            <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
              {notificationCount}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="faq" className="flex items-center gap-1">
          <HelpCircle className="h-4 w-4" />
          <span>{t("support.faq")}</span>
        </TabsTrigger>
        <TabsTrigger value="contact" className="flex items-center gap-1">
          <PhoneCall className="h-4 w-4" />
          <span>{t("support.contact")}</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="tickets">
        <TicketList 
          tickets={tickets} 
          emptyMessage={t("support.no_tickets")}
          onNewTicket={() => {}} // Empty function since we're not handling new tickets here
        />
      </TabsContent>
      
      <TabsContent value="notifications">
        <NotificationsTab />
      </TabsContent>
      
      <TabsContent value="faq">
        <FAQSection 
          faqType="general"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </TabsContent>
      
      <TabsContent value="contact">
        <ContactCard />
      </TabsContent>
    </Tabs>
  );
};

export default SupportTabs;
