
import React from "react";
import { Link } from "react-router-dom";
import { Shield, TicketPlus } from "lucide-react";

interface NavLinksProps {
  isAdmin: boolean;
  t: (key: string) => string;
}

const NavLinks: React.FC<NavLinksProps> = ({ isAdmin, t }) => {
  return (
    <nav className="flex items-center gap-4 ml-6">
      <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
        Dashboard
      </Link>
      <Link to="/support" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary flex items-center gap-1">
        <TicketPlus className="h-3.5 w-3.5" />
        Support
      </Link>
      <Link to="/docs" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Documentation
      </Link>
      {isAdmin && (
        <Link to="/admin" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary flex items-center gap-1">
          <Shield className="h-3.5 w-3.5" />
          Admin
        </Link>
      )}
    </nav>
  );
};

export default NavLinks;
