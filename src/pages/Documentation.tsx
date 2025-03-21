
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import HelpTip from "@/components/HelpSystem";
import { Link } from "react-router-dom";
import { 
  ChevronRight, 
  BookOpen, 
  Code, 
  FileText, 
  Lightbulb, 
  Music, 
  Headphones, 
  Settings, 
  CheckCircle,
  Laptop,
  Command,
  AudioLines,
  Database
} from "lucide-react";
import DocumentationGuides from "@/components/documentation/DocumentationGuides";
import DocumentationAPI from "@/components/documentation/DocumentationAPI";
import DocumentationExamples from "@/components/documentation/DocumentationExamples";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

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
        
        <div className="grid gap-6 max-w-5xl mx-auto">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Documentation</h1>
            <p className="text-muted-foreground mt-2">
              Find guides, references, and resources to help you get the most out of StudioFlow
            </p>
          </div>
          
          <Tabs defaultValue={page === "guides" ? "guides" : page === "api" ? "api" : page === "examples" ? "examples" : page === "terms" ? "terms" : page === "privacy" ? "privacy" : page === "contact" ? "contact" : "guides"}>
            <TabsList className="mb-4 w-full justify-start flex-wrap h-auto">
              <TabsTrigger value="guides" className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                User Guides
              </TabsTrigger>
              <TabsTrigger value="api" className="flex items-center gap-1">
                <Code className="h-4 w-4" />
                API Reference
              </TabsTrigger>
              <TabsTrigger value="examples" className="flex items-center gap-1">
                <Lightbulb className="h-4 w-4" />
                Examples
              </TabsTrigger>
              <TabsTrigger value="terms" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                Terms
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center gap-1">
                <ShieldIcon className="h-4 w-4" />
                Privacy
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex items-center gap-1">
                <MessageIcon className="h-4 w-4" />
                Contact
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="guides">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Getting Started with StudioFlow</CardTitle>
                    <CardDescription>Essential guides to help you begin your journey</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <DocCard 
                        icon={<Music className="h-5 w-5" />}
                        title="Studio Setup"
                        description="Learn how to set up StudioFlow for your studio environment"
                        href="/docs/guides/studio-setup"
                      />
                      
                      <DocCard 
                        icon={<Database className="h-5 w-5" />}
                        title="Storage Management"
                        description="Configure cross-platform storage access for your audio files"
                        href="/docs/guides/storage"
                      />
                      
                      <DocCard 
                        icon={<Headphones className="h-5 w-5" />}
                        title="Audio Analysis"
                        description="Get started with audio analysis tools and visualizations"
                        href="/docs/guides/audio-analysis"
                      />
                      
                      <DocCard 
                        icon={<Settings className="h-5 w-5" />}
                        title="Dashboard Customization"
                        description="Personalize your workflow with custom layouts"
                        href="/docs/guides/customization"
                      />
                      
                      <DocCard 
                        icon={<Command className="h-5 w-5" />}
                        title="Keyboard Shortcuts"
                        description="Boost your productivity with keyboard shortcuts"
                        href="/docs/guides/shortcuts"
                      />
                      
                      <DocCard 
                        icon={<Laptop className="h-5 w-5" />}
                        title="DAW Integration"
                        description="Connect StudioFlow with your favorite DAWs"
                        href="/docs/guides/daw-integration"
                      />
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Feature Guides</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <FeatureGuide 
                          title="StudioFlow Connect"
                          description="Access storage across any operating system"
                          url="/docs/features/connect"
                        />
                        
                        <FeatureGuide 
                          title="Audio Analysis"
                          description="Advanced spectrum analyzers and tools"
                          url="/docs/features/audio-analysis"
                        />
                        
                        <FeatureGuide 
                          title="Virtual Machines"
                          description="Run multiple OS environments for compatibility"
                          url="/docs/features/vm"
                        />
                        
                        <FeatureGuide 
                          title="AI Tools"
                          description="Leverage AI for music production tasks"
                          url="/docs/features/ai"
                        />
                        
                        <FeatureGuide 
                          title="Plugin Bridge"
                          description="Run plugins across DAWs and platforms"
                          url="/docs/features/plugin-bridge"
                        />
                        
                        <FeatureGuide 
                          title="Layout Profiles"
                          description="Create and switch between custom layouts"
                          url="/docs/features/layouts"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Video Tutorials</CardTitle>
                    <CardDescription>Watch step-by-step guides and tutorials</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="aspect-video bg-muted rounded-md flex items-center justify-center relative">
                        <PlayIcon className="h-10 w-10 text-primary" />
                        <div className="absolute bottom-0 w-full bg-background/80 p-2">
                          <p className="text-sm font-medium">Getting Started</p>
                          <p className="text-xs text-muted-foreground">5:24</p>
                        </div>
                      </div>
                      
                      <div className="aspect-video bg-muted rounded-md flex items-center justify-center relative">
                        <PlayIcon className="h-10 w-10 text-primary" />
                        <div className="absolute bottom-0 w-full bg-background/80 p-2">
                          <p className="text-sm font-medium">DAW Integration</p>
                          <p className="text-xs text-muted-foreground">8:15</p>
                        </div>
                      </div>
                      
                      <div className="aspect-video bg-muted rounded-md flex items-center justify-center relative">
                        <PlayIcon className="h-10 w-10 text-primary" />
                        <div className="absolute bottom-0 w-full bg-background/80 p-2">
                          <p className="text-sm font-medium">Advanced Features</p>
                          <p className="text-xs text-muted-foreground">12:47</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="api">
              <Card>
                <CardHeader>
                  <CardTitle>API Reference</CardTitle>
                  <CardDescription>
                    Complete documentation for StudioFlow's APIs and integrations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">REST API</h3>
                      <div className="space-y-3">
                        <ApiItem 
                          title="Authentication" 
                          description="Secure your API requests" 
                          method="POST" 
                          endpoint="/api/auth" 
                        />
                        <ApiItem 
                          title="Projects" 
                          description="Manage audio projects" 
                          method="GET" 
                          endpoint="/api/projects" 
                        />
                        <ApiItem 
                          title="Audio Assets" 
                          description="Upload and manage audio files" 
                          method="POST" 
                          endpoint="/api/assets" 
                        />
                        <ApiItem 
                          title="Analysis" 
                          description="Spectrum and waveform analysis" 
                          method="POST" 
                          endpoint="/api/analyze" 
                        />
                        <ApiItem 
                          title="DAW Integration" 
                          description="Connect with DAWs" 
                          method="GET" 
                          endpoint="/api/daw" 
                        />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">WebSocket API</h3>
                      <div className="space-y-3">
                        <ApiItem 
                          title="Real-time Audio Processing" 
                          description="Process audio in real-time" 
                          method="WS" 
                          endpoint="/ws/audio" 
                        />
                        <ApiItem 
                          title="Remote Control" 
                          description="Remote control API" 
                          method="WS" 
                          endpoint="/ws/remote" 
                        />
                        <ApiItem 
                          title="Collaboration" 
                          description="Collaborate with other producers" 
                          method="WS" 
                          endpoint="/ws/collab" 
                        />
                      </div>
                      
                      <h3 className="text-lg font-medium mb-4 mt-6">SDK</h3>
                      <div className="space-y-3">
                        <ApiItem 
                          title="JavaScript SDK" 
                          description="Client-side integration" 
                          method="JS" 
                          endpoint="npm i @studioflow/sdk" 
                        />
                        <ApiItem 
                          title="Python SDK" 
                          description="Server-side integration" 
                          method="PY" 
                          endpoint="pip install studioflow" 
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Code Examples</h3>
                    <div className="bg-muted rounded-md p-4 overflow-x-auto">
                      <pre className="text-sm">
                        <code>
{`// Example: Connect to a DAW with JavaScript SDK
import { StudioFlow } from '@studioflow/sdk';

const studioflow = new StudioFlow({
  apiKey: 'your-api-key',
  environment: 'production'
});

// Connect to a DAW
studioflow.connect.toDaw({
  type: 'logic-pro',
  config: {
    port: 8080,
    enableRemoteControl: true
  }
})
.then(connection => {
  console.log('Connected to DAW:', connection.status);
  // Now you can control the DAW
  connection.transport.play();
})
.catch(error => {
  console.error('Failed to connect:', error);
});`}
                        </code>
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="examples">
              <Card>
                <CardHeader>
                  <CardTitle>Example Workflows</CardTitle>
                  <CardDescription>
                    Real-world examples of StudioFlow in action
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ExampleCard 
                      title="Recording Session"
                      steps={[
                        "Connect your audio interface",
                        "Set up input monitoring",
                        "Configure record paths across drives",
                        "Start recording with auto-backup"
                      ]}
                    />
                    
                    <ExampleCard 
                      title="Mixing Project"
                      steps={[
                        "Import stems from different sources",
                        "Create unified project structure",
                        "Apply AI-assisted gain staging",
                        "Set up automatic session backups"
                      ]}
                    />
                    
                    <ExampleCard 
                      title="Cross-Platform Workflow"
                      steps={[
                        "Set up shared project folders",
                        "Configure plugin compatibility",
                        "Create portable session formats",
                        "Enable collaborative features"
                      ]}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Custom Layout Examples</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-2">Recording Layout</h4>
                          <p className="text-sm text-muted-foreground mb-4">Optimized for tracking sessions with multiple inputs</p>
                          <div className="grid grid-cols-4 gap-2 p-2 border rounded-md">
                            <div className="bg-primary/20 p-2 text-xs rounded col-span-4">Audio Inputs Monitor</div>
                            <div className="bg-secondary p-2 text-xs rounded col-span-2">System Monitor</div>
                            <div className="bg-secondary p-2 text-xs rounded col-span-2">Storage Access</div>
                            <div className="bg-primary/10 p-2 text-xs rounded col-span-4">Waveform Display</div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-2">Mixing Layout</h4>
                          <p className="text-sm text-muted-foreground mb-4">Focused on spectrum analysis and processing</p>
                          <div className="grid grid-cols-4 gap-2 p-2 border rounded-md">
                            <div className="bg-primary/10 p-2 text-xs rounded col-span-4">Spectrum Analyzer</div>
                            <div className="bg-secondary p-2 text-xs rounded col-span-2">Plugin Chain</div>
                            <div className="bg-secondary p-2 text-xs rounded col-span-2">Reference Tracks</div>
                            <div className="bg-primary/20 p-2 text-xs rounded col-span-4">AI Assistant</div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="terms">
              <Card>
                <CardHeader>
                  <CardTitle>Terms of Service</CardTitle>
                  <CardDescription>Our terms and conditions</CardDescription>
                </CardHeader>
                <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                  <h2>1. Introduction</h2>
                  <p>
                    Welcome to StudioFlow! These Terms of Service govern your use of our platform, 
                    including all features, functionality, and services offered through our website and applications.
                  </p>
                  
                  <h2>2. Acceptance of Terms</h2>
                  <p>
                    By accessing or using StudioFlow, you agree to be bound by these Terms of Service. 
                    If you do not agree to all of these terms, you may not use our services.
                  </p>
                  
                  <h2>3. Subscription Plans</h2>
                  <p>
                    StudioFlow offers various subscription plans with different features and capabilities. 
                    The features available to you will depend on the plan you choose.
                  </p>
                  <ul>
                    <li><strong>Free Plan:</strong> Basic features with limited functionality</li>
                    <li><strong>Standard Plan:</strong> Enhanced features with moderate capabilities</li>
                    <li><strong>Pro Plan:</strong> Full feature set with advanced capabilities</li>
                    <li><strong>Enterprise Plan:</strong> Custom solutions for large organizations</li>
                  </ul>
                  
                  <h2>4. User Content</h2>
                  <p>
                    You retain all rights to the audio content you upload to StudioFlow. We do not claim ownership 
                    of your content, but we require certain rights to provide our services.
                  </p>
                  
                  <h2>5. Privacy and Data</h2>
                  <p>
                    Your privacy is important to us. Please refer to our Privacy Policy for information 
                    about how we collect, use, and disclose your personal information.
                  </p>
                  
                  <h2>6. Termination</h2>
                  <p>
                    We reserve the right to suspend or terminate your access to StudioFlow if you 
                    violate these Terms of Service or for any other reason at our discretion.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Policy</CardTitle>
                  <CardDescription>How we handle your data</CardDescription>
                </CardHeader>
                <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                  <h2>1. Information Collection</h2>
                  <p>
                    We collect information you provide directly to us, such as when you create an account, 
                    upload audio files, or contact our support team. We also collect certain information automatically 
                    when you use our services.
                  </p>
                  
                  <h2>2. Use of Information</h2>
                  <p>
                    We use the information we collect to provide, maintain, and improve our services, 
                    including processing your audio files, providing technical support, and personalizing your experience.
                  </p>
                  
                  <h2>3. Data Security</h2>
                  <p>
                    We implement appropriate security measures to protect your personal information from 
                    unauthorized access, alteration, disclosure, or destruction. However, no method of 
                    transmission over the Internet is completely secure.
                  </p>
                  
                  <h2>4. Your Audio Files</h2>
                  <p>
                    StudioFlow does not analyze the content of your audio files for any purpose other than 
                    providing the services you request. We do not use your audio content for training AI models 
                    or for any other purposes without your explicit consent.
                  </p>
                  
                  <h2>5. Your Rights</h2>
                  <p>
                    Depending on your location, you may have certain rights regarding your personal information, 
                    such as the right to access, correct, or delete your data. Please contact us if you wish to 
                    exercise these rights.
                  </p>
                  
                  <h2>6. Changes to this Policy</h2>
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you of any changes by 
                    posting the new policy on our website and updating the effective date.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="contact">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Us</CardTitle>
                  <CardDescription>Get in touch with our team</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center">
                          <div className="bg-primary/10 p-4 rounded-full mb-4">
                            <HeadsetIcon className="h-6 w-6 text-primary" />
                          </div>
                          <h3 className="font-medium text-lg mb-2">Technical Support</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Having trouble with StudioFlow? Our support team is ready to help.
                          </p>
                          <Button className="w-full">Contact Support</Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center">
                          <div className="bg-primary/10 p-4 rounded-full mb-4">
                            <MailIcon className="h-6 w-6 text-primary" />
                          </div>
                          <h3 className="font-medium text-lg mb-2">General Inquiries</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            For business, partnerships, and other general questions.
                          </p>
                          <Button variant="outline" className="w-full">Send Email</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Frequently Asked Questions</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">What platforms does StudioFlow support?</h4>
                        <p className="text-sm text-muted-foreground">
                          StudioFlow supports Windows, macOS, and Linux, allowing seamless integration across all major operating systems.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium">How do I upgrade my subscription?</h4>
                        <p className="text-sm text-muted-foreground">
                          You can upgrade your subscription at any time by going to Settings > Subscription and selecting your desired plan.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium">Can I use StudioFlow offline?</h4>
                        <p className="text-sm text-muted-foreground">
                          Yes, most core features of StudioFlow work offline, though some cloud-based features require an internet connection.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium">How secure is my audio content?</h4>
                        <p className="text-sm text-muted-foreground">
                          StudioFlow uses industry-standard encryption to protect your audio files and personal data both in transit and at rest.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="text-center">
                    <h3 className="text-lg font-medium mb-2">Connect With Us</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Follow us on social media for the latest updates and features
                    </p>
                    <div className="flex justify-center gap-4">
                      <Button variant="outline" size="icon">
                        <TwitterIcon className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <YoutubeIcon className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <InstagramIcon className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <LinkedinIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

