
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const PremiumTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-muted/30 p-6 rounded-lg border border-muted">
        <h3 className="text-xl font-semibold mb-2">Upgrade to Unlock Premium Features</h3>
        <p className="text-muted-foreground mb-4">
          StudioFlow Connect is just the beginning. Discover our complete suite of audio production tools.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-green-200">
            <CardHeader className="pb-2">
              <h4 className="font-semibold">Free</h4>
              <Badge variant="outline" className="bg-green-500/10 text-green-500">Open Source</Badge>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-3xl font-bold mb-4">$0</p>
              <ul className="space-y-2 text-sm mb-6">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Universal Drive Format
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Basic Auto-Versioning
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Legacy Plugin Bridge
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Audio Analyzer (Basic)
                </li>
              </ul>
              <Button variant="outline" className="w-full">Current Plan</Button>
            </CardContent>
          </Card>
          
          <Card className="border-blue-200">
            <CardHeader className="pb-2">
              <h4 className="font-semibold">Standard</h4>
              <Badge variant="secondary">Most Popular</Badge>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-3xl font-bold mb-4">$9.99<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
              <ul className="space-y-2 text-sm mb-6">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Everything in Free
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  System Monitor
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  AI Tools (Basic)
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  DAW Workflow
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Marketplace Access
                </li>
              </ul>
              <Button variant="default" className="w-full">Upgrade</Button>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-900/5 to-purple-900/10 border-purple-200">
            <CardHeader className="pb-2">
              <h4 className="font-semibold">Pro</h4>
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">Advanced</Badge>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-3xl font-bold mb-4">$24.99<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
              <ul className="space-y-2 text-sm mb-6">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Everything in Standard
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  VM Controller
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Advanced AI Composition
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Advanced Audio Analysis
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Cloud Collaboration
                </li>
              </ul>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500">Upgrade</Button>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-900/5 to-red-900/10 border-red-200">
            <CardHeader className="pb-2">
              <h4 className="font-semibold">Enterprise</h4>
              <Badge className="bg-gradient-to-r from-purple-500 to-red-500 text-white">Premium</Badge>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-3xl font-bold mb-4">$89.99<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
              <ul className="space-y-2 text-sm mb-6">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Everything in Pro
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  VR Mixing Environment
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Multi-User Studio
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Enterprise Support
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Custom Integrations
                </li>
              </ul>
              <Button className="w-full bg-gradient-to-r from-purple-500 to-red-500">Contact Sales</Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Feature Comparison</h3>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 font-medium">Feature</th>
                  <th className="text-center py-2 px-4 font-medium">Free</th>
                  <th className="text-center py-2 px-4 font-medium">Standard</th>
                  <th className="text-center py-2 px-4 font-medium">Pro</th>
                  <th className="text-center py-2 px-4 font-medium">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-4">Universal Drive Format</td>
                  <td className="text-center py-2 px-4"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                  <td className="text-center py-2 px-4"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                  <td className="text-center py-2 px-4"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                  <td className="text-center py-2 px-4"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">Auto-Versioning</td>
                  <td className="text-center py-2 px-4">Basic</td>
                  <td className="text-center py-2 px-4">Advanced</td>
                  <td className="text-center py-2 px-4">Advanced</td>
                  <td className="text-center py-2 px-4">Enterprise</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">System Monitoring</td>
                  <td className="text-center py-2 px-4">-</td>
                  <td className="text-center py-2 px-4"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                  <td className="text-center py-2 px-4"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                  <td className="text-center py-2 px-4"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">VM Support</td>
                  <td className="text-center py-2 px-4">-</td>
                  <td className="text-center py-2 px-4">-</td>
                  <td className="text-center py-2 px-4"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                  <td className="text-center py-2 px-4"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">AI Tools</td>
                  <td className="text-center py-2 px-4">-</td>
                  <td className="text-center py-2 px-4">Basic</td>
                  <td className="text-center py-2 px-4">Advanced</td>
                  <td className="text-center py-2 px-4">Premium</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">VR Support</td>
                  <td className="text-center py-2 px-4">-</td>
                  <td className="text-center py-2 px-4">-</td>
                  <td className="text-center py-2 px-4">Limited</td>
                  <td className="text-center py-2 px-4">Full</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PremiumTab;
