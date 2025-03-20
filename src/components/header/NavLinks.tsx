
import React from "react";
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

interface NavLinksProps {
  isAdmin: boolean;
  t: (key: string) => string;
}

const NavLinks: React.FC<NavLinksProps> = ({ isAdmin, t }) => {
  return (
    <nav className="flex items-center gap-4 ml-6">
      <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
        {t("nav.dashboard")}
      </Link>
      <Link to="/docs" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        {t("nav.docs")}
      </Link>
      {isAdmin && (
        <Link to="/admin" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary flex items-center gap-1">
          <Shield className="h-3.5 w-3.5" />
          {t("nav.admin")}
        </Link>
      )}
    </nav>
  );
};

export default NavLinks;
