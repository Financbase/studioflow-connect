
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MailOpen, CheckCircle, TicketPlus, HelpCircle, Music, AlertTriangle } from "lucide-react";
import TicketList from "@/components/support/TicketList";
import NewTicketForm from "@/components/support/NewTicketForm";
import FAQSection from "@/components/support/FAQSection";

interface Ticket {
  id: string;
  user_id: string;
  title: string;
  description: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "critical";
  created_at: string;
  updated_at: string;
  response?: string;
}

interface SupportTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  activeTickets: Ticket[];
  resolvedTickets: Ticket[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  newTicketTitle: string;
  setNewTicketTitle: (title: string) => void;
  newTicketDescription: string;
  setNewTicketDescription: (description: string) => void;
  newTicketPriority: "low" | "medium" | "high";
  setNewTicketPriority: (priority: "low" | "medium" | "high") => void;
  onCreateTicket: () => void;
}

const SupportTabs = ({
  activeTab,
  setActiveTab,
  activeTickets,
  resolvedTickets,
  searchQuery,
  setSearchQuery,
  newTicketTitle,
  setNewTicketTitle,
  newTicketDescription,
  setNewTicketDescription,
  newTicketPriority,
  setNewTicketPriority,
  onCreateTicket
}: SupportTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="grid grid-cols-1 sm:grid-cols-6 h-auto">
        <TabsTrigger value="active" className="text-sm h-10">
          <MailOpen className="mr-2 h-4 w-4" />
          Active Tickets
          {activeTickets.length > 0 && (
            <Badge variant="default" className="ml-2">{activeTickets.length}</Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="resolved" className="text-sm h-10">
          <CheckCircle className="mr-2 h-4 w-4" />
          Resolved
          {resolvedTickets.length > 0 && (
            <Badge variant="outline" className="ml-2">{resolvedTickets.length}</Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="new" className="text-sm h-10">
          <TicketPlus className="mr-2 h-4 w-4" />
          New Ticket
        </TabsTrigger>
        <TabsTrigger value="faq" className="text-sm h-10">
          <HelpCircle className="mr-2 h-4 w-4" />
          General FAQ
        </TabsTrigger>
        <TabsTrigger value="music-faq" className="text-sm h-10 sm:col-span-2">
          <Music className="mr-2 h-4 w-4" />
          Music Production Knowledge
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="active">
        <TicketList 
          tickets={activeTickets} 
          emptyMessage={
            <>
              <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">You don't have any active support tickets</p>
              <p className="text-sm text-muted-foreground mt-2">
                Need help with something? Create a new support ticket.
              </p>
            </>
          }
          onNewTicket={() => setActiveTab("new")}
        />
      </TabsContent>
      
      <TabsContent value="resolved">
        <TicketList 
          tickets={resolvedTickets} 
          emptyMessage={
            <>
              <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">You don't have any resolved support tickets</p>
            </>
          }
        />
      </TabsContent>
      
      <TabsContent value="new">
        <NewTicketForm 
          newTicketTitle={newTicketTitle}
          setNewTicketTitle={setNewTicketTitle}
          newTicketDescription={newTicketDescription}
          setNewTicketDescription={setNewTicketDescription}
          newTicketPriority={newTicketPriority}
          setNewTicketPriority={setNewTicketPriority}
          onSubmit={onCreateTicket}
        />
      </TabsContent>

      <TabsContent value="faq">
        <FAQSection 
          faqType="general"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </TabsContent>
      
      <TabsContent value="music-faq">
        <FAQSection 
          faqType="musicProduction"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </TabsContent>
    </Tabs>
  );
};

export default SupportTabs;
