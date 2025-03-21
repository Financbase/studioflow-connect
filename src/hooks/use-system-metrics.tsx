
import { useState, useEffect } from 'react';
import { Ticket, UserSession, SystemMetrics } from '@/types/admin';
import { toast } from '@/hooks/use-toast';

export const useSystemMetrics = () => {
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
    cpuUsage: 42,
    memoryUsage: 68,
    diskUsage: 54,
    networkLatency: 23,
    activeUsers: 37,
    totalUsers: 412,
    pendingTickets: 8,
    resolvedToday: 12,
    audioProcessingLoad: 61
  });
  
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [userSessions, setUserSessions] = useState<UserSession[]>([]);
  
  useEffect(() => {
    // Mock data for tickets
    const mockTickets: Ticket[] = [
      {
        id: "ticket-001",
        user_id: "user-001",
        title: "Unable to access VM Controller",
        description: "I'm on the Pro plan but can't access the VM Controller feature after login.",
        status: "open",
        priority: "high",
        created_at: new Date(Date.now() - 3600000).toISOString(),
        updated_at: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: "ticket-002",
        user_id: "user-002",
        title: "DAW integration issue with Pro Tools",
        description: "The DAW Workflow isn't detecting my Pro Tools installation.",
        status: "in_progress",
        priority: "medium",
        created_at: new Date(Date.now() - 86400000).toISOString(),
        updated_at: new Date(Date.now() - 43200000).toISOString(),
        assigned_to: "agent-001"
      },
      {
        id: "ticket-003",
        user_id: "user-003",
        title: "Billing question about Standard plan",
        description: "I want to know if there's a discounted annual payment option for the Standard plan.",
        status: "resolved",
        priority: "low",
        created_at: new Date(Date.now() - 172800000).toISOString(),
        updated_at: new Date(Date.now() - 86400000).toISOString(),
        assigned_to: "agent-002"
      },
      {
        id: "ticket-004",
        user_id: "user-004",
        title: "Audio Analysis feature crashes on large files",
        description: "When I try to analyze audio files larger than 50MB, the analysis tool crashes.",
        status: "open",
        priority: "critical",
        created_at: new Date(Date.now() - 7200000).toISOString(),
        updated_at: new Date(Date.now() - 7200000).toISOString()
      },
      {
        id: "ticket-005",
        user_id: "user-005",
        title: "Custom layout not saving properly",
        description: "When I save my custom dashboard layout, it reverts back after I log out and log back in.",
        status: "in_progress",
        priority: "medium",
        created_at: new Date(Date.now() - 259200000).toISOString(),
        updated_at: new Date(Date.now() - 172800000).toISOString(),
        assigned_to: "agent-003"
      }
    ];
    
    // Mock data for user sessions
    const mockSessions: UserSession[] = [
      {
        id: "session-001",
        user_id: "user-001",
        username: "johnsmith",
        ip_address: "192.168.1.1",
        user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        started_at: new Date(Date.now() - 1800000).toISOString(),
        last_active_at: new Date().toISOString(),
        plan: "pro"
      },
      {
        id: "session-002",
        user_id: "user-002",
        username: "sarahconnor",
        ip_address: "10.0.0.1",
        user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15",
        started_at: new Date(Date.now() - 3600000).toISOString(),
        last_active_at: new Date(Date.now() - 600000).toISOString(),
        plan: "standard"
      },
      {
        id: "session-003",
        user_id: "user-003",
        username: "alexrodriguez",
        ip_address: "172.16.254.1",
        user_agent: "Mozilla/5.0 (iPad; CPU OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/91.0.4472.80 Mobile/15E148 Safari/604.1",
        started_at: new Date(Date.now() - 7200000).toISOString(),
        last_active_at: new Date(Date.now() - 1200000).toISOString(),
        plan: "free"
      },
      {
        id: "session-004",
        user_id: "user-006",
        username: "mikeproducer",
        ip_address: "45.67.89.101",
        user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
        started_at: new Date(Date.now() - 900000).toISOString(),
        last_active_at: new Date(Date.now() - 120000).toISOString(),
        plan: "enterprise"
      },
      {
        id: "session-005",
        user_id: "user-007",
        username: "jennystudio",
        ip_address: "203.0.113.42",
        user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Safari/605.1.15",
        started_at: new Date(Date.now() - 1500000).toISOString(),
        last_active_at: new Date(Date.now() - 300000).toISOString(),
        plan: "pro"
      }
    ];
    
    setTickets(mockTickets);
    setUserSessions(mockSessions);
  }, []);
  
  // Update metrics periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics(prev => ({
        ...prev,
        cpuUsage: Math.min(100, Math.max(20, prev.cpuUsage + (Math.random() * 10 - 5))),
        memoryUsage: Math.min(100, Math.max(30, prev.memoryUsage + (Math.random() * 8 - 4))),
        diskUsage: Math.min(100, Math.max(40, prev.diskUsage + (Math.random() * 2 - 1))),
        networkLatency: Math.min(100, Math.max(5, prev.networkLatency + (Math.random() * 6 - 3))),
        activeUsers: Math.max(1, Math.floor(prev.activeUsers + (Math.random() * 4 - 2))),
        audioProcessingLoad: Math.min(100, Math.max(10, prev.audioProcessingLoad + (Math.random() * 12 - 6)))
      }));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const refreshMetrics = () => {
    // In a real app, this would fetch fresh data from an API
    toast({
      title: "Refreshing Data",
      description: "Fetching latest system metrics and user data..."
    });
    
    // Simulate data refresh with slight changes
    setSystemMetrics(prev => ({
      ...prev,
      cpuUsage: Math.min(100, Math.max(20, 40 + (Math.random() * 20 - 10))),
      memoryUsage: Math.min(100, Math.max(30, 65 + (Math.random() * 15 - 7.5))),
      diskUsage: Math.min(100, Math.max(40, prev.diskUsage + (Math.random() * 5 - 2.5))),
      networkLatency: Math.min(100, Math.max(5, 25 + (Math.random() * 15 - 7.5))),
      audioProcessingLoad: Math.min(100, Math.max(10, 60 + (Math.random() * 20 - 10)))
    }));
  };
  
  const handleTicketStatusChange = (ticketId: string, newStatus: Ticket["status"]) => {
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId ? { ...ticket, status: newStatus, updated_at: new Date().toISOString() } : ticket
    ));
    
    toast({
      title: "Ticket Updated",
      description: `Ticket #${ticketId} status changed to ${newStatus}`,
    });
  };
  
  return { 
    systemMetrics, 
    tickets, 
    userSessions, 
    refreshMetrics,
    handleTicketStatusChange
  };
};
