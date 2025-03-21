
import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, PhoneCall, Clock } from "lucide-react";

const ContactCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Contact Us</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-muted-foreground" />
          <span>support@studioflow.com</span>
        </div>
        <div className="flex items-center gap-2">
          <PhoneCall className="h-5 w-5 text-muted-foreground" />
          <span>+1 (555) 123-4567</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <div>
            <p>Mon-Fri: 9AM - 6PM EST</p>
            <p>Sat: 10AM - 2PM EST</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          <Mail className="mr-2 h-4 w-4" />
          Email Support
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContactCard;
