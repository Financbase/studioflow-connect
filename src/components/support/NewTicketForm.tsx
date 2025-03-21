
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
          <label htmlFor="ticket-title" className="text-sm font-medium">
            Title
          </label>
          <Input
            id="ticket-title"
            placeholder="Brief description of your issue"
            value={newTicketTitle}
            onChange={(e) => setNewTicketTitle(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="ticket-description" className="text-sm font-medium">
            Description
          </label>
          <Textarea
            id="ticket-description"
            placeholder="Please provide as much detail as possible"
            rows={5}
            value={newTicketDescription}
            onChange={(e) => setNewTicketDescription(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="ticket-priority" className="text-sm font-medium">
            Priority
          </label>
          <Select
            value={newTicketPriority}
            onValueChange={(value) => setNewTicketPriority(value as "low" | "medium" | "high")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low - General question or non-urgent issue</SelectItem>
              <SelectItem value="medium">Medium - Feature not working as expected</SelectItem>
              <SelectItem value="high">High - Critical feature not working</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button className="w-full mt-4" onClick={onSubmit}>
          Submit Support Ticket
        </Button>
      </CardContent>
    </Card>
  );
};

export default NewTicketForm;
