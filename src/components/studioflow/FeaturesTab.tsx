
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const FeaturesTab: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Cross-Platform Compatibility</h3>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Work seamlessly across macOS, Windows, and Linux without file system barriers.
            Access the same projects on any system without conversion or compatibility issues.
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Automatic Version Control</h3>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Never lose work with our real-time versioning system that automatically saves
            incremental changes to your projects without manual intervention.
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Accelerated I/O</h3>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Experience faster file operations with our GPU-accelerated I/O system,
            optimized specifically for audio production workflows.
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Legacy Plugin Support</h3>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Use older plugins across modern systems with our universal plugin bridge,
            maintaining compatibility with your favorite tools.
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Collaborative Workflow</h3>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Share projects with team members regardless of their operating system,
            ensuring smooth collaboration without technical barriers.
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Drive Conversion</h3>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Convert existing drives to our Universal format while preserving all data,
            enabling cross-platform access to your entire library.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeaturesTab;
