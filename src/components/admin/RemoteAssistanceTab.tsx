
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Eye, Share2, Headphones } from "lucide-react";

const RemoteAssistanceTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Remote Assistance</CardTitle>
        <CardDescription>Provide support by connecting to user sessions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer">
            <CardContent className="p-5 text-center">
              <Eye className="h-10 w-10 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold">View Session</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Monitor user activity without interaction
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:border-primary/50 transition-colors cursor-pointer">
            <CardContent className="p-5 text-center">
              <Share2 className="h-10 w-10 mx-auto mb-3 text-blue-500" />
              <h3 className="font-semibold">Remote Control</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Take control of user's session with permission
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:border-primary/50 transition-colors cursor-pointer">
            <CardContent className="p-5 text-center">
              <Headphones className="h-10 w-10 mx-auto mb-3 text-green-500" />
              <h3 className="font-semibold">Audio Support</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Voice chat with user while troubleshooting
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Separator className="my-6" />
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Start Remote Session</h3>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username or Email</Label>
                <Input id="username" placeholder="Enter username or email" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="session-type">Session Type</Label>
                <select 
                  id="session-type"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="view">View Only</option>
                  <option value="control">Remote Control</option>
                  <option value="audio">Audio Support</option>
                  <option value="full">Full Support</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="session-notes">Session Notes</Label>
              <Textarea id="session-notes" placeholder="Enter session details or reason for connection" />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="record-session" />
              <Label htmlFor="record-session">Record session for quality and training purposes</Label>
            </div>
            
            <Button className="w-full sm:w-auto">
              Start Remote Assistance
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RemoteAssistanceTab;
