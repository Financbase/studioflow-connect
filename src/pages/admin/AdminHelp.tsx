
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminToolbar from "@/components/admin/AdminToolbar";
import { Separator } from "@/components/ui/separator";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  FileText, 
  HelpCircle, 
  MessageSquare, 
  Video
} from "lucide-react";

const AdminHelp: React.FC = () => {
  return (
    <AdminLayout>
      <AdminToolbar />
      <h1 className="text-2xl font-bold mb-4">Help & Support</h1>
      <Separator className="mb-6" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="flex flex-col items-center text-center p-6">
          <BookOpen className="h-12 w-12 text-primary mb-4" />
          <CardTitle className="text-xl mb-2">Documentation</CardTitle>
          <CardDescription className="mb-4">
            Comprehensive admin guides and documentation
          </CardDescription>
          <Button className="mt-auto">View Docs</Button>
        </Card>
        
        <Card className="flex flex-col items-center text-center p-6">
          <Video className="h-12 w-12 text-primary mb-4" />
          <CardTitle className="text-xl mb-2">Video Tutorials</CardTitle>
          <CardDescription className="mb-4">
            Learn with step-by-step video guides
          </CardDescription>
          <Button className="mt-auto">Watch Tutorials</Button>
        </Card>
        
        <Card className="flex flex-col items-center text-center p-6">
          <MessageSquare className="h-12 w-12 text-primary mb-4" />
          <CardTitle className="text-xl mb-2">Contact Support</CardTitle>
          <CardDescription className="mb-4">
            Get help from our support team
          </CardDescription>
          <Button className="mt-auto">Contact Us</Button>
        </Card>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <HelpCircle className="mr-2 h-5 w-5" />
            Frequently Asked Questions
          </CardTitle>
          <CardDescription>
            Common questions about the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                How do I add a new user to the system?
              </AccordionTrigger>
              <AccordionContent>
                To add a new user, navigate to the "Manage Users" section from the sidebar. 
                Click the "Add New User" button at the top of the page. Fill in the required 
                user information in the form and click "Create User" to complete the process.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>
                How do I respond to support tickets?
              </AccordionTrigger>
              <AccordionContent>
                To respond to a support ticket, go to the "Support Tickets" section. Find the 
                ticket you want to address and click the "Reply" button. Type your response in 
                the message field and click "Send" to reply to the user.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>
                How can I view system performance statistics?
              </AccordionTrigger>
              <AccordionContent>
                System performance data can be viewed in the "System Statistics" section. 
                This page displays CPU, memory, and network usage over time, as well as 
                user activity metrics. You can use the filters at the top to adjust the 
                time period for the displayed data.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>
                How do I manage user permissions?
              </AccordionTrigger>
              <AccordionContent>
                User permissions can be managed in the "Manage Users" section. Find the user 
                whose permissions you want to modify, click on the actions menu (three dots), 
                and select "Edit Permissions". From there, you can adjust their role and 
                specific access rights.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger>
                How do I schedule system maintenance?
              </AccordionTrigger>
              <AccordionContent>
                To schedule system maintenance, go to the "System Settings" page and navigate 
                to the "Maintenance" tab. Use the scheduling tool to set a date and time for 
                the maintenance window. You can also configure automatic notifications to users 
                about the upcoming maintenance.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            Admin Resources
          </CardTitle>
          <CardDescription>
            Additional resources for administrators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button variant="outline" className="justify-start h-auto py-4 px-4">
              <div className="flex items-start">
                <FileText className="h-5 w-5 mr-3 mt-0.5" />
                <div className="text-left">
                  <h4 className="font-medium">Admin Guide</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Complete guide to admin dashboard features
                  </p>
                </div>
              </div>
            </Button>
            
            <Button variant="outline" className="justify-start h-auto py-4 px-4">
              <div className="flex items-start">
                <FileText className="h-5 w-5 mr-3 mt-0.5" />
                <div className="text-left">
                  <h4 className="font-medium">User Management</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Best practices for managing users
                  </p>
                </div>
              </div>
            </Button>
            
            <Button variant="outline" className="justify-start h-auto py-4 px-4">
              <div className="flex items-start">
                <FileText className="h-5 w-5 mr-3 mt-0.5" />
                <div className="text-left">
                  <h4 className="font-medium">Security Handbook</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Security guidelines and best practices
                  </p>
                </div>
              </div>
            </Button>
            
            <Button variant="outline" className="justify-start h-auto py-4 px-4">
              <div className="flex items-start">
                <FileText className="h-5 w-5 mr-3 mt-0.5" />
                <div className="text-left">
                  <h4 className="font-medium">Troubleshooting</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Common issues and how to resolve them
                  </p>
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminHelp;
