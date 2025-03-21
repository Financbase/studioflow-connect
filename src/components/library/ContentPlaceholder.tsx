
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";

interface ContentPlaceholderProps {
  title: string;
  description: string;
}

const ContentPlaceholder = ({ title, description }: ContentPlaceholderProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center h-32 text-muted-foreground">
          <p>{title} content will be displayed here</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentPlaceholder;
