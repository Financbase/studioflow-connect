
import React from "react";
import { MusicOff } from "lucide-react";

interface ContentPlaceholderProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const ContentPlaceholder: React.FC<ContentPlaceholderProps> = ({
  title,
  description,
  icon = <MusicOff className="h-12 w-12 text-muted-foreground" />,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="rounded-full bg-muted p-4 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-md">{description}</p>
    </div>
  );
};

export default ContentPlaceholder;
