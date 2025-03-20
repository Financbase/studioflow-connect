
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const DocumentationExamples = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Code Examples</CardTitle>
        <CardDescription>Ready-to-use code snippets and examples</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Browse our collection of code examples to accelerate your development process.
        </p>
        <div className="grid gap-3">
          <Link to="/examples/basic" className="flex p-3 items-center justify-between rounded-lg border border-border hover:bg-muted transition-colors">
            <div className="flex items-center gap-3">
              <div>
                <h3 className="font-medium">Basic Integration Example</h3>
                <p className="text-sm text-muted-foreground">Simple integration with our platform</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentationExamples;
