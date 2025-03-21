
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Paperclip, AlertCircle, Upload, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

interface Attachment {
  name: string;
  size: string;
  type: string;
}

interface NewTicketFormProps {
  newTicketTitle: string;
  setNewTicketTitle: (title: string) => void;
  newTicketDescription: string;
  setNewTicketDescription: (description: string) => void;
  newTicketPriority: "low" | "medium" | "high";
  setNewTicketPriority: (priority: "low" | "medium" | "high") => void;
  onSubmit: () => void;
}

const NewTicketForm = ({
  newTicketTitle,
  setNewTicketTitle,
  newTicketDescription,
  setNewTicketDescription,
  newTicketPriority,
  setNewTicketPriority,
  onSubmit
}: NewTicketFormProps) => {
  const [category, setCategory] = useState("technical");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpload = () => {
    // Mock file upload
    const mockAttachments: Attachment[] = [
      { name: "screenshot.png", size: "1.2 MB", type: "image/png" },
      { name: "error_log.txt", size: "24 KB", type: "text/plain" }
    ];
    
    setAttachments(prev => [...prev, ...mockAttachments]);
    
    toast({
      title: "Files attached",
      description: "2 files have been attached to your ticket",
    });
  };

  const removeAttachment = (name: string) => {
    setAttachments(prev => prev.filter(a => a.name !== name));
  };

  const handleSubmitForm = () => {
    if (!newTicketTitle.trim() || !newTicketDescription.trim()) {
      toast({
        variant: "destructive",
        title: "Required fields missing",
        description: "Please complete all required fields."
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onSubmit();
      setAttachments([]);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Support Ticket</CardTitle>
        <CardDescription>
          Please provide details about your issue so our support team can help you
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="ticket-title" className="text-sm font-medium">
            Title <span className="text-destructive">*</span>
          </Label>
          <Input
            id="ticket-title"
            placeholder="Brief description of your issue"
            value={newTicketTitle}
            onChange={(e) => setNewTicketTitle(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="ticket-category" className="text-sm font-medium">
              Category <span className="text-destructive">*</span>
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="ticket-category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technical">Technical Issue</SelectItem>
                <SelectItem value="billing">Billing & Subscription</SelectItem>
                <SelectItem value="feature">Feature Request</SelectItem>
                <SelectItem value="account">Account Management</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ticket-priority" className="text-sm font-medium">
              Priority <span className="text-destructive">*</span>
            </Label>
            <Select
              value={newTicketPriority}
              onValueChange={(value) => setNewTicketPriority(value as "low" | "medium" | "high")}
            >
              <SelectTrigger id="ticket-priority">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low - General question or non-urgent issue</SelectItem>
                <SelectItem value="medium">Medium - Feature not working as expected</SelectItem>
                <SelectItem value="high">High - Critical feature not working</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="ticket-description" className="text-sm font-medium">
            Description <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="ticket-description"
            placeholder="Please provide as much detail as possible"
            rows={5}
            value={newTicketDescription}
            onChange={(e) => setNewTicketDescription(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium">Attachments</Label>
          <div className="border border-dashed rounded-md p-4 text-center">
            <Paperclip className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">
              Drag files here or click to browse
            </p>
            <Button variant="outline" onClick={handleUpload} className="gap-2">
              <Upload className="h-4 w-4" />
              Browse Files
            </Button>
          </div>
          
          {attachments.length > 0 && (
            <div className="space-y-2 mt-2">
              {attachments.map((file) => (
                <div key={file.name} className="flex items-center justify-between p-2 bg-muted rounded-md">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="h-6">
                      {file.type.split('/')[0]}
                    </Badge>
                    <span className="text-sm font-medium">{file.name}</span>
                    <span className="text-xs text-muted-foreground">{file.size}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6" 
                    onClick={() => removeAttachment(file.name)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Your support ticket will be responded to within 24 hours (business days).
          </AlertDescription>
        </Alert>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleSubmitForm} 
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Support Ticket"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewTicketForm;
