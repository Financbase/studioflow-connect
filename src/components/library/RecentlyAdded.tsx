
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Music } from "lucide-react";

const RecentlyAdded = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recently Added</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
              <Music className="h-8 w-8 text-muted-foreground mb-2" />
              <h4 className="font-medium">New Sample Pack {i}</h4>
              <p className="text-sm text-muted-foreground">Added yesterday</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentlyAdded;
