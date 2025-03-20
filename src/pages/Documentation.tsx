
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import HelpTip from "@/components/HelpSystem";
import { Link } from "react-router-dom";
import { ChevronRight, BookOpen, Code, FileText, Lightbulb } from "lucide-react";
import DocumentationGuides from "@/components/documentation/DocumentationGuides";
import DocumentationAPI from "@/components/documentation/DocumentationAPI";
import DocumentationExamples from "@/components/documentation/DocumentationExamples";

interface DocumentationProps {
  page?: string;
}

const Documentation: React.FC<DocumentationProps> = ({ page = "guides" }) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6 md:py-10">
        <div className="flex items-center mb-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-foreground">Documentation</span>
          {page !== "guides" && (
            <>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span className="text-foreground capitalize">{page}</span>
            </>
          )}
        </div>
        
        <div className="grid gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Documentation</h1>
            <p className="text-muted-foreground mt-2">
              Find guides, references, and resources to help you get the most out of our platform.
            </p>
          </div>
          
          <Tabs defaultValue={page === "guides" ? "guides" : page === "api" ? "api" : page === "examples" ? "examples" : "guides"}>
            <TabsList className="mb-4">
              <TabsTrigger value="guides">User Guides</TabsTrigger>
              <TabsTrigger value="api">API Reference</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
              {page === "terms" && <TabsTrigger value="terms">Terms</TabsTrigger>}
              {page === "privacy" && <TabsTrigger value="privacy">Privacy</TabsTrigger>}
              {page === "contact" && <TabsTrigger value="contact">Contact</TabsTrigger>}
            </TabsList>
            
            <TabsContent value="guides">
              <DocumentationGuides />
            </TabsContent>
            
            <TabsContent value="api">
              <DocumentationAPI />
            </TabsContent>
            
            <TabsContent value="examples">
              <DocumentationExamples />
            </TabsContent>
            
            {page === "terms" && (
              <TabsContent value="terms">
                <Card>
                  <CardHeader>
                    <CardTitle>Terms of Service</CardTitle>
                    <CardDescription>Our terms and conditions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      This page contains our terms of service agreement. By using our platform, you agree to these terms.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
            
            {page === "privacy" && (
              <TabsContent value="privacy">
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy Policy</CardTitle>
                    <CardDescription>How we handle your data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      This page explains how we collect, use, and protect your personal information.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
            
            {page === "contact" && (
              <TabsContent value="contact">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Us</CardTitle>
                    <CardDescription>Get in touch with our team</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Have questions or need help? Contact our support team at support@studioflow.com.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Documentation;
