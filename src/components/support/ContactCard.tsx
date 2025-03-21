
import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, PhoneCall, Clock, MessageSquare, Globe, Instagram, Twitter } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const ContactCard = () => {
  return (
    <Card className="h-full">
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
        
        <Separator className="my-2" />
        
        <div className="space-y-2">
          <p className="text-sm font-medium">Follow us:</p>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <Twitter className="h-4 w-4" />
              <span className="sr-only">Twitter</span>
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <Instagram className="h-4 w-4" />
              <span className="sr-only">Instagram</span>
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <Globe className="h-4 w-4" />
              <span className="sr-only">Website</span>
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button variant="outline" className="w-full">
          <Mail className="mr-2 h-4 w-4" />
          Email Support
        </Button>
        <Button variant="outline" className="w-full">
          <MessageSquare className="mr-2 h-4 w-4" />
          Schedule Call
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContactCard;
