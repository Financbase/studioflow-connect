
import React, { useState, useEffect } from "react";
import { SidebarLayout } from "@/components/layout/Sidebar";
import Header from "@/components/Header";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/use-auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { TicketPlus, MessageSquare, MailOpen, CheckCircle, HelpCircle, AlertTriangle, Music } from "lucide-react";

// Import our custom components
import ContactCard from "@/components/support/ContactCard";
import FAQSection from "@/components/support/FAQSection";
import TicketList from "@/components/support/TicketList";
import NewTicketForm from "@/components/support/NewTicketForm";
import LiveChatDialog from "@/components/support/LiveChatDialog";

// Import FAQs data
import { faqs } from "@/data/faqs";

// Type for Ticket
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

const Support = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [activeTab, setActiveTab] = useState("active");
  const [newTicketTitle, setNewTicketTitle] = useState("");
  const [newTicketDescription, setNewTicketDescription] = useState("");
  const [newTicketPriority, setNewTicketPriority] = useState<"low" | "medium" | "high">("medium");
  const [searchQuery, setSearchQuery] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [faqType, setFaqType] = useState<'general' | 'musicProduction'>('general');
  
  useEffect(() => {
    // Mock data - in a real app, you would fetch this from your API/database
    const mockTickets: Ticket[] = [
      {
        id: "ticket-001",
        user_id: user?.id || "",
        title: "Cannot access audio analysis feature",
        description: "When I try to analyze my uploaded audio files, the frequency visualizer remains blank.",
        status: "in_progress",
        priority: "medium",
        created_at: new Date(Date.now() - 172800000).toISOString(),
        updated_at: new Date(Date.now() - 86400000).toISOString(),
        response: "We're looking into this issue. Our team has identified that it might be related to the audio format. We'll update you soon."
      },
      {
        id: "ticket-002",
        user_id: user?.id || "",
        title: "Feature request: MIDI integration",
        description: "Would it be possible to add MIDI file support for the DAW workflow integration?",
        status: "open",
        priority: "low",
        created_at: new Date(Date.now() - 259200000).toISOString(),
        updated_at: new Date(Date.now() - 259200000).toISOString()
      },
      {
        id: "ticket-003",
        user_id: user?.id || "",
        title: "Billing question",
        description: "I was charged twice for my Pro subscription. Could you please check this and refund the extra payment?",
        status: "resolved",
        priority: "high",
        created_at: new Date(Date.now() - 604800000).toISOString(),
        updated_at: new Date(Date.now() - 345600000).toISOString(),
        response: "We've verified the double charge and have processed a refund. It should appear in your account within 3-5 business days. We apologize for the inconvenience."
      },
      {
        id: "ticket-004",
        user_id: user?.id || "",
        title: "Plugin compatibility issue",
        description: "I'm trying to use a third-party VST plugin but it crashes when I load it in StudioFlow. The plugin works fine in other DAWs.",
        status: "open",
        priority: "critical",
        created_at: new Date(Date.now() - 86400000).toISOString(),
        updated_at: new Date(Date.now() - 86400000).toISOString()
      }
    ];
    
    setTickets(mockTickets);
  }, [user?.id]);
  
  const handleCreateTicket = () => {
    if (!newTicketTitle.trim() || !newTicketDescription.trim()) {
      toast({
        title: "Validation Error",
        description: "Please provide both a title and description for your support ticket.",
        variant: "destructive"
      });
      return;
    }
    
    const newTicket: Ticket = {
      id: `ticket-${Date.now()}`,
      user_id: user?.id || "",
      title: newTicketTitle,
      description: newTicketDescription,
      status: "open",
      priority: newTicketPriority,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    setTickets([newTicket, ...tickets]);
    setNewTicketTitle("");
    setNewTicketDescription("");
    setNewTicketPriority("medium");
    
    toast({
      title: "Ticket Created",
      description: "Your support ticket has been submitted successfully."
    });
    
    // Switch to active tickets tab to show the new ticket
    setActiveTab("active");
  };

  const handleSendChatMessage = () => {
    if (!chatMessage.trim()) return;
    
    // This would normally send the message to your support system
    toast({
      title: "Message Sent",
      description: "A support agent will respond shortly."
    });
    
    setChatMessage("");
  };
  
  const activeTickets = tickets.filter(t => ["open", "in_progress"].includes(t.status));
  const resolvedTickets = tickets.filter(t => ["resolved", "closed"].includes(t.status));
  
  return (
    <SidebarLayout>
      <Header />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 py-8">
        <div className="max-w-[1000px] mx-auto space-y-8">
          <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Support Center</h1>
              <p className="text-muted-foreground">
                Get help with your StudioFlow issues and access our knowledge resources
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button className="gap-2" onClick={() => setActiveTab("new")}>
                <TicketPlus className="h-4 w-4" />
                New Support Ticket
              </Button>
              <LiveChatDialog 
                isOpen={isChatOpen}
                setIsOpen={setIsChatOpen}
                chatMessage={chatMessage}
                setChatMessage={setChatMessage}
                onSendMessage={handleSendChatMessage}
              />
            </div>
          </section>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <ContactCard />
            </div>
            
            <div className="md:col-span-3">
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
                    onSubmit={handleCreateTicket}
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
            </div>
          </div>
        </div>
      </main>
    </SidebarLayout>
  );
};

export default Support;