// Helper components
const DocCard = ({ icon, title, description, href }: { icon: React.ReactNode, title: string, description: string, href: string }) => (
  <Card className="overflow-hidden">
    <CardContent className="p-6">
      <div className="flex items-start gap-3">
        <div className="rounded-full bg-primary/10 p-2 text-primary">{icon}</div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
          <Button variant="link" className="px-0 h-auto mt-1" asChild>
            <Link to={href}>Read more</Link>
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

const FeatureGuide = ({ title, description, url }: { title: string, description: string, url: string }) => (
  <div className="flex items-center gap-3">
    <div className="flex-shrink-0">
      <CheckCircle className="h-5 w-5 text-green-500" />
    </div>
    <div>
      <Link to={url} className="font-medium hover:underline">
        {title}
      </Link>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  </div>
);

const ApiItem = ({ title, description, method, endpoint }: { title: string, description: string, method: string, endpoint: string }) => (
  <div className="border rounded-md p-3">
    <div className="flex items-center justify-between mb-1">
      <h4 className="font-medium">{title}</h4>
      <Badge variant={
        method === "GET" ? "outline" : 
        method === "POST" ? "secondary" : 
        method === "WS" ? "default" : 
        "outline"
      }>
        {method}
      </Badge>
    </div>
    <p className="text-sm text-muted-foreground mb-1">{description}</p>
    <p className="text-xs font-mono bg-muted p-1 rounded">{endpoint}</p>
  </div>
);

const ExampleCard = ({ title, steps }: { title: string, steps: string[] }) => (
  <Card>
    <CardContent className="p-6">
      <h3 className="font-medium mb-4">{title}</h3>
      <ol className="space-y-2">
        {steps.map((step, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <span className="bg-primary/10 text-primary h-5 w-5 flex items-center justify-center rounded-full flex-shrink-0 text-xs">{i+1}</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </CardContent>
  </Card>
);

// Icons
const ShieldIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const MessageIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const PlayIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polygon points="10 8 16 12 10 16 10 8" />
  </svg>
);

const HeadsetIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
);

const MailIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default Documentation;
