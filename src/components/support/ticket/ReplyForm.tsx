
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

interface ReplyFormProps {
  replyText: string;
  setReplyText: (text: string) => void;
  onSubmit: () => void;
}

const ReplyForm: React.FC<ReplyFormProps> = ({ replyText, setReplyText, onSubmit }) => {
  return (
    <div className="space-y-2">
      <label htmlFor="reply" className="text-sm font-medium">
        Reply to this ticket
      </label>
      <Input
        id="reply"
        placeholder="Type your reply here..."
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
      />
      <Button 
        className="w-full" 
        onClick={onSubmit}
        disabled={!replyText.trim()}
      >
        <MessageSquare className="mr-2 h-4 w-4" />
        Send Reply
      </Button>
    </div>
  );
};

export default ReplyForm;
