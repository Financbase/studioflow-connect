
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const DocumentationAPI = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>API Reference</CardTitle>
        <CardDescription>Complete documentation of our API endpoints</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          This section contains detailed information about our API endpoints, authentication,
          request parameters, response formats, and error handling.
        </p>
        <div className="mt-4 grid gap-3">
          <Link to="/api/authentication" className="flex p-3 items-center justify-between rounded-lg border border-border hover:bg-muted transition-colors">
            <div className="flex items-center gap-3">
              <div>
                <h3 className="font-medium">Authentication</h3>
                <p className="text-sm text-muted-foreground">Learn how to authenticate your API requests</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentationAPI;
