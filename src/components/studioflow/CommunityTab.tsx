
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  MessageSquare, 
  ArrowUpRight, 
  PlusCircle, 
  Clock,
  Share2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

const UserDiscussion = ({ 
  name, 
  avatar, 
  message, 
  time, 
  replies 
}: { 
  name: string, 
  avatar: string, 
  message: string, 
  time: string, 
  replies: number 
}) => (
  <div className="p-3 border rounded-lg flex gap-3">
    <Avatar className="h-9 w-9">
      <AvatarImage src={avatar} alt={name} />
      <AvatarFallback>{name.charAt(0)}</AvatarFallback>
    </Avatar>
    
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <div className="font-medium text-sm">{name}</div>
        <div className="text-xs text-muted-foreground">{time}</div>
      </div>
      <p className="text-sm mt-1">{message}</p>
      
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MessageSquare className="h-3.5 w-3.5" />
          <span>{replies} replies</span>
        </div>
        
        <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
          <Share2 className="h-3.5 w-3.5" />
          Share
        </Button>
      </div>
    </div>
  </div>
);

const CommunityTab = () => {
  const handleCreateDiscussion = () => {
    toast({
      title: "New Discussion Created",
      description: "Your discussion topic has been posted to the community."
    });
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-3 space-y-6">
        <Card>
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-medium">Recent Discussions</h3>
            </div>
            
            <Button size="sm" className="gap-1" onClick={handleCreateDiscussion}>
              <PlusCircle className="h-4 w-4" />
              New Discussion
            </Button>
          </CardHeader>
          
          <CardContent className="space-y-3">
            <UserDiscussion
              name="Alex Kington"
              avatar="/avatars/alex.jpg"
              message="Has anyone figured out how to route MIDI from Logic to Ableton through StudioFlow? I'm trying to use Logic's arpeggiator with Ableton's instruments."
              time="2 hours ago"
              replies={12}
            />
            
            <UserDiscussion
              name="Sarah Chen"
              avatar="/avatars/sarah.jpg"
              message="Just upgraded to Pro and the multi-DAW sync is incredible. I'm connecting Logic, Ableton, and FL Studio with zero latency between them!"
              time="Yesterday"
              replies={8}
            />
            
            <UserDiscussion
              name="Marcus Johnson"
              avatar="/avatars/marcus.jpg"
              message="Question about drive formats: If I'm collaborating between Mac and PC, which file system should I use for best compatibility with StudioFlow?"
              time="2 days ago"
              replies={15}
            />
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-medium">Upcoming Events</h3>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-3">
            <div className="border rounded-lg p-3">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-sm">StudioFlow Workshop</h4>
                <Badge variant="outline" className="text-xs">Tomorrow</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Learn advanced routing techniques with StudioFlow's lead developer.
              </p>
              <Button variant="outline" className="w-full mt-2 h-7 text-xs" size="sm">
                Register
              </Button>
            </div>
            
            <div className="border rounded-lg p-3">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-sm">Community Showcase</h4>
                <Badge variant="outline" className="text-xs">Next week</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Demo your projects and workflows to the StudioFlow community.
              </p>
              <Button variant="outline" className="w-full mt-2 h-7 text-xs" size="sm">
                Submit project
              </Button>
            </div>
            
            <Button variant="link" className="text-xs w-full" size="sm">
              View all events
              <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CommunityTab;
